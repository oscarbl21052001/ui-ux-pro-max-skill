'use client';

import { useEffect, useRef, useState } from 'react';

function Sparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[
        { top: '18%', left: '12%', size: 18, delay: 0 },
        { top: '25%', right: '15%', size: 14, delay: 0.7 },
        { top: '70%', left: '20%', size: 12, delay: 1.4 },
        { top: '60%', right: '10%', size: 16, delay: 0.3 },
        { top: '40%', left: '5%', size: 10, delay: 2.1 },
        { top: '30%', right: '25%', size: 11, delay: 1.8 },
      ].map((s, i) => (
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
        >
          <path
            d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
            fill="currentColor"
            className="text-amber-400"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const video = videoRef.current;
    const container = containerRef.current;
    const textBlock = textRef.current;
    const goldBlock = goldRef.current;
    if (!video || !container || !textBlock || !goldBlock) return;

    video.pause();

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
      progressRef.current = progress;
      targetTimeRef.current = progress * (video.duration || 0);
    };

    const LERP_FACTOR = 0.22;
    let currentTime = 0;

    const tick = () => {
      const target = targetTimeRef.current;
      currentTime += (target - currentTime) * LERP_FACTOR;
      if (
        video.readyState >= 2 &&
        Math.abs(currentTime - video.currentTime) > 0.01
      ) {
        video.currentTime = currentTime;
      }

      const p = progressRef.current;

      const FADE_OUT_END = 0.5;
      const textOpacity = Math.max(1 - p / FADE_OUT_END, 0);
      textBlock.style.opacity = String(textOpacity);

      const FADE_IN_START = 0.5;
      const goldOpacity = p <= FADE_IN_START
        ? 0
        : Math.min((p - FADE_IN_START) / (1 - FADE_IN_START), 1);
      goldBlock.style.opacity = String(goldOpacity);

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
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src="/hero.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center gap-5 pointer-events-none px-6"
        >
          <h1 className="hero-headline font-outfit">
            LA ELEGANCIA DE INVERTIR BIEN
          </h1>
          <p className="hero-subheadline font-inter">
            Accede a oportunidades exclusivas para diversificar y fortalecer tu patrimonio.
          </p>
        </div>

        <div
          ref={goldRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
          style={{ opacity: 0 }}
        >
          <Sparkles />
          <h2 className="hero-gold-headline font-outfit">
            BIENVENIDO A TU PARAÍSO
          </h2>
        </div>
      </div>
    </div>
  );
}
