import ProjectPage from '../_components/ProjectPage';

export default function VogueApartments() {
  return (
    <ProjectPage
      name="VOGUE APARTMENTS"
      location="Rua Cardeal, 262 · Bombas, Bombinhas · SC"
      typology="1 y 2 dormitorios · 38 unidades · 8 pisos"
      distance="250 m de la Playa de Bombas"
      description="A 250 metros de la Playa de Bombas, el Vogue Apartments reúne estilo y practicidad en 38 unidades distribuidas en 8 pisos. Con opciones de 1 y 2 dormitorios — incluyendo variantes con jacuzzi y balcón descubierto — el emprendimiento se destaca por su diseño audaz, fachada en pastilla cerámica y vidrios reflectantes, y un rooftop con piscina y solarium con vista al mar. Diez espacios de ocio completos, Mini Market 24h, Espacio Net y Espacio Game hacen del Vogue una dirección pensada para quienes quieren vivir con personalidad en Bombinhas."
      amenities={[
        'Piscina en el Rooftop',
        'Solarium',
        'Salón de Fiestas',
        'Gimnasio',
        'Mini Market 24h',
        'Lavandería compartida OMO',
        'Espacio Net',
        'Espacio de Lectura',
        'Espacio Game',
        'Cochera individual y privativa',
        'Estación de carga para auto eléctrico',
        'Portón y portero electrónico',
        'Ascensor',
        'Aislamiento acústico',
        'Hall de entrada decorado',
      ]}
      images={[
        '/projects/vogue-apartments-1.jpg',
        '/projects/vogue-apartments-p-2.jpg',
        '/projects/vogue-apartments-p-3.jpg',
      ]}
      delivery="Out 2026"
    />
  );
}
