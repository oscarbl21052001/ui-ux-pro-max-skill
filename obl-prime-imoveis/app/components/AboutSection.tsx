'use client';

import { useRef, useCallback, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calculator } from 'lucide-react';

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const LEFT_SERVICES: ServiceCard[] = [
  {
    title: 'Interior Design',
    description: 'Diseño de interiores exclusivo con materiales nobles y acabados de alta costura.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Orientación Fiscal',
    description: 'Información clara + el asesor colegiado que necesitas para tu caso',
    icon: <Calculator className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    title: 'Planning',
    description: 'Planificación de obra y flujos técnicos con cronogramas de precisión milimétrica.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

const RIGHT_SERVICES: ServiceCard[] = [
  {
    title: 'Exterior Architecture',
    description: 'Proyección de fachadas y volúmenes que dialogan con el entorno natural.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 20h20M5 20V8l7-5 7 5v12" />
        <path d="M9 20v-4h6v4" />
        <line x1="9" y1="12" x2="9" y2="12.01" />
        <line x1="15" y1="12" x2="15" y2="12.01" />
      </svg>
    ),
  },
  {
    title: 'Decoration & Styling',
    description: 'Curaduría de mobiliario, textiles e iluminación para ambientes memorables.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Execution',
    description: 'Dirección meticulosa de obra y entrega llave en mano sin compromisos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
];

function ServiceCardItem({ card }: { card: ServiceCard }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-xl p-5 cursor-default"
      style={{
        background: 'rgba(10, 12, 16, 0.72)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        boxShadow: '0 8px 32px -8px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.07)',
        transform: 'translateZ(0)',
        isolation: 'isolate',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        borderColor: 'rgba(201,162,75,0.50)',
        boxShadow: '0 10px 36px -6px rgba(0,0,0,0.70), 0 0 24px 4px rgba(201,162,75,0.10), inset 0 1px 0 rgba(255,255,255,0.09)',
        y: -4,
      }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#C9A24B]"
          style={{ background: 'rgba(201,162,75,0.12)', border: '1px solid rgba(201,162,75,0.22)' }}
        >
          {card.icon}
        </div>
        <div className="min-w-0">
          <h4 className="font-inter text-sm font-semibold text-white tracking-wide">
            {card.title}
          </h4>
          <p className="mt-1 font-inter text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
            {card.description}
          </p>
          <span
            className="mt-2 inline-block font-inter text-xs font-medium transition-all duration-300"
            style={{
              color: '#C9A24B',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
            }}
          >
            Saber más →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const PORTFOLIO_VIDEO = '/portfolio-preview.mp4';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  // Full-range tracking: ['start end','end start'] spans 300vh for a 200vh section.
  // Sticky pins from progress ≈ 0.33 to ≈ 0.67 (100vh of hold).
  //   Fade-in  : 0.15 → 0.32  starts 55vh before sticky, overlapping Proyectos tail
  //              (Phase 3 already transparent by then — no visual conflict)
  //   Hold     : 0.32 → 0.55  fully visible, pinned
  //   Fade-out : 0.55 → 0.67  dissolves in place before sticky releases
  //   Silent   : outside range → clamped to opacity 0
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.32, 0.55, 0.67], [0, 1, 1, 0]);
  const contentFilter  = useTransform(scrollYProgress, [0.15, 0.32, 0.55, 0.67],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']);
  const contentScale   = useTransform(scrollYProgress, [0.15, 0.32, 0.55, 0.67],
    [0.94, 1, 1, 0.94]);
  const contentPointerEvents = useTransform(scrollYProgress, (p) =>
    p > 0.30 && p < 0.57 ? 'auto' : 'none');

  const handleMouseEnter = useCallback(() => {
    try { videoRef.current?.play().catch(() => {}); } catch {}
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    // 200vh scroll budget — content stays sticky while background video holds its final frame
    <div ref={containerRef} id="nosotros" className="relative h-[200vh]">
      {/* SectionBackground Phase C watches this to know when to fade the canvas */}
      <div id="nosotros-exit" aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1 }} />

      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: contentOpacity,
          filter: contentFilter,
          scale: contentScale,
          pointerEvents: contentPointerEvents,
          zIndex: 5,
        }}
      >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent pb-4">
            SOBRE NOSOTROS
          </h2>

          <p className="text-center font-inter text-xs font-semibold uppercase tracking-[4px] text-[#C9A24B]/70 mt-2">
            Nuestra visión y valores
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-center font-inter text-base leading-relaxed text-slate-800 px-6">
            Combinamos experiencia en el mercado inmobiliario español con un análisis riguroso
            del litoral brasileño para estructurar inversiones seguras y de alto potencial.
            Nuestro compromiso es guiar cada paso con transparencia, asegurando no solo una
            excelente rentabilidad, sino también la tranquilidad y el estilo de vida excepcional
            que mereces en Bombinhas
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 max-w-7xl mx-auto w-full px-6 mt-12 items-center">
            <div className="lg:col-span-4 flex flex-col gap-4">
              {LEFT_SERVICES.map((card) => (
                <ServiceCardItem key={card.title} card={card} />
              ))}
            </div>

            <div className="lg:col-span-3 flex justify-center">
              <div
                className="group relative w-full max-w-[280px] overflow-hidden rounded-2xl border-2 border-[#C9A24B]/20 shadow-2xl"
                style={{ aspectRatio: '3/4' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  loop
                  controls={false}
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                >
                  <source src={PORTFOLIO_VIDEO} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40 pointer-events-none" />
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              {RIGHT_SERVICES.map((card) => (
                <ServiceCardItem key={card.title} card={card} />
              ))}
            </div>
          </div>
      </motion.div>
    </div>
  );
}
