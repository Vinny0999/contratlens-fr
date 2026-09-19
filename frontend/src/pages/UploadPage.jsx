import { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import axios from 'axios'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    const element = document.querySelector('.upload-container')
    if (element) {
      setTimeout(() => element.classList.add('visible'), 100)
    }
  }, [])

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
    <div className="upload-container scroll-animate" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 900, 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          Télécharger un Contrat
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#9ca3af' }}>
          Importez votre contrat PDF ou DOCX pour commencer l'analyse
        </p>
      </div>

      {/* Upload Box */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.05)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        padding: '3rem',
        borderRadius: '1.5rem',
        boxShadow: '0 0 60px rgba(16, 185, 129, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {!file ? (
            <label style={{ cursor: 'pointer', display: 'block' }}>
              <div 
                style={{
                  border: dragActive ? '3px dashed #10b981' : '3px dashed rgba(16, 185, 129, 0.3)',
                  borderRadius: '1rem',
                  padding: '4rem 2rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: dragActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
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
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)',
                  animation: dragActive ? 'float 2s ease-in-out infinite' : 'none'
                }}>
                  <Upload size={40} style={{ color: '#000' }} />
                </div>
                
                <p style={{ 
                  fontSize: '1.375rem', 
                  marginBottom: '0.75rem',
                  fontWeight: 700,
                  color: '#ffffff'
                }}>
                  Glissez votre fichier ici
                </p>
                <p style={{ 
                  color: '#9ca3af', 
                  fontSize: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  ou cliquez pour parcourir
                </p>
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#000',
                  padding: '0.875rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.6)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  Sélectionner un fichier
                </div>
                <p style={{ 
                  color: '#6b7280', 
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
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '2rem',
                borderRadius: '1rem',
                marginBottom: '2rem',
                border: '2px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  margin: '0 auto 1rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)'
                }}>
                  <FileText size={36} style={{ color: '#000' }} />
                </div>
                <p style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: '0.5rem',
                  fontWeight: 700,
                  color: '#ffffff'
                }}>
                  {file.name}
                </p>
                <p style={{ 
                  color: '#9ca3af', 
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
                    background: uploading ? '#6b7280' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: uploading ? '#d1d5db' : '#000',
                    padding: '1rem 2.5rem',
                    borderRadius: '0.875rem',
                    border: 'none',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: '1.0625rem',
                    fontWeight: 800,
                    boxShadow: uploading ? 'none' : '0 0 40px rgba(16, 185, 129, 0.5)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (!uploading) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 0 60px rgba(16, 185, 129, 0.7)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!uploading) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.5)'
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
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    padding: '1rem 2rem',
                    borderRadius: '0.875rem',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (!uploading) {
                      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'
                      e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!uploading) {
                      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'
                      e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'
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
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
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
              border: '1px solid rgba(16, 185, 129, 0.3)',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#10b981',
                marginBottom: '0.75rem'
              }}>
                <CheckCircle size={22} />
                <span style={{ fontWeight: 700, fontSize: '1.0625rem' }}>
                  Document téléchargé avec succès!
                </span>
              </div>
              <p style={{ color: '#34d399', fontSize: '0.95rem', marginLeft: '2rem' }}>
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
    </div>
  )
}
