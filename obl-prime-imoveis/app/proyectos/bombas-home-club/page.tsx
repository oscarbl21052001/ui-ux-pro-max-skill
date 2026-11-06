import ProjectPage from '../_components/ProjectPage';

export default function BombasHomeClub() {
  return (
    <ProjectPage
      name="Bombas Home Club"
      location="Bombas · Bombinhas · SC"
      typology="Apartamentos de 2 suites"
      distance="A una cuadra y media del mar"
      description="Un refugio costero exclusivo en Bombinhas. Departamentos de 2 suites con piscinas climatizadas, spa y rooftop. Un proyecto de vida única junto al mar, diseñado para quienes buscan lo mejor en calidad de vida frente a la costa verde de Santa Catarina."
      amenities={[
        'Piscina adulto e infantil climatizada',
        'Spa y sauna húmeda',
        'Rooftop con terraza y plaza de fuego',
        'Salón de fiestas',
        'Sala de juegos y espacio gourmet',
        'Box de playa individual',
        'Parrilla a carbón',
        'Conserjería',
        'Portón vehicular automatizado',
        'Hasta 2 cocheras',
      ]}
      images={[
        '/projects/bombas-home-club-1.jpg',
        '/projects/bombas-home-club-p-2.jpg',
        '/projects/bombas-home-club-p-3.jpg',
      ]}
      delivery="Dic 2027"
    />
  );
}
