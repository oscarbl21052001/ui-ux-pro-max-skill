'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useContact } from './ContactProvider';

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const { openContact } = useContact();

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
        <Image
          src="/logo-lucia.png"
          alt="Lucía Rodríguez"
          width={104}
          height={52}
          style={{ objectFit: 'contain' }}
          priority
        />
      </a>

      <ul className="relative z-[1] flex list-none gap-9">
        {['Bombinhas', 'Proyectos', 'Alquileres', 'Nosotros', 'Contacto'].map(
          (label, i) => (
            <li key={label}>
              <a
                href={label === 'Alquileres' ? 'http://reservas.lrimoveis.rsvar.me' : `#${label.toLowerCase()}`}
                target={label === 'Alquileres' ? '_blank' : undefined}
                rel={label === 'Alquileres' ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (label === 'Alquileres') return;
                  e.preventDefault();
                  const key = label.toLowerCase();

                  if (key === 'contacto') {
                    openContact();
                    return;
                  } else if (key === 'bombinhas') {
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
