// Responsive utility functions
export const useResponsive = () => {
  const isMobile = () => window.innerWidth < 768
  const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024
  const isDesktop = () => window.innerWidth >= 1024

  return { isMobile: isMobile(), isTablet: isTablet(), isDesktop: isDesktop() }
}

// Responsive style helpers
export const responsive = {
  // Spacing
  padding: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem'
  },
  
  // Typography
  fontSize: {
    heroTitle: 'clamp(2rem, 8vw, 4.5rem)',
    title: 'clamp(1.5rem, 5vw, 2.5rem)',
    subtitle: 'clamp(1rem, 3vw, 1.25rem)',
    body: 'clamp(0.875rem, 2.5vw, 1rem)',
    small: 'clamp(0.75rem, 2vw, 0.875rem)'
  },
  
  // Layout
  maxWidth: {
    content: '1400px',
    text: '900px'
  },
  
  // Grid
  gridColumns: (min = '280px') => `repeat(auto-fit, minmax(min(${min}, 100%), 1fr))`,
  
  // Gaps
  gap: {
    small: 'clamp(0.5rem, 2vw, 0.75rem)',
    medium: 'clamp(0.75rem, 3vw, 1.25rem)',
    large: 'clamp(1rem, 4vw, 2rem)'
  }
}
