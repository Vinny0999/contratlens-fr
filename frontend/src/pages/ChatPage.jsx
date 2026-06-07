import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Send, Bot, User } from 'lucide-react'

export default function ChatPage() {
  const { documentId } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    // TODO: Make API call
    setTimeout(() => {
      const botMessage = {
        role: 'assistant',
        content: 'Fonction de chat en cours de développement. L\'intégration avec le backend sera ajoutée prochainement.'
      }
      setMessages(prev => [...prev, botMessage])
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '0.75rem 0.75rem 0 0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>
          Chat avec le contrat
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Document ID: {documentId}
        </p>
      </div>

      <div style={{
        flex: 1,
        background: 'white',
        padding: '1.5rem',
        overflowY: 'auto'
      }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <Bot size={48} style={{ margin: '0 auto 1rem' }} />
            <p>Posez une question sur le contrat</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} />
            ))}
          </div>
        )}
      </div>

      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '0 0 0.75rem 0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Posez votre question..."
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              fontSize: '1rem'
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
              opacity: loading || !input.trim() ? 0.5 : 1
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
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: isUser ? '#3b82f6' : '#10b981',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexShrink: 0
      }}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>
      
      <div style={{
        background: isUser ? '#eff6ff' : '#f0fdf4',
        padding: '1rem',
        borderRadius: '0.75rem',
        maxWidth: '70%'
      }}>
        <p style={{ color: '#1e293b', whiteSpace: 'pre-wrap' }}>{message.content}</p>
      </div>
    </div>
  )
}
