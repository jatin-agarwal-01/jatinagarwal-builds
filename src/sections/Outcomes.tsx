import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { outcomes } from '../data/site';

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function Outcomes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section id="outcomes" className="scroll-mt-24 px-4 pb-20 pt-6 sm:px-6 md:pb-28 md:pt-8 lg:px-8">
      <div
        ref={ref}
        className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111114] p-5 sm:p-8 lg:p-12"
      >
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[#d7e2ea]/45">Outcomes / Impact</p>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {outcomes.map((outcome) => (
            <div key={outcome.label}>
              <div className="font-mono text-4xl font-medium leading-none text-[#d7e2ea] md:text-6xl">
                <Counter value={outcome.value} suffix={outcome.suffix} inView={inView} />
              </div>
              <p className="mt-4 max-w-40 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#d7e2ea]/48">{outcome.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
