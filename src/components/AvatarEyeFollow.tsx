import { useEffect, useRef, useState, type CSSProperties } from 'react';
import frameCenter from '../assets/avatar/frame_center.png';
import frameLeft from '../assets/avatar/frame_left.png';
import frameRight from '../assets/avatar/frame_right.png';
import frameDown from '../assets/avatar/frame_down_right.png';
import frameUp from '../assets/avatar/frame_up.png';

type Frame = 'center' | 'left' | 'right' | 'down' | 'up';

const FRAME_SRC: Record<Frame, string> = {
  center: frameCenter,
  left: frameLeft,
  right: frameRight,
  down: frameDown,
  up: frameUp,
};

// frame_center/left/right are 512x512 (square, no crop needed against the
// square container). frame_down_right and frame_up are 768x512 — wider, with
// the face off-center on a mostly-blank canvas — so a plain centered crop
// would cut her face off. Nudge each one's crop toward wherever the face
// actually sits to keep it in view (down: face left-of-center; up: face
// right-of-center).
const FRAME_OBJECT_POSITION: Record<Frame, string> = {
  center: 'center top',
  left: 'center top',
  right: 'center top',
  down: '12% top',
  up: '85% top',
};

const DEAD_ZONE = 50;
const DOWN_THRESHOLD = 80;
const UP_THRESHOLD = 80;

interface AvatarEyeFollowProps {
  className?: string;
  style?: CSSProperties;
}

export default function AvatarEyeFollow({ className, style }: AvatarEyeFollowProps) {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<Frame>('center');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const avatar = avatarRef.current;
      if (!avatar) return;

      const rect = avatar.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      let next: Frame;
      if (Math.abs(dx) < DEAD_ZONE && Math.abs(dy) < DEAD_ZONE) {
        next = 'center';
      } else if (dy > DOWN_THRESHOLD) {
        next = 'down';
      } else if (dy < -UP_THRESHOLD) {
        next = 'up';
      } else if (dx < 0) {
        next = 'left';
      } else {
        next = 'right';
      }

      setFrame(next);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={avatarRef}
      className={className}
      style={{ position: 'relative', aspectRatio: '1 / 1', ...style }}
    >
      {(Object.keys(FRAME_SRC) as Frame[]).map((key) => (
        <img
          key={key}
          src={FRAME_SRC[key]}
          alt={key === 'center' ? 'Sakshi portrait' : ''}
          aria-hidden={key !== 'center'}
          draggable={false}
          className="avatar-frame-mask absolute inset-0 w-full h-full object-cover select-none"
          style={{
            objectPosition: FRAME_OBJECT_POSITION[key],
            opacity: frame === key ? 1 : 0,
            transition: 'opacity 80ms linear',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
}
