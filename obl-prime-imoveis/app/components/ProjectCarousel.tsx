'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  { slug: 'spot-335',         name: 'SPOT 335',           typology: 'Flats 35–55m² · 8 tipologías', distance: '450 m de la Playa de Bombinhas', img: '/projects/spot335-1.jpg'          },
  { slug: 'villa-di-trento',  name: 'VILLA DI TRENTO',    typology: 'Residence · Entre dos mares', distance: 'Canto Grande · Bombinhas', img: '/projects/villa-di-trento-1.jpg'  },
  { slug: 'bombas-home-club', name: 'BOMBAS HOME CLUB',   typology: '2 Suites · 87–93 m² · Rooftop', distance: '500 m de la Playa de Bombas', img: '/projects/bombas-home-club-1.jpg' },
  { slug: 'vogue-apartments', name: 'VOGUE APARTMENTS',   typology: 'Alto padrón · Rooftop',       distance: '250 m del mar',          img: '/projects/vogue-apartments-1.jpg' },
  { slug: 'solaia',           name: 'SOLAIA RESIDENCE',   typology: 'Apartamentos · 1 dormitorio', distance: 'Frente a la bahía · Zimbros', img: '/projects/solaia-1.jpg'      },
  { slug: 'enedina-mercedes', name: 'ENEDINA MERCEDES',   typology: 'Residence · 36 unidades',     distance: '250 m del mar · Centro', img: '/projects/enedina-mercedes-1.jpg' },
];

const VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function ProjectCarousel() {
  const router  = useRouter();
  const [index, setIndex]   = useState(0);
  const [dir,   setDir]     = useState(1);
  const dragStartX = useRef(0);

  const go = (d: 1 | -1) => {
    setDir(d);
    setIndex(i => (i + d + PROJECTS.length) % PROJECTS.length);
  };

  const p = PROJECTS[index];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      {/* ── Card ───────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 860,
          height: '100%',
          minHeight: 240,
          maxHeight: 460,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={p.slug}
            custom={dir}
            variants={VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.32, 0, 0.18, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={(_, info) => { dragStartX.current = info.point.x; }}
            onDragEnd={(_, info) => {
              const delta = info.offset.x;
              if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1);
            }}
            style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
            whileDrag={{ cursor: 'grabbing' }}
            onClick={() => router.push(`/proyectos/${p.slug}`)}
          >
            <Image
              src={p.img}
              alt={p.name}
              fill
              quality={80}
              className="object-cover pointer-events-none"
              sizes="(max-width: 860px) 100vw, 860px"
              loading="lazy"
            />
            {/* gradient */}
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* text overlay */}
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '28px 32px',
                pointerEvents: 'none',
              }}
            >
              <p style={{ color: '#C9A24B', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'var(--font-inter)', margin: '0 0 6px' }}>
                {p.distance}
              </p>
              <h3 style={{ fontFamily: 'var(--font-playfair-display)', fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.1 }}>
                {p.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', margin: '6px 0 0', letterSpacing: '0.06em' }}>
                {p.typology}
              </p>
              {/* CTA */}
              <div style={{ marginTop: 16 }}>
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '0.45rem 1.1rem',
                    background: 'linear-gradient(90deg, #C9A24B, #E3C174)',
                    borderRadius: 8,
                    color: '#0a0c10',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  Ver proyecto
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="#0a0c10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* counter top-right */}
            <div
              style={{
                position: 'absolute', top: 18, right: 20,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(8px)',
                borderRadius: 20,
                padding: '4px 12px',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.08em',
                pointerEvents: 'none',
              }}
            >
              {index + 1} / {PROJECTS.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Desktop arrows ──────────────────────────────────────────────── */}
      <button
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        aria-label="Anterior"
        style={{
          position: 'absolute', left: 'max(16px, calc(50% - 460px))', top: '50%',
          transform: 'translateY(-50%)',
          width: 48, height: 48,
          background: 'rgba(10,12,16,0.65)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(201,162,75,0.35)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s, background 0.2s',
          zIndex: 10,
        }}
        className="hidden sm:flex hover:border-[rgba(201,162,75,0.9)] hover:bg-[rgba(201,162,75,0.12)]"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9L11 14" stroke="#C9A24B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); go(1); }}
        aria-label="Siguiente"
        style={{
          position: 'absolute', right: 'max(16px, calc(50% - 460px))', top: '50%',
          transform: 'translateY(-50%)',
          width: 48, height: 48,
          background: 'rgba(10,12,16,0.65)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(201,162,75,0.35)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s, background 0.2s',
          zIndex: 10,
        }}
        className="hidden sm:flex hover:border-[rgba(201,162,75,0.9)] hover:bg-[rgba(201,162,75,0.12)]"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M7 4L12 9L7 14" stroke="#C9A24B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* ── Dot indicators ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 7, marginTop: 18 }}>
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
            aria-label={`Proyecto ${i + 1}`}
            style={{
              width: i === index ? 20 : 7,
              height: 7,
              borderRadius: 4,
              background: i === index ? '#C9A24B' : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
