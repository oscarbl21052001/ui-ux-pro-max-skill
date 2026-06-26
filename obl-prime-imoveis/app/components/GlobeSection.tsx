'use client';

import { useEffect, useRef, useCallback } from 'react';
import createGlobe from 'cobe';

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [-27.15, -48.51], size: 0.06 },
  { location: [-23.55, -46.63], size: 0.05 },
  { location: [40.71, -74.01], size: 0.05 },
  { location: [48.86, 2.35], size: 0.04 },
  { location: [51.51, -0.13], size: 0.04 },
  { location: [25.20, 55.27], size: 0.04 },
];

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    isPausedRef.current = false;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    isPausedRef.current = true;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId: number;
    let phi = 0;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 8,
        baseColor: [0.92, 0.91, 0.9],
        markerColor: [0.76, 0.6, 0.15],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0,
        markers: MARKERS,
        arcs: [],
        arcColor: [0.76, 0.6, 0.15],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.85,
      });

      function animate() {
        if (!isPausedRef.current) phi += 0.003;
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => canvas && (canvas.style.opacity = '1'));
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <div className="relative aspect-square select-none w-full max-w-[540px]" style={{ zIndex: 20 }}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 1.2s ease',
          borderRadius: '50%',
          touchAction: 'none',
        }}
      />
    </div>
  );
}

export default function GlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    let rafId: number;

    function tick() {
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;

      const entryStart = vh;
      const entryEnd = 0;
      const raw = 1 - (rect.top - entryEnd) / (entryStart - entryEnd);
      const p = Math.max(0, Math.min(1, raw));

      const translateY = 250 * (1 - p);
      const opacity = p;

      text!.style.transform = `translateY(${translateY}px)`;
      text!.style.opacity = `${opacity}`;

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] px-6 py-24"
    >
      <div
        ref={textRef}
        className="mb-12 text-center"
        style={{
          zIndex: 10,
          willChange: 'transform, opacity',
          background: 'transparent',
        }}
      >
        <h2 className="globe-section-title font-playfair">
          Presencia Global
        </h2>
        <p className="mt-4 max-w-lg mx-auto text-base text-neutral-600 font-inter">
          Inversores de todo el mundo confían en OBL Prime para acceder al mercado inmobiliario de Bombinhas.
        </p>
      </div>

      <GlobeCanvas />
    </section>
  );
}
