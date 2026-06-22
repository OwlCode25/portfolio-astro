# Blueprint Redesign — Design Spec

## Context

The portfolio currently uses a light background (`#e6e9f0`) with navy blue gradient cards. The goal is a full visual identity overhaul to a **Blueprint** aesthetic: dark blue-black background, dot grid texture, Oswald headings in uppercase, and a technical/dev personality — inspired by Linear, Vercel, and Resend but with a more distinctive technical character.

**User goal:** Look modern and technical to attract clients. "Este dev sabe de lo último."

---

## Color System

| Token | Value | Usage |
|---|---|---|
| `bg-blueprint` | `#070b14` | Body background, nav, footer |
| `bg-surface` | `#0d1524` | Cards, sections, inputs |
| `border-blueprint` | `rgba(40, 81, 227, 0.15)` | All borders, dividers |
| `border-blueprint-hover` | `rgba(40, 81, 227, 0.30)` | Hover states on cards |
| `text-primary` | `#e2e8f0` | Main body text |
| `text-secondary` | `#475569` | Descriptions, subtitles |
| `accent` | `#2851e3` | CTA buttons, highlights, active links (existing `blue-bright`) |
| `accent-glow` | `rgba(40, 81, 227, 0.08)` | Subtle bg tint on hover |

Add to `tailwind.config.mjs` under `theme.extend.colors`:
```js
blueprint: '#070b14',
surface: '#0d1524',
```

Add under `theme.extend.fontFamily`:
```js
oswald: ['Oswald', 'sans-serif'],
```

---

## Typography System

| Role | Font | Weight | Transform | Tracking |
|---|---|---|---|---|
| Section eyebrow | Oswald | 500 | uppercase | 0.15em |
| Section heading | Oswald | 700 | uppercase | 0.03em |
| Hero name | Oswald | 700 | uppercase | -0.01em |
| Card label (`// APP`) | Oswald | 500 | uppercase | 0.10em |
| Body / description | Rubik | 400 | none | default |
| CTA button | Oswald | 600 | uppercase | 0.08em |

Oswald is already loaded via Google Fonts in `Layout.astro` — no new import needed.

---

## Global Layout (`Layout.astro`)

**Body styles** (replace existing inline `style` on body or add to global `<style>`):
```css
body {
  background-color: #070b14;
  background-image: radial-gradient(circle, rgba(40, 81, 227, 0.18) 1px, transparent 1px);
  background-size: 22px 22px;
  color: #e2e8f0;
  font-family: 'Rubik', sans-serif;
}
```

The dot opacity (0.18) is subtle enough — no masking pseudo-element needed. Sections render on top naturally.

---

## Navigation (`Navigation.astro`)

**Background:** `bg-blueprint` (was `bg-blue-royal`)  
**Border:** `border-b border-[rgba(40,81,227,0.15)]` (remove `shadow-md shadow-blue-navy`)  
**Logo:** 
- Remove `bg-blue-royal` shade, keep structure
- Text: `font-oswald uppercase tracking-widest` — displays as `OWL CODE` (existing text, new font)
- OwlIcon: keep as-is

**Nav links (NavLink.astro):**
- Default color: `text-[#475569]` (was white with opacity)
- Hover: `text-[#e2e8f0]`
- Active/current: `text-blue-bright`
- Font: `font-oswald text-[0.65rem] uppercase tracking-widest`

---

## Hero (`Hero.astro`)

**Current structure:** 2-column layout (60/40), text left + circular dev photo right. Has "¡Bienvenid@ a mi Portfolio!" h1, name, role, two long description paragraphs, and two CTA buttons (download CV + contact).

**Changes:**
- Remove "¡Bienvenid@ a mi Portfolio!" title
- Remove the two long description paragraphs — replace with a single short subtitle (1-2 lines)
- Keep 2-column layout and the circular dev photo (keep `developer.png`)
- Photo border update: add `ring-2 ring-[rgba(40,81,227,0.3)]` on the circular container
- CTA "Descarga mi CV" → "Ver servicios" (href: `#services`)
- CTA "Envíame un mensaje" → "Contactar →"

**New left column structure:**
```
[eyebrow]   —— FULLSTACK DEVELOPER
[h1]        GERMÁN
            ASTUDILLO
[subtitle]  Desarrollo de software a medida: aplicaciones,
            automatización con IA e integración de sistemas.
[availability] ● Disponible para proyectos
[cta row]   [Ver servicios]   Contactar →
```

