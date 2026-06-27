'use client';

import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  initials: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Oscar Bello',
    role: 'CEO & Fundador',
    bio: 'Visionario del mercado inmobiliario de Bombinhas con más de una década de experiencia en inversiones internacionales.',
    initials: 'OB',
  },
  {
    name: 'Ana Costa',
    role: 'Directora Comercial',
    bio: 'Especialista en relaciones con inversores globales y estrategia de ventas de propiedades premium.',
    initials: 'AC',
  },
  {
    name: 'Lucas Ferreira',
    role: 'Director de Operaciones',
    bio: 'Responsable de la gestión integral de proyectos y la excelencia operativa en cada desarrollo.',
    initials: 'LF',
  },
];

function AvatarPlaceholder({ initials }: { initials: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#F3C63F] to-[#C7941D]">
      <span className="text-2xl font-semibold tracking-wide text-white font-inter">
        {initials}
      </span>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="bg-[#FAFAFA] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="team-section-title font-playfair">Nuestro Equipo</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-neutral-500 font-inter">
            Profesionales comprometidos con transformar cada inversión en una
            experiencia excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-full ring-2 ring-[#E8D48B]/40 transition-shadow duration-300 group-hover:ring-[#C9A44A]/60 group-hover:shadow-lg">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={112}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <AvatarPlaceholder initials={member.initials} />
                )}
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 font-inter">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#C7941D] font-inter">
                {member.role}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500 font-inter">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
