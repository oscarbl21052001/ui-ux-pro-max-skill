import Navbar from "./components/Navbar";
import SectionBackground from "./components/SectionBackground";
import ScrollHero from "./components/ScrollHero";
import TeamSection from "./components/TeamSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import GlobeSection from "./components/GlobeSection";
import CarouselSection from "./components/CarouselSection";

export default function Home() {
  return (
    <>
      {/* Fixed canvas behind Hero + Bombinhas — manages both videos and cross-fade */}
      <SectionBackground />
      <Navbar />
      <ScrollHero />
      <TeamSection />
      <ProjectsSection />
      <AboutSection />
      <GlobeSection />
      <CarouselSection />
    </>
  );
}
