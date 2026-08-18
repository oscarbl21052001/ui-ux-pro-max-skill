'use client';

import { useEffect, useRef } from 'react';

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const progressRef  = useRef(0);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const textBlock = textRef.current;
    if (!container || !textBlock) return;

    const onScroll = () => {
      const rect        = container.getBoundingClientRect();
      const scrollableH = rect.height - window.innerHeight;
      if (scrollableH <= 0) return;
      progressRef.current = Math.max(-rect.top / scrollableH, 0);
    };

    const tick = () => {
      const p = Math.min(progressRef.current, 1);

      // Hero headline: full opacity until 60% scroll, then fades out over 30%
      const fadeStart = 0.60;
      const fadeLen   = 0.30;
      textBlock.style.opacity = String(Math.max(1 - Math.max(p - fadeStart, 0) / fadeLen, 0));

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
    // h-[200vh] reserves scroll budget; sticky keeps content pinned to top
    <div ref={containerRef} className="relative h-[200vh]">
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
      </div>
    </div>
  );
}
