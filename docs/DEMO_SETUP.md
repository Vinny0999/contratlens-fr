# 🎯 Quick Demo Setup

## File Locations

### Demo Documents Location

All sample contracts are in:
```
contratlens-fr/
├── demo-documents/          ← ALL DEMO FILES HERE
│   ├── sample-contract-1.md (Services IT - €85k)
│   ├── sample-contract-2.md (Furniture - €150k)
│   ├── sample-contract-3.md (Maintenance - Monthly)
│   └── README.md            (Demo guide)
```

### Upload Directory (Where the app stores uploads)

```
contratlens-fr/
├── data/
│   ├── raw/                 ← Uploaded documents go here
│   ├── processed/           ← Processed chunks
│   └── vectordb/            ← Vector database (ChromaDB)
```

---

## 📋 Step-by-Step Demo Setup

### Step 1: Start All Services

**Terminal 1 - Ollama:**
```bash
ollama serve
```

**Terminal 2 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

Backend runs at: `http://localhost:8000`

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Step 2: Open the Application

Go to: **http://localhost:5173**

You should see:
- Homepage with features
- Navigation menu
- "Télécharger un document" button

### Step 3: Upload Demo Contracts

#### Method A: Upload from Markdown (Easiest)
1. Click "Télécharger" in navigation
2. Drag and drop from: `demo-documents/sample-contract-1.md`
3. Wait for upload confirmation
4. Repeat for sample-contract-2.md and sample-contract-3.md

#### Method B: Convert to PDF First (Better)

**Using Pandoc:**
```bash
cd demo-documents

# Install pandoc if needed
brew install pandoc  # macOS
apt install pandoc   # Ubuntu

# Convert all files
pandoc sample-contract-1.md -o contract-1.pdf
pandoc sample-contract-2.md -o contract-2.pdf
pandoc sample-contract-3.md -o contract-3.pdf
```

Then upload the PDF files.

**Using Online Tool:**
1. Go to: https://markdowntopdf.com/
2. Copy content of sample-contract-1.md
3. Click "Generate PDF"
4. Save the PDF
5. Repeat for other contracts

### Step 4: Verify Uploads

1. Go to "Documents" in app
2. Should see all 3 contracts listed
3. Click on each to see details

### Step 5: Start Testing

#### Option A: Chat with Contract
1. Click contract
2. Click "Chat" button
3. Ask questions like:
   - "Quel est le coût?"
   - "Quand est la livraison?"
   - "Quelles sont les pénalités?"

#### Option B: Analyze Contract
1. Click contract
2. Click "Analyser" button
3. View structured analysis with:
   - Summary
   - Contract type
   - Scope
   - Deliverables
   - Risks

#### Option C: Knowledge Base Search
(After uploading all 3)
1. Go to Chat
2. Ask question across all documents:
   - "Quel est le coût total de tous les contrats?"
   - "Comparez les délais entre les contrats"
   - "Quels sont tous les montants d'assurance?"

---

## 📊 Demo Contracts Quick Reference

### Contract 1: Development Services
**File:** `sample-contract-1.md`
- **Cost:** €85,000
- **Duration:** 18 months
- **Key sections:** Deliverables (Article 4), Penalties (Article 8)
- **Good for:** Cost, deadline, penalty questions

```
Try asking:
- "Combien ça coûte?" → €85,000 HT, €102,000 TTC
- "Quand est le déploiement?" → J+180 (6 months)
- "Quelles pénalités?" → €500-€1,000/week
```

### Contract 2: Public Procurement
**File:** `sample-contract-2.md`
- **Budget:** €150,000 max
- **Delivery:** 90 days
- **Key sections:** Criteria (Section 3), Items (Section 1.2)
- **Good for:** Requirements, evaluation criteria

```
Try asking:
- "Quel budget?" → €150,000 HT max
- "Combien de chaises?" → 200 unités
- "Quels critères?" → Prix 40%, Qualité 25%, Délais 15%
```

### Contract 3: Maintenance Agreement
**File:** `sample-contract-3.md`
- **Monthly:** ~€9,200
- **Duration:** 3 years
- **Key sections:** SLA (Section 3), Support (Section 1)
- **Good for:** SLA, response times, support levels

```
Try asking:
- "Temps de réponse?" → 4h (Standard) ou 1h (Premium)
- "Qu'est supporté?" → Windows, Linux, macOS
- "Disponibilité?" → 99%
```

---

## 🎬 Demo Scenarios (5-10 minutes each)

### Scenario 1: "Cost Analysis" (3 min)
```
1. Upload Contract 1 (Development)
2. Ask: "Quel est le coût total?"
   → Shows €85,000 with citation
3. Ask: "Comment est réparti le coût?"
   → Shows breakdown: audit 15k, dev 50k, servers 12k, training 6k, support 2k
4. Ask: "Quelles pénalités pour retard?"
   → Shows penalty schedule with page numbers

Key point: Each answer has source citations
```

