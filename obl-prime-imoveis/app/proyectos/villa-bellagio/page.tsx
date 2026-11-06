import ProjectPage from '../_components/ProjectPage';

export default function VillaBellagio() {
  return (
    <ProjectPage
      name="Villa Bellagio Rooftop"
      location="Bombas · Bombinhas · SC"
      typology="Lofts con sacada"
      distance="300 m del mar"
      description="Arquitectura contemporánea de alto padrón en el barrio Bombas, a solo 300 metros de la playa. Un edificio con más de 815 m² de áreas de ocio y un icónico rooftop con piscina y vista al mar."
      amenities={[
        'Rooftop con piscina y vista al mar',
        'Recepción y hall decorado',
        '4 ascensores modernos',
        'Piso en porcelanato',
        'Medición individual de energía y agua',
        'Reaprovechamiento del agua de lluvia',
        '3 salas comerciales en planta baja',
      ]}
      images={[
        '/projects/villa-bellagio-1.jpg',
        '/projects/villa-bellagio-p-2.jpg',
        '/projects/villa-bellagio-p-3.jpg',
      ]}
      delivery="En construcción"
    />
  );
}
