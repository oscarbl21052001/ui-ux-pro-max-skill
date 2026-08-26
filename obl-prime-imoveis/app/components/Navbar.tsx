'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex h-[72px] items-center justify-between px-12 navbar-clip ${
        visible ? 'navbar-reveal' : ''
      }`}
    >
      <div className="navbar-gradient" />

      <a
        href="#"
        className={`relative z-[1] flex shrink-0 items-center no-underline nav-content ${
          visible ? 'nav-content-show' : ''
        }`}
        aria-label="OBL Prime Imóveis — Inicio"
      >
        <div className="flex flex-col gap-px">
          <span className="logo-obl font-playfair text-[22px] font-extrabold leading-none tracking-[4px]">
            OBL
          </span>
          <span className="font-inter text-[8.5px] font-light uppercase leading-none tracking-[3.2px] text-white/70">
            Prime Imóveis
          </span>
        </div>
      </a>

      <ul className="relative z-[1] flex list-none gap-9">
        {['Bombinhas', 'Proyectos', 'Nosotros', 'Blog', 'Contacto'].map(
          (label, i) => (
            <li key={label}>
              <a
                href={`#${label.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const key = label.toLowerCase();

                  // BombinhasProjectsScene uses ['start start','end end']:
                  //   scrollYProgress = (scrollTop − containerTop) / (containerH − vh)
                  // Phase 1 plateau centre ≈ scrollYProgress 0.10
                  // Phase 3 plateau centre ≈ scrollYProgress 0.78
                  if (key === 'bombinhas') {
                    const el = document.getElementById('bombinhas');
                    if (!el) return;
                    const range = el.offsetHeight - window.innerHeight;
                    window.scrollTo({ top: el.offsetTop + 0.10 * range, behavior: 'smooth' });
                  } else if (key === 'proyectos') {
                    const el = document.getElementById('bombinhas');
                    if (!el) return;
                    const range = el.offsetHeight - window.innerHeight;
                    window.scrollTo({ top: el.offsetTop + 0.78 * range, behavior: 'smooth' });
                  } else if (key === 'nosotros') {
                    // AboutSection ['start end','end start']: scrolling to containerTop
                    // puts scrollYProgress ≈ 0.33 — right at the content plateau start.
                    const el = document.getElementById('nosotros');
                    if (!el) return;
                    window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
                  } else {
                    const el = document.getElementById(key);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`nav-link font-inter text-[13px] font-normal uppercase tracking-[1.5px] text-white/85 no-underline transition-colors duration-300 hover:text-white nav-content ${
                  visible ? 'nav-content-show' : ''
                }`}
                style={{ animationDelay: `${1.15 + i * 0.05}s` }}
              >
                {label}
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
