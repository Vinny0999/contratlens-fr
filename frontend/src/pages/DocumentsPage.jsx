import axios from 'axios'
import { FileSearch, FileText, MessageSquare, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/documents')
      setDocuments(response.data)
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Chargement...</div>
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>
        Mes Documents
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        {documents.length} document(s) téléchargé(s)
      </p>

      {documents.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <FileText size={48} style={{ color: '#cbd5e1', margin: '0 auto 1rem' }} />
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Aucun document téléchargé
          </p>
          <Link
            to="/upload"
            style={{
              display: 'inline-block',
              background: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Télécharger un document
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} onIndexed={fetchDocuments} />
          ))}
        </div>
      )}
    </div>
  )
}

function DocumentCard({ document, onIndexed }) {
  const [indexing, setIndexing] = useState(false)
  const [error, setError] = useState(null)

  const statusColors = {
    uploaded: '#f59e0b',
    processing: '#3b82f6',
    indexed: '#10b981',
    failed: '#ef4444',
  }

  const handleIndex = async () => {
    setIndexing(true)
    setError(null)
    try {
      await axios.post(`http://localhost:8000/api/v1/documents/${document.id}/index`)
      // Poll until indexed or failed
      const poll = setInterval(async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/v1/documents/${document.id}`)
          if (res.data.status === 'indexed' || res.data.status === 'failed') {
            clearInterval(poll)
            setIndexing(false)
            onIndexed()
          }
        } catch {
          clearInterval(poll)
          setIndexing(false)
        }
      }, 2000)
    } catch (err) {
      setError('Erreur lors de l\'indexation')
      setIndexing(false)
    }
  }

  const isIndexed = document.status === 'indexed'
  const isFailed = document.status === 'failed'
  const isProcessing = document.status === 'processing' || indexing

  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <FileText size={32} style={{ color: '#3b82f6', flexShrink: 0 }} />
        <div>
          <h3 style={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1e293b' }}>
            {document.filename}
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            {document.doc_type} •{' '}
            <span style={{ color: statusColors[document.status] || '#64748b', fontWeight: 600 }}>
              {document.status}
            </span>
            {document.num_pages && ` • ${document.num_pages} pages`}
            {' • '}{new Date(document.upload_date).toLocaleDateString('fr-FR')}
          </p>
          {error && <p style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.25rem' }}>{error}</p>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {!isIndexed && !isProcessing && (
          <button
            onClick={handleIndex}
            disabled={isProcessing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: isFailed ? '#ef4444' : '#f59e0b',
              color: 'white',
              borderRadius: '0.375rem',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={16} />
            {isFailed ? 'Réessayer' : 'Indexer'}
          </button>
        )}

        {isProcessing && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: '#e0f2fe',
            color: '#0369a1',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
            Indexation...
          </span>
        )}

        <Link
          to={`/chat/${document.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: isIndexed ? '#3b82f6' : '#cbd5e1',
            color: 'white',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            pointerEvents: isIndexed ? 'auto' : 'none'
          }}
        >
          <MessageSquare size={16} />
          Chat
        </Link>

        <Link
          to={`/analysis/${document.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: isIndexed ? '#10b981' : '#cbd5e1',
            color: 'white',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            pointerEvents: isIndexed ? 'auto' : 'none'
          }}
        >
          <FileSearch size={16} />
          Analyser
        </Link>
      </div>
    </div>
  )
}
