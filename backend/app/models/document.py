from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class DocumentType(str, Enum):
    CONTRACT = "contract"
    TENDER = "tender"
    AMENDMENT = "amendment"
    OTHER = "other"


class DocumentStatus(str, Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    INDEXED = "indexed"
    FAILED = "failed"


class Document(BaseModel):
    id: str
    filename: str
    doc_type: DocumentType
    language: str = "fr"
    upload_date: datetime = Field(default_factory=datetime.utcnow)
    status: DocumentStatus = DocumentStatus.UPLOADED
    file_path: Optional[str] = None
    file_size: Optional[int] = None
    num_pages: Optional[int] = None
    error_message: Optional[str] = None


class DocumentCreate(BaseModel):
    filename: str
    doc_type: DocumentType = DocumentType.CONTRACT


class DocumentResponse(BaseModel):
    id: str
    filename: str
    doc_type: str
    status: str
    upload_date: datetime
    num_pages: Optional[int] = None
