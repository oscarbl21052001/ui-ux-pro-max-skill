import Navbar from "./components/Navbar";
import SectionBackground from "./components/SectionBackground";
import ScrollHero from "./components/ScrollHero";
import BombinhasProjectsScene from "./components/BombinhasProjectsScene";
import AboutSection from "./components/AboutSection";
import GlobeSection from "./components/GlobeSection";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <>
      {/* Fixed canvas behind Hero + Bombinhas — manages both videos and cross-fade */}
      <SectionBackground />
      <Navbar />
      <ScrollHero />
      <BombinhasProjectsScene />
      <AboutSection />
      <GlobeSection />
      <ProjectsSection />
    </>
  );
}
