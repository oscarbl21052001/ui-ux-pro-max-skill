import ProjectPage from '../_components/ProjectPage';

export default function BombasHomeClub() {
  return (
    <ProjectPage
      name="BOMBAS HOME CLUB"
      location="Rua Canário, nº 525 · Bombas · Bombinhas · SC"
      typology="2 Suites · 87 a 93 m² · Áticos hasta 113 m² · Rooftop"
      distance="500 m de la Playa de Bombas"
      description="En la Rua Canário, a 500 metros del mar de Bombas, el Bombas Home Club reúne acabados de alto estándar, diseño contemporáneo y un rooftop completo en una única dirección. Los apartamentos de 2 suites ofrecen entre 87 y 93 m² privativos — con opciones diferenciadas de terraza de 36 a 87 m² —, suelo de porcelánico, techo liso de yeso y barbacoa de carbón en cada unidad. En la cima del edificio, el ocio se expande: piscina para adultos e infantil climatizadas, SPA, sauna húmeda, plaza de fuego con vistas a las montañas, sala de juegos, espacio gourmet y un hall de entrada con decoración de alto estándar. Los áticos exclusivos alcanzan los 113 m² privativos, con hasta 2 plazas de garaje y preinstalación para carga de vehículos eléctricos. Una dirección premium, a pasos de la playa, en Bombinhas."
      amenities={[
        'Piscina para Adultos e Infantil Climatizadas',
        'SPA',
        'Sauna Húmeda',
        'Plaza de Fuego / Terraza con vistas',
        'Sala de Juegos',
        'Espacio Gourmet',
        'Salón de Fiestas',
        'Roof Top',
        'Barbacoa de Carbón (por unidad)',
        'Trastero de Playa Individual',
        'Hasta 2 Plazas de Garaje',
        'Preinstalación individual para carga vehicular',
        'Cerradura Electrónica',
        'Suelo Vinílico en dormitorios',
        'Suelo de Porcelánico en zonas comunes',
        'Techo liso de yeso',
        'Áreas comunes decoradas y climatizadas',
        'Portero Electrónico',
        'Portón Vehicular Automatizado',
        'Medidores individuales',
        'Administración',
      ]}
      images={[
        '/projects/bombas-home-club-1.jpg',
        '/projects/bombas-home-club-p-2.jpg',
        '/projects/bombas-home-club-p-3.jpg',
      ]}
      delivery="A consultar"
    />
  );
}
