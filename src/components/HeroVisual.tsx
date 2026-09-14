import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Bot, Cloud, Code2, GitBranch, Terminal } from 'lucide-react';

const codeLines = ['const idea = build();', 'await deploy(app);', 'agent.run(workflow)', 'git push origin main'];
const nodes = [
  { label: 'WEB', className: 'left-[8%] top-[14%]' },
  { label: 'AI', className: 'right-[10%] top-[20%]' },
  { label: 'AWS', className: 'bottom-[18%] left-[14%]' },
  { label: 'GIT', className: 'bottom-[12%] right-[18%]' },
];

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  return (
    <motion.div
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(110,231,183,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
        <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c0c0c]/88">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
            </div>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/35">developer interface</span>
          </div>

          <div className="relative p-4 sm:p-6">
            <div className="grid h-full grid-cols-12 gap-3">
              <div className="col-span-8 rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
                  <Terminal className="h-4 w-4" />
                  terminal
                </div>
                <div className="space-y-3 font-mono text-xs text-[#a5a5a5] sm:text-sm">
                  {codeLines.map((line, index) => (
                    <motion.div
                      key={line}
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.12, duration: 0.45 }}
                      className="flex gap-3"
                    >
                      <span className="text-white/25">{String(index + 1).padStart(2, '0')}</span>
                      <span>{line}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="col-span-4 grid gap-3">
                {[Code2, GitBranch, Bot, Cloud].map((Icon, index) => (
                  <motion.div
                    key={index}
                    animate={reduce ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/65"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                ))}
              </div>
            </div>

            {nodes.map((node) => (
              <motion.div
                key={node.label}
                animate={reduce ? undefined : { scale: [1, 1.04, 1], opacity: [0.72, 1, 0.72] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute ${node.className} rounded-full border border-emerald-200/25 bg-emerald-200/10 px-3 py-1 font-mono text-xs font-medium tracking-[0.18em] text-emerald-100`}
              >
                {node.label}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 border-t border-white/10 text-center font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            <span className="border-r border-white/10 py-3">React</span>
            <span className="border-r border-white/10 py-3">Cloud</span>
            <span className="py-3">Agents</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
