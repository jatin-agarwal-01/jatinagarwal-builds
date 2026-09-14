import { motion, useReducedMotion, type Variants } from 'framer-motion';

type SkillCardProps = {
  category: string;
  items: string[];
  index: number;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.045, delayChildren: 0.12 },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function SkillCard({ category, items, index }: SkillCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      variants={reduce ? undefined : cardVariants}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05 }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group h-full rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:border-white/28 hover:bg-white/[0.055] sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-[#d7e2ea]">{category}</h3>
        <span className="h-2 w-2 rounded-full bg-[#d7e2ea]/70 shadow-[0_0_20px_rgba(215,226,234,0.45)]" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <motion.span
            key={`${category}-${item}`}
            variants={reduce ? undefined : tagVariants}
            className="font-mono rounded-full border border-white/10 bg-[#0c0c0c] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[#d7e2ea]/55 transition duration-300 hover:border-white/35 hover:bg-white/[0.06] hover:text-[#d7e2ea] group-hover:border-white/20"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.article>
  );
}
