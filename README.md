# Wrath Labs — Website

Marketing site for Wrath Labs, a product studio and engineering lab. Dark,
high-contrast, motion-heavy. Built with Next.js 16 (App Router), React 19,
Tailwind CSS v4, and Motion.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

## Structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, nav/footer, global FX
│   ├── page.tsx                # home — composes every section
│   ├── about/ services/ products/ pricing/ contact/ book/
│   ├── case-studies/           # index + [slug] detail (statically generated)
│   ├── legal/privacy/ terms/
│   ├── api/contact/route.ts    # form + booking endpoint
│   ├── sitemap.ts  robots.ts  not-found.tsx
│   └── globals.css             # design tokens, utilities, keyframes
├── components/
│   ├── layout/                 # Navbar, Footer, Logo, PageHero, LegalBody
│   ├── sections/               # one file per page section
│   ├── ui/                     # Button, Reveal, SpotlightCard, Counter, …
│   └── fx/                     # ParticleField canvas, grain, cursor glow
└── lib/
    ├── data.ts                 # ALL site content lives here
    ├── hooks.ts                # useIsClient, useMediaQuery (SSR-safe)
    └── utils.ts                # cn()
```

## Editing content

Nearly all copy — services, products, case studies, testimonials, pricing
tiers, FAQs, socials, stats, timeline — lives in **`src/lib/data.ts`**. Change
it there and every page that uses it updates. Pages themselves are mostly
composition.

Icons referenced by string in `data.ts` (e.g. `"BrainCircuit"`) are resolved
through the map in `src/components/ui/Icon.tsx` — add new names there.

## Design system

Tokens are defined with Tailwind v4's `@theme` in `src/app/globals.css`:

| Token family | Use |
|---|---|
| `void`, `ink-900…500` | surfaces, from pure black upward |
| `ember-*` | primary signal (crimson) |
| `flare-*` | secondary warm (orange) |
| `volt-*` | cool data accent (cyan) |

Custom utilities: `shell` (page container), `glass`, `hairline`, `bg-grid`,
`bg-dots`, `text-gradient`, `text-gradient-ember`, `glow-ember`.

Fonts: Space Grotesk (display), Geist (body), Geist Mono (labels/data).

## Motion

- `Reveal`, `RevealGroup`/`RevealChild`, `TextReveal` in `ui/Reveal.tsx` handle
  scroll and entrance animation.
- `SpotlightCard` tracks the cursor via CSS custom properties, off the React
  render path.
- `ParticleField` is a canvas node lattice — density scales to viewport, pauses
  when scrolled out of view via `IntersectionObserver`.
- Everything degrades under `prefers-reduced-motion`, both in CSS and through
  Motion's `useReducedMotion`.

## Forms

`POST /api/contact` handles both the contact form (`kind: "enquiry"`) and the
booking wizard (`kind: "booking"`). It validates and rate-limits, then **logs
to the console** — there's no mail transport wired up yet. To deliver mail, add
a provider at the marked spot in `src/app/api/contact/route.ts`:

```ts
await resend.emails.send({ from, to, subject, text });
```

The in-memory rate limiter should move to a durable store (Redis/Upstash)
before this sees real traffic — it resets on every deploy and doesn't work
across instances.

## Before going live

- [ ] Replace testimonials, case studies, and client names — all currently
      **fictional placeholders**
- [ ] Point `site.url`, `email`, `phone`, and social handles in `data.ts` at
      the real ones
- [ ] Wire an email provider into `/api/contact`
- [ ] Have a solicitor review `/legal/privacy` and `/legal/terms` (template copy)
- [ ] Add an OG image (`src/app/opengraph-image.tsx`) and a real favicon
- [ ] Swap the abstract product visuals for real screenshots if available
