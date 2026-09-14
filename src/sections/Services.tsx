import FadeIn from '../components/FadeIn';
import { services } from '../data/site';

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 scroll-mt-24 rounded-t-[40px] bg-white px-4 py-28 text-[#0c0c0c] sm:px-6 md:rounded-t-[50px] md:py-36 lg:rounded-t-[60px] lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-black/45">Services</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-[#0c0c0c] md:text-5xl">
            Capabilities
          </h2>
        </FadeIn>

        <div className="mt-16">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.045}>
              <article className="grid gap-7 border-t border-[rgba(12,12,12,0.15)] py-8 md:grid-cols-[0.28fr_0.72fr] md:py-10">
                <div className="flex items-start justify-between gap-5">
                  <span className="font-mono text-4xl font-medium leading-none text-black/12 md:text-6xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <service.icon className="mt-2 h-6 w-6 shrink-0 text-black/40" />
                </div>
                <div className="grid gap-4 md:grid-cols-[0.48fr_0.52fr] md:items-start">
                  <h3 className="font-sans text-xl font-medium uppercase leading-snug tracking-[0.08em] text-[#0c0c0c] md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="font-sans text-base font-normal leading-relaxed text-black/58 md:text-lg">{service.desc}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
