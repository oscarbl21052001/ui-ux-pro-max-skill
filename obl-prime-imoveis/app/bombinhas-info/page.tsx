'use client';

import { useEffect, useRef } from 'react';

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  hue: number;
  opacity: number;
}

function createBeam(w: number, h: number): Beam {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    width: 1 + Math.random() * 3,
    length: 80 + Math.random() * 200,
    angle: -30 + Math.random() * 60,
    speed: 0.1 + Math.random() * 0.3,
    hue: 38 + Math.random() * 12,
    opacity: 0.04 + Math.random() * 0.04,
  };
}

export default function BombinhasInfoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const BEAM_COUNT = 18;
    let beams: Beam[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      beams = Array.from({ length: BEAM_COUNT }, () =>
        createBeam(window.innerWidth, window.innerHeight),
      );
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0E1418';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.filter = 'blur(45px)';

      for (const beam of beams) {
        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate((beam.angle * Math.PI) / 180);

        const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
        grad.addColorStop(0, `hsla(${beam.hue}, 65%, 55%, 0)`);
        grad.addColorStop(0.5, `hsla(${beam.hue}, 65%, 55%, ${beam.opacity})`);
        grad.addColorStop(1, `hsla(${beam.hue}, 65%, 55%, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        ctx.restore();

        beam.y -= beam.speed;

        if (beam.y + beam.length < 0) {
          beam.y = h + beam.length;
          beam.x = Math.random() * w;
          beam.hue = 38 + Math.random() * 12;
          beam.opacity = 0.04 + Math.random() * 0.04;
        }
      }

      ctx.filter = 'none';
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0E1418]">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }}
      />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <h1 className="font-playfair text-4xl font-bold text-white text-center">
          Bombinhas Info
        </h1>
      </div>
    </div>
  );
}
