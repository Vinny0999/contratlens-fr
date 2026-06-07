# Demo Documents for ContratLens FR

This folder contains sample French contracts for testing and demonstration.

## 📄 Documents

### 1. **sample-contract-1.md** - Services IT Development
- **Type:** Service contract
- **Duration:** 18 months
- **Value:** €85,000 HT
- **Key Topics:**
  - Project phases and deliverables
  - Payment terms (30%-40%-30%)
  - Delay penalties: €500-€1,000/week
  - Responsibility and insurance
  - IP ownership and confidentiality

**Best for testing:**
- Cost extraction
- Deadline identification
- Penalty analysis
- Deliverables mapping

**Sample Questions:**
- "Quel est le coût total?" → €85,000
- "Quand est le déploiement?" → J+180 (6 months)
- "Quelles sont les pénalités de retard?" → €500-€1,000/week
- "Quels sont les livrables?" → Audit, Code, Servers, Training

---

### 2. **sample-contract-2.md** - Public Procurement (Furniture)
- **Type:** Tender/Public contract
- **Budget:** €150,000 max
- **Duration:** 90 days delivery + 15 days installation
- **Key Topics:**
  - Eligibility criteria
  - Evaluation criteria (40% price, 25% quality, etc.)
  - Deliverables with quantities
  - Compliance and standards
  - Public sector regulations

**Best for testing:**
- Budget extraction
- Requirements analysis
- Timeline extraction
- Compliance checking

**Sample Questions:**
- "Quel est le budget maximum?" → €150,000
- "Combien de chaises?" → 200 units
- "Quand la livraison?" → 90 days
- "Quels critères d'évaluation?" → Price 40%, Quality 25%, Timing 15%...

---

### 3. **sample-contract-3.md** - Maintenance Agreement
- **Type:** Support/SLA contract
- **Duration:** 3 years
- **Monthly Cost:** ~€9,200 estimate
- **Key Topics:**
  - SLA (Service Level Agreement)
  - Response times (4h to 24h based on priority)
  - Availability targets (99%)
  - Support levels (Standard/Premium)
  - Escalation procedures
  - Incident classification

**Best for testing:**
- SLA analysis
- Response time extraction
- Technology support coverage
- Service level comparison

**Sample Questions:**
- "Quel est le temps de réponse?" → 4h (Standard) or 1h (Premium)
- "Qu'est-ce qui est supporté?" → Windows, Linux, macOS, Office 365, etc.
- "Quelle est la disponibilité cible?" → 99%
- "Quels niveaux de support?" → Standard (5j/7) and Premium (24h/24)

---

## 🚀 How to Use

### Option 1: Upload as Markdown
- Files are in `.md` format
- Most systems can parse Markdown
- Good for quick testing

### Option 2: Convert to PDF
If you need PDF format:

**Using Pandoc (Command Line):**
```bash
# Install pandoc first
brew install pandoc  # macOS
apt install pandoc   # Ubuntu

# Convert
pandoc sample-contract-1.md -o contract-1.pdf
```

**Using Online Tools:**
- https://markdowntopdf.com/
- https://md2pdf.netlify.app/
- Copy paste into https://pandoc.org/try/

**Using VS Code:**
- Install "Markdown PDF" extension
- Right-click .md file → "Markdown PDF: Export"

---

## 📊 Contract Comparison

| Aspect | Contract 1 | Contract 2 | Contract 3 |
|--------|-----------|-----------|-----------|
| **Type** | Service | Procurement | Maintenance |
| **Duration** | 18 months | 90 days | 3 years |
| **Cost** | €85,000 | €150,000 max | ~€9,200/month |
| **Complexity** | Medium | High | Medium |
| **Best for** | Cost/deadline | Requirements | SLA |

---

## 💡 Testing Scenarios

### Scenario 1: "Investor Pitch"
Upload all 3 contracts and ask:
- "Quel est le coût total de tous les contrats?" 
- System should calculate and aggregate

