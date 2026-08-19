# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are decision-makers at PyMEs (small/medium businesses) and startups who need custom software, AI-driven automation, or systems integration but lack the internal team to build it themselves. They land on the site evaluating whether to hire OwlCode directly for a project (vs. an agency or another freelancer).

## Product Purpose

A freelance software development portfolio published under the name OwlCode. Its purpose is to convert visiting PyMEs/startups into contact-form leads for three service lines: custom application development (web/mobile/desktop), AI automation (agents, bots, workflow automation), and systems integration (APIs, ERPs/CRMs, data migration). Success is a submitted contact request tied to a specific service interest.

## Positioning

Full-stack development plus AI automation delivered end-to-end by a single point of contact — no subcontracting between "the dev shop" and "the AI shop." The same person who builds the application also automates the workflows around it and integrates it with the client's existing systems.

## Operating Context

- Visitors typically arrive with a business problem, not a technical spec — copy and CTAs are written to route them by service ("Consultar" per service card, `/contact?servicio=<id>`), not by technology.
- Contact form (`src/pages/contact.astro`) is the sole conversion mechanism: server-validates reCAPTCHA v3, sends email via Resend, redirects to `/success` or back with `?error=` params.
- Real, in-production projects (`src/components/Projects.astro`) and a work history timeline (`src/components/Experience.astro`) function as trust/credibility evidence for a solo freelancer competing against agencies.
- UI copy is in Spanish; the visible audience is Spanish-speaking.

## Capabilities and Constraints

- Astro v4 in SSR mode, deployed to Vercel (`@astrojs/vercel/serverless`). No CMS — content (experience entries, project cards, services) is hardcoded in component markup.
- Contact form requires `RECAPTCHA_SECRET_KEY`; the public reCAPTCHA site key is hardcoded in `contact.astro`.
- No test suite configured.
- `Music` section component exists but is intentionally disabled (commented out in `index.astro`) — not in current scope.

## Brand Commitments

- The site presents itself as **OwlCode** only. The owner's personal name must not appear in visible copy, page titles, or structured data — that was a deliberate decision, not an oversight. The GitHub handle `OwlCode25` and the LinkedIn profile URL are the remaining exceptions, kept for credibility.
- Unused personal assets still sit in `src/assets/` (a CV PDF and `LogoG.png`); neither is referenced by any page.
- Tone in existing copy is direct and outcome-focused ("para que tu equipo deje de perder tiempo en tareas manuales"), not generic/corporate.

## Evidence on Hand

- Real production projects with descriptions and tech-stack logos, e.g. a stock-tracking app (Flask/PostgreSQL/React + Polygon API) — see `src/components/Projects.astro`.
- Work history: Keep Pushing Business (Aug 2024–present, Flask apps, Airflow automation, Odoo modules), Expert Choice (Mar–Apr 2024), Ilustre Municipalidad de Maipú (Jun 2023–Feb 2024, REST apps, ChatGPT/Mixtral/LLAMA 2 automation) — see `src/components/Experience.astro`.
- No testimonials, client logos, case-study write-ups, pricing, or SLAs exist yet — future work must not fabricate these.

## Product Principles

1. Every visitor should be able to self-route to the right service (apps / AI / integration) without needing to know the underlying tech stack.
2. Credibility for a solo freelancer comes from real, verifiable evidence (shipped projects, concrete work history) — not from stock claims or invented social proof.
3. The contact form is the single conversion point; every section should plausibly lead there, carrying which service the visitor cared about.
4. Copy stays outcome-focused for a non-technical business buyer, not feature-focused for a technical peer.
