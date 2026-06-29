'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

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
    title: 'Design Thinking',
    description: 'Análisis creativo preliminar para conceptualizar espacios únicos y funcionales.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
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
          ? 'bg-white/[0.06] border-[#C9A24B]/50 shadow-[0_10px_30px_rgba(201,162,75,0.08)]'
          : 'bg-white/[0.02] border-white/[0.06]'
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    try {
      videoRef.current?.play().catch(() => {});
    } catch {}
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);
  return (
    <section id="nosotros" className="relative bg-[#0E1418] w-full pt-20 pb-20">
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold tracking-tight text-center font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent pb-4"
        initial={{ filter: 'blur(12px)', opacity: 0 }}
        whileInView={{ filter: 'blur(0px)', opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        SOBRE NOSOTROS
      </motion.h2>

      <motion.p
        className="text-center font-inter text-xs font-semibold uppercase tracking-[4px] text-[#C9A24B]/70 mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      >
        Nuestra visión y valores
      </motion.p>

      <motion.p
        className="mx-auto mt-4 max-w-2xl text-center font-inter text-base leading-relaxed text-neutral-400 px-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
      >
        Combinamos experiencia en el mercado inmobiliario español con un análisis riguroso
        del litoral brasileño para estructurar inversiones seguras y de alto potencial.
        Nuestro compromiso es guiar cada paso con transparencia, asegurando no solo una
        excelente rentabilidad, sino también la tranquilidad y el estilo de vida excepcional
        que mereces en Bombinhas
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 max-w-7xl mx-auto w-full px-6 mt-12 items-center overflow-hidden">
        <motion.div
          className="lg:col-span-4 flex flex-col gap-4"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {LEFT_SERVICES.map((card) => (
            <ServiceCardItem key={card.title} card={card} />
          ))}
        </motion.div>

        <motion.div
          className="lg:col-span-3 flex justify-center"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
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
        </motion.div>

        <motion.div
          className="lg:col-span-4 flex flex-col gap-4"
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {RIGHT_SERVICES.map((card) => (
            <ServiceCardItem key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
