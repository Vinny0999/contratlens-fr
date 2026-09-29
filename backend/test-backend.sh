#!/bin/bash

echo "================================================"
echo "  ContratLens Backend Test"
echo "================================================"
echo ""

# Test 1: Check if backend is running
echo "Test 1: Checking backend health..."
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ Backend is running"
    curl -s http://localhost:8000/health | python3 -m json.tool
else
    echo "❌ Backend is NOT running"
    echo ""
    echo "Start backend with:"
    echo "  cd backend"
    echo "  uvicorn app.main:app --reload"
    exit 1
fi

echo ""

# Test 2: Check API root
echo "Test 2: Checking API root..."
curl -s http://localhost:8000/ | python3 -m json.tool

echo ""

# Test 3: Check documents endpoint
echo "Test 3: Checking documents endpoint..."
curl -s http://localhost:8000/api/v1/documents | python3 -m json.tool

echo ""

# Test 4: Check LLM configuration
echo "Test 4: Checking LLM configuration..."
cd backend
python3 << 'EOF'
import sys
sys.path.insert(0, '.')
try:
    from app.core.config import settings
    print(f"✅ LLM Provider: {settings.LLM_PROVIDER}")
    print(f"   Ollama URL: {settings.OLLAMA_BASE_URL}")
    print(f"   Ollama Model: {settings.OLLAMA_MODEL}")
    print(f"   Google API Key: {'Set' if settings.GOOGLE_API_KEY else 'Not set'}")
    print(f"   OpenAI API Key: {'Set' if settings.OPENAI_API_KEY else 'Not set'}")
except Exception as e:
    print(f"❌ Error loading config: {e}")
    sys.exit(1)
EOF

echo ""
echo "================================================"
echo "  All Tests Complete"
echo "================================================"
