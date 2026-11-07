'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PHONE   = '5547991376652';
const WA_MSG  = encodeURIComponent('¡Hola! Estoy interesado/a en propiedades en Bombinhas. ¿Podrías ayudarme?');
const IG_USER = 'lucia.corretorabrasil';
const EMAIL   = 'lucia.corretorabrasil@gmail.com';
const EMAIL_SUBJECT = encodeURIComponent('Consulta sobre propiedades en Bombinhas');
const EMAIL_BODY    = encodeURIComponent('¡Hola Lucía! Me interesa recibir más información sobre las propiedades disponibles en Bombinhas.');

const CHANNELS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sub: 'Respuesta inmediata',
    color: '#25D366',
    colorBg: 'rgba(37,211,102,0.10)',
    colorBorder: 'rgba(37,211,102,0.45)',
    href: `https://wa.me/${PHONE}?text=${WA_MSG}`,
    icon: (
      <svg viewBox="0 0 32 32" width={26} height={26} fill="currentColor">
        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.72.7 5.28 1.93 7.51L.5 31.5l8.23-1.9A15.45 15.45 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.73 13.73 0 0 1-7.02-1.92l-.5-.3-5.2 1.2 1.24-5.05-.33-.52A13.8 13.8 0 1 1 16 28.8zm7.58-10.3c-.41-.2-2.44-1.2-2.82-1.34-.37-.14-.64-.2-.91.21-.27.41-1.05 1.34-1.28 1.61-.24.27-.47.3-.88.1a11.1 11.1 0 0 1-3.27-2.02 12.3 12.3 0 0 1-2.26-2.82c-.24-.41 0-.63.18-.84.16-.18.37-.47.55-.7.18-.24.24-.41.37-.68.12-.27.06-.5-.03-.7-.1-.21-.91-2.2-1.25-3.01-.33-.79-.66-.68-.91-.69h-.77c-.27 0-.7.1-1.07.5-.37.41-1.4 1.37-1.4 3.33s1.43 3.86 1.63 4.13c.2.27 2.82 4.3 6.83 6.03 4.01 1.72 4.01 1.15 4.73 1.08.72-.07 2.44-.99 2.78-1.95.35-.96.35-1.78.24-1.95-.1-.17-.37-.27-.78-.48z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    sub: `@${IG_USER}`,
    color: '#E1306C',
    colorBg: 'rgba(225,48,108,0.10)',
    colorBorder: 'rgba(225,48,108,0.40)',
    href: `https://instagram.com/${IG_USER}`,
    icon: (
      <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    sub: EMAIL,
    color: '#C9A24B',
    colorBg: 'rgba(201,162,75,0.10)',
    colorBorder: 'rgba(201,162,75,0.40)',
    href: `mailto:${EMAIL}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`,
    icon: (
      <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <polyline points="2,4 12,13 22,4"/>
      </svg>
    ),
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ContactLinksModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[300]"
            style={{ background: 'rgba(0,0,0,0.70)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[301] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                background: 'rgba(10,12,16,0.97)',
                backdropFilter: 'blur(28px)',
                border: '1px solid rgba(201,162,75,0.20)',
                boxShadow: '0 32px 80px -12px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)',
                borderRadius: 24,
                width: '100%',
                maxWidth: 420,
                padding: '2.25rem 2rem',
                pointerEvents: 'auto',
                position: 'relative',
              }}
            >
              <button
                onClick={onClose}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '50%', width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                }}
              >
                <X size={15} />
              </button>

              <p style={{ color: '#C9A24B', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'var(--font-inter)', margin: '0 0 0.4rem' }}>
                Contacto
              </p>
              <h3 style={{ fontFamily: 'var(--font-playfair-display)', fontSize: '1.55rem', fontWeight: 700, color: '#fff', margin: '0 0 0.5rem', lineHeight: 1.15 }}>
                Hablemos
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)', fontSize: '0.78rem', margin: '0 0 1.75rem', lineHeight: 1.5 }}>
                Elegí el canal que prefieras y te respondemos a la brevedad.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {CHANNELS.map(ch => (
                  <a
                    key={ch.id}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.9rem 1.1rem',
                      background: ch.colorBg,
                      border: `1px solid ${ch.colorBorder}`,
                      borderRadius: 14,
                      textDecoration: 'none',
                      transition: 'filter 0.2s, transform 0.15s',
                      color: ch.color,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, background: `${ch.colorBg}`, border: `1px solid ${ch.colorBorder}`, borderRadius: 12, flexShrink: 0, color: ch.color }}>
                      {ch.icon}
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.88rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>
                        {ch.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ch.sub}
                      </span>
                    </span>
                    <svg style={{ marginLeft: 'auto', flexShrink: 0, opacity: 0.5 }} width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
