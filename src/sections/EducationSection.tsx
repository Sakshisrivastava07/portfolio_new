import FadeIn from '../components/FadeIn';
import FunkyTimeline, { type TimelineEntry } from '../components/FunkyTimeline';
import DecorativeCharm from '../components/DecorativeCharm';
import { CHARMS } from '../constants/charms';

const EDUCATION_ENTRIES: TimelineEntry[] = [
  {
    title:
      'MS Ramaiah University of Applied Sciences, Bangalore — B.Tech in Information Science and Engineering',
    meta: '2023 – 2027 · CGPA 9.3',
  },
  {
    title: 'Shree Swaminarayan Gurukul, Vapi, Gujarat — Primary and Secondary Education',
    meta: '2009 – 2023 · 80%',
  },
];

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative charms */}
      <DecorativeCharm
        src={CHARMS[3]}
        size="w-[70px] sm:w-[90px] md:w-[110px]"
        position="top-[4%] left-[2%] sm:left-[3%] md:left-[5%]"
        delay={0.1}
      />
      <DecorativeCharm
        src={CHARMS[1]}
        size="w-[70px] sm:w-[90px] md:w-[110px]"
        position="bottom-[5%] right-[2%] sm:right-[3%] md:right-[5%]"
        delay={0.2}
        flip
      />

      {/* Heading */}
      <FadeIn delay={0} y={40} className="relative z-10">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-20 sm:mb-28 md:mb-36"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Education
        </h2>
      </FadeIn>

      <FunkyTimeline entries={EDUCATION_ENTRIES} />
    </section>
  );
}
