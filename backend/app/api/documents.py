from fastapi import APIRouter, HTTPException
from typing import List
from app.models.document import DocumentResponse
from loguru import logger

router = APIRouter()

# In-memory storage (replace with database in production)
documents_db = {}


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
async def index_document(document_id: str):
    """Parse, chunk, and index a document."""
    if document_id not in documents_db:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # TODO: Implement indexing pipeline
    # 1. Parse document
    # 2. Chunk text
    # 3. Generate embeddings
    # 4. Store in vector DB
    
    logger.info(f"Indexing document: {document_id}")
    
    return {
        "document_id": document_id,
        "status": "indexing_started",
        "message": "Document indexing in progress"
    }
