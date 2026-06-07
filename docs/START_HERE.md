# 🚀 START HERE - ContratLens FR

## What You Have

A complete **French contract analysis assistant** using RAG with open-source LLMs.

**Everything is ready to go!**

---

## 📋 What's Included

### ✅ 3 Sample Contracts (for demo)
```
demo-documents/
├── sample-contract-1.md    → Development Services (€85,000)
├── sample-contract-2.md    → Furniture Tender (€150,000)
├── sample-contract-3.md    → Maintenance SLA (Monthly)
└── README.md               → Demo guide
```

### ✅ Complete Backend (Python FastAPI)
```
backend/
├── app/api/                → REST endpoints
├── app/services/           → Business logic
├── app/models/             → Data models
├── requirements.txt        → Python dependencies
└── .env.example            → Configuration template
```

### ✅ Complete Frontend (React + Vite)
```
frontend/
├── src/pages/              → Page components
├── src/components/         → Reusable components
├── package.json            → Dependencies
└── vite.config.js          → Build config
```

### ✅ Documentation
```
README.md               → Main documentation
SETUP.md                → Installation guide
QUICKSTART.md           → 5-minute quickstart
VSCODE_GUIDE.md         → VS Code setup
DEMO_GUIDE.md           → Testing scenarios
DEMO_SETUP.md           → Demo walkthrough
DEMO_SUMMARY.txt        → Quick reference
PROJECT_OVERVIEW.md     → Architecture details
```

---

## ⚡ 5-Minute Quick Start

### Step 1: Install Prerequisites (if not already done)

```bash
# Python 3.10+
python3 --version

# Node.js 18+
node --version

# Ollama
# Download from: https://ollama.ai/download
# Then install and run:
ollama serve
```

### Step 2: Start Ollama (Terminal 1)
```bash
ollama serve
```

If you haven't pulled a model yet:
```bash
ollama pull qwen2.5:7b
```

### Step 3: Start Backend (Terminal 2)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

**Backend runs at:** http://localhost:8000

### Step 4: Start Frontend (Terminal 3)
```bash
cd frontend
npm install
npm run dev
```

**Frontend runs at:** http://localhost:5173

### Step 5: Test It
1. Open http://localhost:5173 in browser
2. Click "Télécharger" (Upload)
3. Upload `demo-documents/sample-contract-1.md`
4. Go to Documents
5. Click "Chat"
6. Ask: "Quel est le coût?" 
7. **See the answer with source citation!**

---

## 📚 Documentation Overview

**Choose what you need:**

| Need | Read |
|------|------|
| 5-min setup | **QUICKSTART.md** |
| Full installation | **SETUP.md** |
| VS Code setup | **VSCODE_GUIDE.md** |
| How to demo | **DEMO_SETUP.md** |
| Test scenarios | **DEMO_GUIDE.md** |
| Architecture | **PROJECT_OVERVIEW.md** |
| LLM credentials | This file (below) |

---

## 🤖 LLM Setup: Choose One Option

### Option A: LOCAL (Recommended) ✅ FREE
**Ollama + Open Models**

**Best for:**
- Portfolio projects
- Privacy (all data local)
- No API costs
- Works offline

**Setup:**
```bash
# 1. Download Ollama
# Visit: https://ollama.ai/download

# 2. Start Ollama
ollama serve

# 3. Pull a model
ollama pull qwen2.5:7b
```

**Configuration in backend/.env:**
```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
```

**Cost:** FREE ✅

---

### Option B: OpenAI API
**GPT-3.5-turbo or GPT-4**

**Best for:**
- Better quality
- Enterprise features
- Professional use

**Get Credentials:**
1. Go to: https://platform.openai.com/signup
2. Create account (get $5 free credits)
3. Get API key: https://platform.openai.com/api-keys
4. Copy key that looks like: `sk-...`

**Add to backend/.env:**
```bash
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-3.5-turbo
```

**Cost:** ~$0.15-$0.50 per 1000 requests (small projects = ~$1-5/month)

---

### Option C: Google AI (Gemini) 
**FREE tier available**

**Get Credentials:**
1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Select your project
4. Copy the key

**Add to backend/.env:**
```bash
LLM_PROVIDER=google
GOOGLE_API_KEY=your-key-here
GOOGLE_MODEL=gemini-pro
```

**Cost:** FREE tier (generous), then ~$0.025 per 1000 requests

---

### Option D: Claude API (Anthropic)
**High quality, good free tier**

**Get Credentials:**
1. Go to: https://console.anthropic.com/
2. Create account
3. Get API key
4. Copy key that looks like: `sk-ant-...`

**Add to backend/.env:**
```bash
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your-key
ANTHROPIC_MODEL=claude-3-haiku
```

**Cost:** ~$0.25 per 1000 requests (very cheap for small projects)

---

### Option E: Mistral API
**Fast, open-source aligned**

**Get Credentials:**
1. Go to: https://console.mistral.ai/
2. Create account
3. Get API key

