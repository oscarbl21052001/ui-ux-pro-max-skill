import ProjectPage from '../_components/ProjectPage';

export default function VillaDiTrento() {
  return (
    <ProjectPage
      name="VILLA DI TRENTO"
      location="Rua Ipê Roxo · Canto Grande / Mariscal · Bombinhas · SC"
      typology="1 e 2 dormitórios · 7 pavimentos · Rooftop"
      distance="Entre o Mar de Fora e o Mar de Dentro · Canto Grande"
      description="Localizado na Rua Ipê Roxo, no coração de Canto Grande em Bombinhas, o Villa Di Trento Residence ocupa uma posição privilegiada entre o Mar de Fora e o Mar de Dentro — com vistas para os dois oceanos em um único endereço. Com 7 pavimentos e um rooftop integralmente dedicado ao lazer, o empreendimento reúne apartamentos de 1 e 2 dormitórios com acabamentos de alto padrão, fachada em venecitas, piso vinílico nos dormitórios e tecnologia integrada em cada detalhe. O 7° Piso transforma o cotidiano: piscina de adultos com deck elevado de 55 m², spa, sauna, academia com balcón, espaço gourmet, salão de festas com vista para a baía, ludoteca, sala de jogos, fogón e mais de 129 m² de amenities ao ar livre. Um endereço raro, entre duas mares, em Bombinhas."
      amenities={[
        'Piscina de Adultos no Rooftop',
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
