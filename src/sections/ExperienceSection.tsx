import FadeIn from '../components/FadeIn';
import FunkyTimeline, { type TimelineEntry } from '../components/FunkyTimeline';
import DecorativeCharm from '../components/DecorativeCharm';
import { CHARMS } from '../constants/charms';

const EXPERIENCE_ENTRIES: TimelineEntry[] = [
  {
    title: 'Machine Learning Intern',
    description:
      'Built an AI-powered skincare recommendation system using machine learning and data preprocessing techniques. Developed predictive models for personalized recommendations and integrated a FastAPI backend with an interactive web interface.',
    meta: 'Ctruh (Bangalore) · Onsite · July 2025 – August 2025',
  },
  {
    title: 'Web Developer Intern',
    description:
      'Developed a responsive vehicle service management application with scheduling and reminders. Built interactive frontend components and implemented backend functionality for user accounts, service tracking, and maintenance management.',
    meta: 'Innovate Intern · August 2024 – September 2024',
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative charms */}
      <DecorativeCharm
        src={CHARMS[3]}
        size="w-[70px] sm:w-[90px] md:w-[110px]"
        position="top-[4%] right-[2%] sm:right-[3%] md:right-[5%]"
        delay={0.1}
      />
      <DecorativeCharm
        src={CHARMS[0]}
        size="w-[70px] sm:w-[90px] md:w-[110px]"
        position="bottom-[5%] left-[2%] sm:left-[3%] md:left-[5%]"
        delay={0.2}
        flip
      />

      {/* Heading */}
      <FadeIn delay={0} y={40} className="relative z-10">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-20 sm:mb-28 md:mb-36"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <FunkyTimeline entries={EXPERIENCE_ENTRIES} />
    </section>
  );
}
