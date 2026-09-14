import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import Magnet from '../components/Magnet';
// Optimised derivatives of the 482 KB source `profile.jpg` (70 KB / 33 KB).
import profileImage from '../assets/profile-675.jpg';
import profileImageSmall from '../assets/profile-430.jpg';
import { heroStats } from '../data/site';

function go(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  const reduce = useReducedMotion();
  const transition = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const };

  return (
    <section className="relative flex min-h-[100vh] min-h-[100svh] items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 md:pb-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c0c0c] to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
        <div className="relative z-20">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.05 }}
            className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[#d7e2ea]/62"
          >
            Software Developer Portfolio
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.15 }}
            className="hero-heading mt-5 max-w-4xl font-serif text-5xl font-normal leading-[1.05] tracking-tight md:text-7xl"
          >
            Jatin Agarwal
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.3 }}
            className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-neutral-300 md:text-3xl"
          >
            Building software that feels deliberate, modern, and dependable.
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.38 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#d7e2ea]/62 md:text-lg"
          >
            Computer Science student, AWS certified learner, Flutter and React developer. Product-minded engineering with
            polish and reliability.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.45 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Magnet padding={80} strength={5}>
              <button type="button" onClick={() => go('#work')} className="btn-primary group">
                View Selected Work
                <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </button>
            </Magnet>
            <button type="button" onClick={() => go('#contact')} className="btn-ghost group">
              <Mail className="h-4 w-4" />
              Start a Conversation
            </button>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.58 }}
            className="mt-14 flex flex-wrap gap-8 sm:gap-12"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-3xl font-medium leading-none text-[#d7e2ea] md:text-4xl">{stat.value}</div>
                <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#d7e2ea]/42">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: 0.55 }}
          className="relative z-10 mx-auto w-full max-w-[430px] lg:max-w-none"
        >
          <Magnet padding={150} strength={3} className="relative">
            <div className="relative mx-auto aspect-[4/5] w-[min(76vw,430px)] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111114] shadow-[0_30px_110px_rgba(0,0,0,0.65)] lg:w-full">
              <img
                src={profileImage}
                srcSet={`${profileImageSmall} 430w, ${profileImage} 675w`}
                sizes="(min-width: 1024px) 430px, min(76vw, 430px)"
                width={675}
                height={900}
                fetchPriority="high"
                decoding="async"
                alt="Jatin Agarwal portrait"
                className="h-full w-full object-cover grayscale-[18%]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,226,234,0.16),transparent_34%),linear-gradient(to_top,rgba(12,12,12,0.82),transparent_45%)]" />
              <div className="absolute bottom-5 left-5 right-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/45">Based in India</p>
                  <p className="mt-1 text-xl font-semibold uppercase tracking-wider text-[#d7e2ea]">Remote friendly</p>
                </div>
              </div>
            </div>
          </Magnet>
        </motion.div>
      </div>
    </section>
  );
}
