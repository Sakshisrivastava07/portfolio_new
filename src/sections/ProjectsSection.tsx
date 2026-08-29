import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import DecorativeCharm from '../components/DecorativeCharm';
import { CHARMS } from '../constants/charms';

interface Project {
  number: string;
  tag: string;
  name: string;
  description: string;
  image: string;
  github: string;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    tag: 'RAG · LLM',
    name: 'ClauseFind — Legal Contract RAG',
    description: 'An AI-powered legal document research platform built using RAG and a Groq-hosted LLM to provide accurate, source-grounded answers with citations.',
    image: 'https://my-portfolio-theta-three-82.vercel.app/assets/projects/ClauseFind.jpeg',
    github: 'https://github.com/Sakshisrivastava07/ClauseIQ',
  },
  {
    number: '02',
    tag: 'Machine Learning',
    name: 'Multi-Label Skincare Recommendation',
    description: 'An AI-powered skincare recommendation platform using machine learning to deliver personalized product suggestions through predictive modeling.',
    image: 'https://my-portfolio-theta-three-82.vercel.app/assets/projects/skincare.jpeg',
    github: 'https://github.com/Sakshisrivastava07/SkincareRecommendation',
  },
  {
    number: '03',
    tag: 'Game AI',
    name: 'Minimax Othello AI',
    description: 'A strategic AI-powered Othello game built using the Minimax algorithm, enabling intelligent gameplay against computer opponents.',
    image: 'https://my-portfolio-theta-three-82.vercel.app/assets/projects/othello.png',
    github: 'https://github.com/Sakshisrivastava07/Minimax-Powered-Othello-Game-ai',
  },
  {
    number: '04',
    tag: 'AI Agent',
    name: 'Trabora — AI Travel Agent',
    description: 'An intelligent travel assistant that generates smart travel suggestions, planning support, and personalized recommendations.',
    image: 'https://my-portfolio-theta-three-82.vercel.app/assets/projects/trabora.png',
    github: 'https://github.com/Sakshisrivastava07/Trabora---AI-Travel-Agent',
  },
  {
    number: '05',
    tag: 'Data Analysis',
    name: 'EDA Vision',
    description: 'A data exploration and visualization platform designed to simplify exploratory data analysis through intuitive insights and analytics workflows.',
    image: 'https://my-portfolio-theta-three-82.vercel.app/assets/projects/eda.png',
    github: 'https://github.com/Sakshisrivastava07/EDA-Vision',
  },
];

const TOTAL_CARDS = PROJECTS.length;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] sticky top-24 md:top-32"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.div
        style={{ scale, transformOrigin: 'top center' }}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 h-full flex flex-col"
      >
        {/* Top section with metadata */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6 sm:mb-8">
          <div className="flex flex-col">
            <span
              className="text-[#D7E2EA] font-black"
              style={{ fontSize: 'clamp(2rem, 6vw, 90px)', lineHeight: 1 }}
            >
              {project.number}
            </span>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-medium">
              {project.tag}
            </span>
            <span
              className="hero-heading font-black uppercase leading-tight text-left"
              style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.75rem)' }}
            >
              {project.name}
            </span>
          </div>
          <LiveProjectButton label="GitHub ↗" href={project.github} />
        </div>

        {/* Description */}
        <p
          className="text-[#D7E2EA] font-medium leading-relaxed mb-6 sm:mb-8"
          style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}
        >
          {project.description}
        </p>

        {/* Full-width image */}
        <div className="flex-1 min-h-0">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* Decorative charm — single, this section is already dense with sticky cards */}
      <DecorativeCharm
        src={CHARMS[1]}
        size="w-[70px] sm:w-[90px] md:w-[110px]"
        position="top-[2%] left-[2%] sm:left-[3%] md:left-[5%]"
        delay={0.1}
      />

      <FadeIn className="relative z-10">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto relative z-10">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
