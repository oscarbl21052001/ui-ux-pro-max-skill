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
        {/*
          Pop-out technique:
          - Outer wrapper has paddingTop to reserve overflow space.
          - Card (colored bg) and Image are SIBLINGS inside the wrapper.
          - Image is position:absolute bottom:0 so it anchors at the card
            bottom and extends upward by (cardHeight + popAmount).
          - This means the top (popAmount) of the image floats above the card.
          - PNG transparency lets the building silhouette appear above the frame.
        */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingTop: '4rem',   /* space reserved for the pop-out overflow */
          }}
        >
          {/* 1 — Rounded background card (deep green contrasts a render PNG) */}
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              height: '480px',
              borderRadius: '2rem',
              background: 'linear-gradient(160deg, #1C3D2C 0%, #142C1F 100%)',
              border: '1px solid rgba(201,162,75,0.22)',
              boxShadow: '0 28px 70px -14px rgba(10,25,15,0.50), 0 0 0 1px rgba(201,162,75,0.10)',
              position: 'relative',   /* stacking context for badge */
              flexShrink: 0,
            }}
          >
            {/* Badge — sits inside the card, below the building */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                zIndex: 5,
                background: 'rgba(255,255,255,0.14)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '0.75rem',
                padding: '0.6rem 1rem',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <p style={{ margin: 0, fontFamily: 'var(--font-inter, sans-serif)', fontSize: '0.60rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A24B' }}>
                Pré-lançamento
              </p>
              <p style={{ margin: 0, fontFamily: 'var(--font-inter, sans-serif)', fontSize: '0.73rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginTop: '0.15rem' }}>
                Rua Pintassilgo · Bombinhas
              </p>
            </div>
          </div>

          {/* 2 — Image: sibling of card, anchored at bottom, pops above */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '88%',
              maxWidth: '380px',
              /* card height (480px) + pop amount (4rem ≈ 64px) = 544px */
              height: 'calc(480px + 4rem)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <Image
              src="/PERFIL VIVA BEM.png"
              alt="Viva Bem — render del edificio"
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'bottom center',
                filter: 'drop-shadow(0 18px 36px rgba(8,20,10,0.45))',
              }}
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
