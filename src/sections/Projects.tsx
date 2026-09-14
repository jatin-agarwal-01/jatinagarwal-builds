import ProjectCard from '../components/ProjectCard';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { githubFacts, projects, repositoryProjects } from '../data/site';

export default function Projects() {
  return (
    <section id="work" className="scroll-mt-24 px-4 py-28 sm:px-6 md:py-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Selected Work"
          copy="Four portfolio case studies preserved from the existing site, redesigned as sticky project experiences with the original problems, approaches, development steps, technologies, and outcomes."
        />
        <div className="mt-14">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} total={projects.length} />
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-12">
          <FadeIn className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[#d7e2ea]/42">Public Repository Snapshot</p>
              <h3 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-tight text-[#d7e2ea] md:text-5xl">
                Verified GitHub work
              </h3>
              <div className="mt-8 space-y-4">
                {githubFacts.map((fact) => (
                  <div key={fact.label} className="border-t border-white/10 pt-4">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d7e2ea]/35">{fact.label}</p>
                    <p className="mt-1 text-base text-[#d7e2ea]/72">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              {repositoryProjects.map((repo, index) => (
                <a
                  key={repo.name}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-5 border border-white/10 bg-white/[0.025] p-6 transition hover:border-white/25 hover:bg-white/[0.045] md:grid-cols-[0.34fr_0.66fr]"
                >
                  <div>
                    <p className="font-mono text-xs text-[#d7e2ea]/35">{String(index + 1).padStart(2, '0')}</p>
                    <h4 className="mt-3 font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl">{repo.name}</h4>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-[#d7e2ea]/38">{repo.category}</p>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-[#d7e2ea]/58">{repo.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {repo.tech.map((tech) => (
                        <span key={`${repo.name}-${tech}`} className="font-mono text-xs text-[#d7e2ea]/42">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
