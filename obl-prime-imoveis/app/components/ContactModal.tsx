'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setNombre(''); setTelefono(''); setStatus('idle'); }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                background: 'rgba(10, 12, 16, 0.96)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(201,162,75,0.25)',
                boxShadow: '0 24px 64px -12px rgba(0,0,0,0.80), inset 0 1px 0 rgba(255,255,255,0.06)',
                borderRadius: 20,
                width: '100%',
                maxWidth: 440,
                padding: '2.5rem',
                pointerEvents: 'auto',
                position: 'relative',
              }}
            >
              {/* Close */}
              <button
                onClick={handleClose}
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

              {status === 'ok' ? (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-playfair)', color: '#C9A24B', fontSize: '1.4rem', margin: '0 0 0.75rem' }}>
                    ¡Recibido!
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    Nos pondremos en contacto contigo en breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '1.5rem',
                    background: 'linear-gradient(90deg, #C9A24B, #E3C174)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    margin: '0 0 0.5rem',
                  }}>
                    Solicitar información
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', margin: '0 0 2rem', lineHeight: 1.5 }}>
                    Déjanos tus datos y te contactamos con los proyectos disponibles en Bombinhas.
                  </p>

                  {[
                    { label: 'Nombre', value: nombre, setter: setNombre, type: 'text', placeholder: 'Tu nombre completo' },
                    { label: 'Teléfono', value: telefono, setter: setTelefono, type: 'tel', placeholder: '+54 9 11 0000 0000' },
                  ].map(({ label, value, setter, type, placeholder }) => (
                    <div key={label} style={{ marginBottom: '1.25rem' }}>
                      <label style={{
                        display: 'block', fontFamily: 'var(--font-inter)',
                        fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'rgba(201,162,75,0.70)', marginBottom: '0.5rem',
                      }}>
                        {label}
                      </label>
                      <input
                        required
                        type={type}
                        value={value}
                        onChange={e => setter(e.target.value)}
                        placeholder={placeholder}
                        style={{
                          width: '100%', boxSizing: 'border-box',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.10)',
                          borderRadius: 10, padding: '0.75rem 1rem',
                          color: 'white', fontFamily: 'var(--font-inter)', fontSize: '0.9rem',
                          outline: 'none',
                        }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(201,162,75,0.50)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; }}
                      />
                    </div>
                  ))}

                  {status === 'error' && (
                    <p style={{ color: '#f87171', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                      Ha ocurrido un error. Inténtalo de nuevo.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      width: '100%', padding: '0.85rem',
                      background: 'linear-gradient(90deg, #C9A24B, #E3C174)',
                      border: 'none', borderRadius: 10,
                      color: '#0a0c10', fontFamily: 'var(--font-inter)',
                      fontSize: '0.82rem', fontWeight: 700,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                      opacity: status === 'sending' ? 0.7 : 1,
                      marginTop: '0.5rem',
                    }}
                  >
                    {status === 'sending' ? 'Enviando...' : 'Solicitar información'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
