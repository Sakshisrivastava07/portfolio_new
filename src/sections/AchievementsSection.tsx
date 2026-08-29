import FadeIn from '../components/FadeIn';
import DecorativeCharm from '../components/DecorativeCharm';
import { CHARMS } from '../constants/charms';

interface Achievement {
  year: string;
  title: string;
  description: string;
  image: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    year: '2026',
    title: 'QNX 24-Hour Hackathon Finalist',
    description:
      'Selected for the cluster round in Bengaluru after qualifying through college-level screening, showcasing problem-solving and innovation under a 24-hour competitive environment.',
    image: 'https://my-portfolio-theta-three-82.vercel.app/assets/achievements/ach2.jpeg',
  },
  {
    year: '2025',
    title: 'Runner-Up · RUAS × Broadridge Tech Hackathon',
    description:
      'Secured Runner-Up position in a 9-hour hackathon by building and presenting an innovative technical solution in a fast-paced team environment.',
    image: 'https://my-portfolio-theta-three-82.vercel.app/assets/achievements/ach3.jpeg',
  },
  {
    year: '2015',
    title: 'Gujarat State Bravery Award',
    description:
      'Recognized with the Gujarat State Bravery Award for courage and presence of mind, reflecting resilience and leadership from an early age.',
    image: 'https://my-portfolio-theta-three-82.vercel.app/assets/achievements/ach1.jpeg',
  },
];

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative charms */}
      <DecorativeCharm
        src={CHARMS[0]}
        size="w-[70px] sm:w-[90px] md:w-[110px]"
        position="top-[4%] right-[2%] sm:right-[3%] md:right-[5%]"
        delay={0.1}
      />
      <DecorativeCharm
        src={CHARMS[2]}
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
          Achievements
        </h2>
      </FadeIn>

      {/* Card Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {ACHIEVEMENTS.map((achievement, index) => (
          <FadeIn key={achievement.title} delay={index * 0.1} y={30}>
            <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105">
              {/* Image */}
              <div className="relative overflow-hidden" style={{ paddingBottom: '66.67%' }}>
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 flex-1">
                <div>
                  <span
                    className="text-[#D7E2EA]/60 uppercase tracking-widest font-medium"
                    style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)' }}
                  >
                    {achievement.year}
                  </span>
                  <h3
                    className="hero-heading font-black uppercase leading-tight mt-2"
                    style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
                  >
                    {achievement.title}
                  </h3>
                </div>

                <p
                  className="text-[#D7E2EA] font-medium leading-relaxed flex-1"
                  style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
                >
                  {achievement.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