**Styles:**
- Eyebrow: `font-oswald text-xs uppercase tracking-[0.15em] text-blue-bright flex items-center gap-2` with a `<span class="block w-6 h-px bg-blue-bright"></span>` before text
- H1: `font-oswald text-5xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.95] tracking-[-0.01em] text-[#e2e8f0]`
- Subtitle: `font-rubik text-sm text-[#475569] leading-relaxed max-w-md mt-4`
- Availability: `flex items-center gap-2 text-xs text-[#475569] mt-4` + `<span class="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]"></span>`
- Primary CTA: `border border-blue-bright text-blue-bright px-5 py-2.5 font-oswald uppercase tracking-widest text-sm hover:bg-blue-bright hover:text-white transition-all duration-200`
- Secondary CTA: `text-[#475569] text-sm flex items-center gap-1 hover:text-[#e2e8f0] transition-colors`
- Section must be `relative z-10` to clear body::before

---

## Services (`Services.astro`)

Currently uses `from-blue-navy to-blue-midnight` gradient cards. Update to Blueprint treatment.

**Cards:**
- Remove gradient background → use `bg-surface` (`#0d1524`)
- Border: `border border-[rgba(40,81,227,0.15)] hover:border-[rgba(40,81,227,0.3)]`
- Border-radius: `rounded` (4px — sharper, was `rounded-xl`)
- Add top accent line via `::before` pseudo or `<div>` inside card: `h-px bg-gradient-to-r from-transparent via-blue-bright/40 to-transparent`
- Remove `ring-2 ring-blue-bright/30` on featured card (no longer needed — let content differentiate)
- Card label (NEW): above title, add `<span class="font-oswald text-[0.6rem] uppercase tracking-[0.1em] text-blue-bright">// APP</span>` (values: `// APP`, `// AI`, `// INT`)

**Icon container:** `bg-blue-bright/10` (was `/20`) — slightly more subtle

**Chips:** `border-[rgba(40,81,227,0.2)] bg-[rgba(40,81,227,0.08)] text-[#475569]`

**CTA button:** `border border-blue-bright text-blue-bright font-oswald uppercase tracking-widest text-xs hover:bg-blue-bright hover:text-white` (was filled `bg-blue-bright`)

**Global CTA strip:**
- Remove `bg-gradient-to-r from-blue-royal to-blue-navy` → `border-t border-[rgba(40,81,227,0.15)] bg-transparent`  
- "Hablemos" button: keep `bg-accent-gold` — the gold stands out well on Blueprint dark

**Section heading (`h2`):**
- Add eyebrow above: `<p class="font-oswald text-xs uppercase tracking-[0.15em] text-blue-bright mb-3">—— Servicios</p>`
- H2: `font-oswald uppercase tracking-[0.03em]` (was `text-3xl font-bold text-blue-royal`)

---

## Experience (`Experience.astro`)

**Colors only — no structural changes:**
- Section background: transparent (body bg shows)
- Timeline/cards if present: `bg-surface border-[rgba(40,81,227,0.15)]`
- Heading: Oswald uppercase + eyebrow pattern (same as Services)
- Text: `text-[#e2e8f0]` primary, `text-[#475569]` secondary
- Date/labels: `text-blue-bright font-oswald text-xs uppercase`

---

## Technologies (`Tecnologies.astro`)

**Colors only — no structural changes** (488 lines, many tech logo cards):
- White cards → `bg-surface border-[rgba(40,81,227,0.15)]` 
- Heading: Oswald uppercase + eyebrow pattern
- Tech name text: `text-[#e2e8f0]` on hover, `text-[#475569]` default
- Category labels: Oswald uppercase tracking
- Keep `hover:scale-105` and `shadow` effects

---

## Footer (`Footer.astro`)

- Background: `bg-blueprint` (transparent or explicit `#070b14`)
- Top border: `border-t border-[rgba(40,81,227,0.1)]`
- Text: `text-[#475569]`
- Links: `hover:text-[#e2e8f0]`

---

## Contact Page (`ContactLayout.astro`, `contact.astro`)

- Same background `#070b14` + dot grid (inherits from Layout if it uses Layout, else duplicate body styles in ContactLayout)
- Form inputs: `bg-surface border-[rgba(40,81,227,0.2)] text-[#e2e8f0] placeholder:text-[#475569]`
- Labels: Oswald uppercase tracking

---

## Files Changed

| File | Type of change |
|---|---|
| `tailwind.config.mjs` | Add `blueprint`, `surface` colors + `oswald` fontFamily |
| `src/layouts/Layout.astro` | Body bg, dot grid CSS, z-index base |
| `src/components/Navigation.astro` | Colors, font, border |
| `src/components/NavLink.astro` | Font, colors |
| `src/components/Hero.astro` | Full redesign |
| `src/components/Services.astro` | Cards, labels, CTA style |
| `src/components/Experience.astro` | Colors, heading style |
| `src/components/Tecnologies.astro` | Colors, heading style |
| `src/components/Footer.astro` | Colors, border |
| `src/layouts/ContactLayout.astro` | Colors, bg |
| `src/pages/contact.astro` | Form input colors |

---

## Out of Scope

- No new dependencies
- No layout restructuring (grid, spacing rhythm — stays the same)
- No new sections
- Music section remains commented out
- No changes to reCAPTCHA or Resend logic
