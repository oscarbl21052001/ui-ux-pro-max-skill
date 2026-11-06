import ProjectPage from '../_components/ProjectPage';

export default function BombasHomeClub() {
  return (
    <ProjectPage
      name="BOMBAS HOME CLUB"
      location="Rua Canário, nº 525 · Bombas · Bombinhas · SC"
      typology="2 Suítes · 87 a 93 m² · Coberturas até 113 m² · Rooftop"
      distance="500 m da Praia de Bombas"
      description="Na Rua Canário, a 500 metros do mar de Bombas, o Bombas Home Club reúne acabamento de alto padrão, design contemporâneo e um rooftop completo em um único endereço. Os apartamentos de 2 suítes oferecem entre 87 e 93 m² privativos — com opções diferenciadas de terraço de 36 a 87 m² —, piso porcelanato, gesso rebaixado e churrasqueira a carvão em cada unidade. No topo do edifício, o lazer se expande: piscina adulta e infantil aquecidas, SPA, sauna úmida, praça de fogo com vista para as montanhas, sala de jogos, espaço gourmet e um hall de entrada com decoração de alto padrão. Coberturas exclusivas chegam a 113 m² privativos, com até 2 vagas de garagem e infra para recarga de veículos elétricos. Um endereço premium, a passos da praia, em Bombinhas."
      amenities={[
        'Piscina Adulta e Infantil Aquecidas',
        'SPA',
        'Sauna Úmida',
        'Praça de Fogo / Terraço com vista',
        'Sala de Jogos',
        'Espaço Gourmet',
        'Salão de Festas',
        'Roof Top',
        'Churrasqueira a Carvão (por unidade)',
        'Box Praia Individual',
        'Até 2 Vagas de Garagem',
        'Infra individual para recarga veicular',
        'Fechadura Eletrônica',
        'Piso Vinílico nos quartos',
        'Piso Porcelanato nas áreas comuns',
        'Gesso rebaixado',
        'Áreas comuns decoradas e climatizadas',
        'Porteiro Eletrônico',
        'Portão Veicular Automatizado',
        'Medidores individuais',
        'Zeladoria',
      ]}
      images={[
        '/projects/bombas-home-club-1.jpg',
        '/projects/bombas-home-club-p-2.jpg',
        '/projects/bombas-home-club-p-3.jpg',
      ]}
      delivery="A consultar"
    />
  );
}
