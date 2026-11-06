import ProjectPage from '../_components/ProjectPage';

export default function VogueApartments() {
  return (
    <ProjectPage
      name="Vogue Apartments"
      location="Bombas · Bombinhas · SC"
      typology="Apartamentos de alto padrón"
      distance="250 m de la Playa de Bombas"
      description="Un proyecto de alto padrón a 250 metros del mar, con fachada artística exclusiva y accesos digitales con biometría facial. Diseñado para rentabilizar desde la primera temporada, con rooftop, piscina y solárium con vista al mar."
      amenities={[
        'Piscina rooftop con vista al mar',
        'Solárium',
        'Fachada artística exclusiva',
        'Accesos digitales y biometría facial',
        'Alto padrón de terminaciones',
      ]}
      images={[
        '/projects/vogue-apartments-1.jpg',
        '/projects/vogue-apartments-p-2.jpg',
        '/projects/vogue-apartments-p-3.jpg',
      ]}
      delivery="Oct 2026"
    />
  );
}
