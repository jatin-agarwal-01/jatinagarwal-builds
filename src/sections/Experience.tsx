import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { experience, teamsAndTools } from '../data/site';

export default function Experience() {
  const reduce = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 65%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="experience" className="scroll-mt-24 px-4 py-28 sm:px-6 md:py-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Experience" title="Experience" copy="A short, deliberate track record without overstating employment history." />
        <div ref={timelineRef} className="relative mt-16 space-y-14 pl-8 md:pl-12">
          <div className="absolute inset-y-0 left-0 w-px bg-white/10">
            {/* Scroll-linked fill over the static rail; skipped entirely for reduced motion. */}
            {reduce ? null : (
              <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-[#d7e2ea]/70" />
            )}
          </div>
          {experience.map((item, index) => (
            <FadeIn key={`${item.role}-${item.company}`} x={-24} delay={index * 0.08}>
              <article className="relative">
                <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-[#d7e2ea] ring-4 ring-white/10 md:-left-[54px]" />
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#d7e2ea]/45">{item.period}</p>
                <h3 className="mt-4 font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-2 text-lg font-semibold text-[#d7e2ea]">{item.company}</p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#d7e2ea]/62">{item.desc}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-20 overflow-hidden border-y border-white/10 py-8">
          <p className="font-mono text-center text-xs font-semibold uppercase tracking-[0.32em] text-[#d7e2ea]/38">
            Tools and teams I have worked with
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#d7e2ea]/35">Companies / Teams</p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {teamsAndTools.teams.map((name) => (
                  <span key={name} className="font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-[#d7e2ea]/78 md:text-2xl">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#d7e2ea]/35">Technologies / Platforms</p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {teamsAndTools.platforms.map((name) => (
                  <span key={name} className="font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-[#d7e2ea]/42 md:text-2xl">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
