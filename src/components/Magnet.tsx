import { ReactNode, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type MagnetProps = {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
};

export default function Magnet({
  children,
  className = '',
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transition = inactiveTransition;
    ref.current.style.transform = 'translate3d(0, 0, 0)';
  };

  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current || window.matchMedia('(pointer: coarse)').matches) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    if (Math.abs(distanceX) > rect.width / 2 + padding || Math.abs(distanceY) > rect.height / 2 + padding) {
      reset();
      return;
    }

    ref.current.style.transition = activeTransition;
    ref.current.style.transform = `translate3d(${distanceX / strength}px, ${distanceY / strength}px, 0)`;
  };

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={reset} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
