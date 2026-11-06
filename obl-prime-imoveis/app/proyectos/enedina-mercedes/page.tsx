import ProjectPage from '../_components/ProjectPage';

export default function EnedinaMercedes() {
  return (
    <ProjectPage
      name="ENEDINA MERCEDES"
      location="Centro de Bombinhas · Santa Catarina"
      typology="Residence · 36 unidades · Alto padrão"
      distance="250 m da Praia de Bombinhas · Centro"
      description="A apenas 250 metros da praia e do movimentado centro de Bombinhas, o Enedina Mercedes Residence oferece o equilíbrio perfeito entre a tranquilidade à beira-mar e a conveniência de ter cafés, boutiques e restaurantes a poucos passos de casa. Com 36 unidades de alto padrão distribuídas em 7 pavimentos, o empreendimento se destaca pela arquitetura contemporânea, pelo hall de entrada mobiliado e pelo rooftop com piscina de borda infinita e vista para a cidade — ideal para morar ou investir no coração de Bombinhas."
      amenities={[
        'Piscina no Rooftop',
        'Solarium',
        'Salão de Festas',
        'Sala de Jogos',
        'Academia',
        'Hall de entrada mobiliado e decorado',
        'Alto padrão de acabamento',
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
