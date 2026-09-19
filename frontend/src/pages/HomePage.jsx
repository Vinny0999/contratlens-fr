import { Link } from 'react-router-dom'
import { Upload, MessageSquare, FileSearch, Shield, Sparkles, Zap, Lock, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div style={{ animation: 'slideUp 0.6s ease-out' }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '4rem',
        padding: '3rem 1rem'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '0.5rem 1.25rem',
          borderRadius: '2rem',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <Sparkles size={16} style={{ color: '#764ba2' }} />
          <span style={{ 
            fontSize: '0.875rem', 
            fontWeight: 600,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Propulsé par l'IA
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1.5rem',
          lineHeight: 1.2,
          letterSpacing: '-0.02em'
        }}>
          Analysez vos contrats<br />en quelques secondes
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'rgba(255, 255, 255, 0.95)', 
          maxWidth: '700px', 
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
          fontWeight: 400,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          Assistant d'analyse de contrats français utilisant RAG et LLM.
          Téléchargez vos documents, posez des questions, obtenez des réponses précises avec citations.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/upload"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1.125rem 2.5rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: 700,
              boxShadow: '0 10px 25px -5px rgba(102, 126, 234, 0.5), 0 8px 10px -6px rgba(102, 126, 234, 0.5)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 20px 35px -5px rgba(102, 126, 234, 0.6), 0 10px 15px -6px rgba(102, 126, 234, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(102, 126, 234, 0.5), 0 8px 10px -6px rgba(102, 126, 234, 0.5)'
            }}
          >
            <Upload size={20} />
            Commencer maintenant
          </Link>
          
          <Link
            to="/documents"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#667eea',
              padding: '1.125rem 2.5rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: 700,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '2px solid rgba(255, 255, 255, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 20px 35px -5px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            Mes documents
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '3rem' 
      }}>
        <FeatureCard
          icon={<Upload size={28} />}
          title="Téléchargement Facile"
          description="Importez vos contrats PDF ou DOCX en toute sécurité. Drag & drop supporté."
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />
        <FeatureCard
          icon={<FileSearch size={28} />}
          title="Analyse Intelligente"
          description="Extraction automatique des clauses, risques et obligations importantes."
          gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        />
        <FeatureCard
          icon={<MessageSquare size={28} />}
          title="Q&R Instantanée"
          description="Posez des questions en français et obtenez des réponses avec preuves."
          gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        />
        <FeatureCard
          icon={<Shield size={28} />}
          title="Anti-hallucination"
          description="Réponses uniquement basées sur le contenu réel de vos documents."
          gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        />
      </div>

      {/* Stats Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        marginBottom: '3rem',
        border: '1px solid rgba(226, 232, 240, 0.5)'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          textAlign: 'center'
        }}>
          <StatCard icon={<Zap />} value="< 3s" label="Temps de réponse" />
          <StatCard icon={<Lock />} value="100%" label="Données locales" />
          <StatCard icon={<TrendingUp />} value="95%+" label="Précision" />
          <StatCard icon={<Sparkles />} value="Gratuit" label="Avec Ollama" />
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(102, 126, 234, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          color: 'white', 
          marginBottom: '1rem',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          Prêt à analyser vos contrats ?
        </h2>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'rgba(255, 255, 255, 0.9)', 
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Gagnez du temps et réduisez les risques avec notre assistant IA
        </p>
        <Link
          to="/upload"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'white',
            color: '#667eea',
            padding: '1rem 2.5rem',
            borderRadius: '1rem',
            textDecoration: 'none',
            fontSize: '1.125rem',
            fontWeight: 700,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'
            e.currentTarget.style.boxShadow = '0 20px 35px -5px rgba(0, 0, 0, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
          }}
        >
          <Upload size={20} />
          Télécharger un contrat
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '2rem',
      borderRadius: '1.25rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'default',
      border: '1px solid rgba(226, 232, 240, 0.5)',
      animation: 'fadeIn 0.6s ease-out'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)'
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        background: gradient,
        width: '64px',
        height: '64px',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        boxShadow: '0 8px 16px -4px rgba(102, 126, 234, 0.4)'
      }}>
        <div style={{ color: 'white' }}>
          {icon}
        </div>
      </div>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 700, 
        marginBottom: '0.75rem', 
        color: '#1e293b',
        letterSpacing: '-0.01em'
      }}>
        {title}
      </h3>
      <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>
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
        color: '#667eea'
      }}>
        {icon}
      </div>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 800, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem'
      }}>
        {value}
      </div>
      <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  )
}
