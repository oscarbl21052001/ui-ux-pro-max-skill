import ProjectPage from '../_components/ProjectPage';

export default function EnedinaMercedes() {
  return (
    <ProjectPage
      name="Enedina Mercedes Residence"
      location="Centro · Bombinhas · SC"
      typology="Residence · 36 unidades"
      distance="250 m del mar · 150 m de la avenida principal"
      description="Un edificio residencial de 36 unidades en el centro de Bombinhas, a 250 metros de la playa y a pasos de cafés, boutiques y restaurantes. Diseño contemporáneo con área de ocio completa en el rooftop, pensado para quienes quieren vivir o invertir en el corazón de Bombinhas."
      amenities={[
        'Rooftop con piscina y solarium',
        'Salón de fiestas',
        'Gimnasio',
        'Sala de juegos',
        'Hall de entrada amueblado y decorado',
        'Punto de recarga para auto eléctrico',
      ]}
      images={[
        '/projects/enedina-mercedes-1.jpg',
        '/projects/enedina-mercedes-p-2.jpg',
        '/projects/enedina-mercedes-p-3.jpg',
      ]}
      delivery="Abr 2030"
    />
  );
}
