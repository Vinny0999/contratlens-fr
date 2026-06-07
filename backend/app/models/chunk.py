from typing import Optional, List
from pydantic import BaseModel


class Chunk(BaseModel):
    id: str
    document_id: str
    page_number: Optional[int] = None
    section_title: Optional[str] = None
    chunk_text: str
    embedding_id: Optional[str] = None
    metadata: Optional[dict] = None


class ChunkWithScore(BaseModel):
    chunk: Chunk
    score: float
    relevance: str  # "high", "medium", "low"


class Citation(BaseModel):
    document_id: str
    document_name: str
    page_number: Optional[int] = None
    section_title: Optional[str] = None
    excerpt: str
    relevance_score: float
