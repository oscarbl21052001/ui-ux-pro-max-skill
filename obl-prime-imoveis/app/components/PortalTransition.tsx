'use client';

import { useEffect, useRef } from 'react';

// Higgsfield background-removed output (VP codec, dark bg extracted)
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260714_090040_cc06ad8b-6dbd-4988-b7f2-c0c880af4070.mp4';

// Timing (video = 4.04 s, rings fill screen ~2.8 s in)
const T_SCROLL   = 2800; // ms — instant-scroll to #proyectos beneath overlay
const T_FADE_OUT = 3200; // ms — begin overlay fade-out
const T_UNLOCK   = 3900; // ms — restore interaction

export default function PortalTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const firedRef   = useRef(false);

  useEffect(() => {
    const sentinel = document.getElementById('portal-trigger');
    if (!sentinel) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const blockScroll = (e: Event) => e.preventDefault();

    const runPortal = async () => {
      if (firedRef.current) return;
      firedRef.current = true;

      const overlay = overlayRef.current;
      const video   = videoRef.current;
      if (!overlay || !video) return;

      // Block wheel / touch / keyboard scroll for duration of sequence
      window.addEventListener('wheel',     blockScroll, { passive: false });
      window.addEventListener('touchmove', blockScroll, { passive: false });
      window.addEventListener('keydown',   blockScroll);

      // Fade in overlay
      overlay.style.opacity       = '1';
      overlay.style.pointerEvents = 'auto';

      // Play video
      video.currentTime = 0;
      try { await video.play(); } catch (_) { /* autoplay blocked — overlay still shows */ }

      // Instant-scroll to Proyectos under the overlay cover
      timers.push(
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'auto';
          document.getElementById('proyectos')?.scrollIntoView();
          // Restore smooth-scroll after one tick so the rest of the page keeps it
          requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = '';
          });
        }, T_SCROLL),
      );

      // Start fade-out
      timers.push(
        setTimeout(() => {
          overlay.style.opacity = '0';
        }, T_FADE_OUT),
      );

      // Fully restore interaction
      timers.push(
        setTimeout(() => {
          window.removeEventListener('wheel',     blockScroll);
          window.removeEventListener('touchmove', blockScroll);
          window.removeEventListener('keydown',   blockScroll);
          overlay.style.pointerEvents = 'none';
        }, T_UNLOCK),
      );
    };

    // Trigger when sentinel enters viewport from below (user approaching boundary)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) runPortal();
        }
      },
      // Fire 150 px before the sentinel reaches the bottom of the viewport
      { threshold: 0, rootMargin: '0px 0px -150px 0px' },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      window.removeEventListener('wheel',     blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      window.removeEventListener('keydown',   blockScroll);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        opacity: 0,
        pointerEvents: 'none',
        backgroundColor: '#0E1418',
        transition: 'opacity 0.5s ease',
        overflow: 'hidden',
      }}
    >
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
          // screen blend: dark bg pixels disappear, bright gold rings stay vivid
          mixBlendMode: 'screen',
        }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
