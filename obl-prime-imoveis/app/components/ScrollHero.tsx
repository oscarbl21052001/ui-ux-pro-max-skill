'use client';

import { useEffect, useRef } from 'react';

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

      if (rawP <= 0.50) {
        // Before gold text appears
        goldBlock.style.opacity = '0';
        goldBlock.style.filter  = '';
      } else if (rawP <= 0.56) {
        // Fade IN: quick appearance 0.50→0.56
        goldBlock.style.opacity = String(Math.min((rawP - 0.50) / 0.06, 1));
        goldBlock.style.filter  = '';
      } else if (rawP <= 0.82) {
        // READING PLATEAU: full opacity, no blur — user has time to read
        goldBlock.style.opacity = '1';
        goldBlock.style.filter  = '';
      } else if (rawP <= 0.97) {
        // BLUR-OUT: 0.82→0.97 — smooth exit, finishes just before sticky releases
        const exitP = Math.min((rawP - 0.82) / 0.15, 1);
        goldBlock.style.opacity = String((1 - exitP).toFixed(3));
        goldBlock.style.filter  = `blur(${(exitP * 12).toFixed(1)}px)`;
      } else {
        // Locked invisible — sticky releases at rawP=1.0, nothing to drift
        goldBlock.style.opacity = '0';
        goldBlock.style.filter  = 'blur(12px)';
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
          className="fixed inset-0 flex items-center justify-center pointer-events-none px-6"
          style={{
            opacity: 0,
            zIndex: 10,
            willChange: 'filter, opacity',
            backfaceVisibility: 'hidden',
          }}
        >
          <h2 className="hero-gold-headline font-playfair" style={{ textAlign: 'center' }}>
            <span style={{ display: 'block' }}>Bienvenido a tu</span>
            <span style={{ display: 'block' }}>Paraíso</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
