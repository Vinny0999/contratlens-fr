# 🚀 ContratLens Quick Fix Guide

## What Was Fixed

### 🔴 Critical Bug: Hardcoded Ollama
**File:** `backend/app/services/qualification_service.py`
- **Before:** Always used Ollama regardless of config
- **After:** Uses configured LLM provider (Google, OpenAI, Anthropic, or Ollama)

### 🟡 Upload Error Handling
**File:** `frontend/src/pages/UploadPage.jsx`
- **Before:** Generic "Erreur lors du téléchargement"
- **After:** Specific errors (network, timeout, server errors)

### 🟢 Configuration Validation
**File:** `backend/app/services/llm_service.py`
- **Before:** No validation of API keys or service availability
- **After:** Validates keys, libraries, and service connectivity

---

## Before You Start

### 1. Check Configuration (5 seconds)
```bash
cd backend
python3 check_config.py
```

**Expected Output:**
```
✅ All checks passed! Backend is ready to start.
```

**If you see errors**, follow the suggestions in the output.

---

## Quick Start Guide

### Option A: With Google AI (Free, Recommended)

```bash
# 1. Get API key from: https://aistudio.google.com/app/apikey

# 2. Edit backend/.env
LLM_PROVIDER=google
GOOGLE_API_KEY=your-key-here

# 3. Install dependency
pip install google-generativeai

# 4. Verify
python3 backend/check_config.py

# 5. Start (2 terminals)
# Terminal 1:
cd backend && uvicorn app.main:app --reload

# Terminal 2:
cd frontend && npm run dev
```

### Option B: Without LLM (Upload Testing Only)

```bash
# Just start the servers - upload will work, analysis won't

# Terminal 1:
cd backend && uvicorn app.main:app --reload

# Terminal 2:
cd frontend && npm run dev
```

---

## Complete Workflow Test

1. **Upload**: http://localhost:5173 → Télécharger → Select file → Upload
   - ✅ Should see: "Document téléchargé avec succès!"

2. **Index**: Documents page → Click "Indexer" → Wait 10-30 seconds
   - ✅ Status changes: uploaded → processing → indexed

3. **Analyze**: Click "Analyser" button
   - ✅ Should show: Summary, contract type, scope, score

4. **Chat**: Click "Chat" button → Ask questions
   - ✅ Should get answers with citations

---

## Troubleshooting One-Liners

**Backend won't start:**
```bash
cd backend && pip install -r requirements.txt
```

**"Network Error" in frontend:**
```bash
curl http://localhost:8000/health  # Check if backend running
```

**Upload button does nothing:**
1. Open browser console (F12)
2. Look for errors
3. Check that backend is on port 8000

**Analysis fails:**
```bash
cd backend && python3 check_config.py  # Verify LLM config
```

---

## Files You Can Run

```bash
# Check backend configuration
python3 backend/check_config.py

# Test backend connectivity
./test-backend.sh

# Start backend
cd backend && uvicorn app.main:app --reload

# Start frontend
cd frontend && npm run dev
```

---

## Your Current Setup

Based on your `.env` file, you have:
- **Provider:** Currently needs to be configured
- **Embedding:** ✅ sentence-transformers (local, no key needed)
- **Vector DB:** ✅ ChromaDB (local, no key needed)

**To make it work, choose ONE:**
1. Google AI - Get free key from https://aistudio.google.com/app/apikey
2. OpenAI - Paid, requires credit card
3. Ollama - Free but needs installation and download (~4GB model)

---

## Quick Test (Without LLM)

Want to just test if the code works?

```bash
# Terminal 1 - Backend
cd backend
uvicorn app.main:app --reload

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Then try uploading a document
# Upload will work ✅
# Analysis will fail ❌ (no LLM configured)
```

This proves the code is working, just needs LLM configured.

---

## Summary

✅ **Fixed Issues:**
1. Analysis service no longer hardcoded to Ollama
2. Better error messages in UI
3. Configuration validation on startup
4. Added diagnostic tools

🎯 **Next Step:**
Run `python3 backend/check_config.py` and follow its instructions!
