"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const HIGGSFIELD_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260628_114621_a95448e0-4fdc-465b-9bb7-c5688f4fd3b4.mp4";

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
  bgColor: "#0E1418",
};

function createBeam(width: number, height: number): Beam {
  const angleVariations = [-35, -45, -30, -40, -25];
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 40 + Math.random() * 50,
    length: height * 2.5,
    angle: angleVariations[Math.floor(Math.random() * angleVariations.length)],
    speed: 0.4 + Math.random() * 0.6,
    opacity: 0.05 + Math.random() * 0.07,
    hue: CONFIG.hueBase + Math.random() * CONFIG.hueRange,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.008 + Math.random() * 0.015,
  };
}

export default function BombinhasInfoPage() {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const progressRef = useRef(0);
  const heroRafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const beamRafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);

    const video = videoRef.current;
    const heroContainer = heroContainerRef.current;
    if (!video || !heroContainer) return;

    video.pause();

    const onScroll = () => {
      const rect = heroContainer.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
      progressRef.current = progress;
      targetTimeRef.current = progress * (video.duration || 0);
    };

    const LERP_FACTOR = 0.22;
    let currentTime = 0;

    const tick = () => {
      const target = targetTimeRef.current;
      currentTime += (target - currentTime) * LERP_FACTOR;
      if (
        video.readyState >= 2 &&
        Math.abs(currentTime - video.currentTime) > 0.01
      ) {
        video.currentTime = currentTime;
      }
      heroRafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    heroRafRef.current = requestAnimationFrame(tick);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(heroRafRef.current);
    };
  }, []);

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
      beam.speed = 0.35 + Math.random() * 0.5;
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

      beamRafRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (beamRafRef.current) {
        cancelAnimationFrame(beamRafRef.current);
      }
    };
  }, []);

  return (
    <div style={{ background: CONFIG.bgColor }}>
      {/* ── SECTION 1: Scroll-Driven Video Header ── */}
      <div ref={heroContainerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={HIGGSFIELD_VIDEO_URL} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
              backdropFilter: "blur(2px)",
            }}
          />

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 text-center pointer-events-none">
            <div className="mx-auto max-w-4xl">
              <motion.h1
                className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Un Destino Exclusivo con Restricción Estructural de Oferta
              </motion.h1>
              <motion.p
                className="text-base md:text-lg text-neutral-200 leading-relaxed max-w-3xl mx-auto font-inter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                Bombinhas es un municipio ubicado en el estado de Santa Catarina, en el litoral
                centro-norte de Brasil. Se trata de una península que avanza hacia el Océano
                Atlántico, con solo 35,9 km² de superficie total, de los cuales
                el <strong className="font-semibold text-white">67% está bajo protección ambiental</strong>.
                Esta limitación geográfica y legal genera
                una <strong className="font-semibold text-white">escasez real y permanente de suelo edificable</strong>,
                lo que sostiene la valorización a largo plazo. La ciudad cuenta con 39 playas,
                5 de ellas con la certificación
                internacional <strong className="font-semibold text-white">Bandeira Azul</strong> (un
                sello de calidad que garantiza aguas limpias, gestión ambiental excelente,
                seguridad y servicios sostenibles). Además, implementa desde 2013
                la <strong className="font-semibold text-white">Taxa de Preservación Ambiental (TPA)</strong>,
                que regula el acceso vehicular en temporada alta para preservar el entorno.
              </motion.p>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, ${CONFIG.bgColor})`,
              zIndex: 30,
            }}
          />
        </div>
      </div>

      {/* ── SECTION 2: Golden Beam Canvas ── */}
      <div className="relative w-full h-screen overflow-hidden">
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
    </div>
  );
}
