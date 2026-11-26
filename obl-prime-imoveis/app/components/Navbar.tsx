'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useContact } from './ContactProvider';

const NAV_ITEMS = ['Bombinhas', 'Proyectos', 'Alquileres', 'Nosotros', 'Contacto'] as const;

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openContact } = useContact();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [menuOpen]);

  function handleNavClick(label: string) {
    setMenuOpen(false);
    if (label === 'Alquileres') {
      window.open('http://reservas.lrimoveis.rsvar.me', '_blank', 'noopener,noreferrer');
      return;
    }
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
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex h-[72px] items-center justify-between px-6 md:px-12 navbar-clip ${
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

        {/* Desktop nav — hidden on mobile */}
        <ul className="relative z-[1] hidden md:flex list-none gap-9">
          {NAV_ITEMS.map((label, i) => (
            <li key={label}>
              <a
                href={label === 'Alquileres' ? 'http://reservas.lrimoveis.rsvar.me' : `#${label.toLowerCase()}`}
                target={label === 'Alquileres' ? '_blank' : undefined}
                rel={label === 'Alquileres' ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (label === 'Alquileres') return;
                  e.preventDefault();
                  handleNavClick(label);
                }}
                className={`nav-link font-inter text-[13px] font-normal uppercase tracking-[1.5px] text-white/85 no-underline transition-colors duration-300 hover:text-white nav-content ${
                  visible ? 'nav-content-show' : ''
                }`}
                style={{ animationDelay: `${1.15 + i * 0.05}s` }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className={`relative z-[1] flex md:hidden flex-col justify-center items-center w-10 h-10 gap-[5px] nav-content ${
            visible ? 'nav-content-show' : ''
          }`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className="block w-6 h-[1.5px] bg-white/85 transition-all duration-300 origin-center"
            style={menuOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}}
          />
          <span
            className="block w-6 h-[1.5px] bg-white/85 transition-all duration-300"
            style={menuOpen ? { opacity: 0, transform: 'scaleX(0)' } : {}}
          />
          <span
            className="block w-6 h-[1.5px] bg-white/85 transition-all duration-300 origin-center"
            style={menuOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}}
          />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        ref={menuRef}
        className="fixed top-[72px] left-0 right-0 z-[99] md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: menuOpen ? '320px' : '0px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(7, 9, 14, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(201,162,75,0.18)',
          }}
        >
          <ul className="list-none flex flex-col py-3">
            {NAV_ITEMS.map((label) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(label)}
                  className="w-full text-left px-7 py-4 font-inter text-[13px] font-normal uppercase tracking-[2px] text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-200"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
