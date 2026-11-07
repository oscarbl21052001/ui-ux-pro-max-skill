'use client';

import { useEffect, useRef } from 'react';

const HERO_VIDEO_WEBM = '/hero.webm';
const HERO_VIDEO_MP4  = '/hero.mp4';
const HERO_VIDEO_MOV  = '/hero-web.mov';

export default function SectionBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafPending = false;
    let raf: number;
    let vH = window.innerHeight;
    let nosotrosExitEl: HTMLElement | null = null;

    const refreshLayout = () => {
      vH = window.innerHeight;
      nosotrosExitEl = document.getElementById('nosotros-exit');
    };
    refreshLayout();
    window.addEventListener('resize', refreshLayout, { passive: true });

    const tick = () => {
      rafPending = false;
      if (!nosotrosExitEl) return;
      const rect      = nosotrosExitEl.getBoundingClientRect();
      const fadeRange = vH * 0.40;
      const exiting   = fadeRange - rect.bottom;
      const t         = Math.min(Math.max(exiting / fadeRange, 0), 1);
      container.style.opacity = String(1 - t);
    };

    const onScroll = () => {
      if (!rafPending) {
        rafPending = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', refreshLayout);
      cancelAnimationFrame(raf);
    };
  }, []);

  const videoStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    filter: 'none',
  };

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor: '#0a0c10',
        backgroundImage: 'url(/hero-poster.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      {/* Hero video — autoplay loop, no scrubbing = perfectly smooth */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        style={videoStyle}
      >
        <source src={HERO_VIDEO_WEBM} type="video/webm" />
        <source src={HERO_VIDEO_MP4}  type="video/mp4" />
        <source src={HERO_VIDEO_MOV}  type="video/quicktime" />
      </video>

      {/* Subtle overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.10) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
