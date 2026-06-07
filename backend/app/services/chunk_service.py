from typing import List, Dict
from loguru import logger
import re


class ChunkService:
    """Service for chunking documents semantically."""
    
    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
    
    def chunk_by_section(self, parsed_doc: Dict) -> List[Dict]:
        """
        Chunk document by sections, articles, and clauses when possible.
        Falls back to size-based chunking for unstructured text.
        """
        chunks = []
        
        # Try to identify section structure
        text = parsed_doc.get("text", "")
        pages = parsed_doc.get("pages", [])
        
        # Patterns for French contract structure
        section_patterns = [
            r"(?:ARTICLE|Article)\s+(\d+(?:\.\d+)?)\s*[:\-]?\s*(.*?)(?=(?:ARTICLE|Article)\s+\d+|$)",
            r"(?:SECTION|Section)\s+(\d+(?:\.\d+)?)\s*[:\-]?\s*(.*?)(?=(?:SECTION|Section)\s+\d+|$)",
            r"(?:CLAUSE|Clause)\s+(\d+(?:\.\d+)?)\s*[:\-]?\s*(.*?)(?=(?:CLAUSE|Clause)\s+\d+|$)",
        ]
        
        # Try pattern-based chunking
        for pattern in section_patterns:
            matches = list(re.finditer(pattern, text, re.DOTALL | re.IGNORECASE))
            if len(matches) > 3:  # If we found meaningful structure
                for match in matches:
                    section_num = match.group(1)
                    section_content = match.group(2).strip()
                    
                    if len(section_content) > 50:  # Meaningful content
                        chunks.append({
                            "text": section_content,
                            "section_title": f"Article {section_num}",
                            "chunk_type": "section"
                        })
                
                if chunks:
                    logger.info(f"Chunked document into {len(chunks)} sections")
                    return self._add_page_info(chunks, pages)
        
        # Fallback: size-based chunking with overlap
        logger.info("Using size-based chunking")
        return self._chunk_by_size(text, pages)
    
    def _chunk_by_size(self, text: str, pages: List[Dict]) -> List[Dict]:
        """Chunk text by size with overlap."""
        chunks = []
        words = text.split()
        
        start = 0
        chunk_id = 0
        
        while start < len(words):
            end = start + self.chunk_size
            chunk_words = words[start:end]
            chunk_text = " ".join(chunk_words)
            
            chunks.append({
                "text": chunk_text,
                "section_title": f"Chunk {chunk_id + 1}",
                "chunk_type": "size_based"
            })
            
            start += (self.chunk_size - self.chunk_overlap)
            chunk_id += 1
        
        return self._add_page_info(chunks, pages)
    
    def _add_page_info(self, chunks: List[Dict], pages: List[Dict]) -> List[Dict]:
        """Add page number information to chunks."""
        # Simple heuristic: match chunk text to pages
        for chunk in chunks:
            chunk_text = chunk["text"][:100]  # First 100 chars
            
            for page in pages:
                if chunk_text in page["text"]:
                    chunk["page_number"] = page["page_number"]
                    break
            
            if "page_number" not in chunk:
                chunk["page_number"] = None
        
        return chunks
    
    def normalize_text(self, text: str) -> str:
        """Clean and normalize text."""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        # Remove page numbers and headers/footers patterns
        text = re.sub(r'Page\s+\d+\s+(?:of|sur)\s+\d+', '', text, flags=re.IGNORECASE)
        return text.strip()
