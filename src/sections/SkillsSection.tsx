import FadeIn from '../components/FadeIn';
import DecorativeCharm from '../components/DecorativeCharm';
import { CHARMS } from '../constants/charms';

interface Skill {
  number: string;
  name: string;
  description: string;
  tags: string[];
}

const SKILLS: Skill[] = [
  {
    number: '01',
    name: 'Programming & DSA',
    description:
      'Strong foundation in problem-solving and software development using object-oriented and web technologies, with consistent DSA practice through LeetCode.',
    tags: ['Python', 'Java', 'C', 'HTML', 'CSS', 'JavaScript', '300+ LeetCode'],
  },
  {
    number: '02',
    name: 'AI & Machine Learning',
    description:
      'Developing intelligent systems using data preprocessing, predictive modeling, and machine learning frameworks for real-world applications.',
    tags: ['Scikit-learn', 'FastAPI', 'Pandas', 'NumPy', 'Matplotlib', 'Neural Networks', 'Deep Learning'],
  },
  {
    number: '03',
    name: 'Full Stack Web Development',
    description:
      'Building responsive and scalable web applications with modern frontend frameworks, backend technologies, and deployment tools.',
    tags: ['React', 'Node.js', 'Express.js', 'Tailwind CSS', 'MySQL', 'MongoDB'],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Decorative charms */}
      <DecorativeCharm
        src={CHARMS[2]}
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
          Skills
        </h2>
      </FadeIn>

      {/* Skills List */}
      <div className="w-full max-w-4xl relative z-10">
        {SKILLS.map((skill, index) => (
          <FadeIn key={skill.number} delay={index * 0.1} y={30}>
            <div
              className={`flex gap-6 sm:gap-10 md:gap-12 py-8 sm:py-10 md:py-12 ${
                index !== SKILLS.length - 1 ? 'border-b border-[#D7E2EA]/20' : ''
              }`}
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <span
                  className="text-[#D7E2EA] font-black"
                  style={{ fontSize: 'clamp(2rem, 6vw, 80px)', lineHeight: 1 }}
                >
                  {skill.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-4 sm:gap-6">
                <div>
                  <h3
                    className="hero-heading font-black uppercase leading-tight mb-3"
                    style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
                  >
                    {skill.name}
                  </h3>
                  <p
                    className="text-[#D7E2EA] font-medium leading-relaxed"
                    style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}
                  >
                    {skill.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {skill.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="text-[#D7E2EA]/70 uppercase tracking-wide text-xs sm:text-sm font-medium"
                    >
                      {tag}
                      {tagIndex !== skill.tags.length - 1 && (
                        <span className="ml-2 sm:ml-3">–</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
