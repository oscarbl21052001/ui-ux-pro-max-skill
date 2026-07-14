'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

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
const ANGLE  = 360 / N;  // 45 °
const RADIUS = 440;      // virtual cylinder radius in px
const CARD_W = 200;
const CARD_H = 260;

// ─── Mini SVG charts ─────────────────────────────────────────────────────────
function MiniChart({ type }: { type: string }) {
  const arc67     = 2 * Math.PI * 18 * 0.67;
  const arcFull   = 2 * Math.PI * 18;
  const arcOffset = arcFull * 0.25;

  switch (type) {
    case 'bars-up':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          {[12, 18, 15, 26, 20, 33, 28, 40].map((h, i) => (
            <rect key={i} x={i * 10 + 1} y={40 - h} width={8} height={h} rx={2}
              fill="#C9A24B" fillOpacity={0.28 + i * 0.09} />
          ))}
        </svg>
      );
    case 'arc':
      return (
        <svg viewBox="0 0 80 48" width="100%" height="36" aria-hidden>
          <path d="M10 42 A30 30 0 0 1 70 42" stroke="rgba(255,255,255,0.09)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M10 42 A30 30 0 0 1 64 22" stroke="#C9A24B"               strokeWidth="7" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'line-up':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          <polygon  points="0,38 20,30 40,22 60,12 80,5 80,40"  fill="#C9A24B" fillOpacity="0.1" />
          <polyline points="0,38 20,30 40,22 60,12 80,5"        fill="none" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'bars-grow':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          {[6, 11, 16, 22, 27, 32, 36, 40].map((h, i) => (
            <rect key={i} x={i * 10 + 1} y={40 - h} width={8} height={h} rx={2}
              fill="#C9A24B" fillOpacity={0.22 + i * 0.1} />
          ))}
        </svg>
      );
    case 'arrow-up':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          <polyline points="0,38 20,30 40,22 60,12 80,3" fill="none" stroke="#C9A24B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="68,3 80,3 80,15"              fill="none" stroke="#C9A24B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'area':
      return (
        <svg viewBox="0 0 80 40" width="100%" height="36" aria-hidden>
          <polygon  points="0,38 15,32 35,24 55,14 80,4 80,40" fill="#C9A24B" fillOpacity="0.12" />
          <polyline points="0,38 15,32 35,24 55,14 80,4"        fill="none" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({
  card,
  index,
  isActive,
  onPress,
  onRelease,
}: {
  card: typeof CARDS[0];
  index: number;
  isActive: boolean;
  onPress: () => void;
  onRelease: () => void;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `rotateY(${index * ANGLE}deg) translateZ(${RADIUS}px)`,
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        onPress();
      }}
      onPointerUp={(e) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        onRelease();
      }}
      onPointerCancel={onRelease}
      onDragStart={(e) => e.preventDefault()}
    >
      <div
        style={{
          width: CARD_W,
          height: CARD_H,
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.025) 100%)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(201,162,75,0.22)',
          borderRadius: 16,
          padding: '20px 18px',
          boxShadow:
            '0 2px 0 inset rgba(255,255,255,0.07), 0 24px 48px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(201,162,75,0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          filter: isActive ? 'invert(1)' : 'invert(0)',
          transition: 'filter 220ms ease',
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,162,75,0.72)', fontFamily: 'var(--font-inter)' }}>
          {card.title}
        </span>

        <p style={{
          fontSize: '2rem',
          fontWeight: 800,
          fontFamily: 'var(--font-playfair-display)',
          background: 'linear-gradient(135deg, #FFF4D0 0%, #F3C63F 55%, #C7941D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.05,
          margin: 0,
        }}>
          {card.value}
        </p>

        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--font-inter)', lineHeight: 1.3, margin: 0 }}>
          {card.sub}
        </p>

        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,162,75,0.32), transparent)', margin: '4px 0' }} />

        <div style={{ flex: 1 }}>
          <MiniChart type={card.chart} />
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
const BG = '#06090B';

export default function CarouselSection() {
  const [scale, setScale]           = useState(1);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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

  const stageH  = 360;
  const visualH = Math.round(stageH * scale);

  return (
    <section className="relative bg-[#06090B] py-24">
      {/* Title */}
      <div className="text-center mb-16 px-6">
        <h2
          className="font-playfair"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            background: 'linear-gradient(90deg, #FFF4D0 0%, #F3C63F 40%, #C7941D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Fundamentos del Mercado
        </h2>
        <p className="mt-4 max-w-lg mx-auto text-base text-neutral-500 font-inter">
          Los datos que hacen de Bombinhas una inversión sin precedentes.
        </p>
      </div>

      {/* Stage — interaction is click-and-hold per card, not hover */}
      <div style={{ height: visualH, position: 'relative' }}>
        {/* Left / right fade masks — simulates cylindrical edge darkening */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none',
            background: `linear-gradient(to right, ${BG} 0%, transparent 18%, transparent 82%, ${BG} 100%)`,
          }}
        />

        {/*
          3D scene:
          · perspective on a full-inset div → vanishing point = exact center of stage
          · scale wrapper (0×0, centered by flex) → responsive sizing without distorting VP
          · tilt wrapper  (0×0) → rotateX cinematic angle
          · ring          (0×0) → CSS carouselSpin, perfect concentric Y-axis orbit
          · cards         (absolute, rotateY + translateZ) → equidistant on cylinder
        */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1500px',
            perspectiveOrigin: 'center center',
            overflow: 'visible',
          }}
        >
          {/* Responsive scale — applied inside perspective so VP stays unaffected */}
          <div
            style={{
              transform: `scale(${scale})`,
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
              width: 0,
              height: 0,
            }}
          >
            {/* X-tilt — cinematic top-down angle */}
            <div
              style={{
                transform: 'rotateX(-12deg)',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
                width: 0,
                height: 0,
              }}
            >
              {/*
                Ring: CSS animation (not Framer Motion) so animationPlayState
                instantly freezes/resumes at the current angle with 0ms latency.
              */}
              <div
                ref={ringRef}
                className="carousel-ring"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  width: 0,
                  height: 0,
                  willChange: 'transform',
                  animation: 'carouselSpin 18s linear infinite',
                }}
              >
                {CARDS.map((card, i) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={i}
                    isActive={activeCard === card.id}
                    onPress={() => handlePress(card.id)}
                    onRelease={handleRelease}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
