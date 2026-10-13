import { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Info, Key, Github } from 'lucide-react'
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
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000 // 30 second timeout
      })
      
      setResult(response.data)
      setFile(null)
    } catch (err) {
      console.error('Upload error:', err)
      
      if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
        setError('Timeout: Le serveur backend ne répond pas')
      } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        setError('Erreur réseau: Vérifiez que le backend est démarré (http://localhost:8000)')
      } else if (err.response) {
        // Server responded with error
        setError(err.response?.data?.detail || `Erreur serveur: ${err.response.status}`)
      } else {
        setError('Erreur lors du téléchargement: ' + (err.message || 'Erreur inconnue'))
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="upload-container scroll-animate" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Demo Warning */}
      <div style={{
        background: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '1rem',
        padding: 'clamp(1rem, 3vw, 1.25rem) clamp(1rem, 4vw, 1.5rem)',
        marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'clamp(0.75rem, 2vw, 1rem)',
        animation: 'fadeIn 0.5s ease-out',
        flexWrap: 'wrap'
      }}>
        <Info size={window.innerWidth < 640 ? 20 : 24} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '0.125rem' }} />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{ 
            color: '#fbbf24', 
            fontSize: 'clamp(0.95rem, 2.5vw, 1.0625rem)', 
            fontWeight: 700,
            marginBottom: '0.5rem'
          }}>
            Mode Démo
          </h3>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', 
            lineHeight: 1.6, 
            marginBottom: '0.75rem' 
          }}>
            Cet environnement est une démonstration. Pour une utilisation complète, veuillez cloner ce projet GitHub et exécuter le backend localement :
          </p>
          <a href="https://github.com/Vinny0999/contratlens-fr" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{
               display: 'inline-flex',
               alignItems: 'center',
               gap: '0.5rem',
               background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
               color: '#000',
               padding: '0.5rem 1rem',
               borderRadius: '0.5rem',
               fontWeight: 700,
               fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
               textDecoration: 'none'
             }}>
            <Github size={window.innerWidth < 640 ? 16 : 18} />
            Voir sur GitHub
          </a>
        </div>
      </div>
      
      {/* API Key Reminder */}
      <div style={{
        background: 'rgba(0, 212, 255, 0.1)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '1rem',
        padding: 'clamp(1rem, 3vw, 1.25rem) clamp(1rem, 4vw, 1.5rem)',
        marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'clamp(0.75rem, 2vw, 1rem)',
        animation: 'fadeIn 0.5s ease-out',
        flexWrap: 'wrap'
      }}>
        <Key size={window.innerWidth < 640 ? 20 : 24} style={{ color: '#00d4ff', flexShrink: 0, marginTop: '0.125rem' }} />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{ 
            color: '#00d4ff', 
            fontSize: 'clamp(0.95rem, 2.5vw, 1.0625rem)', 
            fontWeight: 700,
            marginBottom: '0.5rem'
          }}>
            Configuration requise
          </h3>
          <p style={{ 
            color: '#b0b0b0', 
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', 
            lineHeight: 1.6, 
            marginBottom: '0.75rem' 
          }}>
            Pour analyser vos documents, vous devez configurer une clé API LLM:
          </p>
          <ul style={{ 
            color: '#b0b0b0', 
            fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
            lineHeight: 1.7, 
            paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', 
            margin: 0 
          }}>
            <li style={{ marginBottom: '0.25rem' }}><strong style={{ color: '#00ff9d' }}>OpenAI:</strong> Ajoutez <code>OPENAI_API_KEY</code> dans <code>backend/.env</code></li>
            <li style={{ marginBottom: '0.25rem' }}><strong style={{ color: '#00ff9d' }}>Google AI:</strong> Ajoutez <code>GOOGLE_API_KEY</code> dans <code>backend/.env</code></li>
            <li><strong style={{ color: '#00ff9d' }}>Ollama (Local):</strong> Installez et démarrez Ollama localement (gratuit)</li>
          </ul>
        </div>
      </div>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
        <h1 style={{ 
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', 
          fontWeight: 900, 
          marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
          background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          Téléverser un Contrat
        </h1>
        <p style={{ 
          fontSize: 'clamp(0.95rem, 3vw, 1.125rem)', 
          color: '#b0b0b0',
          padding: '0 1rem'
        }}>
          Importez votre contrat PDF ou DOCX pour commencer l'analyse
        </p>
      </div>

      {/* Upload Box */}
      <div style={{
        background: 'rgba(0, 255, 157, 0.05)',
        border: '1px solid rgba(0, 255, 157, 0.2)',
        padding: 'clamp(2rem, 5vw, 3rem)',
        borderRadius: '1.5rem',
        boxShadow: '0 0 60px rgba(0, 255, 157, 0.1)',
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
                  border: dragActive ? '3px dashed #00ff9d' : '3px dashed rgba(16, 185, 129, 0.3)',
                  borderRadius: '1rem',
                  padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)',
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
                  width: 'clamp(60px, 15vw, 80px)',
                  height: 'clamp(60px, 15vw, 80px)',
                  margin: '0 auto clamp(1rem, 3vw, 1.5rem)',
                  background: 'linear-gradient(135deg, #00ff9d 0%, #00d4aa 100%)',
                  borderRadius: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)',
                  animation: dragActive ? 'float 2s ease-in-out infinite' : 'none'
                }}>
                  <Upload size={window.innerWidth < 640 ? 32 : 40} style={{ color: '#000' }} />
                </div>
                
                <p style={{ 
                  fontSize: 'clamp(1.125rem, 3vw, 1.375rem)', 
                  marginBottom: '0.75rem',
                  fontWeight: 700,
                  color: '#ffffff'
                }}>
                  Glissez votre fichier ici
                </p>
                <p style={{ 
                  color: '#b0b0b0', 
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
                }}>
                  ou cliquez pour parcourir
                </p>
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #00ff9d 0%, #00d4aa 100%)',
                  color: '#000',
                  padding: 'clamp(0.75rem, 2vw, 0.875rem) clamp(1.5rem, 4vw, 2rem)',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
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
                  color: '#909090', 
                  fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
                  marginTop: 'clamp(1rem, 3vw, 1.5rem)',
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
                padding: 'clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '1rem',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
                border: '2px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{
                  width: 'clamp(56px, 15vw, 72px)',
                  height: 'clamp(56px, 15vw, 72px)',
                  margin: '0 auto 1rem',
                  background: 'linear-gradient(135deg, #00ff9d 0%, #00d4aa 100%)',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)'
                }}>
                  <FileText size={window.innerWidth < 640 ? 28 : 36} style={{ color: '#000' }} />
                </div>
                <p style={{ 
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                  marginBottom: '0.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  wordBreak: 'break-word',
                  padding: '0 0.5rem'
                }}>
                  {file.name}
                </p>
                <p style={{ 
                  color: '#b0b0b0', 
                  fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                  fontWeight: 500
                }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              
              {/* Actions */}
              <div style={{ display: 'flex', gap: 'clamp(0.75rem, 2vw, 1rem)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: uploading ? '#909090' : 'linear-gradient(135deg, #00ff9d 0%, #00d4aa 100%)',
                    color: uploading ? '#d1d5db' : '#000',
                    padding: 'clamp(0.875rem, 3vw, 1rem) clamp(1.75rem, 5vw, 2.5rem)',
                    borderRadius: '0.875rem',
                    border: 'none',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.0625rem)',
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
                      <Loader2 size={window.innerWidth < 640 ? 18 : 20} style={{ animation: 'spin 1s linear infinite' }} />
                      Téléversement...
                    </>
                  ) : (
                    <>
                      <Upload size={window.innerWidth < 640 ? 18 : 20} />
                      Téléverser
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setFile(null)}
                  disabled={uploading}
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#00ff9d',
                    padding: 'clamp(0.875rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                    borderRadius: '0.875rem',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.0625rem)',
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
                color: '#00ff9d',
                marginBottom: '0.75rem'
              }}>
                <CheckCircle size={22} />
                <span style={{ fontWeight: 700, fontSize: '1.0625rem' }}>
                  Document téléversé avec succès!
                </span>
              </div>
              <p style={{ color: '#00d4ff', fontSize: '0.95rem', marginLeft: '2rem' }}>
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
