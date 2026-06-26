'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.pause();

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
      targetTimeRef.current = progress * (video.duration || 0);
    };

    const LERP_FACTOR = 0.22;
    let currentTime = 0;

    const tick = () => {
      const target = targetTimeRef.current;
      currentTime += (target - currentTime) * LERP_FACTOR;
      if (video.readyState >= 2 && Math.abs(currentTime - video.currentTime) > 0.01) {
        video.currentTime = currentTime;
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
    </div>
  );
}
