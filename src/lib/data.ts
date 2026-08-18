/**
 * Single source of truth for site content.
 * Pure data (no JSX) so both server and client components can import it.
 * `icon` values map to lucide icon names in `components/ui/Icon.tsx`.
 */

export const site = {
  name: "Wrath Labs",
  tagline: "We build the products. We build yours too.",
  description:
    "Wrath Labs is a product studio and engineering lab. We ship our own software products and partner with teams to design, build, and scale theirs.",
  url: "https://wrathlabs.in",
  email: "hello@wrathlabs.in",
  phone: "+44 20 7946 0812",
  address: "Remote-first · London · Bengaluru",
  founded: 2019,
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Work", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Meeting", href: "/book" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Product Engineering", href: "/services#product-engineering" },
      { label: "AI Engineering", href: "/services#ai-engineering" },
      { label: "Cloud & DevOps", href: "/services#cloud-devops" },
      { label: "Design Systems", href: "/services#design-systems" },
    ],
  },
  {
    title: "Lab",
    links: [
      { label: "Sentinel", href: "/products#sentinel" },
      { label: "Forge", href: "/products#forge" },
      { label: "Nexus", href: "/products#nexus" },
      { label: "Prism", href: "/products#prism" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/products" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Socials                                                             */
/* ------------------------------------------------------------------ */

export type Social = {
  label: string;
  handle: string;
  href: string;
  brand: "x" | "github" | "linkedin" | "discord" | "youtube" | "instagram";
};

export const socials: Social[] = [
  {
    label: "X",
    handle: "@wrathlabs",
    href: "https://x.com/wrathlabs",
    brand: "x",
  },
  {
    label: "GitHub",
    handle: "/wrathlabs",
    href: "https://github.com/wrathlabs",
    brand: "github",
  },
  {
    label: "LinkedIn",
    handle: "/company/wrathlabs",
    href: "https://linkedin.com/company/wrathlabs",
    brand: "linkedin",
  },
  {
    label: "Discord",
    handle: "wrathlabs",
    href: "https://discord.gg/wrathlabs",
    brand: "discord",
  },
  {
    label: "YouTube",
    handle: "@wrathlabs",
    href: "https://youtube.com/@wrathlabs",
    brand: "youtube",
  },
  {
    label: "Instagram",
    handle: "@wrathlabs",
    href: "https://instagram.com/wrathlabs",
    brand: "instagram",
  },
];

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: 74, suffix: "+", label: "Products shipped" },
  { value: 5, suffix: "", label: "In-house lab products" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 19, suffix: "", label: "Countries served" },
] as const;

/* ------------------------------------------------------------------ */
/* Services (the agency side)                                          */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  deliverables: string[];
  stack: string[];
};

