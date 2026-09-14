import { useEffect, useState } from 'react';

/**
 * Tracks which of the given section ids is currently the primary one in view.
 * Used by the navbar to move its active indicator while scrolling.
 */
export default function useActiveSection(hrefs: string[]) {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const sections = hrefs
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(`#${entry.target.id}`, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestHref: string | null = null;
        let bestRatio = 0;

        for (const href of hrefs) {
          const ratio = visibility.get(href) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestHref = href;
          }
        }

        setActiveHref(bestHref);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9], rootMargin: '-20% 0px -35% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hrefs.join('|')]);

  return activeHref;
}
