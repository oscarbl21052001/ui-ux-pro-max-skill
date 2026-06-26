'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const video = videoRef.current;
    const container = containerRef.current;
    const textBlock = textRef.current;
    if (!video || !container || !textBlock) return;

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
      const FADE_END = 0.5;
      const opacity = Math.max(1 - p / FADE_END, 0);
      textBlock.style.opacity = String(opacity);

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
      </div>
    </div>
  );
}
