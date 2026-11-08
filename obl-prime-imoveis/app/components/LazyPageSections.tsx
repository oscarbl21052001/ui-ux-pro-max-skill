'use client';

import dynamic from 'next/dynamic';

const BombinhasProjectsScene = dynamic(() => import('./BombinhasProjectsScene'), { ssr: false });
const AboutSection           = dynamic(() => import('./AboutSection'));
const EquipoSection          = dynamic(() => import('./EquipoSection'));
const GlobeSection           = dynamic(() => import('./GlobeSection'),           { ssr: false });

export default function LazyPageSections() {
  return (
    <>
      <BombinhasProjectsScene />
      <AboutSection />
      <EquipoSection />
      <GlobeSection />
    </>
  );
}
