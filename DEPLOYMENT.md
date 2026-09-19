# 🚀 Deployment Guide - ContratLens FR

## Architecture

ContratLens uses a **split deployment** architecture:
- **Frontend**: Deployed to Vercel (static site)
- **Backend**: Runs locally or on a server with Python support

## Why Split Deployment?

The backend requires:
- Python dependencies (PyPDF2, sentence-transformers, etc.)
- Large ML models (sentence transformers)
- ChromaDB vector database
- Local file storage
- LLM API keys

These requirements make it unsuitable for Vercel's serverless functions.

## 📱 Frontend Deployment (Vercel)

### Automatic Deployment
1. Push to GitHub main branch
2. Vercel automatically deploys the frontend
3. Frontend will be available at: `https://your-app.vercel.app`

### Manual Deployment
```bash
cd frontend
npm install
npm run build
vercel --prod
```

### Environment Variables
No environment variables needed for frontend deployment!

## 🖥️ Backend Deployment (Local/Server)

### Option 1: Local Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Option 2: Production Server
Deploy to a VPS/Cloud server that supports:
- Python 3.9+
- At least 2GB RAM (for ML models)
- Persistent storage

Recommended platforms:
- DigitalOcean Droplet
- AWS EC2
- Google Cloud Compute Engine
- Railway.app (supports Python)
- Render.com (supports Python)

## 🔧 Configuration

### Frontend (for production)
Update API endpoint in frontend code to point to your backend:
```javascript
// In frontend/src/pages/*.jsx
const API_URL = 'https://your-backend-url.com'
// Replace http://localhost:8000 with your backend URL
```

### Backend
1. Copy `.env.example` to `.env`
2. Add your API keys:
   ```bash
   LLM_PROVIDER=google  # or openai, anthropic, ollama
   GOOGLE_API_KEY=your-key-here
   ```

## 🌐 Full Production Setup

### 1. Deploy Backend to Server
```bash
# SSH into your server
ssh user@your-server.com

# Clone repo
git clone https://github.com/Vinny0999/contratlens-fr
cd contratlens-fr/backend

# Setup
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure .env with your API keys

# Run with PM2 or systemd for persistence
pm2 start "uvicorn app.main:app --host 0.0.0.0 --port 8000"
```

### 2. Update Frontend API URL
```bash
# In frontend/src/pages/ChatPage.jsx, DocumentsPage.jsx, etc.
# Replace: http://localhost:8000
# With: https://your-backend-domain.com
```

### 3. Deploy Frontend to Vercel
```bash
git add .
git commit -m "Update API URL for production"
git push origin main
```

Vercel will automatically deploy!

## 🔒 Security Notes

1. **Never commit API keys** - They're in `.env` which is gitignored
2. **Use HTTPS** - Ensure your backend has SSL certificate
3. **CORS Configuration** - Backend already configured for Vercel domain
4. **Rate Limiting** - Consider adding rate limiting to backend

## 📊 Monitoring

### Frontend (Vercel)
- View deployment logs in Vercel dashboard
- Analytics available in Vercel

### Backend
- Use PM2 for logs: `pm2 logs`
- Monitor server resources
- Set up error logging

## 🐛 Troubleshooting

### Frontend build fails
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Backend connection issues
- Check firewall allows port 8000
- Verify CORS settings in backend
- Ensure backend is running: `curl http://localhost:8000/health`

### API key issues
- Verify `.env` file has correct keys
- Test API keys individually
- Check API quota/billing

## ✅ Current Setup

- ✅ Frontend: Mobile responsive design
- ✅ Backend: Local development ready
- ✅ Version control: GitHub
- ⏳ Production: Frontend on Vercel (backend needs server)

## 📝 Next Steps

1. ✅ Mobile responsive frontend - DONE
2. 🔄 Deploy frontend to Vercel - IN PROGRESS
3. ⏳ Deploy backend to production server - TODO
4. ⏳ Update frontend with production API URL - TODO
5. ⏳ Setup domain (optional) - TODO
