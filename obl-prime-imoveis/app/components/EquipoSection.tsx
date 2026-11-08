'use client';

const MEMBERS = [
  {
    name: 'Nombre Integrante 1',
    role: 'Director General',
    bio: 'Descripción breve del integrante y su papel en la inmobiliaria OBL Prime.',
    image: '/team_1.jpg',
  },
  {
    name: 'Nombre Integrante 2',
    role: 'Director Comercial',
    bio: 'Descripción breve del integrante y su papel en la inmobiliaria OBL Prime.',
    image: '/team_2.jpg',
  },
  {
    name: 'Nombre Integrante 3',
    role: 'Directora de Marketing',
    bio: 'Descripción breve del integrante y su papel en la inmobiliaria OBL Prime.',
    image: '/team_3.jpg',
  },
];

export default function EquipoSection() {
  return (
    <section
      style={{
        backgroundImage: 'url(/equipo-bg.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        padding: '7rem 1.5rem',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8, 10, 14, 0.62)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {/* Heading */}
        <p
          style={{
            fontFamily: 'var(--font-cardo)',
            fontStyle: 'italic',
            color: '#C9A24B',
            fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem',
          }}
        >
          QUIÉNES SOMOS
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-playfair-display)',
            color: '#FFFFFF',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '0.5rem',
            lineHeight: 1.15,
          }}
        >
          NUESTRO EQUIPO
        </h2>
        <div
          style={{
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(201,162,75,0.5), transparent)',
            margin: '1.5rem auto 3.5rem',
            maxWidth: 320,
          }}
        />

        {/* Cards */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {MEMBERS.map((m) => (
            <MemberCard key={m.name} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({
  name,
  role,
  bio,
  image,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
}) {
  return (
    <div
      className="equipo-card"
      style={{
        width: 300,
        height: 380,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        border: '1px solid rgba(201,162,75,0.22)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease, height 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        flexShrink: 0,
      }}
    >
      {/* Photo */}
      <img
        src={image}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
          display: 'block',
        }}
        className="equipo-card-img"
      />

      {/* Always-visible gradient + name bar */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(4,6,10,0.92) 0%, rgba(4,6,10,0.45) 45%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.5rem 1.25rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-cardo)',
            fontStyle: 'italic',
            color: '#C9A24B',
            fontSize: '0.78rem',
            letterSpacing: '0.07em',
            marginBottom: '0.3rem',
            transition: 'opacity 0.3s ease',
          }}
        >
          {role}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-perandory)',
            color: '#FFFFFF',
            fontSize: '1.15rem',
            fontWeight: 700,
            margin: 0,
          }}
        >
          {name}
        </h3>

        {/* Bio — hidden by default, slides up on hover */}
        <p
          className="equipo-card-bio"
          style={{
            fontFamily: 'var(--font-cardo)',
            color: 'rgba(255,255,255,0.78)',
            fontSize: '0.88rem',
            lineHeight: 1.55,
            marginTop: '0.75rem',
            maxHeight: 0,
            overflow: 'hidden',
            opacity: 0,
            transition: 'max-height 0.4s ease, opacity 0.35s ease',
          }}
        >
          {bio}
        </p>
      </div>

      <style jsx>{`
        .equipo-card:hover {
          transform: translateY(-6px) scale(1.025);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(201, 162, 75, 0.45);
          height: 440px;
        }
        .equipo-card:hover .equipo-card-img {
          transform: scale(1.07);
        }
        .equipo-card:hover .equipo-card-bio {
          max-height: 120px;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
