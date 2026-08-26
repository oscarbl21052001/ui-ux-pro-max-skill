import Image from 'next/image';

export default function VivaBemPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5F0E8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        fontFamily: 'sans-serif',
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
              color: '#B8914A',
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
              color: '#2C2416',
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
              background: 'linear-gradient(to right, #C9A24B, rgba(201,162,75,0.25))',
              borderRadius: 2,
            }}
          />

          {/* Body text */}
          <p
            style={{
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: '#4A3F30',
              margin: 0,
              maxWidth: '38ch',
            }}
          >
            Un desarrollo residencial de alto padrón ubicado en Rua Pintassilgo,
            en el corazón de Bombinhas. Arquitectura contemporánea, acabados nobles
            y una localización privilegiada a minutos de las mejores playas de
            Santa Catarina. La inversión que combina rentabilidad y estilo de vida.
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
              background: '#C9A24B',
              color: '#fff',
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              borderRadius: '3rem',
              textDecoration: 'none',
              alignSelf: 'flex-start',
              boxShadow: '0 4px 20px -4px rgba(201,162,75,0.45)',
              transition: 'background 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            Solicitar información →
          </a>
        </div>

        {/* ── Right column: pop-out image ─────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            /* Extra top padding so the overflowing image has room */
            paddingTop: '3.5rem',
          }}
        >
          {/* Rounded background card */}
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              height: '480px',
              borderRadius: '2rem',
              background: 'linear-gradient(145deg, #EDE6D5 0%, #D9CFBB 100%)',
              border: '1px solid rgba(201,162,75,0.22)',
              boxShadow: '0 24px 60px -12px rgba(60,45,20,0.22), 0 0 0 1px rgba(201,162,75,0.12)',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Image — overflows the card from the top for the pop-out effect */}
            <div
              style={{
                position: 'absolute',
                /* Negative top pulls the image upward beyond the card edge */
                top: '-3.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '88%',
                height: 'calc(100% + 4rem)',
                zIndex: 10,
                /* Allow the image to visually overflow above */
                overflow: 'visible',
              }}
            >
              <Image
                src="/PERFIL VIVA BEM.png"
                alt="Viva Bem — render del edificio"
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  filter: 'drop-shadow(0 20px 40px rgba(30,20,5,0.30))',
                }}
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Subtle badge inside the card (bottom-left) */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                zIndex: 5,
                background: 'rgba(255,255,255,0.72)',
                backdropFilter: 'blur(10px)',
                borderRadius: '0.75rem',
                padding: '0.6rem 1rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
            >
              <p style={{ margin: 0, fontFamily: 'var(--font-inter, sans-serif)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8914A' }}>
                Pré-lançamento
              </p>
              <p style={{ margin: 0, fontFamily: 'var(--font-inter, sans-serif)', fontSize: '0.75rem', fontWeight: 600, color: '#2C2416', marginTop: '0.1rem' }}>
                Rua Pintassilgo · Bombinhas
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
