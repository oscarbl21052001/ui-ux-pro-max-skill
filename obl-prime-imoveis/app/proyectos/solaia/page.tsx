import ProjectPage from '../_components/ProjectPage';

export default function Solaia() {
  return (
    <ProjectPage
      name="Solaia Residence"
      location="Zimbros · Bombinhas · SC"
      typology="Apartamentos de 1 dormitorio"
      distance="Frente a la bahía de Zimbros"
      description="Un emprendimiento único frente a la tranquila bahía de Zimbros, en Bombinhas. Solaia Residence combina la serenidad de esta playa paradisíaca con un diseño moderno de alto padrón, cerca del Molhe de Zimbros y la Arena Comper."
      amenities={[
        'Hall de entrada amueblado con sonido ambiente',
        'Wi-Fi en zonas comunes',
        'Suelo de porcelánico en áreas sociales',
        'Interfono con reconocimiento facial',
        'Salón de fiestas equipado con piscina',
        'Plaza de garaje privativa',
        'Acabados de alto estándar',
      ]}
      images={[
        '/projects/solaia-p-2.jpg',
        '/projects/solaia-1.jpg',
        '/projects/solaia-p-3.jpg',
      ]}
      delivery="Abr 2030"
    />
  );
}
