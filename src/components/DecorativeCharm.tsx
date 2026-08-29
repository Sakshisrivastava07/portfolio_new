import FadeIn from './FadeIn';

interface DecorativeCharmProps {
  src: string;
  size: string; // tailwind width classes, e.g. "w-[70px] sm:w-[90px] md:w-[110px]"
  position: string; // tailwind positioning classes, e.g. "top-[6%] left-[2%] sm:left-[4%]"
  delay?: number;
  flip?: boolean; // optional horizontal flip for variety
}

const ENTRANCE_DURATION = 0.9;

export default function DecorativeCharm({
  src,
  size,
  position,
  delay = 0,
  flip = false,
}: DecorativeCharmProps) {
  const isLeft = position.includes('left');
  const x = isLeft ? -80 : 80;

  return (
    <div
      className={`hidden sm:block absolute ${position} ${size} pointer-events-none z-0`}
    >
      <FadeIn delay={delay} x={x} y={0} duration={ENTRANCE_DURATION}>
        <img
          src={src}
          alt=""
          draggable={false}
          className={`w-full h-auto select-none ${flip ? 'charm-float-flip' : 'charm-float'}`}
          style={{ animationDelay: `${delay + ENTRANCE_DURATION}s` }}
        />
      </FadeIn>
    </div>
  );
}
