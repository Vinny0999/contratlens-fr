import axios from 'axios'
import { AlertTriangle, CheckCircle, Clock, FileSearch, FileText, List, Shield } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AnalysisPage() {
  const { documentId } = useParams()
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)

  const runAnalysis = async () => {
    setAnalyzing(true)
    setError(null)
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/analysis/${documentId}`,
        { document_id: documentId, analysis_types: ['summary', 'needs', 'deliverables', 'risks'] }
      )
      setAnalysis(response.data.result)
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
        fontWeight: 'bold', 
        marginBottom: '0.5rem', 
        color: '#1e293b' 
      }}>
        Analyse de Contrat
      </h1>
      <p style={{ 
        color: '#64748b', 
        marginBottom: 'clamp(1.5rem, 4vw, 2rem)', 
        fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
        wordBreak: 'break-word'
      }}>
        Document: {documentId}
      </p>

      {error && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem',
          padding: '1rem', marginBottom: '1.5rem', color: '#dc2626'
        }}>
          Erreur: {error}
        </div>
      )}

      {!analysis ? (
        <div style={{
          background: 'white', 
          padding: 'clamp(2rem, 5vw, 3rem)', 
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          textAlign: 'center'
        }}>
          <FileSearch size={window.innerWidth < 640 ? 40 : 48} style={{ color: '#3b82f6', margin: '0 auto 1rem', display: 'block' }} />
          <p style={{ 
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)', 
            color: '#64748b',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            padding: '0 1rem'
          }}>
            Lancer l'analyse structurée du contrat via le LLM local
          </p>
          <button
            onClick={runAnalysis}
            disabled={analyzing}
            style={{
              background: '#3b82f6', 
              color: 'white', 
              padding: 'clamp(0.875rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
              borderRadius: '0.5rem', 
              border: 'none',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', 
              fontWeight: '600', 
              opacity: analyzing ? 0.7 : 1
            }}
          >
            {analyzing ? 'Analyse en cours… (peut prendre ~30s)' : 'Analyser le contrat'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 'clamp(1rem, 3vw, 1.5rem)' }}>
          {/* Score */}
          {analysis.qualification_score != null && (
            <div style={{
              background: 'white', padding: '1.25rem 1.5rem', borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', gap: '1rem'
            }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Score de qualification:</span>
              <div style={{
                background: scoreColor(analysis.qualification_score),
                color: 'white', borderRadius: '999px',
                padding: '0.25rem 0.875rem', fontWeight: 700, fontSize: '1rem'
              }}>
                {Math.round(analysis.qualification_score * 100)}%
              </div>
            </div>
          )}

          <AnalysisSection title="Résumé" icon={<FileText size={22} />} color="#3b82f6">
            <p style={{ color: '#475569', lineHeight: 1.7, margin: 0 }}>{analysis.summary}</p>
          </AnalysisSection>

          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: 'clamp(1rem, 3vw, 1.5rem)' }}>
            <AnalysisSection title="Type de contrat" icon={<CheckCircle size={22} />} color="#10b981">
              <p style={{ color: '#475569', margin: 0 }}>{analysis.contract_type || '—'}</p>
            </AnalysisSection>

            <AnalysisSection title="Périmètre" icon={<Clock size={22} />} color="#f59e0b">
              <p style={{ color: '#475569', margin: 0, lineHeight: 1.6 }}>{analysis.scope_of_work || '—'}</p>
            </AnalysisSection>
          </div>

          {analysis.deliverables?.length > 0 && (
            <AnalysisSection title="Livrables" icon={<List size={22} />} color="#8b5cf6">
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8 }}>
                {analysis.deliverables.map((d, i) => (
                  <li key={i}>
                    <strong>{d.name}</strong>{d.description ? ` — ${d.description}` : ''}
                    {d.deadline && <span style={{ color: '#f59e0b' }}> (Échéance: {d.deadline})</span>}
                  </li>
                ))}
              </ul>
            </AnalysisSection>
          )}

          {analysis.risks?.length > 0 && (
            <AnalysisSection title="Risques & Pénalités" icon={<Shield size={22} />} color="#ef4444">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {analysis.risks.map((r, i) => (
                  <div key={i} style={{
                    background: '#fef2f2', borderRadius: '0.5rem',
                    padding: '0.75rem 1rem', borderLeft: `3px solid ${severityColor(r.severity)}`
                  }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{
                        background: severityColor(r.severity), color: 'white',
                        borderRadius: '999px', padding: '0.1rem 0.6rem', fontSize: '0.75rem', fontWeight: 600
                      }}>{r.severity}</span>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{r.type}</span>
                      {r.financial_impact && (
                        <span style={{ marginLeft: 'auto', color: '#dc2626', fontWeight: 600 }}>
                          {r.financial_impact}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>{r.description}</p>
                  </div>
                ))}
              </div>
            </AnalysisSection>
          )}

          {analysis.missing_information?.length > 0 && (
            <AnalysisSection title="Informations manquantes" icon={<AlertTriangle size={22} />} color="#f59e0b">
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8 }}>
                {analysis.missing_information.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </AnalysisSection>
          )}

          <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
            <button
              onClick={() => setAnalysis(null)}
              style={{
                background: 'transparent', color: '#64748b', border: '1px solid #e2e8f0',
                padding: '0.5rem 1.25rem', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem'
              }}
            >
              Relancer l'analyse
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function AnalysisSection({ title, icon, color, children }) {
  return (
    <div style={{
      background: 'white', 
      padding: 'clamp(1rem, 3vw, 1.5rem)', 
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'clamp(0.5rem, 2vw, 0.75rem)', 
        marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
        flexWrap: 'wrap'
      }}>
        <div style={{ color }}>{icon}</div>
        <h2 style={{ 
          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', 
          fontWeight: '600', 
          color: '#1e293b', 
          margin: 0 
        }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function scoreColor(score) {
  if (score >= 0.75) return '#10b981'
  if (score >= 0.5) return '#f59e0b'
  return '#ef4444'
}

function severityColor(severity) {
  if (severity === 'high') return '#ef4444'
  if (severity === 'medium') return '#f59e0b'
  return '#10b981'
}
