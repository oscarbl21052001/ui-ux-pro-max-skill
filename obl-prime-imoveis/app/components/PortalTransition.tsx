'use client';

import { useEffect, useRef } from 'react';

// Higgsfield video_background_remover output — gyroscope with bg extracted
const VIDEO_SRC      = 'https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260714_090040_cc06ad8b-6dbd-4988-b7f2-c0c880af4070.mp4';
const VIDEO_DURATION = 4.04; // seconds

// Virtual scroll budget to complete the full animation (wheel delta pixels)
const TRAVEL = 1400;

// Exponential scale curve: gyroscope born as a point, bursts to fill screen
function getScale(p: number): number {
  const t = Math.max(0, (p - 0.05) / 0.75); // normalized [0,1] for growth phase
  return 0.1 + Math.pow(t, 1.9) * 3.40;
}

// Opacity envelope: in at 10%, hold, out at 85–100%
function getOpacity(p: number): number {
  if (p < 0.10) return p / 0.10;
  if (p > 0.85) return Math.max(0, (1 - p) / 0.15);
  return 1;
}

export default function PortalTransition() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const overlay = overlayRef.current;
    const video   = videoRef.current;
    if (!trigger || !overlay || !video) return;

    let active       = false;
    let savedScrollY = 0;
    let vDelta       = 0;         // accumulated virtual scroll px
    let touchY       = 0;
    let cooldown     = false;     // brief lock after completion

    // ── Apply progress 0→1 imperatively (zero React re-renders per frame) ──
    const applyProgress = (p: number) => {
      // Scrub video
      if (video.readyState >= 1) {
        video.currentTime = Math.min(p * VIDEO_DURATION, VIDEO_DURATION);
      }
      // Scale + blend: transform directly on video preserves mix-blend-mode
      // against the overlay's #0E1418 background (no intermediate transform wrapper)
      video.style.transform = `scale(${getScale(p)}) translateZ(0)`;
      // Fade the overlay div — this composites (bg + video) together over the page
      overlay.style.opacity = String(getOpacity(p));
    };

    // ── Pin: freeze page scroll, hand control to virtual wheel ──────────────
    const pin = () => {
      if (active || cooldown) return;
      active       = true;
      vDelta       = 0;
      savedScrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top      = `-${savedScrollY}px`;
      document.body.style.width    = '100%';

      applyProgress(0);
    };

    // ── Unpin forward: reveal Proyectos ──────────────────────────────────────
    const unpin = () => {
      active   = false;
      cooldown = true;

      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      window.scrollTo(0, savedScrollY);

      // Instant-jump to Proyectos while overlay still covers the screen
      requestAnimationFrame(() => {
        const el = document.getElementById('proyectos');
        if (el) {
          document.documentElement.style.scrollBehavior = 'auto';
          el.scrollIntoView();
          requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = '';
          });
        }
        // Re-enable triggering after a cooldown so re-scroll doesn't immediately re-pin
        setTimeout(() => { cooldown = false; }, 1200);
      });
    };

    // ── Unpin backward: user scrolled back past start ────────────────────────
    const unpinBack = () => {
      active = false;
      applyProgress(0);
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      window.scrollTo(0, savedScrollY - 10);
    };

    // ── Wheel handler ─────────────────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if (!active) return;
      e.preventDefault();

      vDelta = Math.max(-50, Math.min(TRAVEL, vDelta + e.deltaY));
      const p = Math.max(0, vDelta / TRAVEL);
      applyProgress(p);

      if (p >= 1)       { setTimeout(unpin,    80); return; }
      if (vDelta <= -50) { unpinBack(); }
    };

    // ── Touch handler ─────────────────────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      if (!active) return;
      e.preventDefault();
      const dy = touchY - e.touches[0].clientY;
      touchY   = e.touches[0].clientY;

      vDelta = Math.max(-50, Math.min(TRAVEL, vDelta + dy * 2.2));
      const p = Math.max(0, vDelta / TRAVEL);
      applyProgress(p);

      if (p >= 1)       { setTimeout(unpin, 80); return; }
      if (vDelta <= -50) { unpinBack(); }
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });

    // ── IntersectionObserver: pin when trigger div enters viewport ────────────
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !active && !cooldown) pin();
        }
      },
      // Fire when the 1 px trigger enters the viewport (from below)
      { threshold: 0, rootMargin: '0px 0px -10px 0px' },
    );
    observer.observe(trigger);

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      if (active) {
        document.body.style.position = '';
        document.body.style.top      = '';
        document.body.style.width    = '';
      }
    };
  }, []);

  return (
    <>
      {/* 1 px sentinel: entering viewport triggers pin() */}
      <div ref={triggerRef} style={{ height: 1 }} aria-hidden />

      {/*
        Fixed overlay — always in DOM, invisible until pinned.
        Background #0E1418 is the blend target for mix-blend-mode: screen on the video.
        Opacity is driven imperatively from progress (no React state → no re-render lag).
        pointerEvents: none so it never intercepts page interactions when inactive.
      */}
      <div
        ref={overlayRef}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9000,
          overflow: 'hidden',
          backgroundColor: '#0E1418',
          opacity: 0,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/*
          CRITICAL: transform (scale) is applied directly to <video>, NOT to an
          intermediate wrapper div. An intermediate div with `transform` would create
          a new stacking context with a transparent background, causing mix-blend-mode
          to composite against transparent (making the dark bg visible as a rectangle).
          With transform on the video itself, mix-blend-mode: screen references the
          overlay's #0E1418 background → removed-bg pixels (≈ black) become invisible.
        */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transformOrigin: 'center center',
            transform: 'scale(0.1) translateZ(0)',
            willChange: 'transform',
            mixBlendMode: 'screen',
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </>
  );
}
