'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import ContactLinksModal from './ContactLinksModal';

const ContactCtx = createContext<{ openContact: () => void }>({ openContact: () => {} });

export function useContact() {
  return useContext(ContactCtx);
}

export default function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ContactCtx.Provider value={{ openContact: () => setOpen(true) }}>
      {children}
      <ContactLinksModal open={open} onClose={() => setOpen(false)} />
    </ContactCtx.Provider>
  );
}