### Scenario 2: "Compliance Check"
Ask about legal and insurance terms:
- "Quelles sont les obligations d'assurance?"
- System should find insurance amounts and coverage

### Scenario 3: "Timeline Planning"
Extract all dates and deadlines:
- "Quels sont les jalons clés?"
- System should list all milestones with dates

### Scenario 4: "Risk Assessment"
Identify all penalties and risks:
- "Quels sont tous les risques financiers?"
- System should extract penalties, fines, liability limits

### Scenario 5: "Requirement Analysis"
Compare obligations across contracts:
- "Compare les obligations des prestataires"
- System should compare and contrast

---

## 🎯 Questions to Test

### Cost & Budget
- [ ] "Quel est le coût total?"
- [ ] "Quels sont les tarifs unitaires?"
- [ ] "Quel est le budget maximum?"
- [ ] "Quels sont les frais additionnels?"

### Dates & Deadlines
- [ ] "Quand est prévu..."
- [ ] "Quelle est la durée?"
- [ ] "Quels sont les délais?"
- [ ] "Quel est le calendrier?"

### Penalties & Risks
- [ ] "Quelles sont les pénalités?"
- [ ] "Quel est le risque..."
- [ ] "Quelles sont les responsabilités?"
- [ ] "Quelles sont les garanties?"

### Services & Deliverables
- [ ] "Quels sont les livrables?"
- [ ] "Qu'est-ce qui est inclus?"
- [ ] "Quels services?"
- [ ] "Quels systèmes supportés?"

### Obligations & Requirements
- [ ] "Quelles sont les obligations?"
- [ ] "Quels sont les critères?"
- [ ] "Quels documents requis?"
- [ ] "Quels certificats?"

---

## ✅ Validation Checklist

When testing contracts:

- [ ] **Parse correctly** - No errors opening file
- [ ] **Extract text** - All content readable
- [ ] **Identify sections** - Sections/articles recognized
- [ ] **Answer questions** - Specific data found
- [ ] **Cite sources** - Answers include page/section references
- [ ] **Refuse wrong questions** - System says "not found" when appropriate
- [ ] **Multi-document** - Can search across all contracts
- [ ] **Structured output** - Analysis shows costs, dates, obligations

---

## 🎬 Live Demo Script

```
1. "Téléchargeons les trois contrats"
   → Upload all 3 documents

2. "Regardons le contrat de services informatiques"
   → Show Contract 1 analysis
   → Point out: cost (€85k), duration (18 months), penalties (€500-1k/week)

3. "Posons une question spécifique"
   → User: "Quels sont les délais?"
   → System: Finds all deadlines with dates and citations

4. "Cherchons dans toute la base de connaissances"
   → User: "Quel est le coût total de chaque contrat?"
   → System: Aggregates from all 3 documents

5. "Analysons pour les risques"
   → User: "Quels sont tous les montants d'assurance?"
   → System: Finds insurance requirements across contracts

6. "Montrons la vérification"
   → Click on citation → Shows exact excerpt
   → Proves answer is grounded in text
```

---

## 🔧 Troubleshooting

**Q: Contract won't upload**
A: Check file format (.md or .pdf), size < 50MB, or try converting to PDF

**Q: Questions return no answer**
A: Verify document indexed, Ollama running, question is specific

**Q: Answers seem wrong**
A: Check the citation - the system shows its source. Verify the source is correct

**Q: Search across documents doesn't work**
A: Make sure all documents are uploaded and indexed first

---

## 📝 Tips for Better Results

1. **Use French** - Better results with French questions for French contracts
2. **Be specific** - "Combien pour la livraison?" vs "Coût?"
3. **Ask one thing** - "Quels délais?" vs "Coûts ET délais"
4. **Check sources** - Always verify the citation
5. **Simple first** - Test basic Q&A before complex scenarios

---

## 📞 Support

- Check DEMO_GUIDE.md for detailed testing scenarios
- See README.md for general project information
- Review SETUP.md for installation issues

---

**Ready to demo! 🎉**
