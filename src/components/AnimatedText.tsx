import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
};

function Character({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const reduce = useReducedMotion();
  const start = index / total;
  const end = Math.min(start + 0.08, 1);
  const opacity = useTransform(progress, [start, end], reduce ? [1, 1] : [0.2, 1]);

  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {char}
    </motion.span>
  );
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = Array.from(text);

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      {chars.map((char, index) => (
        <Character key={`${char}-${index}`} char={char} index={index} total={chars.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}
