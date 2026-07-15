'use client';

import { motion } from 'framer-motion';

const STATS = [
  {
    value: '150+',
    label: 'Projects Completed',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mx-auto mb-4">
        <circle cx="20" cy="20" r="18" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" />
        <path
          d="M20 10l2.5 5.5H28l-4.5 3.5 1.5 5.5L20 21l-5 3.5 1.5-5.5L12 15.5h5.5L20 10z"
          fill="#C9A24B"
          opacity="0.85"
        />
      </svg>
    ),
  },
  {
    value: '1200+',
    label: 'Happy Clients',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mx-auto mb-4">
        <circle cx="20" cy="20" r="18" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" />
        <circle cx="15" cy="16" r="3" fill="#C9A24B" opacity="0.85" />
        <circle cx="25" cy="16" r="3" fill="#C9A24B" opacity="0.85" />
        <path
          d="M10 26c0-3.3 4.5-5 10-5s10 1.7 10 5"
          stroke="#C9A24B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    ),
  },
  {
    value: '12',
    label: 'Years Experience',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mx-auto mb-4">
        <circle cx="20" cy="20" r="18" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" />
        <rect x="12" y="12" width="16" height="16" rx="2" stroke="#C9A24B" strokeWidth="1.5" opacity="0.85" />
        <line x1="12" y1="17" x2="28" y2="17" stroke="#C9A24B" strokeWidth="1.5" opacity="0.85" />
        <line x1="17" y1="12" x2="17" y2="14" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        <line x1="23" y1="12" x2="23" y2="14" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
      </svg>
    ),
  },
  {
    value: '98%',
    label: 'Satisfaction Rate',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mx-auto mb-4">
        <circle cx="20" cy="20" r="18" stroke="#C9A24B" strokeWidth="1.5" opacity="0.3" />
        <polyline
          points="12,26 18,20 22,23 28,14"
          stroke="#C9A24B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />
        <polyline
          points="24,14 28,14 28,18"
          stroke="#C9A24B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />
      </svg>
    ),
  },
];

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="relative w-full pt-20 pb-8">
      {/* Legibility overlay — video bleeds through from the fixed canvas */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(14,20,24,0.60) 0%, rgba(14,20,24,0.50) 50%, rgba(14,20,24,0.72) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-center font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent pb-8"
          initial={{ filter: 'blur(12px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          PROYECTOS
        </motion.h2>

        <div className="min-h-[30vh] md:min-h-[40vh] w-full max-w-7xl mx-auto px-6 mb-16" />

        <div className="w-full max-w-7xl mx-auto px-4 pb-12 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 text-center cursor-default"
                initial={{ opacity: 0, x: i < 2 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 40px -15px rgba(201, 162, 75, 0.18)',
                }}
                whileTap={{ scale: 0.98 }}
                style={{ transition: 'box-shadow 0.3s ease' }}
              >
                {stat.icon}
                <p className="font-extrabold text-4xl text-white font-inter mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-400 text-sm tracking-wide font-inter uppercase">
                  {stat.label}
                </p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
