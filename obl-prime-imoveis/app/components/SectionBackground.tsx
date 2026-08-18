'use client';

import { useEffect, useRef } from 'react';

const HERO_VIDEO_MOV  = '/hero-web.mov';
const HERO_VIDEO_MP4  = '/hero.mp4';
const HERO_VIDEO_WEBM = '/hero.webm';
const BOMB_VIDEO_SRC  = 'https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260715_142322_a3f9c067-a8d3-465c-9075-ebd055f69007.mp4';

// Hero occupies 300vh → scrollable budget = 200vh
const HERO_VH = 300;

export default function SectionBackground() {
  const heroRef      = useRef<HTMLVideoElement>(null);
  const bombRef      = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroVid  = heroRef.current;
    const bombVid  = bombRef.current;
    const container = containerRef.current;
    if (!heroVid || !bombVid || !container) return;

    heroVid.pause();
    bombVid.pause();

    const LERP = 0.28;
    let heroTarget = 0, heroCurrent = 0;
    let raf: number;

    const tick = () => {
      const scrollY = window.scrollY;
      const vH     = window.innerHeight;
      const proyEl = document.getElementById('proyectos');

      // ── Single video scrub: hero-web.mov covers page-top → end of Proyectos ─
      // proyEl (#proyectos) is the 1px anchor at the bottom of BombinhasProjectsScene.
      // Its absolute offset from document top is constant = rect.top + scrollY.
      // We map video 0→duration across scrollY 0→proyAbsTop so the video's final
      // frame (white) lands exactly when the user finishes the Proyectos section,
      // then the Phase C canvas fade-out completes the transition naturally.
      if (proyEl) {
        const proyAbsTop  = proyEl.getBoundingClientRect().top + scrollY;
        const totalScroll = Math.max(proyAbsTop, 1);
        const totalP      = Math.min(Math.max(scrollY / totalScroll, 0), 1);
        heroTarget = totalP * (heroVid.duration || 30);
      } else {
        const heroScrollMax = (HERO_VH / 100 - 1) * vH;
        heroTarget = Math.min(Math.max(scrollY / heroScrollMax, 0), 1) * (heroVid.duration || 30);
      }

      // Hero stays at full opacity throughout — no crossfade needed
      heroVid.style.opacity = '1';
      bombVid.style.opacity = '0';

      // ── Phase C: fade canvas as Proyectos exits viewport ─────────────────
      if (proyEl) {
        const rect      = proyEl.getBoundingClientRect();
        const fadeRange = vH * 0.40;
        const exiting   = fadeRange - rect.bottom;
        const t         = Math.min(Math.max(exiting / fadeRange, 0), 1);
        container.style.opacity = String(1 - t);
      } else {
        container.style.opacity = '1';
      }

      // ── LERP scrub ────────────────────────────────────────────────────────
      heroCurrent += (heroTarget - heroCurrent) * LERP;
      if (heroVid.readyState >= 2 && Math.abs(heroCurrent - heroVid.currentTime) > 0.01) {
        heroVid.currentTime = heroCurrent;
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
    willChange: 'transform, opacity',
  };

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor: '#FDFBF7',
        overflow: 'hidden',
        willChange: 'opacity',
        transform: 'translateZ(0)',
      }}
    >
      {/* Hero video — full-screen, scrubbed by scroll */}
      <video
        ref={heroRef}
        muted
        playsInline
        preload="auto"
        style={videoStyle}
      >
        <source src={HERO_VIDEO_MOV}  type="video/quicktime" />
        <source src={HERO_VIDEO_MP4}  type="video/mp4" />
        <source src={HERO_VIDEO_WEBM} type="video/webm" />
      </video>

      {/* Bombinhas video — cross-fades in as hero exits */}
      <video
        ref={bombRef}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{ ...videoStyle, opacity: 0 }}
      >
        <source src={BOMB_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Subtle overlay — keeps both videos legible and on-brand */}
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