**Add to backend/.env:**
```bash
LLM_PROVIDER=mistral
MISTRAL_API_KEY=your-key
MISTRAL_MODEL=mistral-small
```

**Cost:** ~$0.15 per 1000 requests

---

## 🎯 Where to Put Credentials

**Location:** `backend/.env`

```bash
# Example for Ollama (LOCAL - NO CREDENTIALS NEEDED)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b

# Example for OpenAI
OPENAI_API_KEY=sk-your-actual-key-here

# Example for Google
GOOGLE_API_KEY=your-actual-key-here

# Shared settings
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
CHROMA_PERSIST_DIRECTORY=../data/vectordb
CHUNK_SIZE=500
TOP_K_RETRIEVAL=5
```

**⚠️ IMPORTANT:**
- `.env` is in `.gitignore` (won't be pushed to GitHub)
- Never commit `.env` to Git
- Keep credentials private
- Different key for different environments

---

## 📄 Demo Documents Location

All sample contracts are in:
```
demo-documents/
├── sample-contract-1.md     ← Development Services
├── sample-contract-2.md     ← Furniture Tender  
├── sample-contract-3.md     ← Maintenance SLA
└── README.md                ← Details about each
```

**Upload these to test the system!**

See `DEMO_SETUP.md` for detailed scenarios.

---

## 🎬 Demo Workflow (10 minutes)

```
1. Start all services (3 terminals)
   → Ollama, Backend, Frontend

2. Open http://localhost:5173
   → See homepage

3. Upload sample-contract-1.md
   → Go to Upload, select file, wait for success

4. Ask questions
   → Go to Documents > Chat
   → Ask: "Quel est le coût?"
   → See answer with source citation

5. Show multi-doc search
   → Upload all 3 contracts
   → Ask comparative question
   → Show aggregated results

6. Run analysis
   → Click "Analyser"
   → Show structured extraction
```

---

## 🐛 Troubleshooting

### "Can't connect to backend"
```bash
# Check if running
curl http://localhost:8000/health
# Should return: {"status": "healthy"}
```

### "Can't connect to Ollama"
```bash
# Check if running
curl http://localhost:11434/api/tags
# If error, start Ollama in new terminal
```

### "No answer to questions"
- Verify document uploaded
- Check backend logs: `backend/logs/app.log`
- Ensure Ollama model loaded: `ollama list`

### "Slow responses"
- First response loads model (~1 min)
- Subsequent responses are faster
- Check available RAM (needs 4-8GB for local models)

---

## 🎯 Key Features to Highlight

### 1. **Anti-Hallucination**
Every answer comes from the contract, never invented.

### 2. **Citations**
Users can verify by checking the exact source excerpt.

### 3. **Private**
All data stays on your machine with Ollama (no cloud upload).

### 4. **Free**
Use Ollama + open models = zero API costs.

### 5. **Multi-Document**
Search and compare across multiple contracts.

### 6. **Structured Output**
Extracts dates, costs, obligations automatically.

---

## 📊 System Architecture

```
User Browser
    ↓ HTTP
    ↓
Frontend (React/Vite)
    ↓ API Calls
    ↓
Backend (FastAPI)
    ├→ Parser (PDF/DOCX)
    ├→ Chunker (Semantic splitting)
    ├→ Embeddings (sentence-transformers)
    ├→ Vector DB (ChromaDB)
    ├→ Retrieval (Similarity search)
    └→ LLM (Ollama or API)
```

---

## ✅ Next Steps

**Choose your path:**

1. **Just Want to Try It?**
   → Follow "5-Minute Quick Start" above
   → Use Ollama (local, free)

2. **Want to Deploy?**
   → Read `SETUP.md` (detailed setup)
   → Use Docker Compose (optional)
   → Deploy to cloud (guide in docs)

3. **Want to Demo It?**
   → Read `DEMO_SETUP.md`
   → Follow demo workflow
   → Use sample contracts

4. **Want to Build On It?**
   → Read `PROJECT_OVERVIEW.md`
   → Understand architecture
   → Modify code as needed

5. **Have Questions?**
   → Check `README.md` (FAQ section)
   → Check VSCODE_GUIDE.md (IDE help)
   → Review code comments

---

## 📞 Support

**Quick answers:**
- `README.md` - Main documentation
- `SETUP.md` - Installation help
- `VSCODE_GUIDE.md` - IDE setup
- `DEMO_GUIDE.md` - Testing help
- `DEMO_SUMMARY.txt` - Quick reference

**Code references:**
- `PROJECT_OVERVIEW.md` - Architecture
- Check `backend/app/` structure
- Check `frontend/src/` structure

---

## 🎉 You're Ready!

Everything is set up. Just:

1. **Choose your LLM** (Ollama recommended for start)
2. **Start the services** (3 terminals)
3. **Open the app** (http://localhost:5173)
4. **Upload a contract** (from demo-documents/)
5. **Ask questions** (in French!)

**Enjoy! 🚀**

---

**Questions? Check the docs or reach out!**

Built with ❤️ for contract analysis
