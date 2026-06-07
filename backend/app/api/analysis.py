from fastapi import APIRouter, HTTPException
from app.models.analysis import AnalysisRequest, AnalysisResponse, AnalysisResult
from app.services.qualification_service import QualificationService
from loguru import logger
import uuid

router = APIRouter()
qualification_service = QualificationService()


@router.post("/{document_id}", response_model=AnalysisResponse)
async def analyze_contract(document_id: str, request: AnalysisRequest):
    """Run structured contract analysis."""
    
    # TODO: Get document text from storage
    # For now, return mock response
    
    logger.info(f"Analyzing contract: {document_id}")
    
    try:
        # Mock analysis result
        analysis_id = str(uuid.uuid4())
        
        result = AnalysisResult(
            document_id=document_id,
            summary="Contrat d'exemple pour démonstration",
            contract_type="marché public",
            scope_of_work="Prestations de service informatique"
        )
        
        return AnalysisResponse(
            analysis_id=analysis_id,
            document_id=document_id,
            status="completed",
            result=result
        )
        
    except Exception as e:
        logger.error(f"Error analyzing contract: {str(e)}")
        raise HTTPException(status_code=500, detail="Error analyzing contract")


@router.get("/{analysis_id}")
async def get_analysis_result(analysis_id: str):
    """Get analysis results by ID."""
    # TODO: Implement storage and retrieval
    return {"analysis_id": analysis_id, "status": "not_implemented"}
