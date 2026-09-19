import { Link, useLocation } from 'react-router-dom'
import { FileText, Upload, Database, Home, Zap, Menu, X } from 'lucide-react'
import ParticleNetwork from './ParticleNetwork'
import { useState } from 'react'

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Particle Network Background */}
      <ParticleNetwork />
      
      {/* Navigation */}
      <nav style={{
        background: 'rgba(5, 8, 17, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 255, 157, 0.1)',
        padding: '1rem clamp(1rem, 5vw, 2rem)',
        boxShadow: '0 4px 30px rgba(0, 212, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 2rem)' }}>
          {/* Logo */}
          <Link to="/" style={{ 
            fontSize: 'clamp(1.125rem, 4vw, 1.5rem)', 
            fontWeight: 900,
            color: '#00ff9d',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 2vw, 0.75rem)',
            letterSpacing: '-0.03em',
            textShadow: '0 0 20px rgba(0, 255, 157, 0.5)',
            flexShrink: 0
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
              padding: 'clamp(0.4rem, 1.5vw, 0.6rem)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0, 255, 157, 0.4)',
              position: 'relative'
            }}>
              <FileText size={window.innerWidth < 768 ? 18 : 24} style={{ color: '#0a0e27' }} />
              <div style={{
                position: 'absolute',
                inset: '-2px',
                background: 'linear-gradient(135deg, #00ff9d, #00d4ff)',
                borderRadius: '0.875rem',
                filter: 'blur(8px)',
                opacity: 0.5,
                zIndex: -1
              }}></div>
            </div>
            <span style={{ display: window.innerWidth < 480 ? 'none' : 'inline' }}>ContratLens</span>
            <span style={{ 
              fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
              background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
              color: '#050811',
              padding: '0.2rem 0.6rem',
              borderRadius: '0.375rem',
              fontWeight: 800,
              boxShadow: '0 0 15px rgba(0, 255, 157, 0.3)'
            }}>FR</span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: window.innerWidth >= 768 ? 'none' : 'flex',
              marginLeft: 'auto',
              background: 'rgba(0, 255, 157, 0.1)',
              border: '1px solid rgba(0, 255, 157, 0.3)',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              color: '#00ff9d',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation Links */}
          <div style={{ 
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            gap: '0.5rem', 
            marginLeft: 'auto',
            flexWrap: 'wrap'
          }}>
            <NavLink to="/" icon={<Home size={18} />}>Accueil</NavLink>
            <NavLink to="/upload" icon={<Upload size={18} />}>Télécharger</NavLink>
            <NavLink to="/documents" icon={<Database size={18} />}>Documents</NavLink>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div style={{
            display: window.innerWidth >= 768 ? 'none' : 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(0, 255, 157, 0.1)',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <MobileNavLink to="/" icon={<Home size={18} />} onClick={() => setMobileMenuOpen(false)}>
              Accueil
            </MobileNavLink>
            <MobileNavLink to="/upload" icon={<Upload size={18} />} onClick={() => setMobileMenuOpen(false)}>
              Télécharger
            </MobileNavLink>
            <MobileNavLink to="/documents" icon={<Database size={18} />} onClick={() => setMobileMenuOpen(false)}>
              Documents
            </MobileNavLink>
          </div>
        )}
      </nav>
      
      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        maxWidth: '1400px', 
        width: '100%', 
        margin: '0 auto', 
        padding: 'clamp(1rem, 5vw, 2.5rem)',
        animation: 'fadeIn 0.5s ease-out',
        position: 'relative',
        zIndex: 1
      }}>
        {children}
      </main>
      
      {/* Footer */}
      <footer style={{ 
        background: 'rgba(5, 8, 17, 0.9)',
        backdropFilter: 'blur(20px)',
        padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 5vw, 2rem)',
        textAlign: 'center',
        borderTop: '1px solid rgba(0, 255, 157, 0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.75rem', 
            marginBottom: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <Zap size={18} style={{ color: '#00ff9d' }} />
            <span style={{ 
              fontWeight: 700, 
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              ContratLens FR
            </span>
          </div>
          <p style={{ 
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', 
            color: '#a0a0a0', 
            marginBottom: '0.5rem', 
            fontWeight: 500,
            padding: '0 1rem'
          }}>
            Analyse de contrats intelligente • Propulsé par l'IA
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: 'clamp(0.7rem, 2vw, 0.8125rem)',
            color: '#808080',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#00ff9d',
              boxShadow: '0 0 10px rgba(0, 255, 157, 0.6)',
              animation: 'pulse 2s ease-in-out infinite'
            }}></div>
            <span>Système opérationnel</span>
            <span>•</span>
            <span>© 2026</span>
          </div>
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
        color: isActive ? '#00ff9d' : '#b0b0b0',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1.25rem',
        borderRadius: '0.75rem',
        fontWeight: isActive ? 700 : 500,
        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
        background: isActive ? 'rgba(0, 255, 157, 0.1)' : 'transparent',
        border: isActive ? '1px solid rgba(0, 255, 157, 0.3)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        whiteSpace: 'nowrap'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(0, 255, 157, 0.05)'
          e.currentTarget.style.color = '#00ff9d'
          e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.2)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#b0b0b0'
          e.currentTarget.style.borderColor = 'transparent'
        }
      }}
    >
      {icon}
      {children}
      {isActive && (
        <div style={{
          position: 'absolute',
          bottom: '-1px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ff9d, transparent)',
          boxShadow: '0 0 10px rgba(0, 255, 157, 0.6)'
        }}></div>
      )}
    </Link>
  )
}

function MobileNavLink({ to, icon, children, onClick }) {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        color: isActive ? '#00ff9d' : '#b0b0b0',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.875rem 1rem',
        borderRadius: '0.75rem',
        fontWeight: isActive ? 700 : 500,
        fontSize: '1rem',
        background: isActive ? 'rgba(0, 255, 157, 0.1)' : 'transparent',
        border: isActive ? '1px solid rgba(0, 255, 157, 0.3)' : '1px solid rgba(0, 255, 157, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {icon}
      {children}
    </Link>
  )
}
