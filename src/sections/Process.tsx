import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { processSteps } from '../data/site';

export default function Process() {
  const reduce = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="process" className="relative scroll-mt-24 px-4 pb-10 pt-28 sm:px-6 md:pb-14 md:pt-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Process" title="How I Build" copy="How an idea becomes finished software." />
        <div ref={timelineRef} className="relative mt-16">
          <div className="absolute left-[1.1rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-white/10 md:block">
            {/* Scroll-linked fill over the static rail; skipped entirely for reduced motion. */}
            {reduce ? null : (
              <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-[#d7e2ea]/70" />
            )}
          </div>
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <FadeIn key={step.n} delay={index * 0.07}>
                <article className="grid gap-6 border-t border-white/10 py-8 md:grid-cols-[4.75rem_minmax(0,1fr)] md:gap-8 md:border-t-0 md:py-10">
                  <div className="relative flex items-start pt-1">
                    <motion.span
                      initial={reduce ? false : { scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                      className="font-mono relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#0c0c0c] text-xs text-[#d7e2ea]"
                    >
                      {step.n}
                    </motion.span>
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#d7e2ea]/62">{step.desc}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
