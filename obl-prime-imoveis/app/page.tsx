import Navbar from "./components/Navbar";
import SectionBackground from "./components/SectionBackground";
import ScrollHero from "./components/ScrollHero";
import LazyPageSections from "./components/LazyPageSections";

export default function Home() {
  return (
    <>
      {/* Fixed canvas behind Hero + Bombinhas — manages both videos and cross-fade */}
      <SectionBackground />
      <Navbar />
      <ScrollHero />
      <LazyPageSections />
    </>
  );
}
