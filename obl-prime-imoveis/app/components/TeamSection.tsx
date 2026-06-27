'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <section className="relative bg-[#22201E] px-6 py-24">
      <div
        className="absolute bottom-0 left-0 w-full h-[30%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FAFAFA)' }}
      />
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 text-center">
          <motion.h2
            className="team-section-title font-playfair"
            initial={{ filter: 'blur(12px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Bombinhas
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-lg text-base text-zinc-400 font-inter"
            initial={{ filter: 'blur(12px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            ¿¿Qué tiene Bombinhas que otros destinos no ofrecen?
          </motion.p>
        </div>

        <motion.div
          className="relative mr-auto ml-[8%] cursor-pointer"
          style={{ width: 320, height: 420 }}
          onClick={handleFlick}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {renderStack()}

          <p className="absolute -bottom-10 left-0 right-0 text-center text-xs text-zinc-500 font-inter">
            Click para explorar
          </p>
        </motion.div>
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
