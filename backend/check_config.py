#!/usr/bin/env python3
"""
Configuration checker for ContratLens Backend
Validates that the chosen LLM provider is properly configured
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

def check_config():
    """Check backend configuration."""
    print("=" * 60)
    print("  ContratLens Backend Configuration Check")
    print("=" * 60)
    print()
    
    try:
        from app.core.config import settings
        print("✅ Configuration loaded successfully")
        print()
    except Exception as e:
        print(f"❌ Failed to load configuration: {e}")
        return False
    
    # Check LLM Provider
    provider = settings.LLM_PROVIDER
    print(f"📝 LLM Provider: {provider}")
    print()
    
    issues = []
    
    # Validate provider configuration
    if provider == "google":
        if not settings.GOOGLE_API_KEY or settings.GOOGLE_API_KEY == "your-google-api-key-here":
            issues.append("❌ Google AI selected but GOOGLE_API_KEY not configured")
            print("   Set GOOGLE_API_KEY in backend/.env")
        else:
            print("✅ Google AI API key is configured")
        
        try:
            import google.generativeai
            print("✅ google-generativeai library installed")
        except ImportError:
            issues.append("❌ google-generativeai not installed")
            print("   Run: pip install google-generativeai")
    
    elif provider == "openai":
        if not settings.OPENAI_API_KEY:
            issues.append("❌ OpenAI selected but OPENAI_API_KEY not configured")
            print("   Set OPENAI_API_KEY in backend/.env")
        else:
            print("✅ OpenAI API key is configured")
        
        try:
            import openai
            print("✅ openai library installed")
        except ImportError:
            issues.append("❌ openai not installed")
            print("   Run: pip install openai")
    
    elif provider == "anthropic":
        if not settings.ANTHROPIC_API_KEY:
            issues.append("❌ Anthropic selected but ANTHROPIC_API_KEY not configured")
            print("   Set ANTHROPIC_API_KEY in backend/.env")
        else:
            print("✅ Anthropic API key is configured")
        
        try:
            import anthropic
            print("✅ anthropic library installed")
        except ImportError:
            issues.append("❌ anthropic not installed")
            print("   Run: pip install anthropic")
    
    elif provider == "ollama":
        print(f"   Ollama URL: {settings.OLLAMA_BASE_URL}")
        print(f"   Ollama Model: {settings.OLLAMA_MODEL}")
        
        try:
            import ollama
            print("✅ ollama library installed")
        except ImportError:
            issues.append("❌ ollama not installed")
            print("   Run: pip install ollama")
        
        # Check if Ollama is running
        try:
            import requests
            response = requests.get(f"{settings.OLLAMA_BASE_URL}/api/tags", timeout=2)
            if response.status_code == 200:
                print("✅ Ollama service is running")
                models = response.json().get('models', [])
                if models:
                    print(f"   Available models: {', '.join([m['name'] for m in models])}")
                    model_names = [m['name'] for m in models]
                    if settings.OLLAMA_MODEL not in model_names:
                        issues.append(f"⚠️  Model '{settings.OLLAMA_MODEL}' not found")
                        print(f"   Run: ollama pull {settings.OLLAMA_MODEL}")
                    else:
                        print(f"✅ Model '{settings.OLLAMA_MODEL}' is available")
                else:
                    issues.append("⚠️  No models downloaded")
                    print(f"   Run: ollama pull {settings.OLLAMA_MODEL}")
            else:
                issues.append("❌ Ollama service returned error")
        except Exception as e:
            issues.append(f"❌ Cannot connect to Ollama: {e}")
            print("   Make sure Ollama is running: ollama serve")
    
    else:
        issues.append(f"❌ Unknown LLM provider: {provider}")
    
    print()
    
    # Check embedding model
    print(f"📝 Embedding Model: {settings.EMBEDDING_MODEL}")
    try:
        import sentence_transformers
        print("✅ sentence-transformers installed")
    except ImportError:
        issues.append("❌ sentence-transformers not installed")
        print("   Run: pip install sentence-transformers")
    
    print()
    
    # Check vector database
    print(f"📝 Vector Database: {settings.CHROMA_PERSIST_DIRECTORY}")
    try:
        import chromadb
        print("✅ chromadb installed")
        
        db_path = Path(settings.CHROMA_PERSIST_DIRECTORY)
        if db_path.exists():
            print(f"✅ Database directory exists: {db_path.absolute()}")
        else:
            print(f"ℹ️  Database directory will be created on first use")
    except ImportError:
        issues.append("❌ chromadb not installed")
        print("   Run: pip install chromadb")
    
    print()
    
    # Check document processing libraries
    print("📝 Document Processing:")
    try:
        import fitz
        print("✅ PyMuPDF (PDF support) installed")
    except ImportError:
        issues.append("❌ PyMuPDF not installed")
        print("   Run: pip install PyMuPDF")
    
    try:
        import docx
        print("✅ python-docx (DOCX support) installed")
    except ImportError:
        issues.append("❌ python-docx not installed")
        print("   Run: pip install python-docx")
    
    print()
    print("=" * 60)
    
    if issues:
        print("❌ Configuration Issues Found:")
        for issue in issues:
            print(f"   {issue}")
        print()
        print("Please fix the issues above before starting the backend.")
        return False
    else:
        print("✅ All checks passed! Backend is ready to start.")
        print()
        print("Start backend with:")
        print("   cd backend")
        print("   uvicorn app.main:app --reload")
        return True

if __name__ == "__main__":
    success = check_config()
    sys.exit(0 if success else 1)
