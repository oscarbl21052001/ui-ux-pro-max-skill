'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// Higgsfield: background-removed gyroscope (dark bg extracted, mix-blend handles the rest)
const VIDEO_SRC      = 'https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260714_090040_cc06ad8b-6dbd-4988-b7f2-c0c880af4070.mp4';
const VIDEO_DURATION = 4.04; // seconds

export default function PortalTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  // scrollYProgress: 0 when container-top hits viewport-top, 1 when container-bottom hits viewport-bottom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Video scrubbing ───────────────────────────────────────────────────────
  // Map scroll 0→80% to video 0→duration; clamp at 80% so the last frame holds
  const videoTime = useTransform(scrollYProgress, [0, 0.8], [0, VIDEO_DURATION]);

  useMotionValueEvent(videoTime, 'change', (t) => {
    const v = videoRef.current;
    if (v && v.readyState >= 1) v.currentTime = t;
  });

  // ── Scale ─────────────────────────────────────────────────────────────────
  // Exponential-feeling growth: tiny dot → ring fills & bursts the viewport
  const scale = useTransform(
    scrollYProgress,
    [0,    0.10, 0.22, 0.38, 0.54, 0.68, 0.80],
    [0.10, 0.10, 0.17, 0.35, 0.72, 1.70, 3.50],
  );

  // ── Opacity ───────────────────────────────────────────────────────────────
  // 0% → 10%: invisible (stays at frame 0)
  // 10% → 78%: fully visible while scrubbing
  // 78% → 100%: ultra-smooth fade → reveals ProjectsSection below
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.10, 0.78, 1.0],
    [0, 1,    1,    0  ],
  );

  return (
    /*
      300 vh tall container → 200 vh of actual scroll drives the animation.
      The inner sticky 100 vh panel stays on screen throughout.
      ProjectsSection naturally appears when this section scrolls out.
    */
    <div
      ref={containerRef}
      style={{ height: '300vh', position: 'relative', backgroundColor: '#0E1418' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#0E1418',
        }}
      >
        {/* motion.div carries the scale + opacity transforms on the GPU compositor */}
        <motion.div
          style={{
            scale,
            opacity,
            width: '100vw',
            height: '100vh',
            willChange: 'transform, opacity',
            translateZ: 0,           // force GPU layer
          }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              // screen blend: dark pixels vanish, gold rings blaze
              mixBlendMode: 'screen',
              display: 'block',
              transform: 'translateZ(0)',   // own compositor layer for the video
            }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </div>
  );
}
