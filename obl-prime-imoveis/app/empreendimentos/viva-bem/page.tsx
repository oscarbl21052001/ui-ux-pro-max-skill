import Image from 'next/image';

export default function VivaBemPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#A28B60',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem 0',
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

      {/* ── Location / Map section ───────────────────────────────────── */}
      <section
        style={{
          width: '100%',
          maxWidth: '1200px',
          marginTop: '5rem',
          paddingBottom: '5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontFamily: 'var(--font-inter, sans-serif)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.60)',
            margin: '0 0 0.75rem',
          }}>
            Localização
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 style={{
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              Rua Pintassilgo — Bombinhas / SC
            </h2>
            {/* "exact address TBC" badge */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.75rem',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: '2rem',
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '0.60rem',
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A24B', display: 'inline-block', flexShrink: 0 }} />
              Numeração em confirmação
            </span>
          </div>
        </div>

        {/* Map container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(320px, 45vh, 520px)',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 24px 60px -12px rgba(0,0,0,0.35)',
        }}>
          {/* OSM iframe — grayscale via CSS filter */}
          <iframe
            title="Localização Rua Pintassilgo, Bombinhas SC"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-48.5255%2C-27.1410%2C-48.5050%2C-27.1260&layer=mapnik&marker=-27.1350%2C-48.5148"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              filter: 'grayscale(1) contrast(1.05) brightness(0.92)',
              display: 'block',
            }}
            loading="lazy"
          />

          {/* Gold pin overlay — centered on marker position */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Pin bubble */}
            <div style={{
              background: '#C9A24B',
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.40)',
            }}>
              <svg style={{ transform: 'rotate(45deg)' }} width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            {/* Label */}
            <div style={{
              marginTop: 4,
              background: '#C9A24B',
              color: '#fff',
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '0.3rem 0.7rem',
              borderRadius: '0.5rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.30)',
            }}>
              Rua Pintassilgo
            </div>
          </div>

          {/* Subtle vignette overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(162,139,96,0.30) 100%)',
            pointerEvents: 'none',
            zIndex: 5,
          }} />
        </div>

        {/* Bottom detail row */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '1.25rem',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Município', value: 'Bombinhas' },
            { label: 'Estado', value: 'Santa Catarina' },
            { label: 'País', value: 'Brasil' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ margin: 0, fontFamily: 'var(--font-inter, sans-serif)', fontSize: '0.60rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)' }}>
                {label}
              </p>
              <p style={{ margin: 0, fontFamily: 'var(--font-inter, sans-serif)', fontSize: '0.88rem', fontWeight: 500, color: 'rgba(255,255,255,0.88)', marginTop: '0.2rem' }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
