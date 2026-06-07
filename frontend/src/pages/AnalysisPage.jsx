import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FileSearch, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export default function AnalysisPage() {
  const { documentId } = useParams()
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const runAnalysis = () => {
    setAnalyzing(true)
    // TODO: API call
    setTimeout(() => {
      setAnalysis({
        summary: "Analyse en cours de développement",
        contract_type: "Marché public",
        scope_of_work: "Prestations de service informatique"
      })
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>
        Analyse de Contrat
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Document ID: {documentId}
      </p>

      {!analysis ? (
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <FileSearch size={48} style={{ color: '#3b82f6', margin: '0 auto 1rem' }} />
          <p style={{ marginBottom: '2rem', color: '#64748b' }}>
            Lancer l'analyse structurée du contrat
          </p>
          <button
            onClick={runAnalysis}
            disabled={analyzing}
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              opacity: analyzing ? 0.7 : 1
            }}
          >
            {analyzing ? 'Analyse en cours...' : 'Analyser le contrat'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <AnalysisSection
            title="Résumé"
            icon={<FileSearch size={24} />}
            content={analysis.summary}
          />
          <AnalysisSection
            title="Type de contrat"
            icon={<CheckCircle size={24} />}
            content={analysis.contract_type}
          />
          <AnalysisSection
            title="Périmètre"
            icon={<Clock size={24} />}
            content={analysis.scope_of_work}
          />
        </div>
      )}
    </div>
  )
}

function AnalysisSection({ title, icon, content }) {
  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ color: '#3b82f6' }}>{icon}</div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b' }}>
          {title}
        </h2>
      </div>
      <p style={{ color: '#475569', lineHeight: '1.6' }}>{content}</p>
    </div>
  )
}
