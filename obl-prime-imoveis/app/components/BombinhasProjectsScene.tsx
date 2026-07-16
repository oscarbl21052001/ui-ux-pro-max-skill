'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STATS = [
  {
    value: '150+',
    label: 'Projects Completed',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mx-auto mb-4">
        <circle cx="20" cy="20" r="18" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" />
        <path d="M20 10l2.5 5.5H28l-4.5 3.5 1.5 5.5L20 21l-5 3.5 1.5-5.5L12 15.5h5.5L20 10z" fill="#C9A24B" opacity="0.85" />
      </svg>
    ),
  },
  {
    value: '1200+',
    label: 'Happy Clients',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mx-auto mb-4">
        <circle cx="20" cy="20" r="18" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" />
        <circle cx="15" cy="16" r="3" fill="#C9A24B" opacity="0.85" />
        <circle cx="25" cy="16" r="3" fill="#C9A24B" opacity="0.85" />
        <path d="M10 26c0-3.3 4.5-5 10-5s10 1.7 10 5" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
      </svg>
    ),
  },
  {
    value: '12',
    label: 'Years Experience',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mx-auto mb-4">
        <circle cx="20" cy="20" r="18" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" />
        <rect x="12" y="12" width="16" height="16" rx="2" stroke="#C9A24B" strokeWidth="1.5" opacity="0.85" />
        <line x1="12" y1="17" x2="28" y2="17" stroke="#C9A24B" strokeWidth="1.5" opacity="0.85" />
        <line x1="17" y1="12" x2="17" y2="14" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        <line x1="23" y1="12" x2="23" y2="14" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
      </svg>
    ),
  },
  {
    value: '98%',
    label: 'Satisfaction Rate',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mx-auto mb-4">
        <circle cx="20" cy="20" r="18" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" />
        <polyline points="12,26 18,20 22,23 28,14" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
        <polyline points="24,14 28,14 28,18" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
      </svg>
    ),
  },
];

export default function BombinhasProjectsScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  // scrollYProgress: 0 = container top hits viewport top (sticky begins)
  //                  1 = container bottom hits viewport bottom (sticky releases)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Phase 1: Bombinhas card ─────────────────────────────────────────────
  // Fade-in  [0.00 → 0.08]: opacity 0→1, no blur (clean entry)
  // Plateau  [0.08 → 0.35]: full opacity, no blur
  // Blur-out [0.35 → 0.45]: opacity 1→0, blur 0→20px (card dissolves in place)
  const bombOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.35, 0.45],
    [0,  1,    1,    0]
  );
  const bombBlurPx = useTransform(
    scrollYProgress,
    [0, 0.35, 0.45],
    [0,  0,   20]
  );
  const bombFilter = useTransform(bombBlurPx, (v) => `blur(${v.toFixed(1)}px)`);

  // ── Phase 2: Proyectos cards ────────────────────────────────────────────
  // Zoom-in  [0.45 → 0.62]: scale 0.7→1, opacity 0→1, blur 10→0
  // Plateau  [0.62 → 1.00]: full opacity, scale 1, no blur
  const projOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.62],
    [0,    1]
  );
  const projScale = useTransform(
    scrollYProgress,
    [0.45, 0.62],
    [0.7,  1]
  );
  const projBlurPx = useTransform(
    scrollYProgress,
    [0.45, 0.62],
    [10,   0]
  );
  const projFilter = useTransform(projBlurPx, (v) => `blur(${v.toFixed(1)}px)`);

  return (
    // 300vh = 1vh of natural height + 200vh of extra scroll budget for the sticky scene
    <div ref={containerRef} id="bombinhas" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Phase 1: Bombinhas glassmorphic card ───────────────────── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{
            opacity: bombOpacity,
            filter: bombFilter,
            willChange: 'opacity, filter',
            pointerEvents: 'none',
          }}
        >
          <div
            className="mx-auto max-w-4xl w-full space-y-8 rounded-3xl px-10 py-10 md:px-14 md:py-12 text-center"
            style={{
              background: 'rgba(10, 12, 16, 0.38)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 48px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              transform: 'translateZ(0)',
              isolation: 'isolate',
              pointerEvents: 'auto',
            }}
          >
            <div className="space-y-6">
              <p
                className="font-cardo italic"
                style={{ color: '#C9A24B', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', letterSpacing: '0.08em' }}
              >
                ¿POR QUÉ DEBERÍA ELEGIR BOMBINHAS?
              </p>
              <h2
                className="font-bold text-white"
                style={{ fontFamily: 'var(--font-perandory)', fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', lineHeight: 1.14 }}
              >
                <span className="block">Un inversor</span>
                <span className="block" style={{ color: 'rgba(201,162,75,0.78)' }}>no busca promesas.</span>
                <span className="block">Busca garantías legales</span>
              </h2>
            </div>

            <motion.div
              className="rounded-lg px-6 py-5 space-y-2"
              style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(201,162,75,0.32)', background: 'rgba(201,162,75,0.04)' }}
              whileHover={{ borderColor: 'rgba(201,162,75,0.82)', background: 'rgba(201,162,75,0.13)', boxShadow: '0 0 28px 6px rgba(212,175,55,0.15)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <p
                className="font-inter font-semibold uppercase leading-relaxed"
                style={{ color: '#C9A24B', fontSize: 'clamp(0.68rem, 1.1vw, 0.8rem)', letterSpacing: '0.14em' }}
              >
                67% DEL TERRITORIO PROTEGIDO POR LEY&nbsp;&nbsp;
                <span style={{ opacity: 0.55 }}>•</span>
                &nbsp;&nbsp;100% PROTEGIDO DE LA SOBREOFERTA
              </p>
              <p className="font-cardo italic" style={{ color: 'rgba(255,255,255,0.90)', fontSize: '1rem' }}>
                Un solo resultado: escasez permanente.
              </p>
            </motion.div>

            <div className="space-y-10">
              <p
                className="font-cardo leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)' }}
              >
                La belleza de Bombinhas está legalmente obligada a permanecer intacta. Tu inversión, también.
              </p>
              <motion.a
                href="/bombinhas-info"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full font-inter font-semibold"
                style={{
                  borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(201,162,75,0.50)',
                  color: '#C9A24B', background: 'transparent',
                  padding: '0.75rem 2rem', fontSize: '0.875rem', letterSpacing: '0.03em',
                  boxShadow: '0 0 0 0 rgba(201,162,75,0)',
                }}
                whileHover={{ borderColor: 'rgba(212,175,55,1)', color: '#F5E6A8', background: 'rgba(201,162,75,0.10)', boxShadow: '0 0 36px 10px rgba(212,175,55,0.18), 0 0 0 1px rgba(212,175,55,0.85)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                Más info
                <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: '1rem' }}>→</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ── Phase 2: Proyectos cards (zoom-in from center) ─────────── */}
        <motion.div
          id="proyectos"
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          style={{
            opacity: projOpacity,
            scale: projScale,
            filter: projFilter,
            willChange: 'opacity, filter, transform',
            pointerEvents: 'none',
          }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent pb-10">
            PROYECTOS
          </h2>
          <div
            className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ pointerEvents: 'auto' }}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 text-center cursor-default"
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px -15px rgba(201, 162, 75, 0.18)' }}
                whileTap={{ scale: 0.98 }}
              >
                {stat.icon}
                <p className="font-extrabold text-4xl text-white font-inter mb-2">{stat.value}</p>
                <p className="text-neutral-400 text-sm tracking-wide font-inter uppercase">{stat.label}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
