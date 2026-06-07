from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import uuid
import shutil
from loguru import logger
from app.core.config import settings
from app.models.document import Document, DocumentCreate, DocumentResponse, DocumentType
from app.services.store import documents_db

router = APIRouter()


@router.post("/upload", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...)):
    """Upload a contract document (PDF or DOCX)."""
    
    # Validate file extension
    file_ext = Path(file.filename).suffix.lower().lstrip('.')
    if file_ext not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Supported: {settings.ALLOWED_EXTENSIONS}"
        )
    
    # Generate unique document ID
    doc_id = str(uuid.uuid4())
    
    # Create upload directory
    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    # Save file
    file_path = upload_dir / f"{doc_id}.{file_ext}"
    
    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        file_size = file_path.stat().st_size
        
        # Validate file size
        if file_size > settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024:
            file_path.unlink()
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Max size: {settings.MAX_UPLOAD_SIZE_MB}MB"
            )
        
        # Create document record and store it
        document = Document(
            id=doc_id,
            filename=file.filename,
            doc_type=DocumentType.CONTRACT,
            file_path=str(file_path),
            file_size=file_size
        )
        
        documents_db[doc_id] = DocumentResponse(
            id=document.id,
            filename=document.filename,
            doc_type=document.doc_type.value,
            status=document.status.value,
            upload_date=document.upload_date,
            num_pages=None
        )
        
        logger.info(f"Uploaded document: {file.filename} (ID: {doc_id})")
        
        return documents_db[doc_id]
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading document: {str(e)}")
        if file_path.exists():
            file_path.unlink()
        raise HTTPException(status_code=500, detail="Error uploading document")
