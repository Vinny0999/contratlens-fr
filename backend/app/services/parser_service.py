import fitz  # PyMuPDF
from docx import Document as DocxDocument
from pathlib import Path
from typing import Dict, List
from loguru import logger


class ParserService:
    """Service for extracting text from PDF and DOCX documents."""
    
    @staticmethod
    def parse_pdf(file_path: str) -> Dict:
        """
        Extract text from PDF with page and section information.
        
        Returns:
            Dict with 'text', 'pages', 'metadata'
        """
        try:
            doc = fitz.open(file_path)
            pages = []
            full_text = []
            
            for page_num in range(len(doc)):
                page = doc[page_num]
                text = page.get_text()
                
                pages.append({
                    "page_number": page_num + 1,
                    "text": text
                })
                full_text.append(text)
            
            metadata = {
                "num_pages": len(doc),
                "title": doc.metadata.get("title", ""),
                "author": doc.metadata.get("author", ""),
                "subject": doc.metadata.get("subject", ""),
            }
            
            doc.close()
            
            return {
                "text": "\n\n".join(full_text),
                "pages": pages,
                "metadata": metadata
            }
            
        except Exception as e:
            logger.error(f"Error parsing PDF {file_path}: {str(e)}")
            raise
    
    @staticmethod
    def parse_docx(file_path: str) -> Dict:
        """
        Extract text from DOCX with paragraph structure.
        
        Returns:
            Dict with 'text', 'paragraphs', 'metadata'
        """
        try:
            doc = DocxDocument(file_path)
            paragraphs = []
            full_text = []
            
            for i, para in enumerate(doc.paragraphs):
                if para.text.strip():
                    paragraphs.append({
                        "index": i,
                        "text": para.text,
                        "style": para.style.name
                    })
                    full_text.append(para.text)
            
            metadata = {
                "num_paragraphs": len(paragraphs),
                "title": doc.core_properties.title or "",
                "author": doc.core_properties.author or "",
                "subject": doc.core_properties.subject or "",
            }
            
            return {
                "text": "\n\n".join(full_text),
                "paragraphs": paragraphs,
                "metadata": metadata
            }
            
        except Exception as e:
            logger.error(f"Error parsing DOCX {file_path}: {str(e)}")
            raise
    
    @staticmethod
    def parse_document(file_path: str) -> Dict:
        """
        Auto-detect format and parse document.
        """
        path = Path(file_path)
        extension = path.suffix.lower()
        
        if extension == ".pdf":
            return ParserService.parse_pdf(file_path)
        elif extension in [".docx", ".doc"]:
            return ParserService.parse_docx(file_path)
        else:
            raise ValueError(f"Unsupported file format: {extension}")
