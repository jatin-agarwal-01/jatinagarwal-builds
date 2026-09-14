import { useEffect } from 'react';

/**
 * Reference-counted body scroll lock.
 *
 * Multiple overlays (mobile menu, project drawer, any future modal) can request
 * a lock at the same time. The body style is only restored once every consumer
 * has released, so a closing overlay can never unlock the page underneath one
 * that is still open.
 */

let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

function acquire() {
  if (lockCount === 0) {
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    previousOverflow = body.style.overflow;
    previousPaddingRight = body.style.paddingRight;
    body.style.overflow = 'hidden';

    // Compensate for the scrollbar so locking does not shift the layout.
    if (scrollbarWidth > 0) {
      const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollbarWidth}px`;
    }
  }

  lockCount += 1;
}

function release() {
  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
  }
}

export default function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    acquire();
    return release;
  }, [active]);
}
