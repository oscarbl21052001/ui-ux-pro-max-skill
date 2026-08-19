'use client';

import { useRef, useState, useCallback } from 'react';
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
      className={`relative rounded-xl border p-5 transition-colors duration-300 cursor-default ${
        hovered
          ? 'bg-slate-800 border-[#C9A24B]/50 shadow-[0_10px_30px_rgba(201,162,75,0.12)]'
          : 'bg-slate-900 border-slate-700/40'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
            hovered ? 'bg-[#C9A24B] text-[#0E1418]' : 'bg-[#C9A24B]/10 text-[#C9A24B]'
          }`}
        >
          {card.icon}
        </div>
        <div className="min-w-0">
          <h4 className="font-inter text-sm font-semibold text-white tracking-wide">
            {card.title}
          </h4>
          <p className="mt-1 font-inter text-xs leading-relaxed text-neutral-400">
            {card.description}
          </p>
          <span
            className={`mt-2 inline-block font-inter text-xs font-medium text-[#C9A24B] transition-all duration-300 ${
              hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            }`}
          >
            Learn more →
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

  // Scroll-linked fade-in: blur(10px)→blur(0) + opacity 0→1 as section enters viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'start 0.35'],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const contentFilter  = useTransform(scrollYProgress, [0, 1], ['blur(10px)', 'blur(0px)']);

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

      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          className="w-full"
          style={{ opacity: contentOpacity, filter: contentFilter }}
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
    </div>
  );
}
