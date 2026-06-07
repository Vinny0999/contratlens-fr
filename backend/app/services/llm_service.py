from typing import List, Optional, Dict
from loguru import logger
import ollama
from app.core.config import settings
from app.models.chunk import ChunkWithScore


class LLMService:
    """Service for interacting with Ollama LLM."""
    
    def __init__(self, model: str = None):
        self.model = model or settings.OLLAMA_MODEL
        self.base_url = settings.OLLAMA_BASE_URL
    
    def generate_answer(
        self,
        question: str,
        context_chunks: List[ChunkWithScore],
        conversation_history: Optional[List[Dict]] = None
    ) -> Dict:
        """Generate an answer from retrieved context."""
        
        # Build context from chunks
        context = self._build_context(context_chunks)
        
        # Create prompt
        system_prompt = self._get_system_prompt()
        user_prompt = self._format_user_prompt(question, context)
        
        # Build messages
        messages = [{"role": "system", "content": system_prompt}]
        
        if conversation_history:
            messages.extend(conversation_history)
        
        messages.append({"role": "user", "content": user_prompt})
        
        try:
            response = ollama.chat(
                model=self.model,
                messages=messages
            )
            
            answer = response['message']['content']
            
            return {
                "answer": answer,
                "model_used": self.model,
                "tokens_used": response.get('eval_count', 0)
            }
            
        except Exception as e:
            logger.error(f"Error generating answer: {str(e)}")
            raise
    
    def _build_context(self, chunks: List[ChunkWithScore]) -> str:
        """Build context string from chunks."""
        context_parts = []
        
        for i, chunk_with_score in enumerate(chunks, 1):
            chunk = chunk_with_score.chunk
            section = chunk.section_title or "Section inconnue"
            page = f"Page {chunk.page_number}" if chunk.page_number else "Page inconnue"
            
            context_parts.append(
                f"[Source {i}] {section} ({page}):\n{chunk.chunk_text}\n"
            )
        
        return "\n".join(context_parts)
    
    def _get_system_prompt(self) -> str:
        """Get system prompt for contract Q&A."""
        return """Tu es un assistant expert en analyse de contrats français.

RÈGLES STRICTES:
1. Réponds UNIQUEMENT à partir du contexte fourni
2. Cite toujours la source (numéro de source, section, page)
3. Si l'information n'est pas dans le contexte, dis "Je ne trouve pas cette information dans le contrat fourni"
4. Ne fais pas d'inférences ou de conclusions légales au-delà du texte
5. Distingue clairement les faits extraits des interprétations
6. Utilise un langage clair et professionnel
7. Pour les montants, dates et délais, cite exactement le texte

Réponds en français de manière précise et structurée."""
    
    def _format_user_prompt(self, question: str, context: str) -> str:
        """Format user question with context."""
        return f"""Contexte extrait du contrat:

{context}

Question: {question}

Réponds en citant les sources spécifiques."""
