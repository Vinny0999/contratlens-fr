from typing import Dict, List
from loguru import logger
import ollama
from app.core.config import settings
from app.models.analysis import (
    AnalysisResult, ContractNeed, Deliverable,
    RiskClause, MandatoryDocument
)
import json


class QualificationService:
    """Service for structured contract qualification and analysis."""
    
    def __init__(self, model: str = None):
        self.model = model or settings.OLLAMA_MODEL
    
    def analyze_contract(self, document_text: str, document_id: str) -> AnalysisResult:
        """Run full contract analysis."""
        
        logger.info(f"Starting contract analysis for document {document_id}")
        
        # Generate summary
        summary = self._generate_summary(document_text)
        
        # Extract structured information
        contract_type = self._extract_contract_type(document_text)
        scope_of_work = self._extract_scope(document_text)
        needs = self._extract_needs(document_text)
        deliverables = self._extract_deliverables(document_text)
        risks = self._extract_risks(document_text)
        mandatory_docs = self._extract_mandatory_documents(document_text)
        missing_info = self._identify_missing_information(document_text)
        
        # Calculate qualification score
        qualification_score = self._calculate_qualification_score(
            needs, deliverables, risks, mandatory_docs, missing_info
        )
        
        return AnalysisResult(
            document_id=document_id,
            summary=summary,
            contract_type=contract_type,
            scope_of_work=scope_of_work,
            needs=needs,
            deliverables=deliverables,
            risks=risks,
            mandatory_requirements=mandatory_docs,
            missing_information=missing_info,
            qualification_score=qualification_score
        )
    
    def _generate_summary(self, text: str) -> str:
        """Generate contract summary."""
        prompt = f"""Résume ce contrat en 2-3 phrases claires et concises.
Focus sur: objet du contrat, parties impliquées, nature des prestations.

Contrat:
{text[:3000]}

Résumé:"""
        
        response = ollama.generate(model=self.model, prompt=prompt)
        return response['response'].strip()
    
    def _extract_contract_type(self, text: str) -> str:
        """Extract contract type."""
        prompt = f"""Identifie le type de contrat parmi: marché public, contrat privé, 
accord-cadre, appel d'offres, autre.

Contrat:
{text[:2000]}

Type (un seul mot):"""
        
        response = ollama.generate(model=self.model, prompt=prompt)
        return response['response'].strip()
    
    def _extract_scope(self, text: str) -> str:
        """Extract scope of work."""
        prompt = f"""Extrais le périmètre des travaux ou prestations en 1-2 phrases.

Contrat:
{text[:3000]}

Périmètre:"""
        
        response = ollama.generate(model=self.model, prompt=prompt)
        return response['response'].strip()
    
    def _extract_needs(self, text: str) -> List[ContractNeed]:
        """Extract contract needs."""
        # Simplified for now - can be enhanced with more sophisticated extraction
        return []
    
    def _extract_deliverables(self, text: str) -> List[Deliverable]:
        """Extract deliverables from contract."""
        return []
    
    def _extract_risks(self, text: str) -> List[RiskClause]:
        """Extract risk clauses."""
        return []
    
    def _extract_mandatory_documents(self, text: str) -> List[MandatoryDocument]:
        """Extract mandatory documents."""
        return []
    
    def _identify_missing_information(self, text: str) -> List[str]:
        """Identify missing or ambiguous information."""
        return []
    
    def _calculate_qualification_score(
        self, needs, deliverables, risks, mandatory_docs, missing_info
    ) -> float:
        """Calculate overall qualification score."""
        # Simple scoring logic
        score = 0.5
        if deliverables:
            score += 0.2
        if risks:
            score += 0.1
        if mandatory_docs:
            score += 0.1
        if len(missing_info) > 3:
            score -= 0.1
        
        return max(0.0, min(1.0, score))
