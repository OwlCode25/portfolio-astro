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
- `index.astro` — main page, composes section components (Hero → Projects → Experience → Tecnologies)
- `contact.astro` — handles both GET rendering and POST form submission in the frontmatter; validates reCAPTCHA v3 server-side, sends email via Resend, redirects to `/success` or back with `?error=` params
- `success.astro` — confirmation page after contact form submission

**Layouts** — `Layout.astro` wraps Navigation + slot + Footer with global styles and Flowbite JS. `ContactLayout.astro` is a separate layout for the contact/success pages.

**Components** — all `.astro` files in `src/components/`. Content (experience entries, project cards) is hardcoded directly in the component markup — no CMS or data files. The `Music` section exists but is commented out in `index.astro`.

## Styling

Tailwind CSS v3 with two plugins: `flowbite/plugin` and `@midudev/tailwind-animations`. Custom color palette is defined in `tailwind.config.mjs`:

- `blue-royal` (#001c57), `blue-navy` (#0a2472), `blue-midnight` (#0b1b54), `blue-cobalt` (#1338be), `blue-bright` (#2851e3)
- `neutral-light` (#e6e9f0) — page background
- `accent-red` (#c22026), `accent-gold` (#c9a227)

Primary font is **Rubik** (loaded from Google Fonts). UI text is in Spanish.

## Environment Variables

`RECAPTCHA_SECRET_KEY` — Google reCAPTCHA v3 secret (required for contact form POST handling). The public site key is hardcoded in `src/pages/contact.astro`.
