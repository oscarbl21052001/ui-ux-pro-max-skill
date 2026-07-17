'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ── Carousel data (Phase 2 — Fundamentos del Mercado) ────────────────────────
const CARDS = [
  { id: 1, title: 'Valorización Anual',  value: '+18%',   sub: 'Promedio histórico en SC',    chart: 'bars-up'    },
  { id: 2, title: 'Ocupación Turística', value: '87%',    sub: 'En temporada alta',           chart: 'arc'        },
  { id: 3, title: 'Rentabilidad Bruta',  value: '8–25%',  sub: 'Por alquiler vacacional',     chart: 'line-up'    },
  { id: 4, title: 'Turistas / Año',      value: '2M+',    sub: 'Demanda creciente',           chart: 'bars-grow'  },
  { id: 5, title: 'Valor m² Centro',     value: 'R$12k',  sub: 'Supera Florianópolis',        chart: 'arrow-up'   },
  { id: 6, title: 'Crecimiento Pob.',    value: '+75%',   sub: 'En 12 años',                  chart: 'area'       },
  { id: 7, title: 'Suelo Protegido',     value: '67%',    sub: 'Inedificable por ley',        chart: 'donut'      },
  { id: 8, title: 'Rendimiento Acum.',   value: '+340%',  sub: 'En los últimos 10 años',      chart: 'line-steep' },
];

const N      = CARDS.length;
const ANGLE  = 360 / N;
const RADIUS = 440;
const CARD_W = 200;
const CARD_H = 260;

function MiniChart({ type }: { type: string }) {
  const arc67    = 2 * Math.PI * 18 * 0.67;
  const arcFull  = 2 * Math.PI * 18;
  const arcOffset = arcFull * 0.25;
  switch (type) {
    case 'bars-up':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          {[12, 18, 15, 26, 20, 33, 28, 40].map((h, i) => (
            <rect key={i} x={i * 10 + 1} y={40 - h} width={8} height={h} rx={2} fill="#C9A24B" fillOpacity={0.28 + i * 0.09} />
          ))}
        </svg>
      );
    case 'arc':
      return (
        <svg viewBox="0 0 80 48" width="100%" height="36" aria-hidden>
          <path d="M10 42 A30 30 0 0 1 70 42" stroke="rgba(255,255,255,0.09)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M10 42 A30 30 0 0 1 64 22" stroke="#C9A24B" strokeWidth="7" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'line-up':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          <polygon points="0,38 20,30 40,22 60,12 80,5 80,40" fill="#C9A24B" fillOpacity="0.1" />
          <polyline points="0,38 20,30 40,22 60,12 80,5" fill="none" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'bars-grow':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          {[6, 11, 16, 22, 27, 32, 36, 40].map((h, i) => (
            <rect key={i} x={i * 10 + 1} y={40 - h} width={8} height={h} rx={2} fill="#C9A24B" fillOpacity={0.22 + i * 0.1} />
          ))}
        </svg>
      );
    case 'arrow-up':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          <polyline points="0,38 20,30 40,22 60,12 80,3" fill="none" stroke="#C9A24B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="68,3 80,3 80,15" fill="none" stroke="#C9A24B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'area':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          <polygon points="0,38 15,32 35,24 55,14 80,4 80,40" fill="#C9A24B" fillOpacity="0.12" />
          <polyline points="0,38 15,32 35,24 55,14 80,4" fill="none" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'donut':
      return (
        <svg viewBox="0 0 80 50" width="100%" height="36" aria-hidden>
          <circle cx="40" cy="28" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
          <circle cx="40" cy="28" r="18" fill="none" stroke="#C9A24B" strokeWidth="9"
            strokeDasharray={`${arc67} ${arcFull}`}
            strokeDashoffset={arcOffset}
            strokeLinecap="round"
            transform="rotate(-90 40 28)"
          />
        </svg>
      );
    case 'line-steep':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          <polyline points="0,38 10,35 25,29 40,21 55,12 70,5 80,2" fill="none" stroke="#C9A24B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="80" cy="2" r="3.5" fill="#C9A24B" />
        </svg>
      );
    default:
      return null;
  }
}

