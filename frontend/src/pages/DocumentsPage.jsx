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
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem',
        color: '#b0b0b0'
      }}>
        <RefreshCw size={48} style={{ 
          color: '#00ff9d', 
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }} />
        <p>Chargement des documents...</p>
      </div>
    )
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 900, 
          marginBottom: '0.75rem',
          background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          Mes Documents
        </h1>
        <p style={{ color: '#b0b0b0', fontSize: '1.0625rem' }}>
          {documents.length} document(s) téléchargé(s)
        </p>
      </div>

      {documents.length === 0 ? (
        <div style={{
          background: 'rgba(0, 255, 157, 0.05)',
          border: '1px solid rgba(0, 255, 157, 0.2)',
          padding: '4rem 3rem',
          borderRadius: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(0, 255, 157, 0.1)'
        }}>
          <FileText size={64} style={{ color: '#00ff9d', margin: '0 auto 1.5rem', opacity: 0.5 }} />
          <p style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
            Aucun document téléchargé
          </p>
          <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
            Commencez par télécharger un contrat pour l'analyser
          </p>
          <Link
            to="/upload"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
              color: '#050811',
              padding: '0.875rem 2rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 700,
              boxShadow: '0 0 30px rgba(0, 255, 157, 0.4)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 157, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 157, 0.4)'
            }}
          >
            <FileText size={20} />
            Télécharger un document
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.25rem' }}>
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
    processing: '#00d4ff',
    indexed: '#00ff9d',
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
      background: 'rgba(0, 255, 157, 0.05)',
      border: '1px solid rgba(0, 255, 157, 0.2)',
      padding: '1.5rem',
      borderRadius: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1.25rem',
      boxShadow: '0 0 30px rgba(0, 255, 157, 0.1)',
      transition: 'all 0.3s',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.4)'
      e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 255, 157, 0.2)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.2)'
      e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 157, 0.1)'
    }}>
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '-50px',
        transform: 'translateY(-50%)',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(0, 255, 157, 0.15) 0%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, minWidth: '250px', position: 'relative' }}>
        <div style={{
          background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
          padding: '0.875rem',
          borderRadius: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(0, 255, 157, 0.3)',
          flexShrink: 0
        }}>
          <FileText size={28} style={{ color: '#050811' }} />
        </div>
        <div>
          <h3 style={{ 
            fontWeight: 700, 
            marginBottom: '0.5rem', 
            color: '#ffffff',
            fontSize: '1.0625rem'
          }}>
            {document.filename}
          </h3>
          <div style={{ 
            fontSize: '0.875rem', 
            color: '#b0b0b0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ 
              textTransform: 'capitalize',
              color: '#909090'
            }}>
              {document.doc_type}
            </span>
            <span>•</span>
            <span style={{ 
              color: statusColors[document.status] || '#b0b0b0', 
              fontWeight: 700,
              textTransform: 'capitalize'
            }}>
              {document.status}
            </span>
            {document.num_pages && (
              <>
                <span>•</span>
                <span>{document.num_pages} pages</span>
              </>
            )}
            <span>•</span>
            <span>{new Date(document.upload_date).toLocaleDateString('fr-FR')}</span>
          </div>
          {error && (
            <p style={{ fontSize: '0.8125rem', color: '#ef4444', marginTop: '0.5rem', fontWeight: 600 }}>
              {error}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', position: 'relative' }}>
        {!isIndexed && !isProcessing && (
          <button
            onClick={handleIndex}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.25rem',
              background: isFailed ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: isFailed ? '#ef4444' : '#f59e0b',
              border: `1px solid ${isFailed ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
              borderRadius: '0.625rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isFailed ? 'rgba(239, 68, 68, 0.25)' : 'rgba(245, 158, 11, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isFailed ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)'
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
            padding: '0.625rem 1.25rem',
            background: 'rgba(0, 212, 255, 0.15)',
            color: '#00d4ff',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '0.625rem',
            fontSize: '0.875rem',
            fontWeight: 700
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
            padding: '0.625rem 1.25rem',
            background: isIndexed ? 'rgba(0, 212, 255, 0.15)' : 'rgba(128, 128, 128, 0.15)',
            color: isIndexed ? '#00d4ff' : '#808080',
            border: `1px solid ${isIndexed ? 'rgba(0, 212, 255, 0.3)' : 'rgba(128, 128, 128, 0.3)'}`,
            borderRadius: '0.625rem',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 700,
            pointerEvents: isIndexed ? 'auto' : 'none',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            if (isIndexed) {
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.25)'
            }
          }}
          onMouseLeave={(e) => {
            if (isIndexed) {
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)'
            }
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
            padding: '0.625rem 1.25rem',
            background: isIndexed ? 'rgba(0, 255, 157, 0.15)' : 'rgba(128, 128, 128, 0.15)',
            color: isIndexed ? '#00ff9d' : '#808080',
            border: `1px solid ${isIndexed ? 'rgba(0, 255, 157, 0.3)' : 'rgba(128, 128, 128, 0.3)'}`,
            borderRadius: '0.625rem',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 700,
            pointerEvents: isIndexed ? 'auto' : 'none',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            if (isIndexed) {
              e.currentTarget.style.background = 'rgba(0, 255, 157, 0.25)'
            }
          }}
          onMouseLeave={(e) => {
            if (isIndexed) {
              e.currentTarget.style.background = 'rgba(0, 255, 157, 0.15)'
            }
          }}
        >
          <FileSearch size={16} />
          Analyser
        </Link>
      </div>
    </div>
  )
}
