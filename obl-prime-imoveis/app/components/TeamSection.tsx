'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BG_VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260715_142322_a3f9c067-a8d3-465c-9075-ebd055f69007.mp4';
const BG_VIDEO_DURATION = 8;

interface PolaroidCard {
  id: number;
  src: string;
  label: string;
}

const CARDS: PolaroidCard[] = [
  { id: 1, src: '/team_10.jpg', label: 'Bombinhas View - Core' },
  { id: 2, src: '/team_11.jpg', label: 'Ribeiro Boardwalk' },
  { id: 3, src: '/team_22.jpg', label: 'Lagoinha Beach' },
  { id: 4, src: '/team_33.jpg', label: 'Biguá Aerial' },
  { id: 5, src: '/team_44.jpg', label: 'Town Architecture' },
  { id: 6, src: '/team_55.jpg', label: 'Panoramic Lookout' },
  { id: 7, src: '/team_66.jpg', label: 'Ecological Sanctuary' },
  { id: 8, src: '/team_77.jpg', label: 'Clear Waters Bay' },
  { id: 9, src: '/team_88.jpg', label: 'Coastal Peninsula' },
  { id: 10, src: '/team_99.jpg', label: 'Welcome Sign Area' },
];

const STACK_ROTATIONS = [-3, 2, 4, -2, 3, -4, 1, -1, 5, -5];
const STACK_OFFSETS_X = [-4, 6, -2, 8, -6, 3, -8, 5, -3, 7];
const STACK_OFFSETS_Y = [2, -3, 4, -1, 3, -4, 1, -2, 5, -3];

const VISIBLE_DEPTH = 4;