function CarouselCard({
  card, index, isActive, onPress, onRelease,
}: {
  card: typeof CARDS[0]; index: number; isActive: boolean; onPress: () => void; onRelease: () => void;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute', left: 0, top: 0,
        transform: `rotateY(${index * ANGLE}deg) translateZ(${RADIUS}px)`,
        cursor: 'pointer', userSelect: 'none', WebkitUserSelect: 'none',
      }}
      onPointerDown={(e) => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); onPress(); }}
      onPointerUp={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); onRelease(); }}
      onPointerCancel={onRelease}
      onDragStart={(e) => e.preventDefault()}
    >
      <div style={{
        width: CARD_W, height: CARD_H,
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(145deg, rgba(8,10,14,0.82) 0%, rgba(4,6,9,0.88) 100%)',
        border: '1px solid rgba(201,162,75,0.28)', borderRadius: 16, padding: '20px 18px',
        boxShadow: '0 2px 0 inset rgba(255,255,255,0.06), 0 8px 20px rgba(0,0,0,0.38), 0 0 0 0.5px rgba(201,162,75,0.18)',
        display: 'flex', flexDirection: 'column', gap: 6,
        filter: isActive ? 'invert(1)' : 'invert(0)',
        transition: 'filter 220ms ease',
      }}>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,162,75,0.72)', fontFamily: 'var(--font-inter)' }}>
          {card.title}
        </span>
        <p style={{
          fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-playfair-display)',
          background: 'linear-gradient(135deg, #FFF4D0 0%, #F3C63F 55%, #C7941D 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          lineHeight: 1.05, margin: 0,
        }}>{card.value}</p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--font-inter)', lineHeight: 1.3, margin: 0 }}>{card.sub}</p>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,162,75,0.32), transparent)', margin: '4px 0' }} />
        <div style={{ flex: 1 }}><MiniChart type={card.chart} /></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function BombinhasProjectsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef      = useRef<HTMLDivElement>(null);
  const [scale, setScale]           = useState(1);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setScale(w < 480 ? 0.46 : w < 768 ? 0.66 : w < 1024 ? 0.84 : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pause  = useCallback(() => { if (ringRef.current) ringRef.current.style.animationPlayState = 'paused';  }, []);
  const resume = useCallback(() => { if (ringRef.current) ringRef.current.style.animationPlayState = 'running'; }, []);
  const handlePress   = useCallback((id: number) => { setActiveCard(id); pause();  }, [pause]);
  const handleRelease = useCallback(() =>           { setActiveCard(null); resume(); }, [resume]);

  // scrollYProgress: 0 = container top at viewport top, 1 = container bottom at viewport bottom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // h-[400vh] → 300vh sticky scroll budget
  // Phase 1 (Bombinhas):  [0.00 → 0.37] = ~111vh
  //   Fade-in  [0.00 → 0.07]: 21vh — opacity 0→1, no blur
  //   Plateau  [0.07 → 0.28]: 63vh — full opacity, no blur
  //   Blur-out [0.28 → 0.37]: 27vh — opacity 1→0, blur 0→20px
  // Phase 2 (Carousel):   [0.37 → 1.00] = ~189vh
  //   Zoom-in  [0.37 → 0.52]: 45vh — scale 0.7→1, opacity 0→1, blur 10→0
  //   Plateau  [0.52 → 1.00]: 144vh — full opacity, scale 1, no blur

  // ── Phase 1: Bombinhas card ────────────────────────────────────────────────
  const bombOpacity = useTransform(scrollYProgress, [0, 0.07, 0.28, 0.37], [0, 1, 1, 0]);
  const bombBlurPx  = useTransform(scrollYProgress, [0, 0.28, 0.37], [0, 0, 20]);
  const bombFilter  = useTransform(bombBlurPx, (v) => `blur(${v.toFixed(1)}px)`);

  // ── Phase 2: Fundamentos del Mercado carousel ──────────────────────────────
  const projOpacity = useTransform(scrollYProgress, [0.37, 0.52], [0, 1]);
  const projScale   = useTransform(scrollYProgress, [0.37, 0.52], [0.7, 1]);
  const projBlurPx  = useTransform(scrollYProgress, [0.37, 0.52], [10, 0]);
  const projFilter  = useTransform(projBlurPx, (v) => `blur(${v.toFixed(1)}px)`);

  const stageH  = 360;
  const visualH = Math.round(stageH * scale);

  return (
    <div ref={containerRef} id="bombinhas" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Phase 1: Bombinhas glassmorphic card ───────────────────── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: bombOpacity, filter: bombFilter, willChange: 'opacity, filter', pointerEvents: 'none' }}
        >
          <div
            className="mx-auto max-w-4xl w-full space-y-8 rounded-3xl px-10 py-10 md:px-14 md:py-12 text-center"
            style={{
              background: 'rgba(10, 12, 16, 0.38)',
              backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 48px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              transform: 'translateZ(0)', isolation: 'isolate', pointerEvents: 'auto',
            }}
          >
            <div className="space-y-6">
              <p className="font-cardo italic" style={{ color: '#C9A24B', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', letterSpacing: '0.08em' }}>
                ¿POR QUÉ DEBERÍA ELEGIR BOMBINHAS?
              </p>
              <h2 className="font-bold text-white" style={{ fontFamily: 'var(--font-perandory)', fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', lineHeight: 1.14 }}>
                <span className="block">Un inversor</span>
                <span className="block" style={{ color: 'rgba(201,162,75,0.78)' }}>no busca promesas.</span>
                <span className="block">Busca garantías legales</span>
              </h2>
            </div>
            <motion.div
              className="rounded-lg px-6 py-5 space-y-2"
              style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(201,162,75,0.32)', background: 'rgba(201,162,75,0.04)' }}
              whileHover={{ borderColor: 'rgba(201,162,75,0.82)', background: 'rgba(201,162,75,0.13)', boxShadow: '0 0 28px 6px rgba(212,175,55,0.15)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <p className="font-inter font-semibold uppercase leading-relaxed" style={{ color: '#C9A24B', fontSize: 'clamp(0.68rem, 1.1vw, 0.8rem)', letterSpacing: '0.14em' }}>
                67% DEL TERRITORIO PROTEGIDO POR LEY&nbsp;&nbsp;<span style={{ opacity: 0.55 }}>•</span>&nbsp;&nbsp;100% PROTEGIDO DE LA SOBREOFERTA
              </p>
              <p className="font-cardo italic" style={{ color: 'rgba(255,255,255,0.90)', fontSize: '1rem' }}>
                Un solo resultado: escasez permanente.
              </p>
            </motion.div>
            <div className="space-y-10">
              <p className="font-cardo leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)' }}>
                La belleza de Bombinhas está legalmente obligada a permanecer intacta. Tu inversión, también.
              </p>
              <motion.a
                href="/bombinhas-info" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full font-inter font-semibold"
                style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(201,162,75,0.50)', color: '#C9A24B', background: 'transparent', padding: '0.75rem 2rem', fontSize: '0.875rem', letterSpacing: '0.03em', boxShadow: '0 0 0 0 rgba(201,162,75,0)' }}
                whileHover={{ borderColor: 'rgba(212,175,55,1)', color: '#F5E6A8', background: 'rgba(201,162,75,0.10)', boxShadow: '0 0 36px 10px rgba(212,175,55,0.18), 0 0 0 1px rgba(212,175,55,0.85)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                Más info
                <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: '1rem' }}>→</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ── Phase 2: Fundamentos del Mercado — 3D carousel ─────────── */}
        <motion.div
          id="proyectos"
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: projOpacity, scale: projScale, filter: projFilter, willChange: 'opacity, filter, transform', pointerEvents: 'none' }}
        >
          {/* 3D carousel stage — transparent bg, video shows through */}
          <div style={{ height: visualH, position: 'relative', width: '100%', pointerEvents: 'auto' }}>
            <div
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                perspective: '1500px', perspectiveOrigin: 'center center', overflow: 'visible',
              }}
            >
              <div style={{ transform: `scale(${scale})`, transformStyle: 'preserve-3d', transformOrigin: 'center center', width: 0, height: 0 }}>
                <div
                  ref={ringRef}
                  className="carousel-ring"
                  style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center', width: 0, height: 0, willChange: 'transform', animation: 'carouselSpin 18s linear infinite' }}
                >
                  {CARDS.map((card, i) => (
                    <CarouselCard
                      key={card.id} card={card} index={i}
                      isActive={activeCard === card.id}
                      onPress={() => handlePress(card.id)}
                      onRelease={handleRelease}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
