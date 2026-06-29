import Navbar from "./components/Navbar";
import ScrollHero from "./components/ScrollHero";
import TeamSection from "./components/TeamSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import GlobeSection from "./components/GlobeSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollHero />
      <TeamSection />
      <ProjectsSection />
      <AboutSection />
      <GlobeSection />
    </>
  );
}
