import chromadb
from typing import List, Dict, Optional
from loguru import logger
from app.core.config import settings
from app.models.chunk import ChunkWithScore, Chunk


class RetrievalService:
    """Service for retrieving relevant chunks from ChromaDB."""
    
    def __init__(self):
        self.client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIRECTORY)
        self.collection = None
    
    def get_or_create_collection(self, collection_name: str = "contracts"):
        """Get or create a ChromaDB collection using cosine similarity."""
        if self.collection is None:
            self.collection = self.client.get_or_create_collection(
                name=collection_name,
                metadata={
                    "description": "French contract embeddings",
                    "hnsw:space": "cosine"  # cosine distance: 0=identical, 2=opposite
                }
            )
        return self.collection
    
    def add_chunks(self, chunks: List[Chunk], embeddings: List[List[float]]):
        """Add chunks with embeddings to the vector database."""
        collection = self.get_or_create_collection()
        
        ids = [chunk.id for chunk in chunks]
        documents = [chunk.chunk_text for chunk in chunks]
        metadatas = [
            {
                "document_id": chunk.document_id,
                "page_number": chunk.page_number or -1,
                "section_title": chunk.section_title or ""
            }
            for chunk in chunks
        ]
        
        collection.add(
            ids=ids,
            embeddings=embeddings,
            documents=documents,
            metadatas=metadatas
        )
        
        logger.info(f"Added {len(chunks)} chunks to vector database")
    
    def retrieve(
        self,
        query_embedding: List[float],
        top_k: int = 5,
        document_id: Optional[str] = None
    ) -> List[ChunkWithScore]:
        """Retrieve relevant chunks for a query."""
        collection = self.get_or_create_collection()
        
        where_filter = None
        if document_id:
            where_filter = {"document_id": document_id}
        
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            where=where_filter
        )
        
        chunks_with_scores = []
        for i, doc_id in enumerate(results['ids'][0]):
            # Cosine distance: 0 = identical, 2 = opposite → similarity = 1 - distance
            score = 1.0 - results['distances'][0][i]

            if score < settings.MIN_RELEVANCE_SCORE:
                continue
            
            chunk = Chunk(
                id=doc_id,
                document_id=results['metadatas'][0][i]['document_id'],
                page_number=results['metadatas'][0][i].get('page_number'),
                section_title=results['metadatas'][0][i].get('section_title'),
                chunk_text=results['documents'][0][i]
            )
            
            relevance = "high" if score > 0.8 else "medium" if score > 0.6 else "low"
            
            chunks_with_scores.append(
                ChunkWithScore(chunk=chunk, score=score, relevance=relevance)
            )
        
        return chunks_with_scores
