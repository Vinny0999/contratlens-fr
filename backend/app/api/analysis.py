from fastapi import APIRouter, HTTPException
from pathlib import Path
from app.models.analysis import AnalysisRequest, AnalysisResponse, AnalysisResult
from app.services.qualification_service import QualificationService
from app.services.parser_service import ParserService
from app.services.store import documents_db
from app.core.config import settings
from loguru import logger
import uuid

router = APIRouter()
qualification_service = QualificationService()
parser = ParserService()


@router.post("/{document_id}", response_model=AnalysisResponse)
async def analyze_contract(document_id: str, request: AnalysisRequest = None):
    """Run structured contract analysis."""

    if document_id not in documents_db:
        raise HTTPException(status_code=404, detail="Document not found")

    doc = documents_db[document_id]
    if doc.status not in ("indexed", "uploaded", "processing"):
        raise HTTPException(status_code=400, detail="Document not ready for analysis")

    logger.info(f"Analyzing contract: {document_id}")

    try:
        # Locate the file on disk
        upload_dir = Path(settings.UPLOAD_DIR)
        matches = list(upload_dir.glob(f"{document_id}.*"))
        if not matches:
            raise HTTPException(status_code=404, detail="Document file not found on disk")

        file_path = str(matches[0])

        # Parse the document text
        parsed = parser.parse_document(file_path)
        document_text = parsed.get("text", "")

        if not document_text.strip():
            raise HTTPException(status_code=422, detail="Could not extract text from document")

        # Run LLM-based qualification
        result = qualification_service.analyze_contract(
            document_text=document_text,
            document_id=document_id
        )

        analysis_id = str(uuid.uuid4())

        return AnalysisResponse(
            analysis_id=analysis_id,
            document_id=document_id,
            status="completed",
            result=result
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing contract {document_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error analyzing contract: {str(e)}")


@router.get("/{analysis_id}")
async def get_analysis_result(analysis_id: str):
    """Get analysis results by ID."""
    return {"analysis_id": analysis_id, "status": "not_implemented"}
