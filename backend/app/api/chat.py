from fastapi import APIRouter, HTTPException
from app.models.chat import ChatRequest, ChatResponse, FeedbackRequest, Citation
from app.services.llm_service import LLMService
from app.services.embed_service import EmbeddingService
from app.services.retrieval_service import RetrievalService
from loguru import logger
import uuid

router = APIRouter()
llm_service = LLMService()
embed_service = EmbeddingService()
retrieval_service = RetrievalService()


@router.post("/{document_id}", response_model=ChatResponse)
async def chat_with_document(document_id: str, request: ChatRequest):
    """Ask questions about a specific document."""
    
    try:
        # Generate query embedding
        query_embedding = embed_service.embed_text(request.question)
        
        # Retrieve relevant chunks
        chunks_with_scores = retrieval_service.retrieve(
            query_embedding=query_embedding,
            document_id=document_id
        )
        
        if not chunks_with_scores:
            return ChatResponse(
                answer="Je ne trouve pas d'information pertinente pour répondre à cette question dans le contrat.",
                citations=[],
                confidence=0.0,
                answer_id=str(uuid.uuid4())
            )
        
        # Generate answer
        result = llm_service.generate_answer(
            question=request.question,
            context_chunks=chunks_with_scores,
            conversation_history=[msg.dict() for msg in request.conversation_history]
        )
        
        # Build citations
        citations = [
            Citation(
                document_id=chunk.chunk.document_id,
                document_name=document_id,
                page_number=chunk.chunk.page_number,
                section_title=chunk.chunk.section_title,
                excerpt=chunk.chunk.chunk_text[:200] + "...",
                relevance_score=chunk.score
            )
            for chunk in chunks_with_scores
        ]
        
        return ChatResponse(
            answer=result["answer"],
            citations=citations,
            confidence=sum(c.score for c in chunks_with_scores) / len(chunks_with_scores),
            answer_id=str(uuid.uuid4())
        )
        
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating answer")



@router.post("/kb", response_model=ChatResponse)
async def chat_with_knowledge_base(request: ChatRequest):
    """Ask questions across all documents in the knowledge base."""
    
    try:
        # Generate query embedding
        query_embedding = embed_service.embed_text(request.question)
        
        # Retrieve from all documents
        chunks_with_scores = retrieval_service.retrieve(
            query_embedding=query_embedding,
            document_id=None  # Search all documents
        )
        
        if not chunks_with_scores:
            return ChatResponse(
                answer="Je ne trouve pas d'information pertinente dans la base de connaissances.",
                citations=[],
                confidence=0.0,
                answer_id=str(uuid.uuid4())
            )
        
        # Generate answer
        result = llm_service.generate_answer(
            question=request.question,
            context_chunks=chunks_with_scores
        )
        
        # Build citations
        citations = [
            Citation(
                document_id=chunk.chunk.document_id,
                document_name=chunk.chunk.document_id,
                page_number=chunk.chunk.page_number,
                section_title=chunk.chunk.section_title,
                excerpt=chunk.chunk.chunk_text[:200] + "...",
                relevance_score=chunk.score
            )
            for chunk in chunks_with_scores
        ]
        
        return ChatResponse(
            answer=result["answer"],
            citations=citations,
            confidence=sum(c.score for c in chunks_with_scores) / len(chunks_with_scores),
            answer_id=str(uuid.uuid4())
        )
        
    except Exception as e:
        logger.error(f"Error in KB chat: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating answer")


@router.post("/feedback")
async def submit_feedback(feedback: FeedbackRequest):
    """Submit feedback on an answer."""
    logger.info(f"Feedback received for answer {feedback.answer_id}: {feedback.rating}")
    return {"status": "feedback_received", "answer_id": feedback.answer_id}
