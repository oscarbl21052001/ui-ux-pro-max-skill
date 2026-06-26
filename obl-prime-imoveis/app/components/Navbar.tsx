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