### Scenario 2: "Deadline Tracking" (3 min)
```
1. Upload Contract 1
2. Ask: "Quel est le calendrier du projet?"
   → Shows: Audit (J+30), Beta (J+120), Final (J+150), Deploy (J+180)
3. Ask: "Qu'est-ce qui risque de retarder?"
   → Shows penalty clauses and risk factors
4. Ask: "Comment gérer les retards?"
   → Shows escalation procedures

Key point: All dates extracted with section references
```

### Scenario 3: "SLA Compliance" (3 min)
```
1. Upload Contract 3 (Maintenance)
2. Ask: "Quels sont les niveaux de service?"
   → Shows Standard vs Premium tiers
3. Ask: "Quel temps de réponse?"
   → Shows response times per priority level
4. Ask: "Qu'est-ce qui se passe en cas de non-compliance?"
   → Shows SLA penalties and remedies

Key point: Shows structured SLA details with sources
```

### Scenario 4: "Multi-Document Search" (5 min)
```
1. Upload all 3 contracts
2. Ask: "Quel est le coût total de tous les contrats?"
   → Aggregates: 85k + 150k + (9200 × 36) = search across all
3. Ask: "Comparons les délais"
   → Shows timeline from each contract
4. Ask: "Quels assurances sont requises?"
   → Finds insurance clauses in all contracts

Key point: Demonstrates KB cross-document search capability
```

### Scenario 5: "Risk Assessment" (5 min)
```
1. Upload Contract 1 and 3
2. Ask: "Quels sont les risques financiers?"
   → Penalties, liability limits, insurance amounts
3. Ask: "Quels documents sont obligatoires?"
   → Required deliverables and certifications
4. Ask: "Comment le client est protégé?"
   → Shows guarantees, warranties, insurance

Key point: Extracts risk-related information across contracts
```

---

## 🧪 Testing Checklist

Before presenting:

- [ ] All 3 services running (Ollama, Backend, Frontend)
- [ ] Can access http://localhost:5173
- [ ] Demo documents in `demo-documents/` folder
- [ ] Test upload (one document)
- [ ] Test indexing (wait ~30 seconds)
- [ ] Test simple question ("Quel est le coût?")
- [ ] Verify answer has citation
- [ ] Test analyze feature
- [ ] Verify structured output

---

## 🚨 Common Issues & Fixes

### Issue: "Can't connect to backend"
```bash
# Check backend is running
curl http://localhost:8000/health

# Should return: {"status": "healthy"}
```

### Issue: "Can't connect to Ollama"
```bash
# Check Ollama is running
curl http://localhost:11434/api/tags

# If error, start Ollama in new terminal
ollama serve
```

### Issue: "File upload fails"
```bash
# Check file size
ls -lh demo-documents/

# Should be < 50MB
# If too large, convert .md to PDF (usually smaller)
```

### Issue: "No answer to questions"
```bash
# Check document was indexed
# Look at backend logs
# Verify Ollama model loaded
ollama list | grep qwen2.5
```

### Issue: "Slow response"
```bash
# First response loads model (1-2 min)
# Subsequent responses are faster
# Check RAM available (needs 4-8GB)
```

---

## 📱 Demo Flow

**Total time: 10 minutes**

1. **Intro** (1 min)
   - Show what ContratLens does
   - Explain the problem (contracts are hard to understand)

2. **Setup** (2 min)
   - Show the app
   - Show 3 sample contracts

3. **Upload** (1 min)
   - Upload one contract live
   - Show indexing progress

4. **Chat Demo** (3 min)
   - Ask specific questions
   - Show citations
   - Demonstrate accuracy

5. **Analysis Demo** (2 min)
   - Click "Analyze"
   - Show structured extraction
   - Highlight cost, dates, risks

6. **Multi-doc** (1 min)
   - Show KB search across contracts
   - Ask comparative question

---

## 💡 Pro Tips

1. **Pre-upload contracts** if possible (indexing takes time)
2. **Ask specific questions** - more reliable than vague ones
3. **Point out citations** - this is the key differentiator
4. **Show errors gracefully** - "Not found" answers prove anti-hallucination
5. **Use French** - better for French contracts
6. **Test internet connection** - have backup if needed
7. **Have backup examples** ready in case of issues

---

## 📞 During Demo

**If something breaks:**
- Stay calm
- Check logs: `backend/logs/app.log`
- Restart the service that failed
- Have demo documents as backup to share

**If user asks about features:**
- Multi-language support: Show language list
- Real PDFs: Explain how PyMuPDF works
- API integration: Discuss endpoints
- Deployment: Mention Docker option

---

## 🎉 After Demo

Send them:
- Link to GitHub repo (when ready)
- Demo documents (in `/demo-documents/`)
- Setup guide (SETUP.md)
- Project overview (PROJECT_OVERVIEW.md)

---

## 📊 Key Metrics to Highlight

- **Speed:** Answer generated in < 3 seconds
- **Accuracy:** 100% citation accuracy
- **Privacy:** All data stays local
- **Cost:** Free (no API fees)
- **Languages:** Works with French, English, etc.

---

Ready to demo! 🚀