export default function TeamSection() {
  const [topIndex, setTopIndex] = useState(0);
  const [flickState, setFlickState] = useState<'idle' | 'flicking'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // ── Scroll-driven background video scrubbing ─────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const bgVideo = bgVideoRef.current;
    if (!section || !bgVideo) return;

    bgVideo.pause();

    let bgTarget = 0;
    let bgCurrent = 0;
    let raf: number;
    const LERP = 0.14;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vH = window.innerHeight;

      // Scrub: maps full section traversal (top at vH → bottom at 0) to 0→1
      const total = rect.height + vH;
      const scrolled = vH - rect.top;
      const progress = Math.min(Math.max(scrolled / total, 0), 1);
      bgTarget = progress * BG_VIDEO_DURATION;

      // Seamless fade-in: 0 when section top at viewport bottom → 1 when top at 60% viewport
      const fadeRange = vH * 0.4;
      const fadeP = Math.min(Math.max((vH - rect.top) / fadeRange, 0), 1);
      bgVideo.style.opacity = String(fadeP * 0.82);
    };

    const tick = () => {
      bgCurrent += (bgTarget - bgCurrent) * LERP;
      if (bgVideo.readyState >= 2 && Math.abs(bgCurrent - bgVideo.currentTime) > 0.01) {
        bgVideo.currentTime = bgCurrent;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  // ── Scroll-linked animation ──────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 40%'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Title — leads everything, fully landed at scroll end
  const titleScale   = useTransform(smooth, [0, 1], [2.0, 1]);
  const titleZ       = useTransform(smooth, [0, 1], [380, 0]);
  const titleOpacity = useTransform(smooth, [0, 0.5], [0, 1]);
  const titleBlurN   = useTransform(smooth, [0, 0.6], [8, 0]);
  const titleFilter  = useTransform(titleBlurN, (v) => `blur(${v}px)`);

  // Polaroid — one beat behind title
  const polaroidScale   = useTransform(smooth, [0.05, 1], [2.6, 1]);
  const polaroidZ       = useTransform(smooth, [0.05, 1], [420, 0]);
  const polaroidOpacity = useTransform(smooth, [0.05, 0.55], [0, 1]);
  const polaroidBlurN   = useTransform(smooth, [0.05, 0.65], [6, 0]);
  const polaroidFilter  = useTransform(polaroidBlurN, (v) => `blur(${v}px)`);

  // Text block — subtlest depth, two beats behind
  const textScale   = useTransform(smooth, [0.1, 1], [1.5, 1]);
  const textZ       = useTransform(smooth, [0.1, 1], [260, 0]);
  const textOpacity = useTransform(smooth, [0.1, 0.6], [0, 1]);
  const textBlurN   = useTransform(smooth, [0.1, 0.7], [5, 0]);
  const textFilter  = useTransform(textBlurN, (v) => `blur(${v}px)`);
  // ─────────────────────────────────────────────────────────────────────────

  const handleFlick = useCallback(() => {
    if (flickState !== 'idle') return;
    setFlickState('flicking');
  }, [flickState]);

  const handleFlickDone = useCallback(() => {
    setTopIndex((prev) => (prev + 1) % CARDS.length);
    setFlickState('idle');
  }, []);

  const flickDir = topIndex % 2 === 0 ? 1 : -1;

  const renderStack = () => {
    const elements: React.ReactNode[] = [];

    for (let d = VISIBLE_DEPTH - 1; d >= 0; d--) {
      const idx = (topIndex + d) % CARDS.length;
      const card = CARDS[idx];

      if (d === 0) {
        elements.push(
          <motion.div
            key={`card-${card.id}-${topIndex}`}
            className="absolute inset-0"
            animate={
              flickState === 'flicking'
                ? { x: flickDir * 600, rotate: flickDir * 25, opacity: 0 }
                : { x: 0, y: 0, rotate: 0, scale: 1 }
            }
            transition={
              flickState === 'flicking'
                ? { duration: 0.5, ease: [0.32, 0, 0.67, 0] }
                : { duration: 0.4, ease: 'easeOut' }
            }
            onAnimationComplete={() => {
              if (flickState === 'flicking') handleFlickDone();
            }}
            style={{ zIndex: VISIBLE_DEPTH }}
          >
            <PolaroidFrame card={card} />
          </motion.div>,
        );
      } else {
        const rot = STACK_ROTATIONS[idx % STACK_ROTATIONS.length];
        const ox = STACK_OFFSETS_X[idx % STACK_OFFSETS_X.length];
        const oy = STACK_OFFSETS_Y[idx % STACK_OFFSETS_Y.length];

        elements.push(
          <motion.div
            key={`card-${card.id}`}
            className="absolute inset-0"
            animate={{
              x: ox,
              y: oy,
              rotate: rot,
              scale: 1 - d * 0.03,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ zIndex: VISIBLE_DEPTH - d }}
          >
            <PolaroidFrame card={card} />
          </motion.div>,
        );
      }
    }
    return elements;
  };

  return (
    <section
      ref={sectionRef}
      id="bombinhas"
      className="relative px-6 pt-24 pb-8 md:pb-16 lg:pb-24 bg-[#0E1418] overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Scroll-driven background video — starts transparent, fades in with scroll */}
      <video
        ref={bgVideoRef}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          opacity: 0,
          willChange: 'transform, opacity',
          zIndex: 0,
        }}
      >
        <source src={BG_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Gradient overlay: ensures text legibility over the moving video */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, #0E1418CC 0%, #0E141899 40%, #0E141899 60%, #0E1418E6 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative mx-auto max-w-5xl" style={{ zIndex: 2 }}>
        {/* Title block */}
        <motion.div
          className="mb-20 text-center"
          style={{
            scale: titleScale,
            z: titleZ,
            opacity: titleOpacity,
            filter: titleFilter,
            willChange: 'transform, opacity, filter',
          }}
        >
          <h2 className="team-section-title font-playfair pb-2">
            BOMBINHAS
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-xl text-zinc-300 font-cardo italic tracking-wide">
            ¿Qué tiene Bombinhas que otros destinos no ofrecen?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Polaroid stack */}
          <motion.div
            className="relative mx-auto lg:mx-0 cursor-pointer"
            style={{
              width: 320,
              height: 420,
              scale: polaroidScale,
              z: polaroidZ,
              opacity: polaroidOpacity,
              filter: polaroidFilter,
              willChange: 'transform, opacity, filter',
            }}
            onClick={handleFlick}
          >
            {renderStack()}

            <p className="absolute -bottom-10 left-0 right-0 text-center text-xs text-zinc-500 font-inter">
              Click para explorar
            </p>
          </motion.div>

          {/* Text block */}
          <motion.div
            className="space-y-6 font-inter text-base leading-relaxed"
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              scale: textScale,
              z: textZ,
              opacity: textOpacity,
              filter: textFilter,
              willChange: 'transform, opacity, filter',
            }}
          >
            <p>
              La mayoría de los destinos crecen hasta saturarse. Bombinhas no
              puede: el <span className="font-bold text-accent">{' '}67%{' '}</span> de
              su territorio es <span className="font-bold text-accent">inedificable por ley</span>,
              protegido por <span className="font-bold text-white">cuatro capas legales</span> que
              ningún desarrollador puede esquivar.
            </p>
            <p>
              Esa escasez <span className="font-bold text-accent">no es marketing, es legislación</span>,
              y es lo que sostiene el valor cuando todo lo demás cambia.
            </p>
            <p>
              Mientras el suelo permanece finito, la demanda crece: cerca
              de <span className="font-bold text-accent">2 millones</span> de
              turistas por temporada frente
              a <span className="font-bold text-accent">25.000 residentes</span>,
              y una población que aumentó <span className="font-bold text-white">un 75% en doce años</span>.
            </p>
            <p>
              Por eso <span className="font-bold text-white">Santa Catarina lidera la valorización
              inmobiliaria de Brasil</span>, y el metro cuadrado del centro de
              Bombinhas <span className="font-bold text-accent">ya supera al de la capital del estado</span>.
            </p>
            <p>
              Comprar aquí no es apostar a una moda: es adquirir uno de los
              pocos lugares donde la belleza está <span className="font-bold text-accent">legalmente
              obligada a permanecer intacta</span>.
            </p>
          </motion.div>
        </div>

        <div className="w-full flex justify-center mt-12">
          <motion.a
            href="/bombinhas-info"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden rounded-full px-8 py-3 font-inter font-semibold text-white cursor-pointer inline-block"
            style={{ background: 'linear-gradient(to right, #C9A24B, #E3C174)' }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <span className="relative flex items-center gap-2">
              Más info
              <ArrowRight size={18} />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function PolaroidFrame({ card }: { card: PolaroidCard }) {
  return (
    <div
      className="h-full w-full rounded-sm bg-white shadow-2xl shadow-black/30"
      style={{ padding: '12px' }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-sm bg-zinc-100">
        <Image
          src={card.src}
          alt={card.label}
          fill
          sizes="296px"
          className="object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
