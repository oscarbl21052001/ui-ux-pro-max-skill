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

    let rafPending = false;

    const update = () => {
      rafPending = false;
      const rect        = container.getBoundingClientRect();
      const scrollableH = rect.height - window.innerHeight;
      if (scrollableH <= 0) return;
      const p = Math.min(Math.max(-rect.top / scrollableH, 0), 1);

      const fadeStart = 0.60;
      const fadeLen   = 0.30;
      const opacity   = Math.max(1 - Math.max(p - fadeStart, 0) / fadeLen, 0);
      textBlock.style.opacity = opacity.toFixed(3);
    };

    const onScroll = () => {
      if (!rafPending) {
        rafPending = true;
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // initial render

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
            LA MANERA DE INVERTIR BIEN
          </h1>
          <p className="hero-subheadline font-cardo">
            Accede a oportunidades exclusivas para diversificar y fortalecer tu patrimonio.
          </p>
        </div>
      </div>
    </div>
  );
}
