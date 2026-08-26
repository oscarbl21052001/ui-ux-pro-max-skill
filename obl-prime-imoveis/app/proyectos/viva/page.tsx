'use client';

import { useState } from 'react';
import Image from 'next/image';

// ── Placeholder data — fill in final content here ─────────────────────────────
const CARDS = [
  {
    id: 1,
    title: 'VIVA BEM',
    description: 'Exclusivo pré-lançamento en Rua Pintassilgo, Bombinhas/SC.',
    img: '/VIVA BEM.png',
    href: '/empreendimentos/viva-bem',
  },
  {
    id: 2,
    title: 'Tarjeta 2',
    description: 'Descripción del proyecto 2. Añade aquí los detalles, tipología y características principales.',
    img: '/paisaje.jpg',
    href: '#',
  },
  {
    id: 3,
    title: 'Tarjeta 3',
    description: 'Descripción del proyecto 3. Añade aquí los detalles, tipología y características principales.',
    img: '/paisaje.jpg',
    href: '#',
  },
  {
    id: 4,
    title: 'Tarjeta 4',
    description: 'Descripción del proyecto 4. Añade aquí los detalles, tipología y características principales.',
    img: '/paisaje.jpg',
    href: '#',
  },
];

export default function VivaPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#080A0E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        gap: '2.5rem',
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontFamily: 'var(--font-playfair-display, Georgia, serif)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.01em',
          background: 'linear-gradient(90deg, #C9A24B 0%, #E3C174 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
          textAlign: 'center',
        }}
      >
        emprendimientos
      </h1>

      {/* Horizontal accordion */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1280px',
          height: 'clamp(340px, 60vh, 600px)',
          gap: '10px',
        }}
      >
        {CARDS.map((card) => {
          const isActive = hoveredId === card.id;
          const isIdle   = hoveredId === null;

          return (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => window.open(card.href, '_blank', 'noopener,noreferrer')}
              style={{
                // flex-grow drives the accordion — expanded card gets 3× share
                flex: isActive ? '3 1 0%' : '1 1 0%',
                transition: 'flex 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 14,
                cursor: 'pointer',
                border: isActive
                  ? '1px solid rgba(201,162,75,0.45)'
                  : '1px solid rgba(255,255,255,0.07)',
                boxShadow: isActive
                  ? '0 0 36px 6px rgba(201,162,75,0.12), 0 20px 50px -10px rgba(0,0,0,0.70)'
                  : '0 4px 20px -4px rgba(0,0,0,0.50)',
                minWidth: 0,
              }}
            >
              {/* Background image */}
              <Image
                src={card.img}
                alt=""
                fill
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.55s ease',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                }}
                sizes="(max-width: 768px) 100vw, 25vw"
              />

              {/* Gradient overlay — darker on hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: isActive
                    ? 'linear-gradient(to top, rgba(5,7,11,0.92) 0%, rgba(5,7,11,0.55) 55%, rgba(5,7,11,0.15) 100%)'
                    : 'linear-gradient(to top, rgba(5,7,11,0.70) 0%, rgba(5,7,11,0.20) 60%, transparent 100%)',
                  transition: 'background 0.45s ease',
                }}
              />

              {/* Vertical title — visible when collapsed */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '1.25rem',
                  opacity: isActive ? 0 : (isIdle ? 1 : 0.35),
                  transition: 'opacity 0.35s ease',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    fontFamily: 'var(--font-inter, sans-serif)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.70)',
                  }}
                >
                  {card.title}
                </span>
              </div>

              {/* Expanded content — visible on hover */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem 1.75rem',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'opacity 0.38s ease 0.1s, transform 0.38s ease 0.1s',
                  pointerEvents: 'none',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                    fontWeight: 800,
                    color: '#F5E6A8',
                    margin: '0 0 0.5rem',
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-inter, sans-serif)',
                    fontSize: '0.8rem',
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.68)',
                    margin: '0 0 1.25rem',
                  }}
                >
                  {card.description}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-inter, sans-serif)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: '#C9A24B',
                    borderBottom: '1px solid rgba(201,162,75,0.45)',
                    paddingBottom: '2px',
                  }}
                >
                  Ver Mais →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
