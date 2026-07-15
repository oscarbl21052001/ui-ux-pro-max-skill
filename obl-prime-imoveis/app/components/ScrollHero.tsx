'use client';

import { useEffect, useRef } from 'react';

const SPARKLE_POSITIONS = [
  { top: '-8%', left: '5%', size: 14, delay: 0 },
  { top: '-5%', right: '8%', size: 11, delay: 0.7 },
  { top: '35%', left: '-4%', size: 10, delay: 1.4 },
  { top: '40%', right: '-3%', size: 13, delay: 0.3 },
  { top: '85%', left: '15%', size: 9, delay: 2.1 },
  { top: '90%', right: '12%', size: 12, delay: 1.8 },
];

function InlineSparkles() {
  return (
    <>
      {SPARKLE_POSITIONS.map((s, i) => (
        <svg
          key={i}
          className="absolute sparkle-pulse"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
            fill="#FFF099"
          />
        </svg>
      ))}
    </>
  );
}

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const goldRef      = useRef<HTMLDivElement>(null);
  const progressRef  = useRef(0);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const textBlock = textRef.current;
    const goldBlock = goldRef.current;
    if (!container || !textBlock || !goldBlock) return;

    const onScroll = () => {
      const rect        = container.getBoundingClientRect();
      const scrollableH = rect.height - window.innerHeight;
      if (scrollableH <= 0) return;
      // No upper clamp — rawP > 1 tracks post-sticky exit travel
      progressRef.current = Math.max(-rect.top / scrollableH, 0);
    };

    const tick = () => {
      const rawP = progressRef.current;
      const p    = Math.min(rawP, 1);

      // Hero headline: fades out in first half
      textBlock.style.opacity = String(Math.max(1 - p / 0.5, 0));

      if (rawP <= 0.5) {
        // Before gold text appears — reset any leftover styles
        goldBlock.style.opacity   = '0';
        goldBlock.style.filter    = '';
        goldBlock.style.transform = 'translateZ(0)';
      } else if (rawP <= 1.0) {
        // Fade IN: opacity 0→1 over [0.5, 1.0]
        goldBlock.style.opacity   = String(Math.min((rawP - 0.5) / 0.5, 1));
        goldBlock.style.filter    = '';
        goldBlock.style.transform = 'translateZ(0)';
      } else {
        // Blur-OUT: sticky released, element drifting off the top
        // rawP 1.0→1.3 maps to a full exit (opacity 1→0, blur 0→12px, y 0→-20px)
        const exitP = Math.min((rawP - 1.0) / 0.3, 1);
        goldBlock.style.opacity   = String((1 - exitP).toFixed(3));
        goldBlock.style.filter    = `blur(${(exitP * 12).toFixed(1)}px)`;
        goldBlock.style.transform = 'translateZ(0)';
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    // h-[300vh] reserves scroll budget; sticky keeps content pinned to top
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen">
        {/* Content layers — background comes from the fixed SectionBackground */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center gap-5 pointer-events-none px-6"
          style={{ zIndex: 10 }}
        >
          <h1 className="hero-headline font-playfair">
            LA ELEGANCIA DE INVERTIR BIEN
          </h1>
          <p className="hero-subheadline font-cardo">
            Accede a oportunidades exclusivas para diversificar y fortalecer tu patrimonio.
          </p>
        </div>

        <div
          ref={goldRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
          style={{
            opacity: 0,
            zIndex: 10,
            willChange: 'filter, opacity, transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        >
          <span className="relative inline-block">
            <InlineSparkles />
            <h2 className="hero-gold-headline font-playfair">
              BIENVENIDO A TU PARAÍSO
            </h2>
          </span>
        </div>
      </div>
    </div>
  );
}
