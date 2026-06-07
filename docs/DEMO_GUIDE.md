# 🎯 Demo Guide - ContratLens FR

## Sample Documents Location

All demo documents are in: **`demo-documents/`**

```
demo-documents/
├── sample-contract-1.md    ← Services IT (Development)
├── sample-contract-2.md    ← Public Procurement (Furniture)
└── sample-contract-3.md    ← Maintenance Agreement
```

---

## 📄 What Each Contract Contains

### **Contract 1: Development Services** 
**File:** `sample-contract-1.md`
- Service provider engagement
- 18-month project duration
- 85,000 € total cost
- Clear deliverables and deadlines
- Payment terms (30%-40%-30%)
- Penalty clauses for delays
- **Good for testing:** Q&A about costs, deadlines, deliverables

**Example Questions to Ask:**
- "Quels sont les pénalités de retard?" (What are the delay penalties?)
- "Quel est le coût total du projet?" (What is the total project cost?)
- "Quand est prévu le déploiement?" (When is deployment scheduled?)
- "Quels sont les livrables?" (What are the deliverables?)
- "Quelle est la durée du support?" (What is the support duration?)

---

### **Contract 2: Public Procurement**
**File:** `sample-contract-2.md`
- Tender for office furniture
- 150,000 € maximum budget
- 90-day delivery deadline
- Public sector requirements
- Evaluation criteria (price 40%, quality 25%, timing 15%)
- **Good for testing:** Budget analysis, requirements extraction

**Example Questions to Ask:**
- "Quel est le budget maximum?" (What is the maximum budget?)
- "Quand doit être livrée la commande?" (When should the order be delivered?)
- "Quels sont les critères d'évaluation?" (What are the evaluation criteria?)
- "Combien de chaises sont commandées?" (How many chairs are ordered?)
- "Quel est le délai de paiement?" (What is the payment deadline?)

---

### **Contract 3: Maintenance Agreement**
**File:** `sample-contract-3.md`
- Annual support & maintenance contract
- SLA (Service Level Agreement) details
- Different support levels (Standard/Premium)
- 99% availability commitment
- Escalation procedures
- **Good for testing:** Service level analysis, SLA compliance

