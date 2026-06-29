'use client';

import { motion } from 'framer-motion';

export default function ProjectsSection() {
  return (
    <motion.section
      id="proyectos"
      className="relative bg-[#0E1418] pt-20 pb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent pb-8">
        PROYECTOS
      </h2>

      <div className="min-h-[40vh] md:min-h-[50vh] w-full max-w-7xl mx-auto px-6">
      </div>
    </motion.section>
  );
}
