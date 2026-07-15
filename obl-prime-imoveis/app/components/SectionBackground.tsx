'use client';

import { useEffect, useRef } from 'react';

const HERO_VIDEO_MP4  = '/hero.mp4';
const HERO_VIDEO_WEBM = '/hero.webm';
const BOMB_VIDEO_SRC  = 'https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260715_142322_a3f9c067-a8d3-465c-9075-ebd055f69007.mp4';
const BOMB_DURATION   = 8;

// Hero occupies 300vh → scrollable budget = 200vh
const HERO_VH = 300;

export default function SectionBackground() {
  const heroRef = useRef<HTMLVideoElement>(null);
  const bombRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const heroVid = heroRef.current;
    const bombVid = bombRef.current;
    if (!heroVid || !bombVid) return;

    heroVid.pause();
    bombVid.pause();

    const LERP = 0.15;
    let heroTarget = 0, heroCurrent = 0;
    let bombTarget = 0, bombCurrent = 0;
    let raf: number;

    const tick = () => {
      const scrollY = window.scrollY;
      const vH     = window.innerHeight;

      // ── Hero progress 0→1 across its 200vh scroll budget ─────────────────
      const heroScrollMax = (HERO_VH / 100 - 1) * vH;   // = 200vh
      const heroProgress  = Math.min(Math.max(scrollY / heroScrollMax, 0), 1);

      // Hero video frozen at its CF_OUT frame once fade starts (no ghosting)
      const CF_OUT_START = 0.60;   // hero begins fading out
      const CF_OUT_END   = 0.78;   // hero fully gone → pure #0E1418 bg
      const CF_IN_START  = 0.80;   // bomb begins fading in (brief black gap)
      const CF_IN_END    = 1.00;   // bomb fully opaque

      heroTarget = Math.min(heroProgress, CF_OUT_START) * (heroVid.duration || 30);

      // Hero opacity: 1→0 in [CF_OUT_START, CF_OUT_END]
      const heroT = Math.min(Math.max((heroProgress - CF_OUT_START) / (CF_OUT_END - CF_OUT_START), 0), 1);
      heroVid.style.opacity = String(1 - heroT);

      // Bomb opacity: 0→1 in [CF_IN_START, CF_IN_END] with power2.out easing
      const rawBombT = Math.min(Math.max((heroProgress - CF_IN_START) / (CF_IN_END - CF_IN_START), 0), 1);
      const bombT    = 1 - Math.pow(1 - rawBombT, 2);   // power2.out
      bombVid.style.opacity = String(bombT);

      // ── Bombinhas video scrub ─────────────────────────────────────────────
      const bombEl = document.getElementById('bombinhas');
      if (bombEl) {
        const rect     = bombEl.getBoundingClientRect();
        const total    = bombEl.offsetHeight + vH;
        const scrolled = vH - rect.top;
        const bombP    = Math.min(Math.max(scrolled / total, 0), 1);
        bombTarget = bombP * BOMB_DURATION;
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
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor: '#0E1418',
        overflow: 'hidden',
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
          background: 'linear-gradient(to bottom, rgba(14,20,24,0.18) 0%, rgba(14,20,24,0.28) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
