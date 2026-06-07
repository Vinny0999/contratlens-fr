"""Test that all imports work correctly."""
import pytest


def test_fastapi_import():
    """Test FastAPI can be imported."""
    import fastapi
    assert fastapi is not None


def test_langchain_import():
    """Test LangChain can be imported."""
    import langchain
    assert langchain is not None


def test_app_import():
    """Test main app can be imported."""
    from app.main import app
    assert app is not None


def test_models_import():
    """Test data models can be imported."""
    from app.models.document import Document
    from app.models.chat import ChatMessage
    assert Document is not None
    assert ChatMessage is not None


def test_services_import():
    """Test services can be imported."""
    from app.services.chunk_service import ChunkService
    from app.services.embed_service import EmbedService
    assert ChunkService is not None
    assert EmbedService is not None


def test_api_routes_import():
    """Test API routes can be imported."""
    from app.api import analysis, chat, documents, upload
    assert analysis is not None
    assert chat is not None
    assert documents is not None
    assert upload is not None
