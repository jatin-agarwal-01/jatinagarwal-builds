import { LucideIcon } from 'lucide-react';

type SocialButtonProps = {
  label: string;
  href: string;
  icon: LucideIcon;
  variant?: 'solid' | 'outline';
};

export default function SocialButton({ label, href, icon: Icon, variant = 'outline' }: SocialButtonProps) {
  const solid = variant === 'solid';
  const external = href.startsWith('http');
  const mail = href.startsWith('mailto:');

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
        solid
          ? 'bg-[#f5f5f5] text-[#080808] hover:bg-white'
          : 'border border-white/15 bg-white/[0.03] text-[#f5f5f5] hover:border-white/35 hover:bg-white/[0.07]'
      }`}
      aria-label={mail ? 'Email Jatin Agarwal' : label}
    >
      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      {label}
    </a>
  );
}
