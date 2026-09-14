# Jatin Agarwal — Portfolio

A single-page software developer portfolio built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

All page content lives in one data module (`src/data/site.ts`), so most updates are content edits rather than component changes.

---

## Local setup

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

The dev server runs on <http://127.0.0.1:5173>.

> **Windows / PowerShell note:** if `npm` is blocked by the execution policy
> (`running scripts is disabled on this system`), use the `.cmd` launchers
> instead — `npm.cmd run dev`, `npx.cmd tsc --noEmit`.

### Exposing the dev server on your network

The dev server binds to `127.0.0.1` by default. To reach it from another device
on the LAN or through a tunnel, create a `.env.local` file:

```dotenv
VITE_EXPOSE_DEV_SERVER=true
```

That switches the host to `0.0.0.0` and relaxes `allowedHosts`. Leave it unset
for normal local development.

### Contact form delivery

The contact form posts submissions straight to your email inbox. Set **one** of
these in `.env.local` for local development, and in your host's environment
variables for production:

```dotenv
# Web3Forms — free, no account. Enter your email at https://web3forms.com and
# they send you an access key. The key is designed to be public.
VITE_WEB3FORMS_KEY=your-access-key

# …or Formspree — free tier covers 50 submissions/month. Create a form at
# https://formspree.io and copy the id out of formspree.io/f/<id>.
VITE_FORMSPREE_ID=your-form-id
```

If **neither** is set, the form falls back to opening a prepared email in the
visitor's mail client, and the copy under the form changes to say so. That means
the site is never broken by a missing key — it just degrades.

Notes:

- These are build-time values. Vite inlines `VITE_*` vars into the bundle, so
  after changing one you must restart `npm run dev` or redeploy.
- On Vercel, add the variable under Project → Settings → Environment Variables,
  then redeploy. Adding it without a redeploy will not take effect.
- A hidden honeypot field is included; submissions that fill it are dropped
  client-side without a request.
- Test it once after deploying, and check the spam folder on the first message.

## Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR. |
| `npm run build` | Produce the production bundle in `dist/`. |
| `npm run preview` | Serve the built `dist/` locally. |
| `npm run typecheck` | Strict TypeScript check (`tsc --noEmit`). Vite does **not** do this during build. |
| `npm run check` | `typecheck` followed by `build`. **Run this before deploying.** |

`npm run check` is the deploy gate. `npm run build` alone will happily ship a
file that does not typecheck.

## Editing content

Nearly all copy, links, and lists are exported from **`src/data/site.ts`**:

| Export | Drives |
| --- | --- |
| `socialLinks` | Email, GitHub, LinkedIn, LeetCode destinations. |
| `navLinks` / `mobileNavLinks` | Desktop nav and the mobile menu. `href` must match a section `id`. |
| `heroStats` | The three counters under the hero copy. |
| `skills` | The Tech Stack grid. |
| `projects` | Case study cards and their detail drawers. |
| `repositoryProjects` | The GitHub Activity repository list. |
| `githubFacts` | The GitHub profile summary panel. |
| `processSteps`, `principles` | The Process and About sections. |
| `outcomes` | The animated result counters. |
| `services` | The Services grid. |
| `certifications` | Certificate cards and their PDF links. |
| `experience`, `teamsAndTools` | The Experience timeline. |
| `testimonials` | The Testimonials section. |

Adding a section means: create it in `src/sections/`, mount it in
`src/App.tsx`, give the `<section>` an `id`, and add a matching entry to
`navLinks` / `mobileNavLinks`. The navbar's active-section indicator picks it up
automatically from those hrefs.

### Pre-deploy content checklist

Fields that go stale are marked with `REVIEW BEFORE DEPLOY` comments in
`src/data/site.ts`. Before shipping, confirm:

- [ ] Certification dates, and that `heroStats` still matches the number of `certifications`.
- [ ] Whether any `experience` entry is still open-ended ("to Present") after it has ended.
- [ ] The inspected-repo count in `githubFacts` (it is a manual snapshot, not a live API read).
- [ ] Every repository link in `repositoryProjects` still resolves and is public.
- [ ] The academic stage on the current `education` entry.

## Assets

| Asset | Where it lives | How it is served |
| --- | --- | --- |
| Certificate PDFs | `certificate/` | Imported as modules in `src/data/site.ts`, so Vite fingerprints them into `dist/assets`. If the collection grows much larger, move them to `public/certificate/` and reference them by public path instead. |
| Profile photo | `profile.jpg` (source), `src/assets/profile-675.jpg` + `profile-430.jpg` (served) | The hero uses the two derivatives through a `srcset`. The 482 KB source is kept only as the master — do not reference it directly. |
| Social preview | `public/og-image.jpg` | 1200×630 card referenced by the absolute `og:image` / `twitter:image` URLs in `index.html`. |
| Favicon | `public/favicon.svg` | Linked from `index.html`. |

Regenerating the profile derivatives or the OG card currently requires an image
tool; WebP/AVIF variants are a worthwhile follow-up if one is available.

## Accessibility and motion

- Framer Motion animations check `useReducedMotion`, and `src/index.css` carries
  a `prefers-reduced-motion` fallback. `WorkMarquee` switches to static,
  manually scrollable rows rather than scroll-driven movement.
- Overlays (mobile menu, project drawer) share `useBodyScrollLock`, which is
  reference-counted so overlapping overlays cannot unlock the page early.
- Both overlays use `useFocusTrap`: focus moves in on open, Tab cycles inside,
  and focus returns to the trigger on close.

## Deployment

The app is a static Vite build with no backend.

```bash
npm run check   # typecheck + build
npm run preview # sanity-check dist/ locally
```

Deploy the `dist/` directory. On Vercel the defaults work as-is (build command
`npm run build`, output directory `dist`); prefer `npm run check` as the build
command so a type error fails the deploy instead of shipping.

If the domain changes, update the absolute URLs in `index.html` (`og:url`,
`og:image`, `twitter:image`, `canonical`).

The contact form delivers to your inbox once `VITE_WEB3FORMS_KEY` or
`VITE_FORMSPREE_ID` is set in the host environment — see "Contact form delivery"
above. Remember to redeploy after adding it; without the variable the form falls
back to a `mailto:` hand-off and says so in the UI.
