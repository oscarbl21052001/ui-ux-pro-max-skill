export default function PoliticaPrivacidad() {
  return (
    <main style={{
      background: '#0a0c10',
      minHeight: '100vh',
      padding: '6rem 1.5rem 4rem',
      fontFamily: 'var(--font-inter)',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>

        <h1 style={{ color: '#C9A24B', fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '0.5rem' }}>
          Aviso Legal y Política de Privacidad
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '3rem' }}>
          Última actualización: noviembre de 2026
        </p>

        {/* AVISO LEGAL */}
        <h2 style={{ color: '#C9A24B', fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          1. Aviso Legal
        </h2>
        <p>
          En cumplimiento de la normativa aplicable, se informa que el presente sitio web es titularidad de:
        </p>
        <ul style={{ marginTop: '0.75rem', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
          <li><strong style={{ color: 'rgba(255,255,255,0.9)' }}>Razón social:</strong> Inmobiliaria Lucía Rodríguez</li>
          <li><strong style={{ color: 'rgba(255,255,255,0.9)' }}>País de registro:</strong> Brasil</li>
          <li><strong style={{ color: 'rgba(255,255,255,0.9)' }}>Correo electrónico:</strong> lucia.corretorabrasil@gmail.com</li>
          <li><strong style={{ color: 'rgba(255,255,255,0.9)' }}>Actividad:</strong> Intermediación inmobiliaria — Bombinhas, Santa Catarina, Brasil</li>
        </ul>
        <p>
          El acceso y uso de este sitio web implica la aceptación plena de las condiciones aquí expuestas. Inmobiliaria Lucía Rodríguez se reserva el derecho de modificar el contenido del sitio en cualquier momento y sin previo aviso.
        </p>

        <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '2.5rem 0' }} />

        {/* PRIVACIDAD */}
        <h2 style={{ color: '#C9A24B', fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          2. Política de Privacidad
        </h2>
        <p>
          Inmobiliaria Lucía Rodríguez trata los datos personales que usted nos facilita a través del formulario de contacto de conformidad con la <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Lei Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018</strong>.
        </p>

        <h3 style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Datos que recopilamos
        </h3>
        <p>
          Únicamente los datos que usted nos proporciona voluntariamente a través del formulario de contacto:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
          <li>Nombre completo</li>
          <li>Número de teléfono</li>
        </ul>
        <p>No recopilamos datos de navegación, cookies de rastreo ni información de pago.</p>

        <h3 style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Finalidad del tratamiento
        </h3>
        <p>
          Los datos recogidos se utilizan exclusivamente para ponernos en contacto con usted y atender su solicitud de información sobre propiedades en Bombinhas. No se utilizan para fines comerciales de terceros ni se ceden a otras empresas.
        </p>

        <h3 style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Conservación de los datos
        </h3>
        <p>
          Sus datos se conservan únicamente durante el tiempo necesario para gestionar su solicitud. Una vez concluida la gestión, los datos son eliminados.
        </p>

        <h3 style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Sus derechos
        </h3>
        <p>
          En virtud de la LGPD, usted tiene derecho a:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
          <li>Acceder a sus datos personales</li>
          <li>Solicitar la rectificación de datos inexactos</li>
          <li>Solicitar la eliminación de sus datos</li>
          <li>Revocar el consentimiento en cualquier momento</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, contáctenos en:{' '}
          <a href="mailto:lucia.corretorabrasil@gmail.com" style={{ color: '#C9A24B' }}>
            lucia.corretorabrasil@gmail.com
          </a>
        </p>

        <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '2.5rem 0' }} />

        {/* COOKIES */}
        <h2 style={{ color: '#C9A24B', fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          3. Política de Cookies
        </h2>
        <p>
          Este sitio web no utiliza cookies de rastreo, analítica ni publicidad. Las únicas cookies técnicas que pueden estar presentes son las estrictamente necesarias para el funcionamiento del sitio (sesión, seguridad), y no requieren consentimiento del usuario.
        </p>

        <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '2.5rem 0' }} />

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
          © {new Date().getFullYear()} Inmobiliaria Lucía Rodríguez · Bombinhas, Santa Catarina, Brasil ·{' '}
          <a href="mailto:lucia.corretorabrasil@gmail.com" style={{ color: 'rgba(201,162,75,0.6)' }}>
            lucia.corretorabrasil@gmail.com
          </a>
        </p>

        <div style={{ marginTop: '2rem' }}>
          <a href="/" style={{ color: '#C9A24B', fontSize: '0.85rem' }}>← Volver al inicio</a>
        </div>

      </div>
    </main>
  );
}
