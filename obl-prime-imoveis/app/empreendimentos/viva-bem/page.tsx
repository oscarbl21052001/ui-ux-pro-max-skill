import Image from 'next/image';

/* Treble-clef watermark SVG — inline so no extra file is needed */
const TrebleClefSVG = () => (
  <svg
    aria-hidden
    viewBox="0 0 120 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      left: '-2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '80vh',
      maxHeight: '640px',
      width: 'auto',
      opacity: 0.07,
      pointerEvents: 'none',
      userSelect: 'none',
    }}
  >
    {/* Simplified treble-clef path */}
    <path
      d="M60 10
         C60 10 80 30 80 60
         C80 80 70 95 58 100
         C70 108 85 125 85 150
         C85 185 62 210 42 215
         C55 220 65 235 65 250
         C65 270 50 285 35 285
         C20 285 10 272 10 258
         C10 244 20 232 35 232
         C42 232 48 236 52 242
         C48 230 40 220 30 215
         C15 208 5 190 5 168
         C5 138 28 112 55 105
         C42 98 32 82 32 62
         C32 35 45 10 60 10 Z
         M60 10 L60 290"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="35" cy="258" r="18" stroke="white" strokeWidth="5" fill="none" />
    <ellipse cx="52" cy="168" rx="30" ry="42" stroke="white" strokeWidth="5" fill="none" />
  </svg>
);

export default function VivaBemPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#A28B60',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Treble-clef watermark */}
      <TrebleClefSVG />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          maxWidth: '1200px',
          width: '100%',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left column: text ───────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
              margin: 0,
            }}
          >
            Exclusivo pré-lançamento · Bombinhas / SC
          </p>

          {/* Script title */}
          <h1
            style={{
              fontFamily: 'ParfumerieScript, Georgia, serif',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Viva Bem
          </h1>

          {/* Divider */}
          <div
            style={{
              width: '3rem',
              height: '2px',
              background: 'linear-gradient(to right, rgba(255,255,255,0.80), rgba(255,255,255,0.10))',
              borderRadius: 2,
            }}
          />

          {/* Body text */}
          <p
            style={{
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.88)',
              margin: 0,
              maxWidth: '38ch',
            }}
          >
            Un desarrollo residencial de alto padrón ubicado en{' '}
            <strong style={{ color: '#ffffff', fontWeight: 700 }}>Rua Pintassilgo</strong>,
            en el corazón de <strong style={{ color: '#ffffff', fontWeight: 700 }}>Bombinhas</strong>.
            Arquitectura contemporánea, acabados nobles y una localización privilegiada a minutos
            de las mejores playas de Santa Catarina. La inversión que combina rentabilidad y
            estilo de vida.
          </p>

          {/* CTA */}
          <a
            href="mailto:info@oblprime.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingTop: '0.85rem',
              paddingBottom: '0.85rem',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.35)',
              color: '#fff',
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              borderRadius: '3rem',
              textDecoration: 'none',
              alignSelf: 'flex-start',
              boxShadow: '0 4px 20px -4px rgba(0,0,0,0.25)',
              transition: 'background 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            Solicitar información →
          </a>
        </div>

        {/* ── Right column: image directa +50% ────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
          }}
        >
          <Image
            src="/VIVA BEM MEJORA.jpg"
            alt="Viva Bem — render del edificio"
            width={640}
            height={800}
            style={{
              width: '100%',
              maxWidth: '580px',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              transform: 'scale(1.5)',
              transformOrigin: 'center center',
            }}
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
      </div>
    </main>
  );
}
