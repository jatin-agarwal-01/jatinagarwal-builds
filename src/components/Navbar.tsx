import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import useActiveSection from '../hooks/useActiveSection';
import useBodyScrollLock from '../hooks/useBodyScrollLock';
import useFocusTrap from '../hooks/useFocusTrap';
import { mobileNavLinks, navLinks } from '../data/site';

const trackedHrefs = mobileNavLinks.map((link) => link.href);

function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const activeHref = useActiveSection(trackedHrefs);
  const menuRef = useFocusTrap<HTMLElement>(open);

  useBodyScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleLink = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToHash(href), open ? 180 : 0);
  };

  return (
    <>
      <motion.header
        initial={reduce ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
          scrolled ? 'border-b border-white/10 bg-[#0c0c0c]/72 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-semibold uppercase tracking-[0.26em] text-[#d7e2ea] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-sm"
          >
            Jatin Agarwal
          </button>

          <LayoutGroup id="navbar">
            <div className="hidden items-center gap-5 lg:flex">
              {navLinks.map((link) => {
                const active = activeHref === link.href;

                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleLink(link.href)}
                    aria-current={active ? 'true' : undefined}
                    className={`relative pb-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      active ? 'text-[#d7e2ea]' : 'text-[#d7e2ea]/62 hover:text-[#d7e2ea]'
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <motion.span
                        layoutId="active-nav-indicator"
                        // Reduced motion fades the indicator in place instead of sliding it.
                        layout={reduce ? false : 'position'}
                        initial={reduce ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                        className="absolute inset-x-0 -bottom-px h-px bg-[#d7e2ea]"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <button
            type="button"
            onClick={() => handleLink('#contact')}
            className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-[#d7e2ea] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:inline-flex"
          >
            Start a conversation
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-haspopup="dialog"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-[#d7e2ea] transition hover:border-white/30 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[80] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-black/75 backdrop-blur-md" aria-label="Close menu" onClick={() => setOpen(false)} />
            <motion.aside
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduce ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-0 right-0 top-0 flex w-full max-w-sm flex-col border-l border-white/10 bg-[#0c0c0c]"
            >
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7e2ea]">Menu</span>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#d7e2ea]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* Scrollable: the menu now lists every section, which can exceed a short viewport. */}
              <div className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-4">
                {mobileNavLinks.map((link, index) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleLink(link.href)}
                    aria-current={activeHref === link.href ? 'true' : undefined}
                    className={`flex shrink-0 items-center justify-between border-b border-white/10 py-3.5 text-left font-sans text-lg font-medium uppercase leading-snug tracking-[0.08em] transition ${
                      activeHref === link.href ? 'text-white' : 'text-neutral-100'
                    }`}
                  >
                    {link.label}
                    <span className="text-xs text-white/35">{String(index + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
