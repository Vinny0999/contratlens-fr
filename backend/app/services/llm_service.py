from typing import List, Optional, Dict
from loguru import logger
from app.core.config import settings
from app.models.chunk import ChunkWithScore

# Try importing different LLM providers
try:
    import google.generativeai as genai
    GOOGLE_AVAILABLE = True
except ImportError:
    GOOGLE_AVAILABLE = False

try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

try:
    from anthropic import Anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False

try:
    import ollama
    OLLAMA_AVAILABLE = True
except ImportError:
    OLLAMA_AVAILABLE = False


class LLMService:
    """Service for interacting with various LLM providers."""
    
    def __init__(self, provider: str = None):
        self.provider = provider or settings.LLM_PROVIDER
        self._init_provider()
    
    def _init_provider(self):
        """Initialize the LLM provider."""
        if self.provider == "google":
            if not GOOGLE_AVAILABLE:
                raise ImportError("google-generativeai not installed. Run: pip install google-generativeai")
            genai.configure(api_key=settings.GOOGLE_API_KEY)
            self.client = genai.GenerativeModel("gemini-pro")
        
        elif self.provider == "openai":
            if not OPENAI_AVAILABLE:
                raise ImportError("openai not installed. Run: pip install openai")
            self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
            self.model = "gpt-3.5-turbo"
        
        elif self.provider == "anthropic":
            if not ANTHROPIC_AVAILABLE:
                raise ImportError("anthropic not installed. Run: pip install anthropic")
            self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
            self.model = "claude-3-haiku-20240307"
        
        elif self.provider == "ollama":
            if not OLLAMA_AVAILABLE:
                raise ImportError("ollama not installed. Run: pip install ollama")
            self.model = settings.OLLAMA_MODEL
            self.base_url = settings.OLLAMA_BASE_URL
        
        else:
            raise ValueError(f"Unknown LLM provider: {self.provider}")
    
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
            if self.provider == "google":
                # Google Generative AI doesn't use system role the same way
                full_prompt = f"{system_prompt}\n\n{user_prompt}"
                response = self.client.generate_content(full_prompt)
                answer = response.text
                tokens_used = 0
            
            elif self.provider == "openai":
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=messages,
                    temperature=0.7
                )
                answer = response.choices[0].message.content
                tokens_used = response.usage.total_tokens
            
            elif self.provider == "anthropic":
                response = self.client.messages.create(
                    model=self.model,
                    max_tokens=1024,
                    system=system_prompt,
                    messages=[{"role": "user", "content": user_prompt}]
                )
                answer = response.content[0].text
                tokens_used = response.usage.output_tokens
            
            elif self.provider == "ollama":
                response = self._call_ollama(messages)
                answer = response['message']['content']
                tokens_used = response.get('eval_count', 0)
            
            return {
                "answer": answer,
                "model_used": self.provider,
                "tokens_used": tokens_used
            }
            
        except Exception as e:
            logger.error(f"Error generating answer with {self.provider}: {str(e)}")
            raise
    
    def _call_ollama(self, messages):
        """Call Ollama LLM."""
        response = ollama.chat(
            model=self.model,
            messages=messages
        )
        return response
    
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
