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
content/                        # ALL site copy, links and image paths (JSON)
│   README.md                   # how to edit it — written for non-developers
│   brand.json  navigation.json  shared.json  seo.json
│   home.json  sections.json  stats.json  process.json
│   services.json  products.json  case-studies.json  testimonials.json
│   pricing.json  faq.json  about.json  contact.json  booking.json
│   legal.json  not-found.json
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, nav/footer, global FX
│   ├── page.tsx                # home — composes every section
│   ├── about/ services/ products/ pricing/ contact/ book/
│   ├── case-studies/           # index + [slug] detail (statically generated)
│   ├── legal/privacy/ terms/
│   ├── sitemap.ts  robots.ts  not-found.tsx
│   └── globals.css             # design tokens, utilities, keyframes
├── content/
│   ├── index.ts                # loads /content, exports the `content` tree
│   └── resolve.ts              # {{token}} resolution + comment stripping
├── components/
│   ├── layout/                 # Navbar, Footer, Logo, PageHero, LegalBody
│   ├── sections/               # one file per page section
│   ├── ui/                     # Button, Reveal, SpotlightCard, Counter, …
│   └── fx/                     # ParticleField canvas, grain, cursor glow
└── lib/
    ├── mailto.ts               # static-site form handoff
    ├── hooks.ts                # useIsClient, useMediaQuery (SSR-safe)
    └── utils.ts                # cn()
```

## Editing content

**No user-facing string belongs in a component.** Every word, link, price and
image path lives in `/content` as JSON, and `content/README.md` is the guide to
it — written so a non-technical person can edit the site without opening any
code.

Components read it through one import:

```tsx
import { content } from "@/content";

const { section, items } = content.services;
```

Two mechanisms make that work, both in `src/content/resolve.ts`:

- **`{{dotted.path}}` tokens.** Any string may reference any other value in the
  tree — `{{brand.email}}`, `{{products.items.0.name}}`,
  `{{navigation.paths.book}}`. They resolve recursively at build time, which is
  what keeps a name, address or product title stated exactly once. A bad token
  fails the build with a message naming the file, the field and the likely fix,
  rather than rendering `{{brnad.name}}` to a visitor.
- **`_`-prefixed keys are comments.** JSON has none, so editors leave notes in
  `_note` keys. They are stripped from both the value and its type, so a note
  can never reach the DOM or a prop spread.

Types are inferred from the JSON itself — there is no parallel set of
interfaces to keep in sync. Adding a field to a content file makes it available
(and type-checked) immediately; renaming one that a component reads is a
compile error.

Two conventions worth keeping:

- Section headings are `{ eyebrow, title, titleMuted, description }` and get
  spread straight into `<SectionHeading {...heading} />`; page heroes are
  `{ eyebrow, title, description, breadcrumb }` and spread into `<PageHero />`.
- Icons are named by string and resolved through `src/components/ui/Icon.tsx`.
  That map is the allow-list for what `/content` may ask for — add an import
  there, then list it in `content/README.md`.

Note that importing the whole tree defeats tree-shaking: every page ships all
of `/content` (~15 KB gzipped). That is the deliberate trade for
edit-in-one-place, and it is a marketing site.

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

The site is a static export (`output: "export"`) served from GitHub Pages, so
there is no server to post to. Both the contact form and the booking wizard
hand off to the visitor's own mail client through `src/lib/mailto.ts` —
prefilled, addressed to `brand.email`. Every label, placeholder, validation
message and success line comes from `content/contact.json` and
`content/booking.json`, including the field names used inside the drafted
email.

Wiring a real endpoint later means replacing `openMailDraft` at its two call
sites; the copy stays where it is.

## Before going live

- [ ] Replace testimonials, case studies, and client names — all currently
      **fictional placeholders**
- [ ] Point `url`, `email`, `phone`, and the social links in
      `content/brand.json` at the real ones
- [ ] Wire a real form endpoint (see [Forms](#forms)) if mailto isn't enough
- [ ] Have a solicitor review `/legal/privacy` and `/legal/terms` (template
      copy — then set `disclaimer.show` to `false` in `content/legal.json`)
- [ ] Add a real favicon
- [ ] Swap the abstract product visuals for real screenshots if available
