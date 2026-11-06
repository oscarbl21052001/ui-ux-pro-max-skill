'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PROJECTS = [
  {
    slug: 'spot-335',
    name: 'SPOT 335',
    typology: 'Apartamentos · 1 dormitorio',
    distance: '450 m del mar',
    img: '/projects/spot335-1.jpg',
    span: 'col-span-2',
  },
  {
    slug: 'villa-bellagio',
    name: 'VILLA BELLAGIO',
    typology: 'Lofts · Rooftop',
    distance: '300 m del mar',
    img: '/projects/villa-bellagio-1.jpg',
    span: 'col-span-1',
  },
  {
    slug: 'bombas-home-club',
    name: 'BOMBAS HOME CLUB',
    typology: 'Apartamentos · 2 suites',
    distance: 'A pasos del mar',
    img: '/projects/bombas-home-club-1.jpg',
    span: 'col-span-1',
  },
  {
    slug: 'vogue-apartments',
    name: 'VOGUE APARTMENTS',
    typology: 'Alto padrón · Rooftop',
    distance: '250 m del mar',
    img: '/projects/vogue-apartments-1.jpg',
    span: 'col-span-2',
  },
  {
    slug: 'solaia',
    name: 'SOLAIA RESIDENCE',
    typology: 'Apartamentos · 1 dormitorio',
    distance: 'Frente a la bahía · Zimbros',
    img: '/projects/solaia-1.jpg',
    span: 'col-span-1',
  },
  {
    slug: 'enedina-mercedes',
    name: 'ENEDINA MERCEDES',
    typology: 'Residence · 36 unidades',
    distance: '250 m del mar · Centro',
    img: '/projects/enedina-mercedes-1.jpg',
    span: 'col-span-2',
  },
];

export default function ProjectsGrid() {
  const router = useRouter();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.slug}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
              p.span === 'col-span-2' ? 'lg:col-span-2' : 'lg:col-span-1'
            }`}
            style={{ aspectRatio: p.span === 'col-span-2' ? '16/9' : '4/5' }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: i * 0.08 }}
            onClick={() => router.push(`/proyectos/${p.slug}`)}
          >
            {/* Image */}
            <Image
              src={p.img}
              alt={p.name}
              fill
              quality={85}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Base gradient overlay */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
            />

            {/* Hover overlay */}
            <div
              aria-hidden
              className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#C9A24B',
                  marginBottom: '0.3rem',
                  opacity: 0.9,
                }}
              >
                {p.distance}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair-display)',
                  fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {p.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.55)',
                  marginTop: '0.25rem',
                  letterSpacing: '0.06em',
                }}
              >
                {p.typology}
              </p>

              {/* CTA — appears on hover */}
              <div
                className="mt-3 overflow-hidden"
                style={{
                  maxHeight: 0,
                  transition: 'max-height 0.35s ease',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.35rem 1rem',
                    background: 'linear-gradient(90deg, #C9A24B, #E3C174)',
                    borderRadius: 6,
                    color: '#0a0c10',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  Ver proyecto →
                </span>
              </div>
            </div>

            {/* Hover CTA shown via CSS group */}
            <div
              className="absolute bottom-5 md:bottom-6 left-5 md:left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
              style={{ marginTop: '0.5rem' }}
            >
            </div>

            {/* Top-right arrow */}
            <div
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
              style={{
                width: 32, height: 32,
                background: 'rgba(201,162,75,0.15)',
                backdropFilter: 'blur(8px)',
                borderRadius: '50%',
                border: '1px solid rgba(201,162,75,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
