import { Link } from 'react-router-dom'
import { Upload, MessageSquare, FileSearch, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>
          ContratLens FR 🇫🇷
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>
          Assistant d'analyse de contrats français utilisant RAG et LLM open-source.
          Téléchargez vos contrats, posez des questions, obtenez des réponses avec citations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <FeatureCard
          icon={<Upload size={32} />}
          title="Téléchargement"
          description="Importez vos contrats PDF ou DOCX en toute sécurité"
        />
        <FeatureCard
          icon={<FileSearch size={32} />}
          title="Analyse Structurée"
          description="Extraction automatique des livrables, risques et exigences"
        />
        <FeatureCard
          icon={<MessageSquare size={32} />}
          title="Questions & Réponses"
          description="Posez des questions et obtenez des réponses avec sources"
        />
        <FeatureCard
          icon={<Shield size={32} />}
          title="Anti-hallucination"
          description="Réponses uniquement basées sur le contenu indexé"
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link
          to="/upload"
          style={{
            display: 'inline-block',
            background: '#3b82f6',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontSize: '1.125rem',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(59, 130, 246, 0.2)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#2563eb'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#3b82f6'
            e.target.style.transform = 'translateY(0)'
          }}
        >
          Commencer l'analyse
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <div style={{ color: '#3b82f6', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
        {title}
      </h3>
      <p style={{ color: '#64748b' }}>
        {description}
      </p>
    </div>
  )
}
