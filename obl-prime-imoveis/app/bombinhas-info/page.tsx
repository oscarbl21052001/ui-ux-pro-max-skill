"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

const CONFIG = {
  beamCount: 18,
  blur: 45,
  hueBase: 35,
  hueRange: 20,
  bgColor: "bg-[#0E1418]",
};

function createBeam(width: number, height: number): Beam {
  const angleVariations = [-35, -45, -30, -40, -25];
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 40 + Math.random() * 50,
    length: height * 2.5,
    angle: angleVariations[Math.floor(Math.random() * angleVariations.length)],
    speed: 0.15 + Math.random() * 0.25,
    opacity: 0.05 + Math.random() * 0.07,
    hue: CONFIG.hueBase + Math.random() * CONFIG.hueRange,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.008 + Math.random() * 0.015,
  };
}

export default function BombinhasInfoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      beamsRef.current = Array.from({ length: CONFIG.beamCount }, () =>
        createBeam(width, height),
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    function resetBeam(beam: Beam, index: number) {
      const spacing = window.innerWidth / 3;
      const column = index % 3;

      beam.y = window.innerHeight + 100;
      beam.x =
        column * spacing +
        spacing / 2 +
        (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 80 + Math.random() * 80;
      beam.speed = 0.12 + Math.random() * 0.2;
      beam.hue = CONFIG.hueBase + (index * CONFIG.hueRange) / CONFIG.beamCount;
      beam.opacity = 0.04 + Math.random() * 0.06;
      return beam;
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity * (0.85 + Math.sin(beam.pulse) * 0.15);
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

      gradient.addColorStop(0, `hsla(${beam.hue}, 80%, 60%, 0)`);
      gradient.addColorStop(
        0.1,
        `hsla(${beam.hue}, 80%, 60%, ${pulsingOpacity * 0.4})`,
      );
      gradient.addColorStop(
        0.4,
        `hsla(${beam.hue}, 80%, 60%, ${pulsingOpacity})`,
      );
      gradient.addColorStop(
        0.6,
        `hsla(${beam.hue}, 80%, 60%, ${pulsingOpacity})`,
      );
      gradient.addColorStop(
        0.9,
        `hsla(${beam.hue}, 80%, 60%, ${pulsingOpacity * 0.4})`,
      );
      gradient.addColorStop(1, `hsla(${beam.hue}, 80%, 60%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.filter = `blur(${CONFIG.blur}px)`;

      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        if (beam.y + beam.length < -100) {
          resetBeam(beam, index);
        }

        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${CONFIG.bgColor}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ filter: "blur(12px)" }}
      />

      <motion.div
        className="absolute inset-0 bg-neutral-950/10 z-10 pointer-events-none"
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{ backdropFilter: "blur(40px)" }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-6 text-center">
      </div>
    </div>
  );
}
