'use client';

import { useEffect, useRef } from 'react';

const HERO_VIDEO_MOV  = '/hero-web.mov';
const HERO_VIDEO_MP4  = '/hero.mp4';
const HERO_VIDEO_WEBM = '/hero.webm';
const BOMB_VIDEO_SRC  = 'https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260715_142322_a3f9c067-a8d3-465c-9075-ebd055f69007.mp4';
const BOMB_DURATION   = 8;

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
    let bombTarget = 0, bombCurrent = 0;
    let raf: number;

    const tick = () => {
      const scrollY = window.scrollY;
      const vH     = window.innerHeight;

      // ── Hero scrub: 0→1 across its 200vh scroll budget ───────────────────
      const heroScrollMax = (HERO_VH / 100 - 1) * vH;
      const heroProgress  = Math.min(Math.max(scrollY / heroScrollMax, 0), 1);
      heroTarget = heroProgress * (heroVid.duration || 30);

      // ── Crossfade: hero→bomb as #bombinhas enters the viewport ───────────
      // Hero stays at opacity 1 during ALL of ScrollHero (BIENVENIDO).
      // Crossfade begins only once BombinhasProjectsScene top crosses viewport
      // bottom, completing over 80vh — leisurely and gap-free (no white flash).
      const bombEl = document.getElementById('bombinhas');
      const proyEl = document.getElementById('proyectos');

      if (bombEl) {
        const rect    = bombEl.getBoundingClientRect();
        const entered = vH - rect.top;  // <0 before visible, grows as it scrolls in
        const crossT  = Math.min(Math.max(entered / (vH * 0.80), 0), 1);
        const eased   = 1 - Math.pow(1 - crossT, 2);  // power2.out
        heroVid.style.opacity = String(1 - eased);
        bombVid.style.opacity = String(eased);
      } else {
        heroVid.style.opacity = '1';
        bombVid.style.opacity = '0';
      }

      // ── Bomb video scrub: #bombinhas top → #proyectos bottom ─────────────
      bombTarget = 0;
      if (bombEl && proyEl) {
        const bombRect   = bombEl.getBoundingClientRect();
        const totalRange = bombEl.offsetHeight + vH;
        const scrolled   = vH - bombRect.top;
        const combinedP  = Math.min(Math.max(scrolled / totalRange, 0), 1);
        const rectTarget = combinedP * BOMB_DURATION;
        if (rectTarget > bombTarget) bombTarget = rectTarget;
      } else if (bombEl) {
        const rect       = bombEl.getBoundingClientRect();
        const total      = bombEl.offsetHeight + vH;
        const scrolled   = vH - rect.top;
        const bombP      = Math.min(Math.max(scrolled / total, 0), 1);
        const rectTarget = bombP * BOMB_DURATION;
        if (rectTarget > bombTarget) bombTarget = rectTarget;
      }

      // ── Phase C: fade canvas as Proyectos EXITS (bottom leaves viewport) ──
      if (proyEl) {
        const rect      = proyEl.getBoundingClientRect();
        const fadeRange = vH * 0.40;
        const exiting   = fadeRange - rect.bottom;
        const t         = Math.min(Math.max(exiting / fadeRange, 0), 1);
        container.style.opacity = String(1 - t);
      } else {
        container.style.opacity = '1';
      }

      // ── LERP scrub — identical LERP keeps both videos in sync ─────────────
      heroCurrent += (heroTarget - heroCurrent) * LERP;
      bombCurrent += (bombTarget - bombCurrent) * LERP;

      if (heroVid.readyState >= 2 && Math.abs(heroCurrent - heroVid.currentTime) > 0.01) {
        heroVid.currentTime = heroCurrent;
      }
      if (bombVid.readyState >= 2 && Math.abs(bombCurrent - bombVid.currentTime) > 0.01) {
        bombVid.currentTime = bombCurrent;
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
