import ProjectPage from '../_components/ProjectPage';

export default function VillaDiTrento() {
  return (
    <ProjectPage
      name="VILLA DI TRENTO"
      location="Rua Ipê Roxo · Canto Grande / Mariscal · Bombinhas · SC"
      typology="1 y 2 dormitorios · 7 pisos · Rooftop"
      distance="Entre el Mar de Afuera y el Mar de Adentro · Canto Grande"
      description="Ubicado en la Rua Ipê Roxo, en el corazón de Canto Grande en Bombinhas, el Villa Di Trento Residence ocupa una posición privilegiada entre el Mar de Afuera y el Mar de Adentro — con vistas a los dos océanos desde un único domicilio. Con 7 pisos y un rooftop íntegramente dedicado al ocio, el emprendimiento reúne apartamentos de 1 y 2 dormitorios con terminaciones de alto estándar, fachada en venecitas, piso vinílico en los dormitorios y tecnología integrada en cada detalle. El 7° Piso transforma el día a día: piscina de adultos con deck elevado de 55 m², spa, sauna, gimnasio con balcón, espacio gourmet, salón de fiestas con vista a la bahía, ludoteca, sala de juegos, fogón y más de 129 m² de amenities al aire libre. Una dirección única, entre dos mares, en Bombinhas."
      amenities={[
        'Piscina de Adultos en el Rooftop',
        'Spa / Piscina Infantil',
        'Playa Húmeda',
        'Deck Elevado (55 m²)',
        'Espacio Gourmet',
        'Salón de Fiestas',
        'Sala de Juegos',
        'Gimnasio y Balcón',
        'Sauna',
        'Ludoteca',
        'Espacio Pet',
        'Fogón con vista a la bahía',
        'Amenities Descubiertos (129 m²)',
        'Fachada en venecitas',
        'Ascensor moderno',
        'Portón con portero eléctrico',
        'Cerraduras electrónicas con control de acceso',
        'Factibilidad de puntos de carga para autos eléctricos',
      ]}
      images={[
        '/projects/villa-di-trento-1.jpg',
        '/projects/villa-di-trento-p-2.jpg',
        '/projects/villa-di-trento-p-3.jpg',
      ]}
      delivery="A consultar"
    />
  );
}
