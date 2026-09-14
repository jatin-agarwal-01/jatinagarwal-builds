import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { education } from '../data/site';

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 px-4 py-28 sm:px-6 md:py-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Education" title="Education" copy="The academic track running alongside the build work." />
        <div className="mt-14 space-y-4">
          {education.map((item, index) => (
            <FadeIn key={`${item.institution}-${item.eyebrow}`} delay={index * 0.06}>
              <article className="rounded-2xl border border-white/10 bg-[#111114] p-6 md:p-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[#d7e2ea]/45">{item.eyebrow}</p>
                    <h3 className="mt-5 font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl">
                      {item.institution}
                    </h3>
                    <p className="mt-5 text-lg font-semibold text-[#d7e2ea]">{item.qualification}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {item.metrics.map((metric) => (
                      <div key={metric.label} className="min-w-40 rounded-2xl border border-white/10 bg-[#0c0c0c] p-5">
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#d7e2ea]/38">{metric.label}</p>
                        <p className="mt-3 font-mono text-2xl font-medium text-[#d7e2ea]">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
