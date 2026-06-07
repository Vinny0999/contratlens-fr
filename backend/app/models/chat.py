from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.chunk import Citation


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ChatRequest(BaseModel):
    question: str
    document_id: Optional[str] = None  # None means search all documents
    conversation_history: List[ChatMessage] = Field(default_factory=list)


class ChatAnswer(BaseModel):
    id: str
    question: str
    answer: str
    citations: List[Citation]
    confidence: float
    created_at: datetime = Field(default_factory=datetime.utcnow)
    model_used: str
    tokens_used: Optional[int] = None


class ChatResponse(BaseModel):
    answer: str
    citations: List[Citation]
    confidence: float
    answer_id: str


class FeedbackRequest(BaseModel):
    answer_id: str
    rating: int  # 1-5
    comment: Optional[str] = None
    is_helpful: bool
