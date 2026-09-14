import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import useBodyScrollLock from '../hooks/useBodyScrollLock';

// Hard cap so a slow font can never hold the page hostage.
const MAX_WAIT_MS = 1200;

export default function PageCurtain() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(() => Boolean(reduce));

  useBodyScrollLock(!ready);

  useEffect(() => {
    if (reduce) {
      setReady(true);
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      setReady(true);
    };

    // Gate on webfonts only. The hero image is served through a srcset, so preloading a
    // specific variant here would risk fetching one the browser never uses.
    const fonts = document.fonts ? document.fonts.ready.catch(() => undefined) : Promise.resolve();

    fonts.then(finish);
    const timeout = window.setTimeout(finish, MAX_WAIT_MS);

    return () => {
      settled = true;
      window.clearTimeout(timeout);
    };
  }, [reduce]);

  useEffect(() => {
    if (!ready) return;

    // The scroll lock held while the curtain was up suppressed the browser's own
    // jump to `#section`, so replay it once for deep links.
    const { hash } = window.location;
    if (hash.length < 2) return;

    const frame = window.requestAnimationFrame(() => {
      try {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      } catch {
        // Ignore hashes that are not valid selectors.
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [ready]);

  return (
    <AnimatePresence>
      {ready ? null : (
        <motion.div
          key="curtain"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0c0c0c]"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-mono text-xs font-semibold uppercase tracking-[0.4em] text-[#d7e2ea]/45"
          >
            Jatin Agarwal
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
