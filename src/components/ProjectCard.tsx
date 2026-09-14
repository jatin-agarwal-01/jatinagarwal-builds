import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import useBodyScrollLock from '../hooks/useBodyScrollLock';
import useFocusTrap from '../hooks/useFocusTrap';
import type { projects } from '../data/site';

type Project = (typeof projects)[number];

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
};

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduce = useReducedMotion();
  const panelRef = useFocusTrap<HTMLElement>(true);

  useBodyScrollLock(true);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Shared layout only when motion is welcome; reduced motion keeps the plain drawer.
  const shared = (name: string) => (reduce ? undefined : `project-${project.no}-${name}`);

  return (
    <motion.div className="fixed inset-0 z-[90]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button aria-label="Close project details" className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <motion.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-${project.no}-title`}
        initial={reduce ? false : { x: '100%' }}
        animate={{ x: 0 }}
        exit={reduce ? { opacity: 0 } : { x: '100%' }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-0 right-0 top-0 w-full overflow-y-auto border-l border-white/10 bg-[#0c0c0c] p-6 sm:max-w-2xl sm:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#d7e2ea]/45">
            Case Study /&nbsp;
            <motion.span layoutId={shared('number')} className="inline-block">
              {project.no}
            </motion.span>
          </p>
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#d7e2ea] transition hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <motion.h3
          layoutId={shared('title')}
          id={`project-${project.no}-title`}
          className="mt-8 font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl"
        >
          {project.title}
        </motion.h3>
        <p className="mt-5 text-lg leading-relaxed text-[#d7e2ea]/62">{project.short}</p>

        <motion.span
          layoutId={shared('outcome')}
          className="mt-6 inline-block border border-white/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#d7e2ea]/48"
        >
          {project.outcome}
        </motion.span>

        <div className="mt-10 grid grid-cols-2 gap-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="border border-white/10 bg-white/[0.035] p-4">
              <div className="font-mono text-2xl font-medium text-[#d7e2ea]">{metric.value}</div>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-[#d7e2ea]/45">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-8">
          <section>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#d7e2ea]/45">Problem</h4>
            <p className="mt-3 leading-relaxed text-[#d7e2ea]/68">{project.problem}</p>
          </section>
          <section>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#d7e2ea]/45">Approach</h4>
            <p className="mt-3 leading-relaxed text-[#d7e2ea]/68">{project.approach}</p>
          </section>
          <section>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#d7e2ea]/45">Development Steps</h4>
            <ol className="mt-4 space-y-3">
              {project.steps.map((step, stepIndex) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 leading-relaxed text-[#d7e2ea]/68">
                  <span className="font-mono text-xs text-[#d7e2ea]/35">{String(stepIndex + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#d7e2ea]/45">
              Technologies and their role
            </h4>
            <dl className="mt-4 space-y-4">
              {project.stack.map((item) => (
                <div key={item.name} className="border-t border-white/10 pt-4">
                  <dt className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#d7e2ea]">{item.name}</dt>
                  <dd className="mt-2 leading-relaxed text-[#d7e2ea]/68">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </motion.aside>
    </motion.div>
  );
}

export default function ProjectCard({ project, index, total }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : targetScale]);

  // Matching ids let the card header elements fly into the drawer header.
  const shared = (name: string) => (reduce ? undefined : `project-${project.no}-${name}`);

  return (
    <LayoutGroup id={`project-${project.no}`}>
      <article ref={ref} className="relative min-h-[78vh] md:min-h-[86vh]">
        <motion.div
          style={{ scale, top: `calc(5rem + ${index * 28}px)` }}
          className="sticky overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111114] p-6 shadow-[0_24px_120px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="flex min-h-[520px] flex-col">
              <div className="flex items-center justify-between gap-4">
                <motion.span
                  layoutId={shared('number')}
                  className="font-mono text-4xl font-medium leading-none text-[#d7e2ea]/14 md:text-6xl"
                >
                  {project.no}
                </motion.span>
                <motion.span
                  layoutId={shared('outcome')}
                  className="font-mono border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#d7e2ea]/48"
                >
                  {project.outcome}
                </motion.span>
              </div>
              <motion.h3
                layoutId={shared('title')}
                className="mt-auto font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl"
              >
                {project.title}
              </motion.h3>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#d7e2ea]/62">{project.short}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={`${project.title}-${item.name}`} className="font-mono border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-[#d7e2ea]/55">
                    {item.name}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-haspopup="dialog"
                className="mt-8 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold uppercase tracking-[0.16em] text-[#d7e2ea] transition hover:border-white/35 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Plus className="h-4 w-4" />
                View Details
              </button>
            </div>

            <div className="relative min-h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] p-4 sm:min-h-[520px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(215,226,234,0.12),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_28%)]" />
              {/*
                Single column until `sm`, so the copy never gets squeezed into a narrow
                half-tile. `auto-rows-fr` keeps every tile the same height and leaves the
                open space below the text that the panel is built around.
              */}
              <div className="relative grid h-full auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
                {project.stack.map((item, itemIndex) => {
                  // An odd count leads with one full-width tile so the rest pair off evenly;
                  // an even count is a clean 2-up grid. Either way no half-row is left hanging.
                  const fullWidth = itemIndex === 0 && project.stack.length % 2 === 1;

                  return (
                    <div
                      key={item.name}
                      className={`flex flex-col border border-white/10 bg-white/[0.04] p-5 ${fullWidth ? 'sm:col-span-2' : ''}`}
                    >
                      <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#d7e2ea]/52">{item.name}</span>
                      <p className="mt-4 max-w-prose text-xs leading-relaxed text-[#d7e2ea]/48">{item.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </article>
      <AnimatePresence>{open ? <ProjectDetail project={project} onClose={() => setOpen(false)} /> : null}</AnimatePresence>
    </LayoutGroup>
  );
}
