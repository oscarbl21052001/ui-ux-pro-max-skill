'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from '../../components/ContactModal';

interface ProjectPageProps {
  name: string;
  location: string;
  typology: string;
  distance: string;
  description: string;
  amenities: string[];
  images: string[];
  delivery: string;
}

export default function ProjectPage({
  name,
  location,
  typology,
  distance,
  description,
  amenities,
  images,
  delivery,
}: ProjectPageProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [dir, setDir]             = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const go = (d: 1 | -1) => {
    setDir(d);
    setActiveImg(i => (i + d + images.length) % images.length);
  };

  return (
    <main style={{ background: '#080a0e', minHeight: '100vh', fontFamily: 'var(--font-inter)' }}>

      {/* Hero carousel */}
      <section className="relative w-full overflow-hidden" style={{ height: '70vh', minHeight: 400 }}>

        {/* Images — one at a time */}
        <AnimatePresence initial={false} custom={dir} mode="sync">
          <motion.div
            key={activeImg}
            custom={dir}
            initial={{ x: dir > 0 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir > 0 ? '-100%' : '100%', opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.32, 0, 0.18, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={images[activeImg]}
              alt={name}
              fill
              quality={90}
              className="object-cover"
              priority={activeImg === 0}
              loading={activeImg === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to bottom, rgba(8,10,14,0.35) 0%, rgba(8,10,14,0.05) 40%, rgba(8,10,14,0.82) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Back button */}
        <Link
          href="/#proyectos"
          style={{
            position: 'absolute', top: 24, left: 24, zIndex: 10,
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.75)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
            padding: '0.5rem 1rem',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          ← Proyectos
        </Link>

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Imagen anterior"
              style={{
                position: 'absolute', left: 20, top: '50%',
                transform: 'translateY(-50%)', zIndex: 10,
                width: 44, height: 44,
                background: 'rgba(0,0,0,0.42)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9L11 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Imagen siguiente"
              style={{
                position: 'absolute', right: 20, top: '50%',
                transform: 'translateY(-50%)', zIndex: 10,
                width: 44, height: 44,
                background: 'rgba(0,0,0,0.42)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        {/* Hero text + dot indicators */}
        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, padding: '0 2rem', zIndex: 10 }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ color: '#C9A24B', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}
            >
              {location}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{
                fontFamily: 'var(--font-playfair-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.1,
              }}
            >
              {name}
            </motion.h1>

            {/* Dot indicators */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 7, marginTop: 18 }}>
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDir(i > activeImg ? 1 : -1); setActiveImg(i); }}
                    aria-label={`Foto ${i + 1}`}
                    style={{
                      width: i === activeImg ? 20 : 7, height: 7,
                      borderRadius: 4,
                      background: i === activeImg ? '#C9A24B' : 'rgba(255,255,255,0.35)',
                      border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'width 0.3s ease, background 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 2rem 5rem' }}>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          {[
            { label: 'Tipología', value: typology },
            { label: 'Distancia al mar', value: distance },
            { label: 'Entrega prevista', value: delivery },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                flex: '1 1 180px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,162,75,0.15)',
                borderRadius: 10,
                padding: '1rem 1.25rem',
              }}
            >
              <p style={{ color: 'rgba(201,162,75,0.7)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>
                {stat.label}
              </p>
              <p style={{ color: '#fff', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '1rem',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}
        >
          {description}
        </motion.p>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          <h2 style={{
            color: '#C9A24B',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            Amenities y servicios
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
            {amenities.map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '0.85rem',
                }}
              >
                <span style={{ color: '#C9A24B', fontSize: '0.5rem' }}>◆</span>
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,162,75,0.3), transparent)', margin: '2.5rem 0' }} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
            ¿Te interesa este proyecto? Escríbenos y te enviamos toda la información.
          </p>
          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(201,162,75,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '0.85rem 2.5rem',
              background: 'linear-gradient(90deg, #C9A24B, #E3C174)',
              border: 'none',
              borderRadius: 10,
              color: '#0a0c10',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Recibir información
          </motion.button>
        </motion.div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
