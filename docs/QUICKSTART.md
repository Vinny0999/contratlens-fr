# QuickStart Guide

Get ContratLens FR running in 3 simple steps.

## Prerequisites

Install these first:
- **Python 3.10+**: `python --version`
- **Node.js 18+**: `node --version`
- **Ollama**: [ollama.ai/download](https://ollama.ai/download)

## 🚀 Quick Start

### 1. Install Ollama & Pull Model

```bash
# macOS
brew install ollama

# Start Ollama
ollama serve

# In another terminal, pull model
ollama pull qwen2.5:7b
```

### 2. Setup Backend (Terminal 1)

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Copy config
cp .env.example .env

# Run server
uvicorn app.main:app --reload
```

Backend: http://localhost:8000
API Docs: http://localhost:8000/docs

### 3. Setup Frontend (Terminal 2)

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend: http://localhost:5173

## ✅ Verify Setup

1. Open browser: http://localhost:5173
2. You should see the ContratLens FR homepage
3. Try uploading a test PDF contract

## 🐳 Using Docker (Optional)

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f
```

## ❓ Problems?

See detailed troubleshooting in **SETUP.md**

## 📖 Learn More

- Full documentation: **README.md**
- Setup guide: **SETUP.md**
- API docs: http://localhost:8000/docs
