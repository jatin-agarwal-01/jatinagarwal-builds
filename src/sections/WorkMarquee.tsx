import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { projects, skills } from '../data/site';

const rowOne = [
  ...projects.map((project) => ({ title: project.title, meta: project.stack.map((item) => item.name).join(' / ') })),
  { title: 'AI Systems', meta: 'LLM / Automation / Guardrails' },
  { title: 'Cloud Delivery', meta: 'AWS / EC2 / S3 / Lambda' },
];

const rowTwo = [
  ...skills.map((skill) => ({ title: skill.category, meta: skill.items.slice(0, 4).join(' / ') })),
  { title: 'Certifications', meta: 'AWS / Dart / Networking / Web' },
];

function MarqueeCard({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="relative h-[230px] w-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111114] p-5 sm:h-[270px] sm:w-[420px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(215,226,234,0.14),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#d7e2ea]/42">JATIN / DEV</span>
          <span className="h-2 w-2 rounded-full bg-[#d7e2ea]/70" />
        </div>
        <div>
          <h3 className="max-w-[13ch] font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl">
            {title}
          </h3>
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-[#d7e2ea]/48">{meta}</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="h-2 rounded-full bg-white/[0.06]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkMarquee() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Reduced motion: never drive the rows from scroll. They render as static,
    // manually scrollable rows instead.
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setOffset((window.innerHeight - rect.top) * 0.3);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <section ref={ref} aria-label="Technology and work marquee" className="relative py-10 sm:py-16">
        <div className="flex gap-3 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8 [scrollbar-width:thin]">
          {rowOne.map((item) => (
            <MarqueeCard key={`${item.title}-one`} {...item} />
          ))}
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-8 [scrollbar-width:thin]">
          {rowTwo.map((item) => (
            <MarqueeCard key={`${item.title}-two`} {...item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Technology and work marquee" className="relative overflow-hidden py-10 sm:py-16">
      <div
        className="flex gap-3 will-change-transform"
        style={{ transform: `translate3d(${offset - 200}px,0,0)` }}
      >
        {[...rowOne, ...rowOne, ...rowOne].map((item, index) => (
          <MarqueeCard key={`${item.title}-one-${index}`} {...item} />
        ))}
      </div>
      <div
        className="mt-3 flex gap-3 will-change-transform"
        style={{ transform: `translate3d(${-(offset - 200)}px,0,0)` }}
      >
        {[...rowTwo, ...rowTwo, ...rowTwo].map((item, index) => (
          <MarqueeCard key={`${item.title}-two-${index}`} {...item} />
        ))}
      </div>
    </section>
  );
}
