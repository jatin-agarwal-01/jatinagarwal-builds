import { Github, Linkedin, Mail } from 'lucide-react';
import { navLinks, socialLinks } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7e2ea]">Jatin Agarwal © 2026</p>
          <p className="mt-2 text-xs text-[#d7e2ea]/45">Built with React, Tailwind CSS, Framer Motion, and deliberate care.</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-[#d7e2ea]/48">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-[#d7e2ea]">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-3">
          {[
            { href: socialLinks.github, icon: Github, label: 'GitHub' },
            { href: socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: socialLinks.email, icon: Mail, label: 'Email' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={item.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#d7e2ea]/52 transition hover:border-white/25 hover:text-[#d7e2ea]"
            >
              <item.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
