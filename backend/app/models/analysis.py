from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class ContractNeed(BaseModel):
    category: str
    description: str
    mandatory: bool = False


class Deliverable(BaseModel):
    name: str
    description: str
    deadline: Optional[str] = None
    quantity: Optional[str] = None


class RiskClause(BaseModel):
    type: str  # "penalty", "liability", "insurance", "termination"
    description: str
    severity: str  # "high", "medium", "low"
    financial_impact: Optional[str] = None


class MandatoryDocument(BaseModel):
    name: str
    deadline: Optional[str] = None
    purpose: str


class AnalysisResult(BaseModel):
    document_id: str
    summary: str
    contract_type: Optional[str] = None
    scope_of_work: Optional[str] = None
    needs: List[ContractNeed] = Field(default_factory=list)
    deliverables: List[Deliverable] = Field(default_factory=list)
    risks: List[RiskClause] = Field(default_factory=list)
    mandatory_requirements: List[MandatoryDocument] = Field(default_factory=list)
    missing_information: List[str] = Field(default_factory=list)
    qualification_score: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class AnalysisRequest(BaseModel):
    document_id: str
    analysis_types: List[str] = ["summary", "needs", "deliverables", "risks"]


class AnalysisResponse(BaseModel):
    analysis_id: str
    document_id: str
    status: str
    result: Optional[AnalysisResult] = None
