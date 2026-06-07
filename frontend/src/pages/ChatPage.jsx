import axios from 'axios'
import { BookOpen, Bot, Send, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ChatPage() {
  const { documentId } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const question = input.trim()
    const userMessage = { role: 'user', content: question }
    const history = messages.map(m => ({ role: m.role, content: m.content }))

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const endpoint = documentId
        ? `http://localhost:8000/api/v1/chat/${documentId}`
        : 'http://localhost:8000/api/v1/chat/kb'

      const response = await axios.post(endpoint, {
        question,
        document_id: documentId || null,
        conversation_history: history
      })

      const { answer, citations, confidence } = response.data

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: answer,
        citations: citations || [],
        confidence
      }])
    } catch (err) {
      const detail = err.response?.data?.detail || err.message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Erreur: ${detail}`,
        citations: [],
        isError: true
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        padding: '1.25rem 1.5rem',
        borderRadius: '0.75rem 0.75rem 0 0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
          Chat avec le contrat
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem' }}>
          {documentId ? `Document: ${documentId}` : 'Base de connaissances complète'}
        </p>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        background: 'white',
        padding: '1.5rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <Bot size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Posez une question sur le contrat</p>
            <p style={{ fontSize: '0.85rem' }}>Exemple: "Quel est le coût total ?" · "Quelles sont les pénalités ?"</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))
        )}

        {loading && (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#10b981', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', flexShrink: 0
            }}>
              <Bot size={18} />
            </div>
            <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '0.75rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Analyse en cours…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        background: 'white',
        padding: '1.25rem 1.5rem',
        borderRadius: '0 0 0.75rem 0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Posez votre question en français…"
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: loading || !input.trim() ? 0.5 : 1,
              fontWeight: 600
            }}
          >
            <Send size={18} />
            Envoyer
          </button>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
      flexDirection: isUser ? 'row-reverse' : 'row'
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: isUser ? '#3b82f6' : (message.isError ? '#ef4444' : '#10b981'),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', flexShrink: 0
      }}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{
          background: isUser ? '#eff6ff' : (message.isError ? '#fef2f2' : '#f0fdf4'),
          padding: '1rem',
          borderRadius: '0.75rem'
        }}>
          <p style={{ color: '#1e293b', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.6 }}>
            {message.content}
          </p>
        </div>

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {message.citations.map((citation, i) => (
              <div key={i} style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                padding: '0.6rem 0.875rem',
                fontSize: '0.8rem',
                color: '#475569'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                  <BookOpen size={12} style={{ color: '#3b82f6' }} />
                  <span style={{ fontWeight: 600, color: '#3b82f6' }}>
                    Source {i + 1}
                    {citation.section_title && ` · ${citation.section_title}`}
                    {citation.page_number && ` · Page ${citation.page_number}`}
                  </span>
                  <span style={{ marginLeft: 'auto', color: '#94a3b8' }}>
                    {Math.round((citation.relevance_score || 0) * 100)}% pertinence
                  </span>
                </div>
                <p style={{ margin: 0, fontStyle: 'italic', color: '#64748b' }}>
                  "{citation.excerpt}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Confidence */}
        {!isUser && message.confidence !== undefined && message.confidence > 0 && (
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', paddingLeft: '0.25rem' }}>
            Confiance: {Math.round(message.confidence * 100)}%
          </div>
        )}
      </div>
    </div>
  )
}
