import { Link } from 'react-router-dom'
import { Upload, MessageSquare, FileSearch, Shield, Sparkles, Zap, Lock, TrendingUp } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function HomePage() {
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all scroll-animate elements
    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ animation: 'slideUp 0.6s ease-out' }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '5rem',
        padding: '3rem 1rem',
        position: 'relative'
      }}>
        {/* Animated background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 4s ease-in-out infinite',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '0.5rem 1.5rem',
          borderRadius: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)',
          position: 'relative',
          zIndex: 1
        }}>
          <Sparkles size={16} style={{ color: '#00ff9d' }} />
          <span style={{ 
            fontSize: '0.875rem', 
            fontWeight: 700,
            color: '#00ff9d',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Propulsé par l'IA
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: '4.5rem', 
          fontWeight: 900, 
          background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1.5rem',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          position: 'relative',
          zIndex: 1,
          textShadow: '0 0 80px rgba(16, 185, 129, 0.3)'
        }}>
          Analysez vos contrats<br />
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #00ff9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>en quelques secondes</span>
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#8b92b0',
          maxWidth: '700px', 
          margin: '0 auto 3rem',
          lineHeight: 1.7,
          fontWeight: 400,
          position: 'relative',
          zIndex: 1
        }}>
          Assistant d'analyse de contrats français utilisant RAG et LLM.
          Téléchargez vos documents, posez des questions, obtenez des réponses précises avec citations.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <Link
            to="/upload"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #00ff9d 0%, #00d4aa 100%)',
              color: '#000',
              padding: '1.25rem 2.75rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: 800,
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.4), 0 10px 30px -5px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 0 60px rgba(16, 185, 129, 0.6), 0 20px 40px -5px rgba(0, 0, 0, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.4), 0 10px 30px -5px rgba(0, 0, 0, 0.5)'
            }}
          >
            <Upload size={22} />
            Commencer maintenant
          </Link>
          
          <Link
            to="/documents"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#00ff9d',
              padding: '1.25rem 2.75rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: 800,
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'
            }}
          >
            Mes documents
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div ref={featuresRef} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '5rem' 
      }}>
        <FeatureCard
          icon={<Upload size={28} />}
          title="Téléchargement Facile"
          description="Importez vos contrats PDF ou DOCX en toute sécurité. Drag & drop supporté."
        />
        <FeatureCard
          icon={<FileSearch size={28} />}
          title="Analyse Intelligente"
          description="Extraction automatique des clauses, risques et obligations importantes."
        />
        <FeatureCard
          icon={<MessageSquare size={28} />}
          title="Q&R Instantanée"
          description="Posez des questions en français et obtenez des réponses avec preuves."
        />
        <FeatureCard
          icon={<Shield size={28} />}
          title="Anti-hallucination"
          description="Réponses uniquement basées sur le contenu réel de vos documents."
        />
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="scroll-animate" style={{
        background: 'rgba(16, 185, 129, 0.05)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        boxShadow: '0 0 60px rgba(16, 185, 129, 0.1)',
        marginBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <StatCard icon={<Zap />} value="< 3s" label="Temps de réponse" />
          <StatCard icon={<Lock />} value="100%" label="Données locales" />
          <StatCard icon={<TrendingUp />} value="95%+" label="Précision" />
          <StatCard icon={<Sparkles />} value="Gratuit" label="Avec Ollama" />
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="scroll-animate" style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '1.5rem',
        padding: '4rem 2rem',
        textAlign: 'center',
        boxShadow: '0 0 80px rgba(16, 185, 129, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated corner glows */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(5, 150, 105, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite 3s'
        }}></div>

        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 1,
          letterSpacing: '-0.02em'
        }}>
          Prêt à analyser vos contrats ?
        </h2>
        <p style={{ 
          fontSize: '1.125rem', 
          color: '#8b92b0',
          marginBottom: '2.5rem',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          Gagnez du temps et réduisez les risques avec notre assistant IA
        </p>
        <Link
          to="/upload"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'linear-gradient(135deg, #00ff9d 0%, #00d4aa 100%)',
            color: '#000',
            padding: '1.125rem 2.5rem',
            borderRadius: '1rem',
            textDecoration: 'none',
            fontSize: '1.125rem',
            fontWeight: 800,
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)',
            transition: 'all 0.3s',
            position: 'relative',
            zIndex: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'
            e.currentTarget.style.boxShadow = '0 0 60px rgba(16, 185, 129, 0.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.5)'
          }}
        >
          <Upload size={22} />
          Télécharger un contrat
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="scroll-animate" style={{
      background: 'rgba(16, 185, 129, 0.05)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      padding: '2rem',
      borderRadius: '1.25rem',
      boxShadow: '0 0 30px rgba(16, 185, 129, 0.1)',
      textAlign: 'center',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)'
      e.currentTarget.style.boxShadow = '0 0 60px rgba(16, 185, 129, 0.3)'
      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.1)'
      e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)'
    }}>
      {/* Hover glow effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        opacity: 0,
        transition: 'opacity 0.4s',
        pointerEvents: 'none'
      }}></div>

      <div style={{ 
        background: 'linear-gradient(135deg, #00ff9d 0%, #00d4aa 100%)',
        width: '72px',
        height: '72px',
        borderRadius: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ color: '#000' }}>
          {icon}
        </div>
      </div>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 700, 
        marginBottom: '0.75rem', 
        color: '#ffffff',
        letterSpacing: '-0.01em',
        position: 'relative',
        zIndex: 1
      }}>
        {title}
      </h3>
      <p style={{ color: '#8b92b0', lineHeight: 1.6, fontSize: '0.95rem', position: 'relative', zIndex: 1 }}>
        {description}
      </p>
    </div>
  )
}

function StatCard({ icon, value, label }) {
  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '0.75rem',
        color: '#00ff9d'
      }}>
        {icon}
      </div>
      <div style={{ 
        fontSize: '2.5rem', 
        fontWeight: 900, 
        background: 'linear-gradient(135deg, #00ff9d 0%, #00d4ff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem',
        letterSpacing: '-0.02em'
      }}>
        {value}
      </div>
      <div style={{ fontSize: '0.95rem', color: '#8b92b0', fontWeight: 600 }}>
        {label}
      </div>
    </div>
  )
}
