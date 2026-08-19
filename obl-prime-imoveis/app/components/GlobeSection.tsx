'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WORLD_MAP_B64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAECklEQVR42u3VsW4jRRzH8d94gzfF4Q0VQaC4vBLTRTp0mze4ggfAPAE5XQEFsGNAVIjwBrmW7h7gJE+giKjyABTZE4g06LKJETdRJvtD65kdz6yduKABiW+TVfzRf2bXYxtcE/59YJCz6YdbgQF6ACSRrwYKYImmh5PbwOewlV3wlQNbAN6SEExjUOO+BU0aCSnxReHABUlK4YFQeJeUT3da8IIkZ6NGoSnFY5KsMoVzMKfECUnqxgPYRArarmUCndHwzIEaQEpg5xVdBXROl8mpAQx5dUgPiHoYAAkg5w3JABR06byGAVgcRGAz5bznj6phBQNRFwyqgdxebH6gshJAesWoFhgYpApAFoG8BIZ/fEhSox5jDjQXmV0Ar5XJfAIrALi3URVs09gHIL4XJCkLC5LH9JWiArABFCSrQjdgkBzRJ0WJeUOSNyQAfJJwUSWUBRlJQ8oGHATACGlBynnzy2kEYLNjrxouigD8BZcgOeVPqh12RtufaCN5wCPVDpvQ9lsIrqndsJtDcWqBCpf4hWN7OdWHBw58FwIaNOU/n1TpMW2DFaD48cmr4185T8NHkpUFX749pQPVdgRKC/DGoQPVeAEKv+WHvY8OOWNTPRp5kHuwSf8wzXtVBKR7YwEH9H3lQUaypUfSATOALyVNu5vZJW31Bnx98nkLfDUWJaz6ixvm+RIQRdl3kmRxxiaDoGnZW4CpPfkaQadlcPim1xOSvETQo7Lv75enVAXJ3xGUlony4KQBBWUM1NiDc6qhyS8RgQs18OCMMtPDaAUIyg0PZkRWDqs+wnKJBTDI1Js6BolegOsKmUxNDBAAKqQyMQmidhegBlLZ+wwKYdv5M/8x1khkb1cgKqP2H+MKyV5vS+whrE8DQDgAlUAoRBX056EElJCjJVACeJBZgNfVp+iCCm4RBWCgKsRxASSA9KgDhDtCiTuMyfHsKXzhC6wNAIjjWb8LKAOA2ctk3FmCOlgKFy8f1N0JJtgsxinYnVAHt4t3gPzZXSCTyCWCQmBT91QE3B5yarSN40dNHYPka4TlDhTUI8zLvl0JSL3vZn6DsCFZOeB2yROEpR68sECQQA++xIGCR2X7DwlEoLRgUrZrqlUg50S1uy43YqDcN6UFBVkhAjWiCV2Q0jgQPdplMKxvBXodcOfAwJYvgdL+1etA1YJJfBcZlQV7sO1i2gHoNiyxtQ5sBsCgWyoxCHiFFd2L5nUTCqMAqGUgsQ9f5kCcCiZgRYkMgMTd5WsB1rTzj0Em14BE4r+QxN1lCEsVur2PoF5Wbg8RJXR4djgvBgauhLywoEZQrt1KKRdVS4CdlJ8qafyP+9KIj/nE/d7kKwH9jgS72e9DV+kvfTWgct4ZyP8Byb8BPG7MaaIIkAQAAAAASUVORK5CYII=';

interface GlobeMarker {
  location: [number, number];
  size: number;
  color: string;
  highlight?: boolean;
}

const MARKERS: GlobeMarker[] = [
  { location: [40.4637,  -3.7492],  size: 8,  color: '#10B981' },
  { location: [-32.5228, -55.7658], size: 8,  color: '#10B981' },
  { location: [-38.4161, -63.6167], size: 8,  color: '#10B981' },
  { location: [-27.1472, -48.5161], size: 12, color: '#F3C63F', highlight: true },
];

// Viewing elevation: ~20° above the equator.
// Without this, all land masses sit in a flat equatorial band (±45° lat),
// making the sphere look squished even though the circle boundary is perfect.
// Adding theta makes both poles partially visible, which restores the full
// vertical extent of the sphere and eliminates the perceptual flattening.
const THETA = 0.35;
const SIZE  = 400;

function latLngTo3D(lat: number, lng: number): [number, number, number] {
  const latR = (lat * Math.PI) / 180;
  const lngR = (lng * Math.PI) / 180;
  return [
    Math.cos(latR) * Math.cos(lngR),
    Math.sin(latR),
    Math.cos(latR) * Math.sin(lngR),
  ];
}

// Full two-axis rotation: Y (azimuth φ) then X (elevation θ).
// Without θ the globe is viewed from the equatorial plane; land masses
// only fill ~70% of the vertical sphere extent → perceptual squish.
function project(
  x: number, y: number, z: number,
  phi: number, theta: number,
): [number, number, number] {
  // Rotate around Y by phi
  const cp = Math.cos(phi), sp = Math.sin(phi);
  const x1 = cp * x + sp * z;
  const y1 = y;
  const z1 = -sp * x + cp * z;

  // Rotate around X by theta (tilt upward toward viewer)
  const ct = Math.cos(theta), st = Math.sin(theta);
  return [x1, ct * y1 - st * z1, st * y1 + ct * z1];
}

