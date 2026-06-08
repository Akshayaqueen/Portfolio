import Navbar from "@/components/Navbar/Navbar";
import VideoIntro from "@/components/VideoIntro/VideoIntro";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection/ExperienceSection";
import ContactFooter from "@/components/ContactFooter/ContactFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <VideoIntro />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactFooter />
      </main>
    </>
  );
}
