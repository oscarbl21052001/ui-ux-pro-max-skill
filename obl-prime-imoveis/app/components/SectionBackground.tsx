'use client';

import { useEffect, useRef } from 'react';

const HERO_VIDEO_MP4  = '/hero.mp4';
const HERO_VIDEO_WEBM = '/hero.webm';
const BOMB_VIDEO_SRC  = 'https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260715_142322_a3f9c067-a8d3-465c-9075-ebd055f69007.mp4';

// Hero section is 300vh tall → 200vh of scrollable budget
const HERO_VH = 300;

export default function SectionBackground() {
  const heroRef      = useRef<HTMLVideoElement>(null);
  const bombRef      = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroVid   = heroRef.current;
    const bombVid   = bombRef.current;
    const container = containerRef.current;
    if (!heroVid || !bombVid || !container) return;

    // Both videos play freely at all times — never pause or scrub currentTime
    heroVid.play().catch(() => {});
    bombVid.play().catch(() => {});

    let raf: number;

    const tick = () => {
      const scrollY = window.scrollY;
      const vH      = window.innerHeight;

      // ── Hero cross-fade: driven by scroll position through hero section ──
      const heroScrollMax = (HERO_VH / 100 - 1) * vH;   // = 200vh in px
      const heroProgress  = Math.min(Math.max(scrollY / heroScrollMax, 0), 1);

      // Hero fades out [0.60 → 0.78]
      const CF_OUT_START = 0.60;
      const CF_OUT_END   = 0.78;
      // Bomb fades in  [0.80 → 1.00] with power2.out easing
      const CF_IN_START  = 0.80;
      const CF_IN_END    = 1.00;

      const heroT = Math.min(Math.max((heroProgress - CF_OUT_START) / (CF_OUT_END - CF_OUT_START), 0), 1);
      heroVid.style.opacity = String(1 - heroT);

      const rawBombT = Math.min(Math.max((heroProgress - CF_IN_START) / (CF_IN_END - CF_IN_START), 0), 1);
      const bombT    = 1 - Math.pow(1 - rawBombT, 2);
      bombVid.style.opacity  = String(bombT);

      // ── Fade entire canvas out as content scrolls past the video sections ─
      const proyEl = document.getElementById('proyectos');
      if (proyEl) {
        const rect      = proyEl.getBoundingClientRect();
        const fadeRange = vH * 0.40;
        const exiting   = fadeRange - rect.bottom;   // positive when near top
        const t         = Math.min(Math.max(exiting / fadeRange, 0), 1);
        container.style.opacity = String(1 - t);
      } else {
        container.style.opacity = '1';
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const videoStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    willChange: 'opacity',
  };

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor: '#0E1418',
        overflow: 'hidden',
        willChange: 'opacity',
        transform: 'translateZ(0)',
      }}
    >
      {/* Hero video — plays freely in loop, opacity driven by scroll cross-fade */}
      <video
        ref={heroRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={videoStyle}
      >
        <source src={HERO_VIDEO_MP4}  type="video/mp4" />
        <source src={HERO_VIDEO_WEBM} type="video/webm" />
      </video>

      {/* Bombinhas video — plays freely in loop, fades in as hero exits */}
      <video
        ref={bombRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{ ...videoStyle, opacity: 0 }}
      >
        <source src={BOMB_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Subtle dark overlay for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(14,20,24,0.18) 0%, rgba(14,20,24,0.28) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