export const services: Service[] = [
  {
    id: "product-engineering",
    title: "Product Engineering",
    blurb:
      "Zero-to-one builds and rescue missions. We own the whole surface — architecture, API, interface, release — and hand you a codebase your team will actually enjoy inheriting.",
    icon: "Boxes",
    deliverables: [
      "Web & mobile applications",
      "API and backend architecture",
      "Legacy migration & rescue",
      "Test and CI foundations",
    ],
    stack: ["Next.js", "React Native", "TypeScript", "Go", "PostgreSQL"],
  },
  {
    id: "ai-engineering",
    title: "AI Engineering",
    blurb:
      "Applied AI that survives production. Retrieval pipelines, agentic workflows, evals, guardrails — built with the same rigour we give payment systems.",
    icon: "BrainCircuit",
    deliverables: [
      "RAG & knowledge systems",
      "Multi-agent workflows",
      "Eval harnesses & observability",
      "Fine-tuning & model routing",
    ],
    stack: ["Claude", "LangGraph", "pgvector", "Python", "Modal"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    blurb:
      "Infrastructure as a product. Reproducible environments, sane pipelines, and observability that tells you what broke before your users do.",
    icon: "Cloud",
    deliverables: [
      "Terraform & IaC",
      "Kubernetes platforms",
      "CI/CD & release automation",
      "Cost & performance tuning",
    ],
    stack: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Grafana"],
  },
  {
    id: "design-systems",
    title: "Design & Systems",
    blurb:
      "Interfaces with intent. We design in code, ship tokenised component libraries, and leave you a system instead of a pile of screens.",
    icon: "Palette",
    deliverables: [
      "Product & UX design",
      "Design tokens & theming",
      "Component libraries",
      "Brand & motion language",
    ],
    stack: ["Figma", "Tailwind", "Radix", "Motion", "Storybook"],
  },
  {
    id: "data-platforms",
    title: "Data Platforms",
    blurb:
      "From event to insight. Warehouses, streams, and contracts that keep analytics trustworthy as your product multiplies.",
    icon: "Database",
    deliverables: [
      "Event pipelines & CDC",
      "Warehouse modelling",
      "Streaming architecture",
      "BI & self-serve analytics",
    ],
    stack: ["Kafka", "dbt", "ClickHouse", "Snowflake", "Airflow"],
  },
  {
    id: "security-engineering",
    title: "Security Engineering",
    blurb:
      "Threat modelling, hardening, and audit prep. We break it on purpose so nobody else gets the chance, then leave the controls documented.",
    icon: "ShieldCheck",
    deliverables: [
      "Threat models & reviews",
      "Pen-test remediation",
      "SOC 2 / ISO readiness",
      "Secrets & access hygiene",
    ],
    stack: ["OWASP", "Vault", "Snyk", "Cloudflare", "Auth0"],
  },
];

/* ------------------------------------------------------------------ */
/* Products (the lab side)                                             */
/* ------------------------------------------------------------------ */

export type ProductStatus = "Live" | "Beta" | "Alpha" | "Research";

export type Product = {
  id: string;
  name: string;
  category: string;
  status: ProductStatus;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  metric: { value: string; label: string };
  href: string;
};

export const products: Product[] = [
  {
    id: "sentinel",
    name: "Sentinel",
    category: "Observability",
    status: "Live",
    tagline: "Anomaly detection that reads your system like an engineer.",
    description:
      "Sentinel ingests traces, logs, and metrics, then surfaces the three things that actually matter right now — with a plain-language explanation of why.",
    icon: "Radar",
    features: [
      "Correlated root-cause timelines",
      "Noise-cancelling alert routing",
      "Natural-language incident recaps",
      "OpenTelemetry native",
    ],
    metric: { value: "91%", label: "less alert noise" },
    href: "/products#sentinel",
  },
  {
    id: "forge",
    name: "Forge",
    category: "Developer Tools",
    status: "Beta",
    tagline: "Internal tools in an afternoon, not a quarter.",
    description:
      "Describe the workflow, connect a datasource, and Forge generates a typed, permissioned internal app you can extend with real code.",
    icon: "Hammer",
    features: [
      "Schema-aware app generation",
      "Row-level permissions",
      "Escape hatch to TypeScript",
      "Self-host or cloud",
    ],
    metric: { value: "40×", label: "faster to first tool" },
    href: "/products#forge",
  },
  {
    id: "nexus",
    name: "Nexus",
    category: "AI Infrastructure",
    status: "Beta",
    tagline: "A runtime for agents that need to be trusted.",
    description:
      "Durable execution, replayable state, and hard budget ceilings for multi-agent systems. Every decision an agent makes is inspectable after the fact.",
    icon: "Network",
    features: [
      "Durable, resumable runs",
      "Per-run cost & token ceilings",
      "Full decision replay",
      "Model-agnostic routing",
    ],
    metric: { value: "6.1M", label: "agent runs / month" },
    href: "/products#nexus",
  },
  {
    id: "prism",
    name: "Prism",
    category: "Analytics",
    status: "Live",
    tagline: "Product analytics that never phones home with PII.",
    description:
      "Cookieless, in-region event analytics with funnels and retention built in. Ships with a warehouse sync so your data stays yours.",
    icon: "ChartNoAxesCombined",
    features: [
      "Cookieless by design",
      "EU / US / IN data residency",
      "Funnels, cohorts, retention",
      "One-click warehouse sync",
    ],
    metric: { value: "<8kb", label: "client bundle" },
    href: "/products#prism",
  },
  {
    id: "cipher",
    name: "Cipher",
    category: "Security",
    status: "Alpha",
    tagline: "Continuous posture checks for teams without a security hire.",
    description:
      "Cipher watches your cloud, repos, and dependencies for drift against a policy baseline, then opens the pull request that fixes it.",
    icon: "LockKeyhole",
    features: [
      "Cloud & repo drift detection",
      "Auto-remediation PRs",
      "Evidence export for audits",
      "Policy as code",
    ],
    metric: { value: "24h", label: "to audit-ready" },
    href: "/products#cipher",
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const process = [
  {
    step: "01",
    title: "Signal",
    blurb:
      "A 45-minute call and a short written brief. We pressure-test the problem before anyone talks solutions.",
    duration: "Week 0",
  },
  {
    step: "02",
    title: "Blueprint",
    blurb:
      "Architecture, scope, and a clickable prototype. You get a fixed plan with named risks — not a vague statement of work.",
    duration: "Week 1–2",
  },
  {
    step: "03",
    title: "Forge",
    blurb:
      "Two-week sprints, demo every Friday, main always deployable. You watch it get built in your own repo.",
    duration: "Week 3+",
  },
  {
    step: "04",
    title: "Launch",
    blurb:
      "Load tested, instrumented, documented. We ship behind flags and stay on call through the ramp.",
    duration: "Launch",
  },
  {
    step: "05",
    title: "Compound",
    blurb:
      "Post-launch retainer or a clean handover with recorded walkthroughs. Your team owns it either way.",
    duration: "Ongoing",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  year: string;
  duration: string;
  services: string[];
  results: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  outcome: string;
  quote: { text: string; author: string; role: string };
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-payments",
    client: "Northwind Pay",
    industry: "Fintech",
    title: "Rebuilding a payments core without a minute of downtime",
    summary:
      "A ledger buckling at 400 TPS became an event-sourced core clearing 4.2M transactions a day — migrated live, in stages, with zero customer-visible downtime.",
    year: "2025",
    duration: "7 months",
    services: ["Product Engineering", "Cloud & DevOps", "Security Engineering"],
    results: [
      { value: "4.2M", label: "daily transactions" },
      { value: "-68%", label: "p99 latency" },
      { value: "0", label: "minutes downtime" },
      { value: "-41%", label: "infra spend" },
    ],
    challenge:
      "Northwind's monolithic ledger was written for a product a tenth of its current size. Settlement jobs overlapped, reconciliation ran for six hours nightly, and a single slow query could stall the payment path. Regulatory audits were consuming an engineer full-time.",
    approach: [
      "Modelled the domain as an append-only event log with derived read projections, so reconciliation became a replay rather than a nightly batch.",
      "Stood up the new core beside the old one and mirrored live traffic for six weeks, comparing every computed balance before trusting a single write.",
      "Cut over per-corridor behind feature flags, starting with the lowest-volume region and keeping a one-command rollback at every stage.",
      "Instrumented the payment path end to end and wired audit evidence export directly into the ledger.",
    ],
    outcome:
      "The new core clears 4.2M transactions daily with p99 latency down 68%. Reconciliation finishes in under nine minutes, and audit evidence that used to take an engineer a week now exports in a click.",
    quote: {
      text: "They mirrored our entire ledger for six weeks before touching production. That single decision is why our cutover was a non-event.",
      author: "Priya Raghavan",
      role: "VP Engineering, Northwind Pay",
    },
    accent: "from-ember-500 to-flare-500",
  },
  {
    slug: "meridian-health-triage",
    client: "Meridian Health",
    industry: "Healthcare",
    title: "An AI triage assistant clinicians actually trust",
    summary:
      "A retrieval system grounded strictly in a hospital group's own protocols, cutting intake documentation time by 74% while keeping every answer citable.",
    year: "2025",
    duration: "5 months",
    services: ["AI Engineering", "Design & Systems", "Security Engineering"],
    results: [
      { value: "-74%", label: "intake doc time" },
      { value: "340h", label: "clinician hours / month" },
      { value: "100%", label: "answers cited" },
      { value: "0", label: "PHI leaving region" },
    ],
    challenge:
      "Intake nurses across 14 clinics were spending more time transcribing than talking to patients. An earlier off-the-shelf chatbot had been switched off within a month — it hallucinated protocol steps, and clinicians had no way to check where an answer came from.",
    approach: [
      "Built retrieval over the group's own protocol library only, with a hard refusal path when confidence or coverage was insufficient.",
      "Made citation non-optional: every sentence renders with its source paragraph one tap away, and unsourced generations are dropped before display.",
      "Ran a 900-case eval suite with clinical reviewers scoring each release, gating deploys on it rather than on vibes.",
      "Kept inference and storage entirely in-region with structured audit logging for every retrieval.",
    ],
    outcome:
      "Documentation time per intake fell 74%, freeing roughly 340 clinician hours a month. Adoption crossed 90% of intake staff in the first quarter — the earlier tool never passed 20%.",
    quote: {
      text: "The refusal behaviour is what won our clinicians over. It says 'I don't have that protocol' instead of inventing one, and that built trust faster than any accuracy number.",
      author: "Dr. Alan Whitfield",
      role: "Chief Medical Information Officer, Meridian Health",
    },
    accent: "from-volt-500 to-volt-400",
  },
  {
    slug: "atlas-freight",
    client: "Atlas Freight",
    industry: "Logistics",
    title: "Realtime visibility across 12,000 vehicles",
    summary:
      "Replacing a five-minute polling loop with a streaming platform that puts every vehicle on the map in under two seconds.",
    year: "2024",
    duration: "6 months",
    services: ["Data Platforms", "Product Engineering", "Cloud & DevOps"],
    results: [
      { value: "1.8s", label: "position freshness" },
      { value: "12k", label: "vehicles tracked" },
      { value: "+22%", label: "on-time delivery" },
      { value: "3.4B", label: "events / month" },
    ],
    challenge:
      "Dispatchers were making decisions on positions up to five minutes stale, and the polling architecture fell over during peak season. Customer service had no answer to \"where is my shipment\" beyond a guess.",
    approach: [
      "Moved telemetry onto a partitioned event stream with per-vehicle ordering guarantees, sized for peak-season volume from day one.",
      "Built a geospatial projection layer serving sub-second map queries, decoupled from ingest so a traffic spike can't stall the UI.",
      "Shipped a dispatcher console designed alongside the people using it, with exception-first triage instead of an undifferentiated map of dots.",
      "Exposed a customer-facing tracking API with predictive ETAs derived from historical corridor performance.",
    ],
    outcome:
      "Position freshness went from five minutes to 1.8 seconds across 12,000 vehicles. On-time delivery rose 22% within two quarters, and \"where is my shipment\" tickets dropped by more than half.",
    quote: {
      text: "Peak season used to be the week our platform fell apart. Last December we handled record volume and nobody paged anyone.",
      author: "Marcus Delaney",
      role: "CTO, Atlas Freight",
    },
    accent: "from-flare-500 to-ember-500",
  },
  {
    slug: "verity-commerce",
    client: "Verity",
    industry: "E-commerce",
    title: "A headless replatform that paid for itself in 90 days",
    summary:
      "Ripping out a nine-year-old monolithic storefront for an edge-rendered stack — 0.4s LCP, 37% more conversions, and a merch team that ships without engineers.",
    year: "2024",
    duration: "4 months",
    services: ["Product Engineering", "Design & Systems", "Data Platforms"],
    results: [
      { value: "0.4s", label: "largest contentful paint" },
      { value: "+37%", label: "conversion rate" },
      { value: "+61%", label: "mobile revenue" },
      { value: "90d", label: "to full payback" },
    ],
    challenge:
      "Verity's storefront took 4.6 seconds to render on mobile, and every merchandising change required an engineering ticket and a deploy. Mobile was 70% of traffic and a third of revenue.",
    approach: [
      "Rebuilt the storefront as an edge-rendered application with streaming product pages and aggressive cache invalidation keyed to inventory events.",
      "Handed merchandising a visual composition layer over a design-token system, so campaigns ship without touching code.",
      "Rewrote the checkout flow around a single-screen pattern validated in testing before launch.",
      "Wired first-party analytics into the warehouse so merch decisions run on same-day data.",
    ],
    outcome:
      "LCP dropped from 4.6s to 0.4s. Conversion rose 37% overall and mobile revenue 61%. The merchandising team now ships an average of 40 campaign changes a month with no engineering involvement.",
    quote: {
      text: "We budgeted a year for payback and hit it in about three months. The bigger win is that my team stopped queuing behind engineering.",
      author: "Sofia Marchetti",
      role: "Head of Digital, Verity",
    },
    accent: "from-ember-400 to-volt-500",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We'd been burned by two agencies before Wrath Labs. The difference was obvious in week one — they pushed back on half our requirements and were right about most of it.",
    author: "Priya Raghavan",
    role: "VP Engineering",
    company: "Northwind Pay",
    initials: "PR",
  },
  {
    quote:
      "They shipped a working slice in eleven days. Our previous vendor spent eleven weeks on documents that described a slice.",
    author: "Marcus Delaney",
    role: "CTO",
    company: "Atlas Freight",
    initials: "MD",
  },
  {
    quote:
      "The handover was the most professional I've seen in fifteen years. Recorded walkthroughs, architecture decision records, an on-call runbook. My team was productive the same week.",
    author: "Elena Kovač",
    role: "Director of Platform",
    company: "Halberd Systems",
    initials: "EK",
  },
  {
    quote:
      "What sold us was that they build their own products. They argue about our tradeoffs like people who'll have to live with them.",
    author: "Dr. Alan Whitfield",
    role: "CMIO",
    company: "Meridian Health",
    initials: "AW",
  },
  {
    quote:
      "We hit our payback target in a quarter instead of a year. I've stopped describing them as a vendor — they're just part of how we build.",
    author: "Sofia Marchetti",
    role: "Head of Digital",
    company: "Verity",
    initials: "SM",
  },
  {
    quote:
      "Our AI prototype had been stuck at 'impressive demo' for eight months. They got it into production in ten weeks with evals we actually trust.",
    author: "Tobias Lund",
    role: "Founder",
    company: "Cadence AI",
    initials: "TL",
  },
];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export type PricingTier = {
  name: string;
  price: string;
  unit: string;
  blurb: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const agencyPricing: PricingTier[] = [
  {
    name: "Sprint",
    price: "$12k",
    unit: "/ 2-week sprint",
    blurb:
      "A fixed, scoped burst of senior work. Ideal for prototypes, audits, and unblocking a stalled build.",
    features: [
      "1 senior engineer + 0.5 designer",
      "Fixed scope, fixed price",
      "Friday demo & written recap",
      "Your repo, your infra",
      "Async Slack channel",
    ],
    cta: { label: "Book a scoping call", href: "/book" },
  },
  {
    name: "Retainer",
    price: "$24k",
    unit: "/ month",
    blurb:
      "A standing squad that treats your roadmap as theirs. Our most common engagement, minimum three months.",
    features: [
      "2–3 engineers + designer",
      "Dedicated product lead",
      "Two-week sprint cadence",
      "Architecture & code ownership",
      "Priority Slack + weekly call",
      "Pause or resize with 30 days' notice",
    ],
    cta: { label: "Start a conversation", href: "/book" },
    featured: true,
  },
  {
    name: "Embedded",
    price: "Custom",
    unit: "/ quarterly",
    blurb:
      "We operate as your product org — hiring alongside you, owning delivery, and handing over as your team grows.",
    features: [
      "Cross-functional pod, 4–8 people",
      "Fractional CTO available",
      "24/7 on-call rotation",
      "SOC 2 & compliance support",
      "Hiring & onboarding support",
      "Quarterly roadmap planning",
    ],
    cta: { label: "Talk to a founder", href: "/contact" },
  },
];

export const productPricing: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    unit: "/ month",
    blurb: "For side projects and evaluation. No card, no expiry.",
    features: [
      "1 project",
      "50k events / month",
      "7-day retention",
      "Community support",
    ],
    cta: { label: "Get started", href: "/contact" },
  },
  {
    name: "Pro",
    price: "$59",
    unit: "/ month",
    blurb: "For teams running something real in production.",
    features: [
      "5 projects",
      "2M events / month",
      "90-day retention",
      "Alerting & integrations",
      "Email support, 1 business day",
    ],
    cta: { label: "Start free trial", href: "/contact" },
    featured: true,
  },
  {
    name: "Scale",
    price: "$249",
    unit: "/ month",
    blurb: "For products where downtime has a dollar figure.",
    features: [
      "Unlimited projects",
      "25M events / month",
      "13-month retention",
      "SSO & audit logs",
      "Warehouse sync",
      "Shared Slack channel",
    ],
    cta: { label: "Start free trial", href: "/contact" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "/ annual",
    blurb: "Self-hosted or in your own cloud, with terms to match.",
    features: [
      "Self-host or private cloud",
      "Unlimited volume",
      "Custom data residency",
      "99.99% uptime SLA",
      "Named solutions engineer",
    ],
    cta: { label: "Contact sales", href: "/contact" },
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "Are you an agency or a product company?",
    a: "Both, deliberately. Roughly 60% of the team works on client engagements and 40% on our own products. The lab work is why our client work is good — we hit the same problems in production and bring the answers with us.",
  },
  {
    q: "How quickly can you start?",
    a: "Scoping calls usually happen within 48 hours. A Sprint can typically start within two weeks; a full Retainer squad takes three to four weeks to assemble. If you're on fire, tell us — we hold a small amount of capacity for exactly that.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do, entirely, from the first commit. We work in your repository under your license. Anything we build for you is yours; anything we bring in is either open source or licensed to you perpetually at no cost.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes, and often at a discount for pre-seed teams solving something we find genuinely interesting. We occasionally take part of the fee in equity, but only when we'd have wanted to invest anyway.",
  },
  {
    q: "What happens when the engagement ends?",
    a: "You get recorded architecture walkthroughs, decision records, an on-call runbook, and two weeks of overlap with your team at no charge. We plan the handover from the first sprint, not the last.",
  },
  {
    q: "Can we hire your engineers directly?",
    a: "If someone on the team wants to join you full time, we won't stand in the way — no poaching fee, no drama. It's happened four times and we still work with all four companies.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export const techStack = [
  "TypeScript",
  "Next.js",
  "React",
  "Go",
  "Rust",
  "Python",
  "PostgreSQL",
  "ClickHouse",
  "Kubernetes",
  "Terraform",
  "AWS",
  "Cloudflare",
  "Kafka",
  "Redis",
  "GraphQL",
  "Claude",
  "PyTorch",
  "dbt",
  "Grafana",
  "Playwright",
] as const;

export const values = [
  {
    title: "Senior only",
    blurb:
      "No junior bench, no bait-and-switch. The people on your scoping call are the people writing the code.",
    icon: "Award",
  },
  {
    title: "Written by default",
    blurb:
      "Decisions live in documents, not in someone's memory. You can audit why anything is the way it is.",
    icon: "FileText",
  },
  {
    title: "Ship weekly",
    blurb:
      "Something demoable every Friday from week one. Progress you can click beats progress you're told about.",
    icon: "Rocket",
  },
  {
    title: "Own the outcome",
    blurb:
      "We measure ourselves on what your product does in production, not on hours logged against a spec.",
    icon: "Target",
  },
] as const;

export const timeline = [
  {
    year: "2019",
    title: "Two engineers, one contract",
    blurb:
      "Founded in London after a decade of building payments and infrastructure inside other people's companies.",
  },
  {
    year: "2021",
    title: "The lab opens",
    blurb:
      "Carved out 40% of engineering time for our own products. Sentinel started as an internal tool we refused to stop using.",
  },
  {
    year: "2023",
    title: "Bengaluru studio",
    blurb:
      "A second timezone, and with it round-the-clock on-call for the platforms we run.",
  },
  {
    year: "2025",
    title: "Five products, 74 launches",
    blurb:
      "Sentinel and Prism went GA, Nexus entered beta, and client work crossed 19 countries.",
  },
] as const;
