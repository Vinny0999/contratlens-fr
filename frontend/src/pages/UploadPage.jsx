import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import axios from 'axios'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('http://localhost:8000/api/v1/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      setResult(response.data)
      setFile(null)
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors du téléchargement')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', animation: 'slideUp 0.6s ease-out' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          Télécharger un Contrat
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          Importez votre contrat PDF ou DOCX pour commencer l'analyse
        </p>
      </div>

      {/* Upload Box */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '3rem',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(226, 232, 240, 0.5)'
      }}>
        {!file ? (
          <label style={{ cursor: 'pointer', display: 'block' }}>
            <div 
              style={{
                border: dragActive ? '3px dashed #667eea' : '3px dashed #cbd5e1',
                borderRadius: '1rem',
                padding: '4rem 2rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: dragActive ? 'rgba(102, 126, 234, 0.05)' : 'transparent'
              }}
              onDragOver={(e) => {
                e.preventDefault()
                setDragActive(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                setDragActive(false)
              }}
              onDrop={(e) => {
                e.preventDefault()
                setDragActive(false)
                if (e.dataTransfer.files[0]) {
                  setFile(e.dataTransfer.files[0])
                  setResult(null)
                  setError(null)
                }
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 20px -5px rgba(102, 126, 234, 0.4)'
              }}>
                <Upload size={40} style={{ color: 'white' }} />
              </div>
              
              <p style={{ 
                fontSize: '1.375rem', 
                marginBottom: '0.75rem',
                fontWeight: 700,
                color: '#1e293b'
              }}>
                Glissez votre fichier ici
              </p>
              <p style={{ 
                color: '#64748b', 
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}>
                ou cliquez pour parcourir
              </p>
              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '0.75rem',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 4px 6px -1px rgba(102, 126, 234, 0.4)'
              }}>
                Sélectionner un fichier
              </div>
              <p style={{ 
                color: '#94a3b8', 
                fontSize: '0.875rem',
                marginTop: '1.5rem',
                fontWeight: 500
              }}>
                PDF ou DOCX • Maximum 50 MB
              </p>
            </div>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        ) : (
          <div style={{ textAlign: 'center' }}>
            {/* File Preview */}
            <div style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: '2rem',
              borderRadius: '1rem',
              marginBottom: '2rem',
              border: '2px solid rgba(102, 126, 234, 0.2)'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                margin: '0 auto 1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px -4px rgba(102, 126, 234, 0.4)'
              }}>
                <FileText size={36} style={{ color: 'white' }} />
              </div>
              <p style={{ 
                fontSize: '1.25rem', 
                marginBottom: '0.5rem',
                fontWeight: 700,
                color: '#1e293b'
              }}>
                {file.name}
              </p>
              <p style={{ 
                color: '#64748b', 
                fontSize: '0.95rem',
                fontWeight: 500
              }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            
            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={handleUpload}
                disabled={uploading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: uploading ? '#94a3b8' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: '0.875rem',
                  border: 'none',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  boxShadow: uploading ? 'none' : '0 8px 16px -4px rgba(102, 126, 234, 0.5)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (!uploading) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 12px 20px -4px rgba(102, 126, 234, 0.6)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!uploading) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(102, 126, 234, 0.5)'
                  }
                }}
              >
                {uploading ? (
                  <>
                    <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                    Téléchargement...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Télécharger
                  </>
                )}
              </button>
              
              <button
                onClick={() => setFile(null)}
                disabled={uploading}
                style={{
                  background: 'white',
                  color: '#64748b',
                  padding: '1rem 2rem',
                  borderRadius: '0.875rem',
                  border: '2px solid #e2e8f0',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (!uploading) {
                    e.currentTarget.style.borderColor = '#cbd5e1'
                    e.currentTarget.style.background = '#f8fafc'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!uploading) {
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.background = 'white'
                  }
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            marginTop: '2rem',
            padding: '1.25rem 1.5rem',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#dc2626',
            border: '2px solid rgba(239, 68, 68, 0.2)',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <AlertCircle size={22} style={{ flexShrink: 0 }} />
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {result && (
          <div style={{
            marginTop: '2rem',
            padding: '1.25rem 1.5rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '0.875rem',
            border: '2px solid rgba(16, 185, 129, 0.2)',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#059669',
              marginBottom: '0.75rem'
            }}>
              <CheckCircle size={22} />
              <span style={{ fontWeight: 700, fontSize: '1.0625rem' }}>
                Document téléchargé avec succès!
              </span>
            </div>
            <p style={{ color: '#047857', fontSize: '0.95rem', marginLeft: '2rem' }}>
              ID: <code style={{ 
                background: 'rgba(16, 185, 129, 0.15)', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.25rem',
                fontWeight: 600
              }}>{result.id}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
