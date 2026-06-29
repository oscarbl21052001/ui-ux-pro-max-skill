'use client';

import { motion } from 'framer-motion';

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="relative bg-[#0E1418] w-full pt-20 pb-8">
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold tracking-tight text-center font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent pb-8"
        initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        PROYECTOS
      </motion.h2>

      <div className="min-h-[40vh] md:min-h-[50vh] w-full max-w-7xl mx-auto px-6">
      </div>
    </section>
  );
}
