'use client';

export default function WhatsAppButton() {
  const phone = '5547991376652';
  const message = encodeURIComponent('¡Hola! Estoy interesado/a en propiedades en Bombinhas. ¿Podrías ayudarme?');

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-[200] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg animate-whatsapp-pulse"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-8 h-8 fill-white"
      >
        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.72.7 5.28 1.93 7.51L.5 31.5l8.23-1.9A15.45 15.45 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.73 13.73 0 0 1-7.02-1.92l-.5-.3-5.2 1.2 1.24-5.05-.33-.52A13.8 13.8 0 1 1 16 28.8zm7.58-10.3c-.41-.2-2.44-1.2-2.82-1.34-.37-.14-.64-.2-.91.21-.27.41-1.05 1.34-1.28 1.61-.24.27-.47.3-.88.1a11.1 11.1 0 0 1-3.27-2.02 12.3 12.3 0 0 1-2.26-2.82c-.24-.41 0-.63.18-.84.16-.18.37-.47.55-.7.18-.24.24-.41.37-.68.12-.27.06-.5-.03-.7-.1-.21-.91-2.2-1.25-3.01-.33-.79-.66-.68-.91-.69h-.77c-.27 0-.7.1-1.07.5-.37.41-1.4 1.37-1.4 3.33s1.43 3.86 1.63 4.13c.2.27 2.82 4.3 6.83 6.03 4.01 1.72 4.01 1.15 4.73 1.08.72-.07 2.44-.99 2.78-1.95.35-.96.35-1.78.24-1.95-.1-.17-.37-.27-.78-.48z" />
      </svg>
    </a>
  );
}
