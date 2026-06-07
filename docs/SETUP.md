# Setup Guide - ContratLens FR

Complete setup instructions for the French Contract Analysis RAG project.

## Prerequisites

Before starting, ensure you have:

- **Python 3.10+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Ollama** - [Installation Guide](https://ollama.ai/download)
- **Git** - [Download](https://git-scm.com/downloads)

## Step 1: Install Ollama

### macOS
```bash
brew install ollama
```

### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows
Download from [ollama.ai/download](https://ollama.ai/download)

## Step 2: Start Ollama and Pull a Model

```bash
# Start Ollama service (in a separate terminal)
ollama serve

# In another terminal, pull a model
ollama pull qwen2.5:7b

# Alternative models:
# ollama pull mistral:7b
# ollama pull llama3.1:8b
```

## Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env if needed (optional)
# nano .env

# Run the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**
API docs at: **http://localhost:8000/docs**

## Step 4: Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

## Step 5: Verify Installation

1. Open browser to `http://localhost:5173`
2. You should see the ContratLens FR homepage
3. Try uploading a PDF contract
4. Backend API docs available at `http://localhost:8000/docs`

## Using Docker (Alternative)

If you prefer Docker:

```bash
# Make sure Docker is installed and running

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Testing the Setup

### 1. Test Backend API

```bash
curl http://localhost:8000/health
```

Should return: `{"status": "healthy"}`

### 2. Test Ollama Connection

```bash
curl http://localhost:11434/api/tags
```

Should list your installed models.

### 3. Upload a Test Document

- Go to http://localhost:5173/upload
- Upload a PDF or DOCX file
- Check if upload succeeds

## Common Issues

### Ollama Not Running

**Error:** `Connection refused to localhost:11434`

**Solution:**
```bash
# Start Ollama in a separate terminal
ollama serve
```

### Port Already in Use

**Error:** `Address already in use: 8000`

**Solution:**
```bash
# Change port in backend/.env
PORT=8001

# Or kill the process using the port
lsof -ti:8000 | xargs kill -9
```

### Python Dependencies Failed

**Error:** Issues installing PyMuPDF or other packages

**Solution:**
```bash
# Install system dependencies (macOS)
brew install python-tk

# Install system dependencies (Ubuntu/Debian)
sudo apt-get install python3-tk python3-dev

# Retry pip install
pip install -r requirements.txt
```

### Node Modules Issues

**Error:** Module not found errors

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
contratlens-fr/
├── backend/           # FastAPI backend
│   ├── app/
│   │   ├── api/      # API endpoints
│   │   ├── services/ # Business logic
│   │   ├── models/   # Data models
│   │   └── core/     # Config
│   ├── requirements.txt
│   └── .env
├── frontend/         # React frontend
│   ├── src/
│   │   ├── pages/    # Page components
│   │   └── components/
│   └── package.json
├── data/            # Data storage
│   ├── raw/         # Uploaded files
│   └── vectordb/    # Chroma DB
└── docker-compose.yml
```

## Next Steps

1. **Upload a Contract**: Go to `/upload` and upload a PDF/DOCX
2. **Index the Document**: The system will parse and chunk it
3. **Ask Questions**: Navigate to the chat page for Q&A
4. **Run Analysis**: Get structured contract analysis

## Development Tips

### Hot Reload

Both backend and frontend support hot reload:
- **Backend**: Changes auto-reload with `--reload` flag
- **Frontend**: Vite provides instant HMR

### API Documentation

FastAPI provides automatic API docs:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### VS Code Extensions

Recommended extensions:
- Python
- Pylance
- ESLint
- Prettier
- Thunder Client (for API testing)

## Troubleshooting

### Check Ollama Models

```bash
ollama list
```

### Check Python Version

```bash
python --version  # Should be 3.10+
```

### Check Node Version

```bash
node --version  # Should be 18+
```

### View Backend Logs

```bash
cd backend
tail -f logs/app.log
```

## Support

For issues:
1. Check this SETUP.md guide
2. Review logs in `backend/logs/`
3. Check browser console for frontend errors
4. Ensure Ollama is running: `ollama list`

## Ready to Use!

You're all set! Start by uploading your first contract and exploring the features.
