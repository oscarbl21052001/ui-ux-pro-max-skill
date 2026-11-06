import ProjectPage from '../_components/ProjectPage';

export default function VogueApartments() {
  return (
    <ProjectPage
      name="VOGUE APARTMENTS"
      location="Rua Cardeal, 262 · Bombas, Bombinhas · SC"
      typology="1 e 2 dormitórios · 38 unidades · 8 pavimentos"
      distance="250 m da Praia de Bombas"
      description="A 250 metros da Praia de Bombas, o Vogue Apartments reúne estilo e praticidade em 38 unidades distribuídas em 8 pavimentos. Com opções de 1 e 2 dormitórios — incluindo variantes com jacuzzi e sacada descoberta — o empreendimento se destaca pelo design arrojado, pela fachada em pastilha cerâmica e vidros reflecta, e por um rooftop com piscina e solarium com vista para o mar. Dez espaços de lazer completos, Mini Market 24h, Espaço Net e Espaço Game fazem do Vogue um endereço pensado para quem quer viver com personalidade em Bombinhas."
      amenities={[
        'Piscina no Rooftop',
        'Solarium',
        'Salão de Festas',
        'Academia',
        'Mini Market 24h',
        'Lavanderia compartilhada OMO',
        'Espaço Net',
        'Espaço Leitura',
        'Espaço Game',
        'Vaga de garagem individual e privativa',
        'Estação de recarga para carro elétrico',
        'Portão e porteiro eletrônico',
        'Elevador',
        'Isolamento acústico',
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
