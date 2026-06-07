import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import axios from 'axios'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

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
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>
        Télécharger un Contrat
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Importez un contrat PDF ou DOCX pour l'analyser
      </p>

      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        {!file ? (
          <label style={{ cursor: 'pointer', display: 'block' }}>
            <div style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '0.5rem',
              padding: '3rem',
              transition: 'all 0.2s'
            }}
            onDragOver={(e) => {
              e.preventDefault()
              e.currentTarget.style.borderColor = '#3b82f6'
              e.currentTarget.style.background = '#eff6ff'
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1'
              e.currentTarget.style.background = 'transparent'
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.currentTarget.style.borderColor = '#cbd5e1'
              e.currentTarget.style.background = 'transparent'
              if (e.dataTransfer.files[0]) {
                setFile(e.dataTransfer.files[0])
              }
            }}>
              <Upload size={48} style={{ color: '#3b82f6', margin: '0 auto 1rem' }} />
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                Cliquez pour sélectionner ou glissez un fichier
              </p>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                PDF ou DOCX, max 50 MB
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
          <div>
            <FileText size={48} style={{ color: '#3b82f6', margin: '0 auto 1rem' }} />
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>{file.name}</p>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '2rem' }}>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={handleUpload}
                disabled={uploading}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  opacity: uploading ? 0.7 : 1
                }}
              >
                {uploading ? 'Téléchargement...' : 'Télécharger'}
              </button>
              
              <button
                onClick={() => setFile(null)}
                disabled={uploading}
                style={{
                  background: '#e2e8f0',
                  color: '#475569',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {error && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#fee2e2',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#dc2626'
          }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {result && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#d1fae5',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#059669'
          }}>
            <CheckCircle size={20} />
            Document téléchargé avec succès! ID: {result.id}
          </div>
        )}
      </div>
    </div>
  )
}
