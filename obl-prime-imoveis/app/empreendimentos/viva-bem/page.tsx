import Image from 'next/image';

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

          {/* Divider — spans full title width, fades right */}
          <div
            style={{
              width: '100%',
              height: '2px',
              background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
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
            Más que una propiedad, este proyecto ha sido concebido para quienes valoran la calidad
            de vida, la practicidad y una ubicación estratégica. Diseñado para disfrutar del máximo
            confort, combina una arquitectura contemporánea, ambientes perfectamente distribuidos y
            una localización que facilita la rutina diaria en todos los sentidos.
            <br /><br />
            Es el espacio donde la comodidad, la movilidad y la tranquilidad conviven en armonía:
            ideal tanto para quienes buscan vivir con más tiempo y menos preocupaciones, como para
            quienes desean disfrutar de su tiempo libre o rentabilizar su inversión de forma
            inteligente.
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
