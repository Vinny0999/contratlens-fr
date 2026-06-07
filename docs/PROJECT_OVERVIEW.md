# Project Overview - ContratLens FR

## What is ContratLens FR?

A **French contract analysis assistant** that uses **RAG (Retrieval Augmented Generation)** with open-source LLMs to help users understand and analyze contracts. Upload contracts, ask questions, and get grounded answers with source citations.

## Key Features

### 1. Document Processing
- **Upload**: PDF and DOCX support
- **Parsing**: Intelligent text extraction with structure preservation
- **Chunking**: Semantic chunking by sections, articles, and clauses
- **Embedding**: Local embeddings using sentence-transformers
- **Indexing**: Vector storage in ChromaDB

### 2. Question Answering (RAG)
- **Semantic Search**: Find relevant contract passages
- **Grounded Answers**: LLM generates answers only from retrieved context
- **Citations**: Every answer includes source references
- **Multi-document**: Search across your entire contract library

### 3. Structured Analysis
- **Contract Summary**: AI-generated overview
- **Contract Type**: Automatic classification
- **Deliverables**: Extracted obligations and outputs
- **Deadlines**: Identified time constraints
- **Risks**: Penalties, liabilities, and risk clauses
- **Requirements**: Mandatory documents and compliance needs

### 4. Anti-Hallucination Design
- Answers only from retrieved context
- Minimum relevance threshold
- Source citations required
- Refusal to answer unsupported questions

## Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **LLM**: Ollama (local inference)
- **Models**: Qwen2.5 / Mistral / Llama
- **Embeddings**: sentence-transformers
- **Vector DB**: ChromaDB
- **Parsing**: PyMuPDF, python-docx

### Frontend
- **Framework**: React + Vite
- **UI**: Custom components
- **Icons**: Lucide React
- **HTTP**: Axios

### Infrastructure
- **Local Development**: Ollama + FastAPI + Vite
- **Containerization**: Docker Compose
- **Storage**: Local filesystem + ChromaDB

## Architecture

```
┌─────────────┐
│   Browser   │
│  (React UI) │
└──────┬──────┘
       │ HTTP
       ▼
┌─────────────┐      ┌──────────┐
│  FastAPI    │◄────►│ ChromaDB │
│   Backend   │      │  Vector  │
└──────┬──────┘      │    DB    │
       │             └──────────┘
       ▼
┌─────────────┐
│   Ollama    │
│     LLM     │
└─────────────┘
```

### Request Flow

1. **Upload**: User uploads contract → Backend stores file
2. **Parse**: Extract text with structure → Generate chunks
3. **Embed**: Create vector embeddings → Index in ChromaDB
4. **Query**: User asks question → Generate query embedding
5. **Retrieve**: Search vector DB → Get top relevant chunks
6. **Generate**: Send chunks to LLM → Generate grounded answer
7. **Respond**: Return answer + citations → Display in UI

## File Structure

```
contratlens-fr/
├── backend/                    # Python FastAPI backend
│   ├── app/
│   │   ├── api/               # REST endpoints
│   │   │   ├── upload.py      # File upload
│   │   │   ├── documents.py   # Document management
│   │   │   ├── chat.py        # Q&A chat
│   │   │   └── analysis.py    # Contract analysis
│   │   ├── services/          # Business logic
│   │   │   ├── parser_service.py      # PDF/DOCX parsing
│   │   │   ├── chunk_service.py       # Text chunking
│   │   │   ├── embed_service.py       # Embeddings
│   │   │   ├── retrieval_service.py   # Vector search
│   │   │   ├── llm_service.py         # LLM interaction
│   │   │   └── qualification_service.py # Analysis
│   │   ├── models/            # Data models
│   │   │   ├── document.py
│   │   │   ├── chunk.py
│   │   │   ├── chat.py
│   │   │   └── analysis.py
│   │   ├── core/              # Core utilities
│   │   │   ├── config.py      # Settings
│   │   │   └── logging.py     # Logging setup
│   │   └── main.py            # App entry point
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example           # Environment template
│   └── Dockerfile
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx     # Main layout
│   │   ├── pages/
│   │   │   ├── HomePage.jsx   # Landing page
│   │   │   ├── UploadPage.jsx # Upload interface
│   │   │   ├── DocumentsPage.jsx # Document list
│   │   │   ├── ChatPage.jsx   # Q&A interface
│   │   │   └── AnalysisPage.jsx # Analysis view
│   │   ├── App.jsx            # App router
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── Dockerfile
│
├── data/                       # Data storage
│   ├── raw/                   # Uploaded documents
│   ├── processed/             # Processed chunks
│   └── vectordb/              # ChromaDB data
│
├── .vscode/                    # VS Code settings
│   ├── settings.json
│   ├── launch.json
│   ├── tasks.json
│   └── extensions.json
│
├── docs/                       # Documentation
├── docker-compose.yml          # Docker services
├── setup.sh                    # Automated setup
├── README.md                   # Main documentation
├── SETUP.md                    # Setup instructions
├── QUICKSTART.md               # Quick start guide
├── VSCODE_GUIDE.md             # VS Code guide
└── .gitignore
```

## API Endpoints

### Documents
- `POST /api/v1/documents/upload` - Upload document
- `POST /api/v1/documents/{id}/index` - Index document
- `GET /api/v1/documents` - List documents
- `GET /api/v1/documents/{id}` - Get document details

