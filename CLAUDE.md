# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server at localhost:4321
npm run build      # Production build to ./dist/
npm run preview    # Preview production build locally
```

No test suite is configured.

## Architecture

Freelance developer portfolio published as **OwlCode**, built with **Astro v4 in SSR mode** deployed to Vercel via `@astrojs/vercel/serverless`. The site brands as OwlCode only — the owner's personal name is deliberately absent from visible copy, titles, and structured data.

**Routing** — file-based via `src/pages/`:
- `index.astro` — main page, composes section components (Hero → Services → Projects → Experience → Tecnologies)
- `contact.astro` — handles both GET rendering and POST form submission in the frontmatter; validates reCAPTCHA v3 server-side, sends email via Resend, redirects to `/success` or back with `?error=` params
- `success.astro` — confirmation page after contact form submission

**Layouts** — `Layout.astro` wraps Navigation + slot + Footer with global styles. `ContactLayout.astro` is a separate layout for the contact/success pages. Both still load `flowbite.min.js` from a CDN, but no `data-*` Flowbite hooks remain in `src/` — the script is dead weight and the Tailwind `flowbite/plugin` (CSS only) is what still matters.

**Components** — all `.astro` files in `src/components/`. Content (experience entries, project cards) is hardcoded directly in the component markup — no CMS or data files. The `Music` section exists but is commented out in `index.astro`.

## Styling

Tailwind CSS v3 with two plugins: `flowbite/plugin` and `@midudev/tailwind-animations`. The palette in `tailwind.config.mjs` is deliberately two colours — see `DESIGN.md`, which is the authority:

- `brand-accent` (#7AA2F7) — periwinkle, the **only** accent: borders, icons, CTAs, focus rings, status dots. Do not introduce a second accent hue.
- `blueprint` (#11121A) — page background · `surface` (#171923) — cards, panels, inputs
- `ink` (#F2F4FC) — primary text · `ink-muted` (#98A2C7) — secondary text, periwinkle-tinted rather than grey

Primary font is **Roboto** (Google Fonts), using ExtraLight 200 for display headings and Bold 700 for tracked uppercase labels — the weight contrast carries hierarchy, since colour is not allowed to. UI text is in Spanish; code, comments, and commits are in English.

The brand mark's animation lives in `BrandMark.astro` and is driven by Anime.js v4 (`animate` / `createTimeline` / `utils` / `createAnimatable`; note `createSpring` is deprecated in favour of `spring`).

## Environment Variables

`RECAPTCHA_SECRET_KEY` — Google reCAPTCHA v3 secret (required for contact form POST handling). The public site key is hardcoded in `src/pages/contact.astro`.
