'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const CARD_W = 300;
const CARD_H = 210;
const LERP_K = 0.09;

const PROJECTS = [
  { id: 1, num: '01', title: 'Residencial Brava Sul',  category: 'Condomínio Fechado',    img: '/paisaje.jpg' },
  { id: 2, num: '02', title: 'Vista Mar Premium',       category: 'Apartamentos de Luxo',  img: '/paisaje.jpg' },
  { id: 3, num: '03', title: 'Terraço Bombinhas',       category: 'Casas de Alto Padrão',  img: '/paisaje.jpg' },
  { id: 4, num: '04', title: 'Canto Grande Resort',     category: 'Investimento Turístico', img: '/paisaje.jpg' },
  { id: 5, num: '05', title: 'Ponta das Canas',         category: 'Lotes Exclusivos',      img: '/paisaje.jpg' },
];

export default function ProjectShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const cardRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);

  const tick = useCallback(() => {
    smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * LERP_K;
    smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * LERP_K;
    if (cardRef.current) {
      const x = Math.round(smoothRef.current.x) + 24;
      const y = Math.round(smoothRef.current.y) - Math.round(CARD_H / 2);
      cardRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const isHovered = hoveredId !== null;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
      style={{ pointerEvents: 'none' }}
    >
      {/* Glassmorphic card — same finish as Phase 1 Bombinhas card */}
      <div
        className="w-full max-w-2xl rounded-3xl px-10 py-10 md:px-12"
        style={{
          background: 'rgba(10, 12, 16, 0.38)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 48px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          transform: 'translateZ(0)',
          isolation: 'isolate',
          pointerEvents: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2
          className="font-extrabold tracking-tight pb-7 text-center"
          style={{
            fontFamily: 'var(--font-perandory)',
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            background: 'linear-gradient(90deg, #C9A24B 0%, #E3C174 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          PROYECTOS
        </h2>

        {/* Column headers */}
        <div
          className="flex items-center justify-between pb-3 mb-1"
          style={{ borderBottom: '1px solid rgba(201,162,75,0.18)' }}
        >
          <span style={{
            fontSize: '0.6rem', letterSpacing: '0.18em',
            color: 'rgba(201,162,75,0.45)', fontFamily: 'var(--font-inter)',
            textTransform: 'uppercase',
          }}>
            Proyecto
          </span>
          <span style={{
            fontSize: '0.6rem', letterSpacing: '0.18em',
            color: 'rgba(201,162,75,0.45)', fontFamily: 'var(--font-inter)',
            textTransform: 'uppercase',
          }}>
            Tipología
          </span>
        </div>

        {PROJECTS.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.055)',
              cursor: 'default',
              position: 'relative',
            }}
          >
            {/* Animated underline — grows from left on hover */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                bottom: -1, left: 0, right: 0,
                height: 1,
                background: 'linear-gradient(to right, #C9A24B, rgba(201,162,75,0.12))',
                transform: `scaleX(${hoveredId === p.id ? 1 : 0})`,
                transformOrigin: 'left',
                transition: 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />

            {/* Left: number + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{
                fontSize: '0.62rem', fontFamily: 'var(--font-inter)',
                color: 'rgba(201,162,75,0.42)', letterSpacing: '0.10em',
                minWidth: '1.8rem',
              }}>
                {p.num}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-cardo)',
                fontSize: 'clamp(1rem, 2vw, 1.45rem)',
                fontWeight: 400,
                color: hoveredId === p.id ? '#F5E6A8' : 'rgba(255,255,255,0.88)',
                transition: 'color 0.28s ease',
                lineHeight: 1.2,
                margin: 0,
              }}>
                {p.title}
              </h3>
            </div>

            {/* Right: category + arrow icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                fontSize: '0.62rem', fontFamily: 'var(--font-inter)',
                letterSpacing: '0.10em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)',
              }}>
                {p.category}
              </span>
              <ArrowUpRight
                size={15}
                style={{
                  color: '#C9A24B',
                  flexShrink: 0,
                  opacity: hoveredId === p.id ? 1 : 0,
                  transform: hoveredId === p.id ? 'translate(0, 0)' : 'translate(-3px, 3px)',
                  transition: 'opacity 0.28s ease, transform 0.28s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Floating image card — follows cursor via LERP */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0, left: 0,
          opacity: isHovered ? 1 : 0,
          filter: isHovered ? 'blur(0px)' : 'blur(6px)',
          transition: 'opacity 0.35s ease, filter 0.35s ease',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        <div
          ref={cardRef}
          style={{
            width: CARD_W, height: CARD_H,
            position: 'relative',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,162,75,0.18)',
            willChange: 'transform',
          }}
        >
          <Image
            src="/paisaje.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)',
          }} />
        </div>
      </div>
    </div>
  );
}
