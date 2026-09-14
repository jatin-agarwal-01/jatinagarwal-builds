import { Code2, Github, Linkedin, MapPin } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { focusAreas, principles, socialLinks } from '../data/site';

const aboutText =
  'I am a Computer Science student with a practical interest in mobile and web development, especially where performance, usability, and clean architecture meet. My work is shaped by problem solving, object-oriented thinking, and a preference for software that is maintainable from the start rather than repaired later. I am actively growing through real projects, certifications, and disciplined iteration, aiming to bring polish and reliability to every build.';

const socials = [
  { label: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin },
  { label: 'GitHub', href: socialLinks.github, icon: Github },
  { label: 'LeetCode', href: socialLinks.leetcode, icon: Code2 },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-4 py-28 sm:px-6 md:py-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="About Me" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <AnimatedText
              text={aboutText}
              className="font-sans text-base font-normal leading-relaxed text-neutral-300 md:text-lg"
            />
            <FadeIn className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#d7e2ea]/58">
              <MapPin className="h-4 w-4 text-[#d7e2ea]" />
              <span>Based in India</span>
              <span className="text-white/25">/</span>
              <span>Remote friendly</span>
            </FadeIn>
            <FadeIn className="mt-4 border-l border-white/10 pl-4 text-sm leading-6 text-[#d7e2ea]/52" delay={0.04}>
              B.Tech Computer Science student at KIET Deemed to be University.
            </FadeIn>
            <FadeIn className="mt-7 flex flex-wrap gap-3" delay={0.08}>
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <social.icon className="h-4 w-4" />
                  {social.label}
                </a>
              ))}
            </FadeIn>
          </div>

          <div className="grid gap-y-3 sm:grid-cols-2 sm:gap-x-8 lg:gap-x-14">
            {focusAreas.map((area, index) => (
              <FadeIn key={area.label} delay={index * 0.035}>
                <div className="group flex min-h-24 items-end justify-between gap-4 border-b border-white/10 py-5">
                  <span className="text-lg font-semibold uppercase tracking-wider text-[#d7e2ea]">{area.label}</span>
                  <area.icon className="h-5 w-5 text-[#d7e2ea]/45 transition group-hover:text-[#d7e2ea]" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mt-20">
          {principles.map((principle, index) => (
            <FadeIn key={principle.n} delay={index * 0.08}>
              <article className="grid gap-5 border-t border-white/10 py-8 md:grid-cols-[0.25fr_0.75fr] md:py-10">
                <div className="font-mono text-4xl font-medium leading-none text-[#d7e2ea]/16 md:text-6xl">{principle.n}</div>
                <div>
                  <h3 className="max-w-4xl font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-neutral-100 md:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#d7e2ea]/58">{principle.desc}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
