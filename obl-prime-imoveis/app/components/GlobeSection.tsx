'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import createGlobe from 'cobe';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

interface AnalyticsMarker {
  id: string;
  location: [number, number];
  visitors: number;
  trend: number;
  city: string;
  country: string;
}

const MARKERS: AnalyticsMarker[] = [
  { id: 'v1', location: [-27.15, -48.51], visitors: 1247, trend: 18, city: 'Bombinhas', country: 'Brasil' },
  { id: 'v2', location: [-23.55, -46.63], visitors: 834, trend: 12, city: 'São Paulo', country: 'Brasil' },
  { id: 'v3', location: [40.71, -74.01], visitors: 623, trend: 8, city: 'New York', country: 'USA' },
  { id: 'v4', location: [48.86, 2.35], visitors: 412, trend: 5, city: 'Paris', country: 'France' },
  { id: 'v5', location: [51.51, -0.13], visitors: 385, trend: -3, city: 'London', country: 'UK' },
  { id: 'v6', location: [25.20, 55.27], visitors: 298, trend: 15, city: 'Dubai', country: 'UAE' },
];

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const [data, setData] = useState(MARKERS);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((m) => ({
          ...m,
          visitors: Math.max(0, m.visitors + Math.floor(Math.random() * 11) - 3),
          trend: Math.max(-20, Math.min(20, m.trend + Math.floor(Math.random() * 5) - 2)),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        dark: 0.85,
        diffuse: 2,
        mapSamples: 16000,
        mapBrightness: 5,
        baseColor: [0.08, 0.08, 0.1],
        markerColor: [0.85, 0.65, 0.2],
        glowColor: [0.15, 0.12, 0.05],
        markerElevation: 0,
        markers: MARKERS.map((m) => ({ location: m.location, size: 0.05, id: m.id })),
        arcs: [],
        arcColor: [0.85, 0.65, 0.2],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.75,
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
    <div className="relative aspect-square select-none w-full max-w-[540px]">
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
      {data.map((m) => (
        <div
          key={m.id}
          style={{
            position: 'absolute',
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            padding: '0.6rem 0.75rem',
            background: 'linear-gradient(135deg, rgba(201, 164, 74, 0.92), rgba(184, 134, 11, 0.92))',
            borderRadius: 10,
            pointerEvents: 'none' as const,
            whiteSpace: 'nowrap' as const,
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: 'opacity 0.3s, filter 0.3s',
            boxShadow: '0 8px 24px rgba(184, 134, 11, 0.35)',
            border: '1px solid rgba(255, 244, 208, 0.25)',
          }}
        >
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-white/90" />
            <span className="text-sm font-bold text-white">{m.visitors}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-white/80 font-medium">{m.city}</span>
            <span className={`text-xs font-bold ${m.trend >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {m.trend >= 0 ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
              {Math.abs(m.trend)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GlobeSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="globe-section-title font-playfair">
          Presencia Global
        </h2>
        <p className="mt-4 max-w-lg mx-auto text-base text-white/60 font-inter">
          Inversores de todo el mundo confían en OBL Prime para acceder al mercado inmobiliario de Bombinhas.
        </p>
      </div>

      <GlobeCanvas />

      <div className="mt-12 grid grid-cols-3 gap-8 text-center">
        {[
          { value: '6+', label: 'Países' },
          { value: '3.8K', label: 'Inversores' },
          { value: '$42M', label: 'Capital gestionado' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="globe-stat-value font-outfit">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-white/50 font-inter mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