function GlobeCanvas() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const markerEls   = useRef<(HTMLDivElement | null)[]>([]);
  const phiRef      = useRef(0);
  const phiOffset   = useRef(0);
  const dragOffset  = useRef(0);
  const isPaused    = useRef(false);
  const dragStart   = useRef<number | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    isPaused.current  = true;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
  }, []);

  const handlePointerUp = useCallback(() => {
    if (dragStart.current !== null) {
      phiOffset.current += dragOffset.current;
      dragOffset.current = 0;
    }
    dragStart.current = null;
    isPaused.current  = false;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragStart.current !== null)
        dragOffset.current = (e.clientX - dragStart.current) / 300;
    };
    window.addEventListener('pointermove', onMove,          { passive: true });
    window.addEventListener('pointerup',   handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup',   handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width  = SIZE + 'px';
    canvas.style.height = SIZE + 'px';

    const ctx = canvas.getContext('2d')!;
    ctx.scale(DPR, DPR);

    let animId: number;

    const img = new Image();
    img.onload = () => {
      const TW = 256, TH = 128;
      const off = document.createElement('canvas');
      off.width = TW; off.height = TH;
      const oc = off.getContext('2d')!;
      oc.drawImage(img, 0, 0, TW, TH);
      const pix = oc.getImageData(0, 0, TW, TH).data;

      const dots: [number, number, number][] = [];
      for (let y = 0; y < TH; y++) {
        for (let x = 0; x < TW; x++) {
          if (pix[(y * TW + x) * 4] > 128) {
            const lat = (0.5 - y / TH) * 180;
            // Standard equirectangular: u=0 → −180° (date line), u=0.5 → 0° (Greenwich)
            const lng = (x / TW - 0.5) * 360;
            dots.push(latLngTo3D(lat, lng));
          }
        }
      }

      const marker3D = MARKERS.map(m => latLngTo3D(m.location[0], m.location[1]));

      function render() {
        if (!isPaused.current) phiRef.current += 0.006;
        const phi = phiRef.current + phiOffset.current + dragOffset.current;

        ctx.clearRect(0, 0, SIZE, SIZE);

        const cx = SIZE / 2;
        const cy = SIZE / 2;
        const R  = SIZE / 2 - 3;

        // Perfect sphere base — ctx.arc guarantees a circle
        const bg = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.28, R * 0.04, cx, cy, R);
        bg.addColorStop(0,   '#f5f2ed');
        bg.addColorStop(0.7, '#e8e3db');
        bg.addColorStop(1,   '#d0cac1');
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 2 * Math.PI);
        ctx.fillStyle = bg;
        ctx.fill();

        // Land dots with full two-axis projection
        for (const [px, py, pz] of dots) {
          const [rx, ry, rz] = project(px, py, pz, phi, THETA);
          if (rz <= 0) continue;
          ctx.beginPath();
          ctx.arc(cx - rx * R, cy - ry * R, 0.7 + rz * 0.55, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(148,135,112,${(0.5 + rz * 0.4).toFixed(2)})`;
          ctx.fill();
        }

        // Subtle sphere edge highlight
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(180,165,140,0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Atmosphere glow
        const glow = ctx.createRadialGradient(cx, cy, R * 0.87, cx, cy, R + 22);
        glow.addColorStop(0, 'rgba(235,225,200,0)');
        glow.addColorStop(1, 'rgba(201,162,75,0.14)');
        ctx.beginPath();
        ctx.arc(cx, cy, R + 22, 0, 2 * Math.PI);
        ctx.fillStyle = glow;
        ctx.fill();

        // Markers
        MARKERS.forEach((m, i) => {
          const [rx, ry, rz] = project(marker3D[i][0], marker3D[i][1], marker3D[i][2], phi, THETA);
          const el = markerEls.current[i];
          if (!el) return;
          if (rz > 0) {
            el.style.left    = cx - rx * R + 'px';
            el.style.top     = cy - ry * R + 'px';
            el.style.opacity = String(Math.min(1, rz * 2).toFixed(2));
          } else {
            el.style.opacity = '0';
          }
        });

        animId = requestAnimationFrame(render);
      }

      render();
      canvas.style.opacity = '1';
    };
    img.src = WORLD_MAP_B64;

    return () => { if (animId) cancelAnimationFrame(animId); };
  }, []);

  return (
    <div
      className="relative select-none"
      style={{ width: SIZE, height: SIZE, flexShrink: 0 }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          display: 'block',
          width:  SIZE + 'px',
          height: SIZE + 'px',
          borderRadius: '50%',
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 1.2s ease',
          touchAction: 'none',
        }}
      />
      {MARKERS.map((m, i) => (
        <div
          key={i}
          ref={el => { markerEls.current[i] = el; }}
          style={{
            position: 'absolute',
            width:  m.size,
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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0.15, 0.32, 0.55, 0.67], [0, 1, 1, 0]);
  const filter  = useTransform(scrollYProgress, [0.15, 0.32, 0.55, 0.67],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']);
  const scale   = useTransform(scrollYProgress, [0.15, 0.32, 0.55, 0.67],
    [0.94, 1, 1, 0.94]);
  const pointerEvents = useTransform(scrollYProgress,
    (p) => p > 0.30 && p < 0.57 ? 'auto' : 'none');

  return (
    <div ref={containerRef} id="presencia-global" className="relative h-[200vh]">
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '0',
          overflow: 'hidden',
          backgroundColor: '#FDFBF7',
          opacity,
          filter,
          scale,
          pointerEvents,
          zIndex: 4,
        }}
      >
        <div className="mb-3 text-center px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent pb-4">
            PRESENCIA GLOBAL
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-base text-neutral-600 font-inter">
            Inversores de todo el mundo confían en OBL Prime para acceder al mercado inmobiliario de Bombinhas.
          </p>
        </div>

        <GlobeCanvas />
      </motion.div>
    </div>
  );
}
