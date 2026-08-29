import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TimelineEntry {
  title: string;
  description?: string;
  meta: string;
}

interface FunkyTimelineProps {
  entries: TimelineEntry[];
}

// Same muted gradient stops as .hero-heading, plus its neighbors in the palette.
// Never the CTA-button colors (#B600A8 / #7621B0 / #BE4C00) — those are reserved
// for ContactButton.
const CONFETTI_COLORS = ['#D7E2EA', '#BBCCD7', '#8FA3B0', '#646973'];

const LOGO_SRC = '/no-background-1787858821023.png';

const BADGE_SIZE = 52;
const LOGO_SIZE = 42;
const LINE_X = BADGE_SIZE / 2; // center of the badge/line column
const WAVE_AMPLITUDE = 14;
const WAVE_SEGMENT = 100; // roughly one entry's worth of vertical space per lobe

function buildWavyPath(totalHeight: number): string {
  if (totalHeight <= 0) return `M ${LINE_X} 0 L ${LINE_X} 0`;

  let d = `M ${LINE_X} 0`;
  let y = 0;
  let direction = 1;

  while (y < totalHeight) {
    const nextY = Math.min(y + WAVE_SEGMENT, totalHeight);
    const controlY = y + (nextY - y) / 2;
    const controlX = LINE_X + direction * WAVE_AMPLITUDE;
    d += ` Q ${controlX} ${controlY} ${LINE_X} ${nextY}`;
    y = nextY;
    direction *= -1;
  }

  return d;
}

function spawnConfetti(originEl: HTMLElement, container: HTMLElement) {
  const originRect = originEl.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const centerX = originRect.left - containerRect.left + originRect.width / 2;
  const centerY = originRect.top - containerRect.top + originRect.height / 2;

  const PARTICLE_COUNT = 8;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
    const distance = 24 + Math.random() * 8;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    const particle = document.createElement('span');
    particle.style.position = 'absolute';
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '1px';
    particle.style.backgroundColor = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.transform = 'translate(-50%, -50%)';
    particle.style.transition = 'transform 500ms ease-out, opacity 500ms ease-out';
    particle.style.opacity = '1';

    container.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      particle.style.opacity = '0';
    });

    setTimeout(() => {
      particle.remove();
    }, 520);
  }
}

export default function FunkyTimeline({ entries }: FunkyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const confettiFired = useRef<boolean[]>([]);

  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [totalHeight, setTotalHeight] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [drawn, setDrawn] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      setTotalHeight(container.scrollHeight);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [entries]);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [totalHeight]);

  useEffect(() => {
    if (isInView) setDrawn(true);
  }, [isInView]);

  const pathD = buildWavyPath(totalHeight);

  return (
    <div ref={containerRef} className="relative z-10 w-full max-w-4xl">
      {totalHeight > 0 && (
        <svg
          className="absolute left-0 top-0"
          width={BADGE_SIZE}
          height={totalHeight}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="funky-timeline-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BBCCD7" />
              <stop offset="100%" stopColor="#646973" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="url(#funky-timeline-gradient)"
            strokeWidth={2}
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: drawn ? 0 : pathLength,
              transition: 'stroke-dashoffset 1000ms ease',
            }}
          />
        </svg>
      )}

      <div className="flex flex-col gap-12 sm:gap-14">
        {entries.map((entry, index) => (
          <div
            key={index}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            className="relative flex flex-col justify-center pl-20 sm:pl-24"
            style={{ minHeight: BADGE_SIZE }}
          >
            <motion.div
              ref={(el) => {
                badgeRefs.current[index] = el;
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                width: BADGE_SIZE,
                height: BADGE_SIZE,
                backgroundColor: '#0C0C0C',
                border: '2px solid #D7E2EA',
                zIndex: 2,
              }}
              initial={{ scale: 0 }}
              animate={drawn ? { scale: 1 } : { scale: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 12,
                delay: index * 0.55,
              }}
              onAnimationComplete={() => {
                if (!drawn || confettiFired.current[index]) return;
                confettiFired.current[index] = true;
                const badgeEl = badgeRefs.current[index];
                const container = containerRef.current;
                if (badgeEl && container) spawnConfetti(badgeEl, container);
              }}
            >
              <img
                src={LOGO_SRC}
                alt=""
                draggable={false}
                className="rounded-full object-cover select-none"
                style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={drawn ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.5, delay: index * 0.55 + 0.15 }}
            >
              <h3
                className="font-kanit font-bold text-[#D7E2EA] leading-snug"
                style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)' }}
              >
                {entry.title}
              </h3>
              {entry.description && (
                <p className="text-[#D7E2EA]/70 font-light leading-relaxed text-sm sm:text-base max-w-xl mt-2 mb-2">
                  {entry.description}
                </p>
              )}
              <p
                className="text-[#D7E2EA]/60 uppercase tracking-wide mt-2"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)' }}
              >
                {entry.meta}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
