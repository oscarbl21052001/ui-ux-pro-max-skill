import ProjectPage from '../_components/ProjectPage';

export default function Spot335() {
  return (
    <ProjectPage
      name="SPOT 335"
      location="Rua Peixe Rei, 335 · Bombinhas · Santa Catarina"
      typology="Flats de 35m² a 38m² · Unidades diferenciadas de 55m²"
      distance="450 m da Praia de Bombinhas"
      description="A 450 metros da Praia de Bombinhas, o SPOT 335 traduz a essência da natureza local em arquitetura. Madeira, luz natural e linhas orgânicas constroem um empreendimento que conversa com a paisagem — sem competir com ela. Os flats foram pensados para unir praticidade e conforto máximos: layouts funcionais com integração total dos ambientes, ideais para morar ou investir em um dos destinos turísticos mais valorizados do Brasil."
      amenities={[
        'Piscina adulto e infantil',
        'Academia equipada',
        'Sala de jogos',
        'Salão de Festas Gourmet',
        'Terraço Externo',
        'Coworking',
        'Lavanderia compartilhada',
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
