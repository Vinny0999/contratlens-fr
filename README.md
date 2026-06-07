# ContratLens FR 🇫🇷

A French contract analysis assistant using RAG (Retrieval Augmented Generation) with open-source LLMs. Upload contracts or tender documents, ask questions, and get grounded answers with source citations.

## 🎯 Features

- **Document Upload**: Support for PDF and DOCX contract documents
- **Semantic Search**: RAG-based question answering with source citations
- **Contract Analysis**: Structured extraction of deliverables, deadlines, risks, and requirements
- **Grounded Answers**: Anti-hallucination design with context retrieval and citation tracking
- **Multi-Document KB**: Search across your entire contract knowledge base
- **Free & Local**: Uses Ollama for local LLM inference (no API costs)

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React + Vite | Fast, modern UI |
| Backend | FastAPI | Async Python API server |
| LLM Runtime | Ollama | Local open-weight models |
| Main Model | Qwen2.5 / Mistral / Llama | Free, open-source |
| Embeddings | sentence-transformers | Local embeddings |
| Vector DB | ChromaDB | Simple, embedded vector store |
| Parser | PyMuPDF, python-docx | Document text extraction |

### System Flow

1. Upload document (PDF/DOCX)
2. Extract and clean text
3. Chunk by clause/section
4. Create embeddings and index
5. Retrieve relevant chunks on questions
6. Generate grounded answers with LLM
7. Return answer + source citations

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- Ollama ([install guide](https://ollama.ai/download))

### 1. Install Ollama and Pull a Model

```bash
# Install Ollama (macOS)
brew install ollama

# Start Ollama service
ollama serve

# Pull a model (in another terminal)
ollama pull qwen2.5:7b
# OR
ollama pull mistral:7b
```

### 2. Backend Setup

```bash
# Create virtual environment
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the API server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000
API docs at: http://localhost:8000/docs

### 3. Frontend Setup

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:5173

### 4. Using Docker Compose (Alternative)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 Project Structure

```
contratlens-fr/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable UI components
│   │   ├── features/     # Feature modules
│   │   └── lib/          # Utilities
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── services/     # Business logic
│   │   ├── models/       # Data models
│   │   └── core/         # Config & utilities
│   └── tests/            # Backend tests
├── data/                 # Data storage
│   ├── raw/             # Uploaded documents
│   ├── processed/       # Processed chunks
│   └── vectordb/        # Chroma vector database
├── scripts/             # Utility scripts
└── docs/                # Documentation
```

## 🔧 Configuration

Create a `.env` file in the backend directory:

```bash
# LLM Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b

# Embedding Model
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# Vector DB
CHROMA_PERSIST_DIRECTORY=../data/vectordb

# Upload Settings
MAX_UPLOAD_SIZE_MB=50
ALLOWED_EXTENSIONS=pdf,docx

# RAG Settings
CHUNK_SIZE=500
CHUNK_OVERLAP=50
TOP_K_RETRIEVAL=5
MIN_RELEVANCE_SCORE=0.5
```

## 📚 API Endpoints

### Documents
- `POST /documents/upload` - Upload a document
- `POST /documents/{id}/index` - Parse and index document
- `GET /documents` - List all documents
- `GET /documents/{id}` - Get document details

### Analysis
- `POST /analysis/{id}` - Run structured contract analysis
- `GET /analysis/{id}` - Get analysis results

### Chat
- `POST /chat/{doc_id}` - Ask questions about a specific document
- `POST /chat/kb` - Ask questions across all documents
- `GET /citations/{answer_id}` - Get supporting chunks

### Feedback
- `POST /feedback` - Submit answer feedback

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 🎯 Usage Example

1. **Upload a Contract**
   - Navigate to the upload page
   - Select a PDF or DOCX contract
   - Wait for indexing to complete

2. **Ask Questions**
   ```
   "Quelles sont les pénalités de retard?"
   "Quels documents obligatoires doivent être fournis?"
   "Quelle est la date limite de livraison?"
   ```

3. **View Analysis**
   - Click "Analyze Contract"
   - Review structured extraction of:
     - Deliverables
     - Deadlines
     - Mandatory documents
     - Risk clauses
     - Insurance requirements

## 🔒 Anti-Hallucination Design

- Answers only from retrieved context
- Minimum relevance threshold
- Source citations with every answer
- Clear distinction between facts and interpretations
- Refusal to answer unsupported questions

## 🚧 Roadmap

- [ ] Multi-document comparison
- [ ] Export analysis to PDF
- [ ] Advanced reranking with cross-encoders
- [ ] Custom legal ontology
- [ ] French legal knowledge base integration
- [ ] User authentication
- [ ] Collaborative annotations

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## 📧 Contact

For questions or feedback, open an issue on GitHub.
