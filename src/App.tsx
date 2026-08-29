import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import AchievementsSection from './sections/AchievementsSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <MarqueeSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
