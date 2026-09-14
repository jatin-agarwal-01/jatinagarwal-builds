import { ArrowUpRight, Github } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { githubFacts, repositoryProjects, socialLinks } from '../data/site';

export default function GithubActivity() {
  return (
    <section id="github" className="scroll-mt-24 px-4 py-28 sm:px-6 md:py-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Repositories"
          title="GitHub Activity"
          copy="A static, verified snapshot from the public GitHub profile and the repositories inspected for this portfolio."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <FadeIn>
            <div className="h-full rounded-2xl border border-white/10 bg-[#111114] p-6 md:p-8">
              <Github className="h-10 w-10 text-[#d7e2ea]" />
              <h3 className="mt-8 font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl">
                jatin-agarwal-01
              </h3>
              <div className="mt-8 space-y-4">
                {githubFacts.map((fact) => (
                  <div key={fact.label} className="border-t border-white/10 pt-4">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d7e2ea]/38">{fact.label}</p>
                    <p className="mt-2 text-base text-[#d7e2ea]">{fact.value}</p>
                  </div>
                ))}
              </div>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group mt-8"
              >
                View GitHub
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </FadeIn>

          <div className="grid gap-4">
            {repositoryProjects.map((repo, index) => (
              <FadeIn key={repo.name} delay={index * 0.05}>
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/28 hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0c0c0c] text-[#d7e2ea]">
                      <repo.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#d7e2ea]">{repo.name}</h3>
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-[#d7e2ea]/38">{repo.category}</p>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#d7e2ea]/62">{repo.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {repo.tech.map((item) => (
                          <span
                            key={`${repo.name}-${item}`}
                            className="font-mono border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-[#d7e2ea]/55"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#d7e2ea]/35 transition group-hover:text-white" />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
