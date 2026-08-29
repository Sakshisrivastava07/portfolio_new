import { useEffect, useRef, useState } from 'react';

interface Tool {
  name: string;
  icon: string;
}

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const ROW1_TOOLS: Tool[] = [
  { name: 'Python', icon: `${DEVICON_BASE}/python/python-original.svg` },
  { name: 'Java', icon: `${DEVICON_BASE}/java/java-original.svg` },
  { name: 'HTML5', icon: `${DEVICON_BASE}/html5/html5-original.svg` },
  { name: 'CSS3', icon: `${DEVICON_BASE}/css3/css3-original.svg` },
  { name: 'JavaScript', icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
  { name: 'React', icon: `${DEVICON_BASE}/react/react-original.svg` },
  { name: 'Node.js', icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
];

const ROW2_TOOLS: Tool[] = [
  { name: 'FastAPI', icon: `${DEVICON_BASE}/fastapi/fastapi-original.svg` },
  { name: 'Pandas', icon: `${DEVICON_BASE}/pandas/pandas-original.svg` },
  { name: 'NumPy', icon: `${DEVICON_BASE}/numpy/numpy-original.svg` },
  { name: 'Scikit-learn', icon: `${DEVICON_BASE}/scikitlearn/scikitlearn-original.svg` },
  { name: 'Express.js', icon: `${DEVICON_BASE}/express/express-original.svg` },
  { name: 'Tailwind CSS', icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
  { name: 'MongoDB', icon: `${DEVICON_BASE}/mongodb/mongodb-original.svg` },
];

function tripled(arr: Tool[]) {
  return [...arr, ...arr, ...arr];
}

const ROW1_TRIPLED = tripled(ROW1_TOOLS);
const ROW2_TRIPLED = tripled([...ROW2_TOOLS].reverse());

function Tile({ tool, index }: { tool: Tool; index: number }) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <div
      key={index}
      className="rounded-2xl flex-shrink-0 flex flex-col items-center justify-center gap-2"
      style={{ width: 130, height: 110, backgroundColor: '#C9C9C9' }}
    >
      {!iconFailed && (
        <img
          src={tool.icon}
          alt=""
          loading="lazy"
          draggable={false}
          className="object-contain select-none"
          style={{ width: 38, height: 38 }}
          onError={() => setIconFailed(true)}
        />
      )}
      <span
        className="font-kanit uppercase tracking-wide text-xs font-medium text-center px-2"
        style={{ color: '#0C0C0C' }}
      >
        {tool.name}
      </span>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const value =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(value);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {ROW1_TRIPLED.map((tool, i) => (
            <Tile tool={tool} index={i} key={`row1-${i}`} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {ROW2_TRIPLED.map((tool, i) => (
            <Tile tool={tool} index={i} key={`row2-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
