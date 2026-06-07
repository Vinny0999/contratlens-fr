import { Link } from 'react-router-dom'
import { FileText, Upload, MessageSquare, Database, Home } from 'lucide-react'

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        background: '#1e293b',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FileText size={28} />
            ContratLens FR
          </Link>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginLeft: 'auto' }}>
            <NavLink to="/" icon={<Home size={18} />}>Accueil</NavLink>
            <NavLink to="/upload" icon={<Upload size={18} />}>Télécharger</NavLink>
            <NavLink to="/documents" icon={<Database size={18} />}>Documents</NavLink>
          </div>
        </div>
      </nav>
      
      <main style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '2rem' }}>
        {children}
      </main>
      
      <footer style={{ 
        background: '#f8f9fa',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        color: '#64748b',
        borderTop: '1px solid #e2e8f0'
      }}>
        <p>© 2026 ContratLens FR - Analyse de Contrats avec IA</p>
      </footer>
    </div>
  )
}

function NavLink({ to, icon, children }) {
  return (
    <Link
      to={to}
      style={{
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
      onMouseLeave={(e) => e.target.style.background = 'transparent'}
    >
      {icon}
      {children}
    </Link>
  )
}
