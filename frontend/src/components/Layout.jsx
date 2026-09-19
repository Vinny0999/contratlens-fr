import { Link, useLocation } from 'react-router-dom'
import { FileText, Upload, Database, Home, Sparkles } from 'lucide-react'

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
        padding: '1rem 2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* Logo */}
          <Link to="/" style={{ 
            fontSize: '1.5rem', 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={24} style={{ color: 'white' }} />
            </div>
            ContratLens
            <span style={{ 
              fontSize: '0.75rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '0.125rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: 600
            }}>FR</span>
          </Link>
          
          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
            <NavLink to="/" icon={<Home size={18} />}>Accueil</NavLink>
            <NavLink to="/upload" icon={<Upload size={18} />}>Télécharger</NavLink>
            <NavLink to="/documents" icon={<Database size={18} />}>Documents</NavLink>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        maxWidth: '1400px', 
        width: '100%', 
        margin: '0 auto', 
        padding: '2.5rem',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        {children}
      </main>
      
      {/* Footer */}
      <footer style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '2rem 2rem',
        textAlign: 'center',
        color: '#64748b',
        borderTop: '1px solid rgba(226, 232, 240, 0.5)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={16} style={{ color: '#764ba2' }} />
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>ContratLens FR</span>
          </div>
          <p style={{ fontSize: '0.875rem' }}>
            Analyse de contrats intelligente • Propulsé par l'IA • © 2026
          </p>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ to, icon, children }) {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link
      to={to}
      style={{
        color: isActive ? '#667eea' : '#64748b',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1.25rem',
        borderRadius: '0.75rem',
        fontWeight: isActive ? 600 : 500,
        fontSize: '0.95rem',
        background: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(100, 116, 139, 0.08)'
          e.currentTarget.style.color = '#334155'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#64748b'
        }
      }}
    >
      {icon}
      {children}
    </Link>
  )
}
