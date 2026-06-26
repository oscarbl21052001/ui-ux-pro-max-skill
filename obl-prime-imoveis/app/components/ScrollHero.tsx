'use client';

import { useEffect, useRef, useState } from 'react';

const REVEAL_WORDS = ['LA', 'ELEGANCIA', 'DE', 'INVERTIR', 'BIEN'];

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

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
      const FADE_IN_START = 0.0;
      const FADE_IN_END = 0.4;
      const PLATEAU_END = 0.6;
      const FADE_OUT_END = 1.0;
      const wordCount = REVEAL_WORDS.length;
      const MIN_OPACITY = 0.1;

      for (let i = 0; i < wordCount; i++) {
        const el = wordRefs.current[i];
        if (!el) continue;

        let opacity: number;

        if (p <= FADE_IN_END) {
          const range = FADE_IN_END - FADE_IN_START;
          const wordStart = FADE_IN_START + (i / wordCount) * range;
          const wordEnd = wordStart + range / wordCount;
          const wordProgress = Math.min(
            Math.max((p - wordStart) / (wordEnd - wordStart), 0),
            1
          );
          opacity = MIN_OPACITY + wordProgress * (1 - MIN_OPACITY);
        } else if (p <= PLATEAU_END) {
          opacity = 1;
        } else {
          const range = FADE_OUT_END - PLATEAU_END;
          const wordStart = PLATEAU_END + (i / wordCount) * range;
          const wordEnd = wordStart + range / wordCount;
          const wordProgress = Math.min(
            Math.max((p - wordStart) / (wordEnd - wordStart), 0),
            1
          );
          opacity = 1 - wordProgress * (1 - MIN_OPACITY);
        }

        el.style.opacity = String(opacity);
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
    <div ref={containerRef} className="relative h-[300vh]">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className={`sticky top-0 w-screen h-screen object-cover transition-opacity duration-200 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/hero.mp4" type="video/mp4" />
        <source src="/hero.webm" type="video/webm" />
      </video>

      <div className="sticky top-0 h-screen pointer-events-none flex items-center justify-center">
        <p
          className="scroll-reveal-text font-jakarta text-center leading-none"
          aria-label="La elegancia de invertir bien"
        >
          {REVEAL_WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className="inline-block mx-[0.3em]"
              style={{ opacity: reducedMotion ? 1 : 0.1 }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
