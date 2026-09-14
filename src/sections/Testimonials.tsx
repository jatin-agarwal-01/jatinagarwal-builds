import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import { testimonials } from '../data/site';

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 px-4 py-28 sm:px-6 md:py-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Testimonials" title="Testimonials" copy="Existing testimonial copy preserved from the source portfolio." />
        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {testimonials.map((quote, index) => (
            <FadeIn key={`${quote.name}-${quote.role}`} delay={index * 0.08}>
              <figure className="flex h-full min-h-[425px] flex-col rounded-2xl border border-white/10 bg-[#111114]/70 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-10">
                <span className="font-serif text-5xl font-semibold leading-none text-[#d7e2ea]/35" aria-hidden="true">
                  “
                </span>
                <blockquote className="mt-10 flex-1 font-serif text-[1.35rem] italic leading-relaxed text-[#d7e2ea] md:text-[1.45rem]">
                  {quote.text}
                </blockquote>
                <figcaption className="mt-9 border-t border-white/10 pt-6">
                  <div className="font-sans text-lg font-semibold text-[#d7e2ea]">{quote.name}</div>
                  <div className="mt-1 font-sans text-base font-medium text-[#d7e2ea]/75">{quote.role}</div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
