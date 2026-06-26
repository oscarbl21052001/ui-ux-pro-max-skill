'use client';

import { useEffect, useRef, useCallback } from 'react';
import createGlobe from 'cobe';

interface GlobeMarker {
  location: [number, number];
  size: number;
  color: string;
  highlight?: boolean;
}

const MARKERS: GlobeMarker[] = [
  { location: [40.4637, -3.7492], size: 8, color: '#10B981' },
  { location: [-32.5228, -55.7658], size: 8, color: '#10B981' },
  { location: [-38.4161, -63.6167], size: 8, color: '#10B981' },
  { location: [-27.1472, -48.5161], size: 12, color: '#F3C63F', highlight: true },
];

function projectPoint(
  lat: number,
  lng: number,
  currentPhi: number,
  currentTheta: number,
) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  const cosLat = Math.cos(latRad);
  const sinLat = Math.sin(latRad);

  const x = cosLat * Math.sin(lngRad);
  const y = -sinLat;
  const z = cosLat * Math.cos(lngRad);

  const cp = Math.cos(-currentPhi);
  const sp = Math.sin(-currentPhi);
  const x1 = x * cp - z * sp;
  const z1 = x * sp + z * cp;

  const ct = Math.cos(currentTheta);
  const st = Math.sin(currentTheta);
  const y1 = y * ct - z1 * st;
  const z2 = y * st + z1 * ct;

  return { x: x1, y: y1, z: z2 };
}

const GLOBE_RADIUS = 0.44;

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerEls = useRef<(HTMLDivElement | null)[]>([]);
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
        markers: [],
        arcs: [],
        arcColor: [0.76, 0.6, 0.15],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.85,
      });

      function animate() {
        if (!isPausedRef.current) phi += 0.003;
        const curPhi = phi + phiOffsetRef.current + dragOffset.current.phi;
        const curTheta = 0.2 + thetaOffsetRef.current + dragOffset.current.theta;

        globe!.update({ phi: curPhi, theta: curTheta });

        MARKERS.forEach((m, i) => {
          const el = markerEls.current[i];
          if (!el) return;
          const { x, y, z } = projectPoint(
            m.location[0],
            m.location[1],
            curPhi,
            curTheta,
          );
          if (z > 0) {
            el.style.left = `${(0.5 + x * GLOBE_RADIUS) * 100}%`;
            el.style.top = `${(0.5 + y * GLOBE_RADIUS) * 100}%`;
            el.style.opacity = String(Math.min(1, z * 3));
          } else {
            el.style.opacity = '0';
          }
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
    <div
      className="relative aspect-square select-none w-full max-w-[540px]"
      style={{ zIndex: 20, borderRadius: '50%', overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 1.2s ease',
          touchAction: 'none',
        }}
      />
      {MARKERS.map((m, i) => (
        <div
          key={i}
          ref={(el) => { markerEls.current[i] = el; }}
          style={{
            position: 'absolute',
            width: m.size,
            height: m.size,
            borderRadius: '50%',
            backgroundColor: m.color,
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            pointerEvents: 'none',
            boxShadow: m.highlight
              ? `0 0 6px ${m.color}, 0 0 14px ${m.color}50`
              : `0 0 4px ${m.color}80`,
          }}
        >
          {m.highlight && <span className="globe-marker-ring" />}
        </div>
      ))}
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
