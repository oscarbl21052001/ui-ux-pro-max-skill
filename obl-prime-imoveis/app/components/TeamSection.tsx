'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // ── Scroll-linked 3D fly-in ──────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 40%'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Group 1: kicker + title — leads, first to land
  const titleScale   = useTransform(smooth, [0, 1], [2.0, 1]);
  const titleZ       = useTransform(smooth, [0, 1], [380, 0]);
  const titleOpacity = useTransform(smooth, [0, 0.5], [0, 1]);
  const titleBlurN   = useTransform(smooth, [0, 0.6], [8, 0]);
  const titleFilter  = useTransform(titleBlurN, (v) => `blur(${v}px)`);

  // Group 2: data box — one beat behind
  const boxScale   = useTransform(smooth, [0.05, 1], [2.6, 1]);
  const boxZ       = useTransform(smooth, [0.05, 1], [420, 0]);
  const boxOpacity = useTransform(smooth, [0.05, 0.55], [0, 1]);
  const boxBlurN   = useTransform(smooth, [0.05, 0.65], [6, 0]);
  const boxFilter  = useTransform(boxBlurN, (v) => `blur(${v}px)`);

  // Group 3: paragraph + button — two beats behind
  const textScale   = useTransform(smooth, [0.1, 1], [1.5, 1]);
  const textZ       = useTransform(smooth, [0.1, 1], [260, 0]);
  const textOpacity = useTransform(smooth, [0.1, 0.6], [0, 1]);
  const textBlurN   = useTransform(smooth, [0.1, 0.7], [5, 0]);
  const textFilter  = useTransform(textBlurN, (v) => `blur(${v}px)`);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section
      ref={sectionRef}
      id="bombinhas"
      className="relative px-6 pt-28 pb-24 md:pt-40 md:pb-36"
    >
      <div
        className="relative mx-auto max-w-7xl"
        style={{ zIndex: 1, perspective: '1200px' }}
      >
        {/* Editorial text column — left-aligned, max-w-2xl */}
        <div className="max-w-2xl space-y-10">

          {/* ── Group 1: Kicker + Title ────────────────────────────────── */}
          <motion.div
            className="space-y-6"
            style={{
              scale: titleScale,
              z: titleZ,
              opacity: titleOpacity,
              filter: titleFilter,
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* Kicker */}
            <p
              className="font-inter text-xs font-semibold uppercase"
              style={{
                color: '#C9A24B',
                letterSpacing: '0.22em',
              }}
            >
              INVERSIÓN PROTEGIDA POR LEY
            </p>

            {/* Title */}
            <h2
              className="font-playfair font-bold leading-[1.07] text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
            >
              Un inversor{' '}
              <span
                className="font-playfair font-normal not-italic"
                style={{ color: 'rgba(201,162,75,0.78)' }}
              >
                no busca promesas.
              </span>
              <br />
              Busca garantías legales{' '}
              <em className="italic font-light">— como esta.</em>
            </h2>
          </motion.div>

          {/* ── Group 2: Data box ─────────────────────────────────────── */}
          <motion.div
            style={{
              scale: boxScale,
              z: boxZ,
              opacity: boxOpacity,
              filter: boxFilter,
              willChange: 'transform, opacity, filter',
            }}
          >
            <div
              className="rounded-lg px-6 py-5 space-y-2"
              style={{
                border: '1px solid rgba(201,162,75,0.32)',
                background: 'rgba(201,162,75,0.04)',
              }}
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
                style={{ color: 'rgba(201,162,75,0.62)', fontSize: '1rem' }}
              >
                Un solo resultado: escasez permanente.
              </p>
            </div>
          </motion.div>

          {/* ── Group 3: Paragraph + Button ───────────────────────────── */}
          <motion.div
            className="space-y-10"
            style={{
              scale: textScale,
              z: textZ,
              opacity: textOpacity,
              filter: textFilter,
              willChange: 'transform, opacity, filter',
            }}
          >
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

            {/* Button */}
            <motion.a
              href="/bombinhas-info"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full font-inter font-semibold"
              style={{
                border: '1px solid rgba(201,162,75,0.50)',
                color: '#C9A24B',
                background: 'transparent',
                padding: '0.75rem 2rem',
                fontSize: '0.875rem',
                letterSpacing: '0.03em',
                boxShadow: '0 0 0 0 rgba(201,162,75,0)',
              }}
              whileHover={{
                boxShadow: '0 0 32px 6px rgba(201,162,75,0.16), 0 0 0 1px rgba(201,162,75,0.70)',
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            >
              Más info
              <span aria-hidden style={{ fontSize: '1rem' }}>→</span>
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
