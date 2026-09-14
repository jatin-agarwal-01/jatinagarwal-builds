import FadeIn from './FadeIn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ eyebrow, title, copy, align = 'left' }: SectionHeadingProps) {
  return (
    <FadeIn className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-white/45">{eyebrow}</p>
      ) : null}
      <h2 className="hero-heading mt-4 font-serif text-4xl font-normal leading-tight tracking-tight md:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-6 text-base leading-relaxed text-[#a5a5a5] md:text-lg">{copy}</p> : null}
    </FadeIn>
  );
}
