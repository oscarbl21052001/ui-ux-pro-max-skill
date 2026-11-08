'use client';

import { useEffect, useRef } from 'react';

const HERO_VIDEO_MOV  = '/hero-web.mov';
const HERO_VIDEO_MP4  = '/hero.mp4';
const HERO_VIDEO_WEBM = '/hero.webm';
const BOMB_VIDEO_SRC  = 'https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260715_142322_a3f9c067-a8d3-465c-9075-ebd055f69007.mp4';

// Hero occupies 200vh → scrollable budget = 100vh
const HERO_VH = 200;

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
      // ── Single video scrub: hero-web.mov covers page-top → end of Phase 3 ──
      // Phase 3 (Proyectos) exits at scrollYProgress ≈ 0.97 within
      // BombinhasProjectsScene (scroll budget = offsetHeight − vH).
      // We map video 0→duration to scrollY 0→scrubEnd so the white final
      // frame lands exactly when Phase 3's blur-out animation completes.
      const bombEl = document.getElementById('bombinhas');

      if (bombEl) {
        const bombAbsTop = bombEl.getBoundingClientRect().top + scrollY; // constant
        const scrubEnd   = bombAbsTop + 0.97 * (bombEl.offsetHeight - vH);
        const totalP     = Math.min(Math.max(scrollY / Math.max(scrubEnd, 1), 0), 1);
        heroTarget = totalP * (heroVid.duration || 30);
      } else {
        const heroScrollMax = (HERO_VH / 100 - 1) * vH;
        heroTarget = Math.min(Math.max(scrollY / heroScrollMax, 0), 1) * (heroVid.duration || 30);
      }

      // Hero stays at full opacity throughout — no crossfade needed
      heroVid.style.opacity = '1';
      bombVid.style.opacity = '0';

      // ── Phase C: fade canvas as Sobre Nosotros exits viewport ───────────
      const nosotrosExitEl = document.getElementById('nosotros-exit');
      if (nosotrosExitEl) {
        const rect      = nosotrosExitEl.getBoundingClientRect();
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
    // Force GPU compositing so the browser scales on the GPU rather than
    // the CPU — avoids the blurry bilinear upscale that software rendering applies.
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    // Explicitly clear any inherited filter and let the browser decode at
    // native quality with no post-process sharpening or blurring.
    filter: 'none',
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
        backgroundColor: '#FDFBF7',
        overflow: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'opacity',
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