### Analysis
- `POST /api/v1/analysis/{id}` - Analyze contract
- `GET /api/v1/analysis/{id}` - Get analysis result

### Chat
- `POST /api/v1/chat/{document_id}` - Chat with document
- `POST /api/v1/chat/kb` - Chat with knowledge base
- `POST /api/v1/feedback` - Submit feedback

### Health
- `GET /` - API info
- `GET /health` - Health check

## Data Models

### Document
```python
{
  "id": "uuid",
  "filename": "contract.pdf",
  "doc_type": "contract",
  "status": "indexed",
  "upload_date": "2024-01-15T10:30:00",
  "num_pages": 25
}
```

### Chat Request
```python
{
  "question": "Quelles sont les pénalités?",
  "document_id": "uuid",
  "conversation_history": []
}
```

### Chat Response
```python
{
  "answer": "Les pénalités sont...",
  "citations": [
    {
      "document_id": "uuid",
      "page_number": 12,
      "section_title": "Article 8",
      "excerpt": "...",
      "relevance_score": 0.92
    }
  ],
  "confidence": 0.85,
  "answer_id": "uuid"
}
```

## Configuration

### Environment Variables (.env)
```bash
# LLM
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b

# Embeddings
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# Vector DB
CHROMA_PERSIST_DIRECTORY=../data/vectordb

# RAG
CHUNK_SIZE=500
CHUNK_OVERLAP=50
TOP_K_RETRIEVAL=5
MIN_RELEVANCE_SCORE=0.5

# Upload
MAX_UPLOAD_SIZE_MB=50
ALLOWED_EXTENSIONS=pdf,docx
```

## Development Workflow

### 1. Setup
```bash
./setup.sh  # Automated setup
```

### 2. Development
```bash
# Terminal 1: Backend
cd backend && source venv/bin/activate
uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Ollama
ollama serve
```

### 3. Testing
```bash
# Backend tests
cd backend && pytest

# Frontend tests
cd frontend && npm test
```

### 4. Docker
```bash
docker-compose up -d
```

## RAG Pipeline Details

### 1. Document Ingestion
- Accept PDF/DOCX upload
- Extract text with structure
- Store metadata (pages, sections)

### 2. Chunking Strategy
- Semantic chunking by clause/article
- Size-based fallback (500 tokens)
- Chunk overlap (50 tokens)
- Preserve section metadata

### 3. Embedding Generation
- Local sentence-transformers model
- 384-dimensional vectors (MiniLM)
- Batch processing for efficiency

### 4. Vector Storage
- ChromaDB persistent storage
- Metadata filtering by document
- Cosine similarity search

### 5. Retrieval
- Dense semantic search
- Top-K retrieval (default: 5)
- Minimum relevance threshold (0.5)
- Return chunks with scores

### 6. Answer Generation
- System prompt for contract analysis
- Context window from retrieved chunks
- Citation requirement enforcement
- Refuse to answer without evidence

## Prompting Strategy

### System Prompt (French)
```
Tu es un assistant expert en analyse de contrats français.

RÈGLES STRICTES:
1. Réponds UNIQUEMENT à partir du contexte fourni
2. Cite toujours la source
3. Si l'information n'est pas dans le contexte, dis-le
4. Ne fais pas d'inférences légales
5. Distingue faits et interprétations
```

### User Prompt Format
```
Contexte extrait du contrat:
[Source 1] Article 5 (Page 3):
{chunk_text}

[Source 2] Article 8 (Page 7):
{chunk_text}

Question: {user_question}

Réponds en citant les sources.
```

## Deployment Options

### Option 1: Local Development
- Ollama running locally
- FastAPI on localhost:8000
- React on localhost:5173

### Option 2: Docker Compose
- All services containerized
- Shared networks
- Volume persistence

### Option 3: Production (Future)
- Hosted LLM API
- Cloud vector database
- CDN for frontend

## Roadmap

### Phase 1: MVP (Current)
- ✅ Document upload
- ✅ RAG Q&A
- ✅ Basic analysis
- ✅ Local deployment

### Phase 2: Enhancement
- [ ] Reranking with cross-encoders
- [ ] Multi-document comparison
- [ ] Advanced analytics
- [ ] Export to PDF

### Phase 3: Production
- [ ] User authentication
- [ ] Cloud deployment
- [ ] Team collaboration
- [ ] API rate limiting

### Phase 4: Advanced
- [ ] Custom legal ontology
- [ ] French legal KB integration
- [ ] Contract templates
- [ ] Automated alerts

## Performance Metrics

### Response Time Goals
- Document upload: < 2s
- Indexing: < 30s per 20 pages
- Query response: < 3s
- Analysis: < 15s

### Quality Metrics
- Retrieval precision: > 80%
- Answer relevance: > 85%
- Citation accuracy: 100%

## Security Considerations

- Local processing (no data leaves server)
- Input validation on uploads
- File size limits
- Allowed extensions only
- No code execution in documents

## Contributing

See CONTRIBUTING.md for:
- Code style guidelines
- Testing requirements
- PR process

## License

MIT License - See LICENSE file

## Support

- Documentation: See README.md
- Setup issues: See SETUP.md
- VS Code help: See VSCODE_GUIDE.md
- Quick start: See QUICKSTART.md

---

Built with ❤️ for contract analysis
