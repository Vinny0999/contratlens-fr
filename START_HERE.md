# 🚀 Start Here - ContratLens FR

## Welcome!

This is a **clean, production-ready** French contract analysis application using RAG (Retrieval Augmented Generation).

---

## 🎯 What Was Fixed

1. ✅ **Removed hardcoded Ollama** - Now supports Google AI, OpenAI, Anthropic, or Ollama
2. ✅ **Added configuration validation** - Check setup before starting
3. ✅ **Improved error handling** - Clear messages when things go wrong
4. ✅ **Cleaned up project** - Removed 23 unnecessary files
5. ✅ **Added diagnostic tools** - Easy troubleshooting

---

## ⚡ Quick Start (3 Steps)

### Step 1: Check Configuration (30 seconds)

```bash
cd backend
python3 check_config.py
```

**This will tell you exactly what's needed!**

### Step 2: Start Backend (Terminal 1)

```bash
cd backend
uvicorn app.main:app --reload
```

### Step 3: Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

**Open http://localhost:5173** 🎉

---

## 🔧 Choose Your LLM Provider

### Option A: Google AI (Recommended - Free)

1. Get API key: https://aistudio.google.com/app/apikey
2. Edit `backend/.env`:
   ```bash
   LLM_PROVIDER=google
   GOOGLE_API_KEY=your-key-here
   ```
3. Install: `pip install google-generativeai`

### Option B: Ollama (Local, Free)

1. Install: `brew install ollama`
2. Start: `ollama serve`
3. Download model: `ollama pull qwen2.5:7b`
4. Edit `backend/.env`:
   ```bash
   LLM_PROVIDER=ollama
   ```

### Option C: OpenAI (Paid)

1. Get API key: https://platform.openai.com/api-keys
2. Edit `backend/.env`:
   ```bash
   LLM_PROVIDER=openai
   OPENAI_API_KEY=sk-your-key
   ```
3. Install: `pip install openai`

---

## 📁 Project Structure

```
contratlens-fr-1/
├── backend/
│   ├── app/               # API code
│   ├── .env              # ⚙️ Configuration
│   ├── check_config.py   # 🔍 Validator
│   └── requirements.txt  # 📦 Dependencies
│
├── frontend/
│   ├── src/              # React app
│   └── package.json      # 📦 Dependencies
│
├── docs/
│   ├── QUICKFIX.md       # 📘 Troubleshooting
│   └── PROJECT_OVERVIEW.md  # 📖 Architecture
│
└── README.md             # 📄 Full documentation
```

---

## 🧪 Test It Works

### Test 1: Backend Health

```bash
curl http://localhost:8000/health
```

Should return: `{"status": "healthy"}`

### Test 2: Upload Document

1. Go to http://localhost:5173
2. Click "Télécharger"
3. Select a PDF/DOCX
4. Click upload button
5. Should see success message ✅

### Test 3: Index & Analyze

1. Go to "Documents" page
2. Click "Indexer" button
3. Wait for "indexed" status
4. Click "Analyser"
5. Should see contract analysis ✅

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **START_HERE.md** (this file) | Quick start guide |
| **README.md** | Full documentation |
| **docs/QUICKFIX.md** | Troubleshooting reference |
| **docs/PROJECT_OVERVIEW.md** | Architecture details |

---

## 🆘 Troubleshooting

### Backend Won't Start

```bash
cd backend
pip install -r requirements.txt
python3 check_config.py
```

### Upload Not Working

1. Check backend is running: `curl http://localhost:8000/health`
2. Check browser console (F12) for errors
3. Verify backend logs in terminal

### Analysis Fails

```bash
cd backend
python3 check_config.py
```

This will show exactly what's wrong with LLM configuration.

---

## ✅ Verification Checklist

- [ ] `python3 backend/check_config.py` passes all checks
- [ ] Backend starts: `uvicorn app.main:app --reload`
- [ ] Frontend starts: `npm run dev`
- [ ] Can open http://localhost:5173
- [ ] Can upload a document
- [ ] Can index a document
- [ ] Can analyze a document

---

## 🎯 Next Steps

1. **Read docs/QUICKFIX.md** for detailed setup options
2. **Try the demo documents** in `demo-documents/` folder
3. **Explore the API** at http://localhost:8000/docs
4. **Check PROJECT_OVERVIEW.md** to understand architecture

---

## 💡 Pro Tips

- Run `python3 backend/check_config.py` before starting
- Use Google AI (free) for quick testing
- Use Ollama for full privacy (local only)
- Check backend terminal for detailed error logs
- Frontend console (F12) shows upload errors

---

## 🎉 You're Ready!

**Your project is clean, fixed, and ready to use.**

Start with: `python3 backend/check_config.py` 

Then follow its instructions!
