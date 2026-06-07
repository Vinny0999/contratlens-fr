#!/bin/bash

# ContratLens FR - Quick Setup Script
# This script automates the setup process

set -e

echo "🚀 ContratLens FR - Setup Script"
echo "================================"
echo ""

# Check for required tools
echo "📋 Checking prerequisites..."

command -v python3 >/dev/null 2>&1 || { echo "❌ Python 3 is required but not installed."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed."; exit 1; }
command -v ollama >/dev/null 2>&1 || { echo "❌ Ollama is required but not installed. Visit: https://ollama.ai/download"; exit 1; }

echo "✅ All prerequisites found!"
echo ""

# Check if Ollama is running
echo "🔍 Checking Ollama service..."
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "✅ Ollama is running"
else
    echo "⚠️  Ollama is not running. Starting in background..."
    ollama serve > /dev/null 2>&1 &
    sleep 3
    echo "✅ Ollama started"
fi
echo ""

# Pull Ollama model
echo "📥 Checking for Ollama model..."
if ollama list | grep -q "qwen2.5:7b"; then
    echo "✅ qwen2.5:7b model already downloaded"
else
    echo "📥 Downloading qwen2.5:7b model (this may take a few minutes)..."
    ollama pull qwen2.5:7b
fi
echo ""

# Backend setup
echo "🔧 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "✅ Backend setup complete"
cd ..
echo ""

# Frontend setup
echo "🎨 Setting up frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
else
    echo "✅ Node modules already installed"
fi

echo "✅ Frontend setup complete"
cd ..
echo ""

# Create data directories
echo "📁 Creating data directories..."
mkdir -p data/raw data/processed data/vectordb backend/logs
echo "✅ Directories created"
echo ""

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Start the backend:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "2. In a new terminal, start the frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "📚 For more details, see SETUP.md"
