import ProjectPage from '../_components/ProjectPage';

export default function Spot335() {
  return (
    <ProjectPage
      name="Spot 335"
      location="Bombinhas · SC"
      typology="Apartamentos de 1 dormitorio"
      distance="450 m de la Praia de Bombinhas"
      description="Un emprendimiento moderno en el corazón de Bombinhas, a solo 450 metros de la playa más famosa de Santa Catarina. Departamentos de diseño contemporáneo con amplias terrazas y vistas privilegiadas a la naturaleza."
      amenities={[
        'Piscina adulto e infantil',
        'Academia equipada',
        'Sala de juegos',
        'Salón de fiestas y espacio gourmet',
        'Terraza exterior',
        'Coworking',
        'Lavandería',
        'Brinquedoteca',
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
