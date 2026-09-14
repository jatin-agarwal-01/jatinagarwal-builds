import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import { contactButtons, socialLinks } from '../data/site';

/**
 * Delivery is configured through env vars so no key is hardcoded in the repo.
 * Set ONE of these in `.env.local` (and in the host's environment variables):
 *
 *   VITE_WEB3FORMS_KEY=<access key>   → https://web3forms.com
 *   VITE_FORMSPREE_ID=<form id>       → https://formspree.io
 *
 * With neither set the form falls back to opening the visitor's mail client,
 * which is the behaviour the site shipped with.
 */
// Vite inlines these at build/dev-server start, so restart `npm run dev`
// after editing `.env.local` or the old (empty) value stays compiled in.
const readEnv = (value: unknown) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  return trimmed ? trimmed : undefined;
};

const web3formsKey = readEnv(import.meta.env.VITE_WEB3FORMS_KEY);
const formspreeId = readEnv(import.meta.env.VITE_FORMSPREE_ID);
const hasEndpoint = Boolean(web3formsKey || formspreeId);

type Status = 'idle' | 'submitting' | 'sent' | 'mailto' | 'error';

type FormState = { name: string; email: string; message: string };

function buildRequest(form: FormState) {
  const subject = `Portfolio inquiry from ${form.name}`;

  if (web3formsKey) {
    return {
      url: 'https://api.web3forms.com/submit',
      body: {
        access_key: web3formsKey,
        subject,
        from_name: 'Portfolio contact form',
        replyto: form.email,
        botcheck: '',
        name: form.name,
        email: form.email,
        message: form.message,
      },
    };
  }

  return {
    url: `https://formspree.io/f/${formspreeId}`,
    body: {
      _subject: subject,
      name: form.name,
      email: form.email,
      message: form.message,
    },
  };
}

const emptyForm: FormState = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  // Honeypot: real people never see this, so anything in it is a bot.
  const [trap, setTrap] = useState('');
  const reduce = useReducedMotion();
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const submitting = status === 'submitting';

  const openMailClient = () => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${socialLinks.emailAddress}?subject=${subject}&body=${body}`;
    setStatus('mailto');
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    // Drop bot submissions silently — no request, no hint that it was caught.
    if (trap) {
      setStatus('sent');
      setForm(emptyForm);
      return;
    }

    if (!hasEndpoint) {
      setStatus('idle');

      // Reduced motion skips the hand-off beat and goes straight to the mail client.
      if (reduce) {
        openMailClient();
        return;
      }

      setStatus('submitting');
      timers.current.push(window.setTimeout(openMailClient, 420));
      return;
    }

    setStatus('submitting');

    try {
      const { url, body } = buildRequest(form);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });

      // Web3Forms answers 200 with `success: false` when the key is wrong or
      // the submission is rejected, so the status code alone is not enough.
      const result = await response.json().catch(() => null);
      if (!response.ok || (result && result.success === false)) {
        throw new Error(result?.message ?? `Contact endpoint responded ${response.status}`);
      }

      setStatus('sent');
      setForm(emptyForm);
    } catch (error) {
      console.error('Contact form delivery failed:', error);
      setStatus('error');
    }
  };

  const field =
    'w-full bg-transparent border-b border-white/15 focus:border-white/55 outline-none py-3 text-[#d7e2ea] placeholder:text-[#d7e2ea]/30 transition-colors duration-300 focus-visible:outline-none';

  const buttonLabel = submitting ? (hasEndpoint ? 'Sending' : 'Opening mail') : 'Contact Me';

  return (
    <section id="contact" className="scroll-mt-24 px-4 pb-16 pt-28 sm:px-6 md:pt-36 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="max-w-5xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[#d7e2ea]/45">Contact</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-[#d7e2ea] md:text-5xl">
            Let&apos;s build something deliberate.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#d7e2ea]/62 md:text-lg">
            If you have a project, internship, collaboration, or just want to connect, send a note. I am especially
            interested in work that values thoughtful execution and growth.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeIn>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#d7e2ea]/42">Reach me directly</p>
            <a
              href={socialLinks.email}
              className="mt-5 block break-words font-sans text-xl font-medium leading-snug tracking-normal text-[#d7e2ea] transition hover:text-white md:text-2xl"
            >
              {socialLinks.emailAddress}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              {contactButtons.map((button) => (
                <a key={button.label} href={button.href} target={button.href.startsWith('http') ? '_blank' : undefined} rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="btn-ghost">
                  <button.icon className="h-4 w-4" />
                  {button.label}
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d7e2ea]/45">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Your name"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d7e2ea]/45">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="name@example.com"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d7e2ea]/45">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Tell me about the work"
                  className={`${field} resize-none`}
                />
              </div>

              {/* Honeypot. Hidden from sight, screen readers, and the tab order. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company-website">Leave this field empty</label>
                <input
                  id="company-website"
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(event) => setTrap(event.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <Magnet padding={80} strength={5}>
                  <button type="submit" className="contact-pill group" disabled={submitting} aria-busy={submitting}>
                    {buttonLabel}
                    <motion.span
                      animate={submitting && !reduce ? { x: 14, opacity: 0 } : { x: 0, opacity: 1 }}
                      transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                      className="inline-flex"
                    >
                      <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </motion.span>
                  </button>
                </Magnet>

                <p aria-live="polite" className="max-w-sm text-sm leading-relaxed">
                  {status === 'sent' ? (
                    <span className="text-[#d7e2ea]">Thank you — your message reached my inbox. I will reply soon.</span>
                  ) : null}
                  {status === 'mailto' ? (
                    <span className="text-[#d7e2ea]/62">
                      Your mail client should be open. If nothing happened, email me at{' '}
                      <a className="underline underline-offset-4 hover:text-[#d7e2ea]" href={socialLinks.email}>
                        {socialLinks.emailAddress}
                      </a>
                      .
                    </span>
                  ) : null}
                  {status === 'error' ? (
                    <span className="text-[#d7e2ea]/62">
                      That did not send. Please try again, or email me at{' '}
                      <a className="underline underline-offset-4 hover:text-[#d7e2ea]" href={socialLinks.email}>
                        {socialLinks.emailAddress}
                      </a>
                      .
                    </span>
                  ) : null}
                </p>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
