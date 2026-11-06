export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(5, 6, 9, 0.98)',
      borderTop: '1px solid rgba(201,162,75,0.12)',
      padding: '2rem 3rem',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      fontFamily: 'var(--font-inter)',
    }}>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', margin: 0 }}>
        © {new Date().getFullYear()} Inmobiliaria Lucía Rodríguez · Bombinhas, SC, Brasil
      </p>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <a
          href="/politica-privacidad"
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.78rem',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9A24B')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
        >
          Aviso Legal y Privacidad
        </a>
        <a
          href="mailto:lucia.corretorabrasil@gmail.com"
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.78rem',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9A24B')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
        >
          lucia.corretorabrasil@gmail.com
        </a>
      </div>
    </footer>
  );
}
