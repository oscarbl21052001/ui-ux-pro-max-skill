import ProjectPage from '../_components/ProjectPage';

export default function EnedinaMercedes() {
  return (
    <ProjectPage
      name="ENEDINA MERCEDES"
      location="Centro de Bombinhas · Santa Catarina"
      typology="Residence · 36 unidades · Alto estándar"
      distance="250 m de la Playa de Bombinhas · Centro"
      description="A apenas 250 metros de la playa y del animado centro de Bombinhas, el Enedina Mercedes Residence ofrece el equilibrio perfecto entre la tranquilidad frente al mar y la comodidad de tener cafés, boutiques y restaurantes a pocos pasos de casa. Con 36 unidades de alto estándar distribuidas en 7 pisos, el emprendimiento se destaca por su arquitectura contemporánea, el hall de entrada amueblado y el rooftop con piscina de borde infinito y vista a la ciudad — ideal para vivir o invertir en el corazón de Bombinhas."
      amenities={[
        'Piscina en el Rooftop',
        'Solarium',
        'Salón de Fiestas',
        'Sala de Juegos',
        'Gimnasio',
        'Hall de entrada amueblado y decorado',
        'Alto estándar de terminaciones',
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
