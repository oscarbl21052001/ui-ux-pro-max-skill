'use client';

import { useState } from 'react';

const PHONE   = '5547991376652';
const MESSAGE = encodeURIComponent('¡Hola! Estoy interesado/a en propiedades en Bombinhas. ¿Podrías ayudarme?');
const WA_URL  = `https://wa.me/${PHONE}?text=${MESSAGE}`;

const WaIcon = ({ size = 28 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} fill="white">
    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.72.7 5.28 1.93 7.51L.5 31.5l8.23-1.9A15.45 15.45 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.73 13.73 0 0 1-7.02-1.92l-.5-.3-5.2 1.2 1.24-5.05-.33-.52A13.8 13.8 0 1 1 16 28.8zm7.58-10.3c-.41-.2-2.44-1.2-2.82-1.34-.37-.14-.64-.2-.91.21-.27.41-1.05 1.34-1.28 1.61-.24.27-.47.3-.88.1a11.1 11.1 0 0 1-3.27-2.02 12.3 12.3 0 0 1-2.26-2.82c-.24-.41 0-.63.18-.84.16-.18.37-.47.55-.7.18-.24.24-.41.37-.68.12-.27.06-.5-.03-.7-.1-.21-.91-2.2-1.25-3.01-.33-.79-.66-.68-.91-.69h-.77c-.27 0-.7.1-1.07.5-.37.41-1.4 1.37-1.4 3.33s1.43 3.86 1.63 4.13c.2.27 2.82 4.3 6.83 6.03 4.01 1.72 4.01 1.15 4.73 1.08.72-.07 2.44-.99 2.78-1.95.35-.96.35-1.78.24-1.95-.1-.17-.37-.27-.78-.48z" />
  </svg>
);

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* ── Desktop: botón flotante expandible ─────────────────────────── */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="hidden sm:flex fixed bottom-6 right-6 z-[200] items-center justify-center animate-whatsapp-pulse"
        style={{
          height: 60,
          borderRadius: 30,
          background: '#25D366',
          boxShadow: hovered
            ? '0 8px 32px rgba(37,211,102,0.5)'
            : '0 4px 20px rgba(37,211,102,0.35)',
          textDecoration: 'none',
          transition: 'width 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s, border-radius 0.35s',
          width: hovered ? 230 : 60,
          paddingLeft: hovered ? 18 : 0,
          paddingRight: hovered ? 22 : 0,
          gap: hovered ? 10 : 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: 60,
          height: 60,
        }}>
          <WaIcon size={34} />
        </span>
        <span style={{
          color: 'white',
          fontFamily: 'var(--font-inter)',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.03em',
          opacity: hovered ? 1 : 0,
          maxWidth: hovered ? 160 : 0,
          overflow: 'hidden',
          transition: 'opacity 0.2s 0.1s, max-width 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          pointerEvents: 'none',
          flexShrink: 0,
        }}>
          ¿Hablamos? Escribinos
        </span>
      </a>

      {/* ── Móvil: barra fija en la parte inferior ──────────────────────── */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 z-[200] flex"
        style={{
          background: 'rgba(8,10,14,0.96)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '0.65rem 1rem',
          gap: '0.75rem',
          paddingBottom: 'max(0.65rem, env(safe-area-inset-bottom))',
        }}
      >
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#25D366',
            borderRadius: 12,
            padding: '0.75rem',
            color: 'white',
            fontFamily: 'var(--font-inter)',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          <WaIcon size={20} />
          WhatsApp
        </a>
        <a
          href={`tel:+${PHONE}`}
          style={{
            flex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'rgba(201,162,75,0.12)',
            border: '1px solid rgba(201,162,75,0.6)',
            borderRadius: 12,
            padding: '0.75rem',
            color: '#E3C174',
            fontFamily: 'var(--font-inter)',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3C174" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.59 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
          </svg>
          Llamar
        </a>
      </div>
    </>
  );
}
