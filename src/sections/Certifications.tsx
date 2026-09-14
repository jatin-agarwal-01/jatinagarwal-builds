import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { certifications } from '../data/site';

const filters = ['All', 'AWS', 'Web', 'Data', 'Mobile', 'Networking', 'Hackathon', 'Linux'];

function getCertificateGroup(cert: (typeof certifications)[number]) {
  const text = `${cert.title} ${cert.issuer}`.toLowerCase();

  if (text.includes('aws') || text.includes('amazon')) return 'AWS';
  if (text.includes('flutter') || text.includes('dart')) return 'Mobile';
  if (text.includes('network')) return 'Networking';
  if (text.includes('dataverse') || text.includes('hackathon')) return 'Hackathon';
  if (text.includes('red hat')) return 'Linux';
  if (text.includes('nosql') || text.includes('entity relationship')) return 'Data';
  if (text.includes('javascript') || text.includes('django') || text.includes('flask')) return 'Web';

  return 'Web';
}

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('All');
  const reduce = useReducedMotion();
  const visibleCertifications = useMemo(
    () =>
      activeFilter === 'All'
        ? certifications
        : certifications.filter((cert) => getCertificateGroup(cert) === activeFilter),
    [activeFilter],
  );

  return (
    <section id="certificates" className="scroll-mt-24 px-4 py-28 sm:px-6 md:py-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Certificates"
          title="Certifications"
          copy="Credentials preserved from the existing portfolio and connected to the certificate files included in the repository."
        />

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/*
            These are filter toggles, not tabs: plain buttons with aria-pressed, so screen reader
            users are not promised arrow-key tab semantics the control does not implement.
          */}
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]" role="group" aria-label="Filter certificates">
            {filters.map((filter) => {
              const pressed = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-full border px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                    pressed
                      ? 'border-white/60 bg-white text-[#0c0c0c]'
                      : 'border-white/10 bg-white/[0.03] text-[#d7e2ea]/55 hover:border-white/25 hover:text-[#d7e2ea]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="font-mono text-xs uppercase tracking-[0.2em] text-[#d7e2ea]/38">
            {visibleCertifications.length} / {certifications.length} shown
          </p>
        </div>

        <motion.div layout={!reduce} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleCertifications.map((cert) => (
              <motion.div
                key={cert.title}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full"
              >
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-[360px] w-full flex-col justify-between rounded-2xl border border-white/10 bg-[#111114] p-6 transition hover:border-white/28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-[#d7e2ea]">
                        <Award className="h-5 w-5" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-white/30 transition group-hover:text-white" />
                    </div>
                    <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-[#d7e2ea]/38">
                      {getCertificateGroup(cert)}
                    </p>
                    <h3 className="mt-4 max-h-[5.25rem] overflow-hidden font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl">
                      {cert.title}
                    </h3>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-sm leading-relaxed text-[#d7e2ea]/62">{cert.issuer}</p>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[#d7e2ea]/38">Issued {cert.date}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