**Example Questions to Ask:**
- "Quel est le temps de réponse pour les incidents critiques?" (Response time for critical issues?)
- "Quels sont les niveaux de support disponibles?" (What support levels are available?)
- "Quelle est la cible de disponibilité?" (What is the availability target?)
- "Quels systèmes d'exploitation sont supportés?" (What OS are supported?)
- "Qu'est-ce qui est inclus dans la maintenance?" (What's included in maintenance?)

---

## 🚀 How to Test with Demo Documents

### Step 1: Convert to PDF (Optional)

The demo documents are currently in Markdown format. You can:

**Option A: Keep as Markdown**
- Just upload the `.md` files to the system
- The parser will handle them

**Option B: Convert to PDF** (preferred for demo)
Use an online converter like:
- https://markdown2pdf.com/
- https://pandoc.org/ (command line)
- VS Code extension: "Markdown PDF"

```bash
# Using pandoc (if installed)
pandoc demo-documents/sample-contract-1.md -o demo-documents/contract-1.pdf
pandoc demo-documents/sample-contract-2.md -o demo-documents/contract-2.pdf
pandoc demo-documents/sample-contract-3.md -o demo-documents/contract-3.pdf
```

### Step 2: Start the Application

```bash
# Terminal 1: Ollama
ollama serve

# Terminal 2: Backend
cd backend && source venv/bin/activate
uvicorn app.main:app --reload

# Terminal 3: Frontend
cd frontend && npm run dev
```

### Step 3: Upload Documents

1. Go to http://localhost:5173
2. Click "Télécharger un document"
3. Upload each contract one by one
4. Wait for indexing to complete

### Step 4: Test Features

#### **Chat (Q&A)**
1. Go to "Documents"
2. Click "Chat" on a contract
3. Ask questions in French:
   - "Quels sont les délais?" (What are the deadlines?)
   - "Combien ça coûte?" (How much does it cost?)
   - "Quelles sont les obligations?" (What are the obligations?)

#### **Analysis**
1. Click "Analyser" on a contract
2. View structured extraction of:
   - Summary
   - Contract type
   - Scope of work
   - Deliverables
   - Risks
   - Requirements

#### **Knowledge Base Search**
1. Ask questions across ALL documents
2. Compare contracts
3. Search for common clauses

---

## 💡 Demo Scenarios

### Scenario 1: Cost Analysis
**Goal:** Find and compare costs across contracts

**Steps:**
1. Upload all 3 contracts
2. Ask: "Quel est le coût total de chaque contrat?" 
3. System returns costs from each document with sources
4. Compare: 85k vs 150k vs monthly fees

**Expected Output:**
- Contract 1: 85,000 € HT
- Contract 2: Up to 150,000 € HT (budget max)
- Contract 3: Monthly maintenance costs

---

### Scenario 2: Deadline Tracking
**Goal:** Extract all important dates

**Questions:**
- "Quels sont les jalons du projet?"
- "Quand doit être livrée l'installation?"
- "Quels sont les délais de paiement?"

**Expected:** System finds all deadlines with page references

---

### Scenario 3: Penalty Analysis
**Goal:** Identify financial risks

**Questions:**
- "Quelles sont les pénalités?"
- "Quels sont les risques financiers?"
- "Que se passe-t-il en cas de retard?"

**Expected:** All penalty clauses extracted and cited

---

### Scenario 4: Requirements Comparison
**Goal:** Compare obligations across contracts

**Ask:**
- "Quelles sont les obligations du prestataire?"
- "Quelles sont les garanties?"
- "Qu'est-ce que le client doit fournir?"

**Expected:** Obligations extracted and compared across documents

---

## 📊 Sample Q&A Dialogue

```
User: "Quels sont les pénalités de retard dans le premier contrat?"

Expected Answer:
"Selon l'Article 8 du contrat de services informatiques:
- Semaines 1-2: 500 € par semaine
- Semaines 3-4: 750 € par semaine
- Au-delà: 1 000 € par semaine

Le montant total ne peut pas excéder 10% du contrat (8 500 €).

Source: Contrat 1, Article 8, pages 4-5"

---

User: "Quels systèmes d'exploitation sont supportés?"

Expected Answer:
"Le contrat de maintenance (Contrat 3) supporte:
- Windows 10/11 Enterprise
- Windows Server 2019/2022
- Linux Ubuntu 20.04/22.04
- macOS 12+

Source: Contrat 3, Section 4.1, page 3"

---

User: "Combien de temps pour recevoir les meubles?"

Expected Answer:
"Selon le marché public (Contrat 2):
- Délai maximum de livraison: 90 jours après notification
- Installation: 15 jours supplémentaires
- Formation: dans les 7 jours après installation

Total: jusqu'à 112 jours du début du marché.

Source: Contrat 2, Section 1.3 et Calendrier, pages 2-3"
```

---

## 🎬 Features to Demonstrate

### 1. **Semantic Search**
- Upload contracts
- Ask natural language questions
- See relevant sections retrieved
- View confidence scores

### 2. **Citation Tracking**
- Every answer includes source reference
- Shows exact excerpt from contract
- Links to section and page number
- Enables verification

### 3. **Multi-Document Search**
- Ask questions across ALL contracts
- System retrieves from relevant documents
- Compare information across contracts

### 4. **Structured Analysis**
- Click "Analyze" button
- System extracts:
  - Contract type
  - Deliverables
  - Deadlines
  - Costs
  - Risks
  - Requirements

### 5. **Anti-Hallucination**
- System refuses to answer questions without source evidence
- Example: "Quels sont les droits du consommateur?" 
- Expected: "Je ne trouve pas d'information sur les droits du consommateur dans ce contrat"

---

## 📋 Testing Checklist

- [ ] Upload Contract 1 successfully
- [ ] Upload Contract 2 successfully
- [ ] Upload Contract 3 successfully
- [ ] Ask cost question and get correct answer
- [ ] Ask deadline question and get dates
- [ ] Ask about penalties and get numbers
- [ ] Request analysis and see structured output
- [ ] Search across multiple documents
- [ ] Verify all answers have citations
- [ ] Test refusing unsupported questions

---

## 🐛 Troubleshooting Demo Issues

### Issue: Documents won't upload
**Solution:**
- Check file format (PDF or DOCX preferred)
- Verify file size < 50 MB
- Check backend is running (`http://localhost:8000/health`)

### Issue: Chat returns no answer
**Solution:**
- Verify document was indexed (check backend logs)
- Make sure Ollama is running (`ollama list`)
- Check ChromaDB has embeddings stored

### Issue: Wrong answers
**Solution:**
- Check question is specific enough
- Try asking in French
- Verify document contains the information
- Check backend logs for errors

### Issue: Slow responses
**Solution:**
- First response is slower (model loading)
- Subsequent responses are faster
- Check available RAM (embeddings take memory)
- Reduce chunk retrieval count if needed

---

## 💾 Creating Your Own Demo Contracts

Want to add more contracts? Template:

```markdown
# [CONTRACT TITLE]

**Between:**
- Party A
- Party B

---

## 1. SUBJECT

Description of what this contract is about

---

## 2. DURATION

Start and end dates, renewal terms

---

## 3. PRICE

Total cost and payment conditions

---

## 4. DELIVERABLES

What will be delivered, when

---

## 5. OBLIGATIONS

What each party must do

---

## 6. PENALTIES

What happens if someone fails

---

## 7. TERMINATION

How to exit the contract

---

## 8. APPLICABLE LAW

Which law applies
```

---

## 📞 Demo Tips

1. **Start with simple questions** - "Quel est le coût?" before complex ones
2. **Use French** - Better performance with French contracts
3. **Ask specific** - "Quels sont les délais de livraison?" vs vague questions
4. **Show citations** - Highlight the source passages to build trust
5. **Compare documents** - Show multi-document search capability

---

## 🎯 Key Demo Talking Points

1. **Anti-Hallucination:** Every answer is grounded in the contract text
2. **Citations:** Users can verify every claim by checking the source
3. **Local Processing:** All data stays on your machine (no cloud uploads)
4. **Open Source:** Using free/open models, no API costs
5. **Multilingual:** Works with contracts in French, English, etc.
6. **Structured Output:** Not just text - extracts structured data too

---

**Happy demoing! 🚀**

For questions, check the main README.md or SETUP.md
