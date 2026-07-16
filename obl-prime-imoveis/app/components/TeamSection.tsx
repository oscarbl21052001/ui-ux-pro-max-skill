'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // scrollYProgress: 0 = section enters from bottom, 1 = section exits from top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Entry 0→0.20 · Plateau 0.20→0.78 · Exit 0.78→1.0
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.20, 0.78, 1.0],
    [0,  1,   1,   0]
  );
  const blurPx = useTransform(
    scrollYProgress,
    [0, 0.20, 0.78, 1.0],
    [20, 0,   0,   20]
  );
  const cardFilter = useTransform(blurPx, (v) => `blur(${v.toFixed(1)}px)`);

  return (
    <section
      ref={sectionRef}
      id="bombinhas"
      className="relative px-6 pt-28 pb-24 md:pt-40 md:pb-40"
    >
      <div className="relative mx-auto max-w-7xl" style={{ zIndex: 1 }}>

        {/* Animation wrapper — scroll-driven blur+fade, zero Y movement */}
        <motion.div
          style={{
            opacity,
            filter: cardFilter,
            willChange: 'opacity, filter',
          }}
        >
          {/* Glassmorphic card */}
          <div
            className="mx-auto max-w-4xl space-y-8 rounded-3xl px-10 py-10 md:px-14 md:py-12 text-center"
            style={{
              background: 'rgba(10, 12, 16, 0.38)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 48px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              transform: 'translateZ(0)',
              isolation: 'isolate',
            }}
          >

            {/* ── Kicker + Title ────────────────────────────────────────── */}
            <div className="space-y-6">
              <p
                className="font-cardo italic"
                style={{
                  color: '#C9A24B',
                  fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                  letterSpacing: '0.08em',
                }}
              >
                ¿POR QUÉ DEBERÍA ELEGIR BOMBINHAS?
              </p>

              <h2
                className="font-bold text-white"
                style={{
                  fontFamily: 'var(--font-perandory)',
                  fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                  lineHeight: 1.14,
                }}
              >
                <span className="block">Un inversor</span>
                <span className="block" style={{ color: 'rgba(201,162,75,0.78)' }}>
                  no busca promesas.
                </span>
                <span className="block">Busca garantías legales</span>
              </h2>
            </div>

            {/* ── Data box ──────────────────────────────────────────────── */}
            <motion.div
              className="rounded-lg px-6 py-5 space-y-2"
              style={{
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(201,162,75,0.32)',
                background: 'rgba(201,162,75,0.04)',
              }}
              whileHover={{
                borderColor: 'rgba(201,162,75,0.82)',
                background: 'rgba(201,162,75,0.13)',
                boxShadow: '0 0 28px 6px rgba(212,175,55,0.15)',
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <p
                className="font-inter font-semibold uppercase leading-relaxed"
                style={{
                  color: '#C9A24B',
                  fontSize: 'clamp(0.68rem, 1.1vw, 0.8rem)',
                  letterSpacing: '0.14em',
                }}
              >
                67% DEL TERRITORIO PROTEGIDO POR LEY&nbsp;&nbsp;
                <span style={{ opacity: 0.55 }}>•</span>
                &nbsp;&nbsp;100% PROTEGIDO DE LA SOBREOFERTA
              </p>
              <p
                className="font-cardo italic"
                style={{ color: 'rgba(255,255,255,0.90)', fontSize: '1rem' }}
              >
                Un solo resultado: escasez permanente.
              </p>
            </motion.div>

            {/* ── Paragraph + Button ────────────────────────────────────── */}
            <div className="space-y-10">
              <p
                className="font-cardo leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.68)',
                  fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
                }}
              >
                La belleza de Bombinhas está legalmente obligada a permanecer
                intacta. Tu inversión, también.
              </p>

              <motion.a
                href="/bombinhas-info"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full font-inter font-semibold"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(201,162,75,0.50)',
                  color: '#C9A24B',
                  background: 'transparent',
                  padding: '0.75rem 2rem',
                  fontSize: '0.875rem',
                  letterSpacing: '0.03em',
                  boxShadow: '0 0 0 0 rgba(201,162,75,0)',
                }}
                whileHover={{
                  borderColor: 'rgba(212,175,55,1)',
                  color: '#F5E6A8',
                  background: 'rgba(201,162,75,0.10)',
                  boxShadow: '0 0 36px 10px rgba(212,175,55,0.18), 0 0 0 1px rgba(212,175,55,0.85)',
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                Más info
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  style={{ fontSize: '1rem' }}
                >→</span>
              </motion.a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
