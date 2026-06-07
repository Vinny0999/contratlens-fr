from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
from pathlib import Path
import uuid
from app.models.document import DocumentResponse, DocumentStatus
from app.models.chunk import Chunk
from app.services.store import documents_db
from app.services.parser_service import ParserService
from app.services.chunk_service import ChunkService
from app.services.embed_service import EmbeddingService
from app.services.retrieval_service import RetrievalService
from app.core.config import settings
from loguru import logger

router = APIRouter()

parser = ParserService()
chunker = ChunkService(chunk_size=settings.CHUNK_SIZE, chunk_overlap=settings.CHUNK_OVERLAP)
embedder = EmbeddingService(model_name=settings.EMBEDDING_MODEL)
retrieval = RetrievalService()


def _run_indexing(document_id: str):
    """Parse, chunk, embed and store a document in ChromaDB."""
    doc = documents_db.get(document_id)
    if not doc:
        logger.error(f"Document {document_id} not found in store")
        return

    # Resolve file path: look for any file matching the document id
    upload_dir = Path(settings.UPLOAD_DIR)
    matches = list(upload_dir.glob(f"{document_id}.*"))
    if not matches:
        logger.error(f"File not found for document {document_id}")
        documents_db[document_id] = doc.model_copy(update={"status": DocumentStatus.FAILED.value})
        return

    file_path = str(matches[0])

    try:
        # Update status to processing
        documents_db[document_id] = doc.model_copy(update={"status": DocumentStatus.PROCESSING.value})

        # 1. Parse
        logger.info(f"Parsing document: {document_id}")
        parsed = parser.parse_document(file_path)

        # 2. Chunk
        logger.info(f"Chunking document: {document_id}")
        raw_chunks = chunker.chunk_by_section(parsed)

        # 3. Build Chunk objects
        chunks = [
            Chunk(
                id=str(uuid.uuid4()),
                document_id=document_id,
                chunk_text=c["text"],
                section_title=c.get("section_title"),
                page_number=c.get("page_number"),
            )
            for c in raw_chunks
        ]

        # 4. Embed
        logger.info(f"Embedding {len(chunks)} chunks for document: {document_id}")
        texts = [c.chunk_text for c in chunks]
        embeddings = embedder.embed_batch(texts)

        # 5. Store in ChromaDB
        retrieval.add_chunks(chunks, embeddings)

        # Determine page count
        num_pages = parsed.get("metadata", {}).get("num_pages") or len(
            parsed.get("paragraphs", [])
        ) or None

        # Update status to indexed
        documents_db[document_id] = doc.model_copy(
            update={"status": DocumentStatus.INDEXED.value, "num_pages": num_pages}
        )
        logger.info(f"Document {document_id} indexed successfully ({len(chunks)} chunks)")

    except Exception as e:
        logger.error(f"Error indexing document {document_id}: {str(e)}")
        documents_db[document_id] = doc.model_copy(update={"status": DocumentStatus.FAILED.value})


@router.get("", response_model=List[DocumentResponse])
async def list_documents():
    """List all uploaded documents."""
    return list(documents_db.values())


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(document_id: str):
    """Get document details by ID."""
    if document_id not in documents_db:
        raise HTTPException(status_code=404, detail="Document not found")
    return documents_db[document_id]


@router.post("/{document_id}/index")
async def index_document(document_id: str, background_tasks: BackgroundTasks):
    """Parse, chunk, and index a document into the vector database."""
    if document_id not in documents_db:
        raise HTTPException(status_code=404, detail="Document not found")

    doc = documents_db[document_id]
    if doc.status == DocumentStatus.INDEXED.value:
        return {"document_id": document_id, "status": "already_indexed"}

    background_tasks.add_task(_run_indexing, document_id)
    logger.info(f"Indexing started for document: {document_id}")

    return {
        "document_id": document_id,
        "status": "indexing_started",
        "message": "Document indexing in progress"
    }
