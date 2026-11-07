import ProjectPage from '../_components/ProjectPage';

export default function Spot335() {
  return (
    <ProjectPage
      name="SPOT 335"
      location="Rua Peixe Rei, 335 · Bombinhas · Santa Catarina"
      typology="Flats de 35m² a 38m² · Unidades diferenciadas de 55m²"
      distance="450 m de la Playa de Bombinhas"
      description="A 450 metros de la Playa de Bombinhas, el SPOT 335 traduce la esencia de la naturaleza local en arquitectura. Madera, luz natural y líneas orgánicas construyen un emprendimiento que dialoga con el paisaje — sin competir con él. Los flats fueron diseñados para unir practicidad y confort máximos: layouts funcionales con integración total de los ambientes, ideales para vivir o invertir en uno de los destinos turísticos más valorados de Brasil."
      amenities={[
        'Piscina adultos e infantil',
        'Gimnasio equipado',
        'Sala de juegos',
        'Salón de Fiestas Gourmet',
        'Terraza exterior',
        'Coworking',
        'Lavandería compartida',
        'Sala de juegos infantil',
      ]}
      images={[
        '/projects/spot335-1.jpg',
        '/projects/spot335-p-2.jpg',
        '/projects/spot335-p-3.jpg',
      ]}
      delivery="Jun 2029"
    />
  );
}
