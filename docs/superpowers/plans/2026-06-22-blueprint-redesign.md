# Blueprint Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio's visual identity from light navy to a dark "Blueprint" aesthetic: `#070b14` background with dot grid texture, Oswald headings uppercase, and the same `#2851e3` blue accent — inspired by Linear, Vercel, Resend.

**Architecture:** Pure CSS/styling pass — 11 files, no new dependencies, no layout restructuring, no feature changes. The body-level dot grid is applied in `Layout.astro` global styles. New `blueprint` and `surface` Tailwind tokens are added in `tailwind.config.mjs` so components can use them. Each component then adopts the Blueprint color tokens and Oswald font where specified.

**Tech Stack:** Astro v4, Tailwind CSS v3, Oswald (already loaded via Google Fonts in `Layout.astro` and `ContactLayout.astro`)

## Global Constraints

- No new npm dependencies
- No layout restructuring (grid columns, spacing rhythm, section order untouched)
- No changes to reCAPTCHA logic, Resend logic, or form POST handling
- Music section remains commented out
- Colors: use only explicit hex/rgba values or the new `blueprint`/`surface` tokens — never old `blue-royal`/`blue-navy`/`blue-midnight` on redesigned elements
- `blue-bright` (#2851e3) is the accent — keep it
- UI copy stays in Spanish
- Commits: conventional commits format, no Co-Authored-By
- Do NOT run `npm run build` after changes — dev server only

---

## File Map

| File | Change type |
|---|---|
| `tailwind.config.mjs` | Add `blueprint`, `surface` colors + `oswald` fontFamily |
| `src/layouts/Layout.astro` | Body bg `#070b14` + dot grid CSS |
| `src/components/Navigation.astro` | Colors, font, border |
| `src/components/NavLink.astro` | Font, colors |
| `src/components/Hero.astro` | Full rewrite |
| `src/components/Services.astro` | Cards, labels, CTA style |
| `src/components/Experience.astro` | Colors, heading style |
| `src/components/Tecnologies.astro` | Colors, heading style (488 lines) |
| `src/components/Footer.astro` | Colors, border |
| `src/layouts/ContactLayout.astro` | Body bg + dot grid |
| `src/pages/contact.astro` | Form input colors |

---

### Task 1: Foundation — Tailwind tokens + body background

**Files:**
- Modify: `tailwind.config.mjs`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Add `blueprint`, `surface`, `oswald` to tailwind.config.mjs**

Open `tailwind.config.mjs`. Under `theme.extend.colors`, after the existing `accent` block, add the two new color keys. Also add `fontFamily.oswald`:

```js
/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'


export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			colors: {
				// Colores primarios
				blue: {
					royal: '#001c57',
					navy: '#0a2472',
					midnight: '#0b1b54',
					cobalt: '#1338be',
					bright: '#2851e3',
				},
				// Tonos neutros
				neutral: {
					white: '#ffffff',
					light: '#e6e9f0',
					dark: '#2d3c5e',
				},
				// Colores de acento
				accent: {
					red: '#c22026',
					gold: '#c9a227',
				},
				// Blueprint design system
				blueprint: '#070b14',
				surface: '#0d1524',
			},
			fontFamily: {
				oswald: ['Oswald', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('flowbite/plugin'),
		animations
	],
}
```

- [ ] **Step 2: Update Layout.astro global styles**

Open `src/layouts/Layout.astro`. Replace the `<style is:global>` block (lines 39–50):

**From:**
```css
<style is:global>

	html {
		font-family: "Rubik", sans-serif;
		background: #e6e9f0;
		background-size: 224px;
		color-scheme: light dark;
	}



</style>
```

**To:**
```css
<style is:global>

	html {
		font-family: 'Rubik', sans-serif;
		color-scheme: dark;
	}

	body {
		background-color: #070b14;
		background-image: radial-gradient(circle, rgba(40, 81, 227, 0.18) 1px, transparent 1px);
		background-size: 22px 22px;
		color: #e2e8f0;
	}

</style>
```

- [ ] **Step 3: Start dev server and verify**

Run: `npm run dev`  
Navigate to http://localhost:4321.  
Expected: dark blue-black background (#070b14) with a subtle dot grid. Existing content still visible (though colors not updated yet — that's fine). No build errors in terminal.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.mjs src/layouts/Layout.astro
git commit -m "feat: add blueprint/surface tokens and dark dot-grid body background"
```

---

### Task 2: Navigation

**Files:**
- Modify: `src/components/Navigation.astro`
- Modify: `src/components/NavLink.astro`

- [ ] **Step 1: Update Navigation.astro — nav element classes**

Open `src/components/Navigation.astro`. On line 61, the `<nav>` element has:
```
class="bg-blue-royal p-3 sm:p-4 md:p-6 shadow-md w-full shadow-blue-navy animate-fade-in-left sticky top-0 z-50"
```

Replace with:
```
class="bg-blueprint p-3 sm:p-4 md:p-6 border-b border-[rgba(40,81,227,0.15)] w-full animate-fade-in-left sticky top-0 z-50"
```

- [ ] **Step 2: Update Navigation.astro — logo text**

On lines 64–67, the logo `<a>` element contains two `<span>` elements with `font-semibold`:

**From:**
```astro
    <a href="/" class="flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse border-b border-t border-neutral-light py-1">
      <span class="self-center text-xl md:text-2xl font-semibold whitespace-nowrap text-neutral-white">Owl</span>
      <OwlIcon width="42" height="40" class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
      <span class="self-center text-xl md:text-2xl font-semibold whitespace-nowrap text-neutral-white">Code</span>
    </a>
```

**To:**
```astro
    <a href="/" class="flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse py-1">
      <span class="self-center text-xl md:text-2xl font-oswald uppercase tracking-widest whitespace-nowrap text-[#e2e8f0]">Owl</span>
      <OwlIcon width="42" height="40" class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
      <span class="self-center text-xl md:text-2xl font-oswald uppercase tracking-widest whitespace-nowrap text-[#e2e8f0]">Code</span>
    </a>
```

- [ ] **Step 3: Update Navigation.astro — mobile menu background**

On line 97, find the mobile dropdown `<div>`:
```
class="... bg-blue-royal/95 lg:bg-transparent ..."
```

Replace that class within the full class string. The current full class is:
```
class="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-blue-navy rounded-lg bg-blue-royal/95 lg:bg-transparent lg:flex-row lg:space-x-6 lg:mt-0 lg:border-0 gap-2 lg:gap-0"
```

Replace with:
```
class="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-[rgba(40,81,227,0.2)] rounded-lg bg-blueprint lg:bg-transparent lg:flex-row lg:space-x-6 lg:mt-0 lg:border-0 gap-2 lg:gap-0"
```

- [ ] **Step 4: Update NavLink.astro**

Open `src/components/NavLink.astro`. Replace the entire `<a>` class string:

**From:**
```astro
<li>
  <a 
    class="transition duration-300 hover:text-neutral-light hover:bg-blue-navy text-neutral-white hover:rounded-lg rounded-md p-2 flex items-center" 
    href={href}
    data-contact={isContactLink ? 'true' : 'false'}
  >
    <span set:html={icon} />
    {text}
  </a>
</li>
```

**To:**
```astro
<li>
  <a 
    class="transition duration-300 hover:text-[#e2e8f0] hover:bg-[rgba(40,81,227,0.08)] text-[#475569] hover:rounded-lg rounded-md p-2 flex items-center font-oswald text-[0.65rem] uppercase tracking-widest" 
    href={href}
    data-contact={isContactLink ? 'true' : 'false'}
  >
    <span set:html={icon} />
    {text}
  </a>
</li>
```

- [ ] **Step 5: Verify in browser**

Navigate to http://localhost:4321.  
Expected:
- Nav background is dark blue-black (not light)
- Logo "Owl Code" renders in Oswald uppercase wide tracking
- Nav links show muted gray (#475569) text in small uppercase Oswald
- Hovering a link: slightly lighter text + subtle blue bg tint
- Mobile (resize to < 1024px): hamburger menu opens with dark bg
- `border-b` subtle blue line visible below nav

- [ ] **Step 6: Commit**

```bash
git add src/components/Navigation.astro src/components/NavLink.astro
git commit -m "feat: apply blueprint theme to navigation"
```

---

### Task 3: Hero — Full Rewrite

**Files:**
- Modify: `src/components/Hero.astro`

The current Hero has a welcome title, two long description paragraphs, and CV download + contact buttons. The new version removes all of that and creates a clean product-page hero with an eyebrow, large uppercase name, short subtitle, availability indicator, and two CTAs. The 2-column layout and circular dev photo stay.

- [ ] **Step 1: Replace Hero.astro entirely**

Write the following content to `src/components/Hero.astro`:

```astro
---
import { Image } from "astro:assets";
import dev from "../assets/developer.png";
---

<section class="relative z-10 mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 md:px-8 lg:px-10 max-w-screen-xl mx-auto animate-expand-vertically">
  <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

    <!-- Left column: text content -->
    <div class="w-full lg:w-3/5 order-2 lg:order-1 text-center lg:text-left">

      <!-- Eyebrow -->
      <p class="font-oswald text-xs uppercase tracking-[0.15em] text-blue-bright flex items-center gap-2 justify-center lg:justify-start mb-4">
        <span class="block w-6 h-px bg-blue-bright"></span>
        Fullstack Developer
      </p>

      <!-- Name -->
      <h1 class="font-oswald text-5xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.95] tracking-[-0.01em] text-[#e2e8f0]">
        Germán<br />Astudillo
      </h1>

      <!-- Subtitle -->
      <p class="font-rubik text-sm text-[#475569] leading-relaxed max-w-md mt-4 mx-auto lg:mx-0">
        Desarrollo de software a medida: aplicaciones, automatización con IA e integración de sistemas.
      </p>

      <!-- Availability -->
      <div class="flex items-center gap-2 text-xs text-[#475569] mt-4 justify-center lg:justify-start">
        <span class="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]"></span>
        Disponible para proyectos
      </div>

      <!-- CTAs -->
      <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <a
          href="#services"
          class="inline-flex items-center justify-center border border-blue-bright text-blue-bright px-5 py-2.5 font-oswald uppercase tracking-widest text-sm hover:bg-blue-bright hover:text-white transition-all duration-200"
        >
          Ver servicios
        </a>
        <a
          href="/contact"
          class="inline-flex items-center justify-center gap-1 text-[#475569] text-sm hover:text-[#e2e8f0] transition-colors"
        >
          Contactar
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Right column: circular photo -->
    <div class="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 order-1 lg:order-2 flex justify-center items-center mb-8 lg:mb-0">
      <div class="w-48 sm:w-56 md:w-64 lg:w-80 aspect-square relative overflow-hidden rounded-full shadow-lg ring-2 ring-[rgba(40,81,227,0.3)]">
        <Image
          src={dev}
          alt="developer-image"
          class="w-full h-full object-cover hover:scale-105 transition-all duration-300"
        />
      </div>
    </div>
  </div>
</section>

<style>
  .animate-expand-vertically {
    animation: expandVertically 0.8s ease-out forwards;
  }

  @keyframes expandVertically {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
```

- [ ] **Step 2: Verify in browser**

Navigate to http://localhost:4321.  
Expected:
- No "¡Bienvenid@ a mi Portfolio!" title
- Eyebrow "FULLSTACK DEVELOPER" in small blue Oswald uppercase with a horizontal line before it
- Large "GERMÁN / ASTUDILLO" in bold Oswald (~5xl–7xl depending on viewport)
- Short single-line subtitle in gray
- Green glowing dot + "Disponible para proyectos" text
- "VER SERVICIOS" outlined button (border blue-bright, transparent bg → fills on hover)
- "Contactar →" text link in gray → lighter on hover
- Circular dev photo on the right with a subtle blue ring
- Mobile: text centered, image above text

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: redesign Hero with Blueprint identity — Oswald name, eyebrow, service CTA"
```

---

### Task 4: Services — Blueprint Card Style

**Files:**
- Modify: `src/components/Services.astro`

The content (3 services with their data) stays the same. All HTML structure stays the same. Only the styling classes change plus: add a `label` property to each service object, add a top accent line div inside each card, and render the label before the title.

- [ ] **Step 1: Add `label` field to each service object**

In the frontmatter `const services = [...]`, add `label` to each entry:

```js
const services = [
  {
    id: "apps",
    label: "// APP",
    title: "Desarrollo de Aplicaciones",
    // ... rest unchanged
  },
  {
    id: "ai",
    label: "// AI",
    title: "Automatización con IA",
    // ... rest unchanged
  },
  {
    id: "integration",
    label: "// INT",
    title: "Integración de Sistemas",
    // ... rest unchanged
  },
];
```

- [ ] **Step 2: Update the section heading**

Find the section heading block (around line 55–66):
```html
    <!-- Section heading -->
    <div class="flex items-center justify-center mb-12">
      <h2 class="text-3xl font-bold text-blue-royal mr-2 text-balance">
        Servicios
      </h2>
      <svg .../>
    </div>
```

Replace with:
```html
    <!-- Section heading -->
    <div class="text-center mb-12">
      <p class="font-oswald text-xs uppercase tracking-[0.15em] text-blue-bright mb-3">—— Servicios</p>
      <h2 class="font-oswald text-3xl font-bold uppercase tracking-[0.03em] text-[#e2e8f0] text-balance">
        ¿En qué puedo ayudarte?
      </h2>
    </div>
```

- [ ] **Step 3: Update service card classes**

Find the card container (around line 72–77):
```html
        <div
          class={`service-card group flex flex-col rounded-xl border bg-gradient-to-br from-blue-navy to-blue-midnight p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:from-blue-midnight hover:to-blue-cobalt ${
            service.featured
              ? "border-blue-bright/50 ring-2 ring-blue-bright/30"
              : "border-blue-cobalt/30"
          }`}
        >
```

Replace with:
```html
        <div
          class={`service-card group relative flex flex-col rounded border bg-surface p-6 sm:p-8 transition-all duration-300 overflow-hidden ${
            service.featured
              ? "border-[rgba(40,81,227,0.3)] hover:border-[rgba(40,81,227,0.5)]"
              : "border-[rgba(40,81,227,0.15)] hover:border-[rgba(40,81,227,0.3)]"
          }`}
        >
```

- [ ] **Step 4: Add top accent line and label inside card**

Inside the card, before the icon container `<div class="mb-5 w-12 h-12 ...">`, insert:

```html
          <!-- Top accent line -->
          <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-bright/40 to-transparent"></div>

          <!-- Service label -->
          <span class="font-oswald text-[0.6rem] uppercase tracking-[0.1em] text-blue-bright mb-3 block">
            {service.label}
          </span>
```

- [ ] **Step 5: Update icon container opacity**

Find: `class="mb-5 w-12 h-12 rounded-xl bg-blue-bright/20 flex items-center justify-center flex-shrink-0"`

Replace with: `class="mb-5 w-12 h-12 rounded-xl bg-blue-bright/10 flex items-center justify-center flex-shrink-0"`

- [ ] **Step 6: Update chip classes**

Find: `class="text-xs px-3 py-1 rounded-full bg-blue-cobalt/25 text-neutral-light border border-blue-cobalt/20 leading-tight"`

Replace with: `class="text-xs px-3 py-1 rounded-full bg-[rgba(40,81,227,0.08)] text-[#475569] border border-[rgba(40,81,227,0.2)] leading-tight"`

- [ ] **Step 7: Update individual CTA button to outlined style**

Find:
```html
          <a
            href="/contact"
            class="inline-flex items-center justify-center gap-1.5 self-start rounded-lg bg-blue-bright px-4 py-2 text-sm font-medium text-neutral-white shadow-sm transition-all duration-300 hover:bg-blue-cobalt active:scale-[0.96]"
          >
            Consultar
```

Replace with:
```html
          <a
            href="/contact"
            class="inline-flex items-center justify-center gap-1.5 self-start border border-blue-bright text-blue-bright px-4 py-2 font-oswald uppercase tracking-widest text-xs hover:bg-blue-bright hover:text-white transition-all duration-200 active:scale-[0.96]"
          >
            Consultar
```

- [ ] **Step 8: Update global CTA strip**

Find:
```html
    <!-- Global CTA strip -->
    <div class="rounded-2xl bg-gradient-to-r from-blue-royal to-blue-navy px-8 py-10 text-center">
      <h3 class="text-2xl font-bold text-neutral-white mb-2 text-balance">
        ¿Tienes un proyecto en mente?
      </h3>
      <p class="text-neutral-light text-pretty mb-6 max-w-md mx-auto">
        Cuéntame tu idea y encontramos juntos la mejor solución para tu negocio.
      </p>
```

Replace with:
```html
    <!-- Global CTA strip -->
    <div class="border-t border-[rgba(40,81,227,0.15)] px-8 py-10 text-center mt-4">
      <h3 class="font-oswald text-2xl font-bold uppercase tracking-[0.03em] text-[#e2e8f0] mb-2 text-balance">
        ¿Tienes un proyecto en mente?
      </h3>
      <p class="text-[#475569] text-sm text-pretty mb-6 max-w-md mx-auto">
        Cuéntame tu idea y encontramos juntos la mejor solución para tu negocio.
      </p>
```

- [ ] **Step 9: Verify in browser**

Navigate to http://localhost:4321 and scroll to Services.  
Expected:
- Section shows "—— SERVICIOS" eyebrow + "¿EN QUÉ PUEDO AYUDARTE?" heading in Oswald uppercase
- 3 cards on dark `#0d1524` bg with subtle blue border
- Top accent line (thin horizontal gradient) at top edge of each card
- `// APP`, `// AI`, `// INT` labels above each title in small blue Oswald
- Icon containers slightly more subtle than before
- Chips have very subtle blue-tinted bg
- "CONSULTAR" outlined button (border only, fills on hover)
- Bottom CTA strip: border-top separator, no gradient bg, gold "Hablemos" button unchanged

- [ ] **Step 10: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat: apply blueprint style to Services — surface cards, outlined CTAs, service labels"
```

---

### Task 5: Experience

**Files:**
- Modify: `src/components/Experience.astro`

Colors only. The timeline structure and script stay untouched.

- [ ] **Step 1: Update section heading**

Find (lines 1–14):
```html
<div id="work" class="mt-10 flex justify-center">
  <div class="flex flex-col items-center">
    <div class="flex items-center mb-4">
      <h3 class="text-3xl text-blue-midnight">
        Experiencia
      </h3>
      <svg ... stroke="#0a2472" ...>
```

Replace the heading block with:
```html
<div id="work" class="mt-10 flex justify-center">
  <div class="flex flex-col items-center">
    <div class="flex flex-col items-center mb-8">
      <p class="font-oswald text-xs uppercase tracking-[0.15em] text-blue-bright mb-3">—— Experiencia</p>
      <div class="flex items-center">
        <h3 class="font-oswald text-3xl font-bold uppercase tracking-[0.03em] text-[#e2e8f0]">
          Trayectoria
        </h3>
        <svg xmlns="http://www.w3.org/2000/svg" class="ml-3 w-10 h-10" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2851e3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
          <path d="M12 12l0 .01" />
          <path d="M3 13a20 20 0 0 0 18 0" />
        </svg>
      </div>
    </div>
```

- [ ] **Step 2: Update list item text colors**

In the `<ul id="experience-list">` block, replace all occurrences of:
- `text-slate-600` → `text-[#e2e8f0]`
- `text-slate-500` → `text-blue-bright font-oswald text-xs uppercase`

The three date `<li>` elements (the ones with `text-slate-500 ml-6 mt-2`) become:
```html
        <li class="mb-4 text-blue-bright font-oswald text-xs uppercase ml-6 mt-2">Agosto 2024 - Actualidad</li>
```
(And similarly for the other two date entries.)

The company name entries (currently `text-slate-600 font-medium list-disc`) become:
```html
        <li class="text-[#e2e8f0] font-medium list-disc">Keep Pushing Business</li>
```

The description entries (currently `text-slate-600 ml-6`) become:
```html
        <li class="mb-4 text-[#475569] ml-6 text-sm leading-relaxed">...</li>
```

- [ ] **Step 3: Update timeline line color**

Find: `<div id="line" class="absolute border-r border-slate-500 h-full top-0"></div>`

Replace with: `<div id="line" class="absolute border-r border-[rgba(40,81,227,0.3)] h-full top-0"></div>`

- [ ] **Step 4: Verify in browser**

Scroll to the Experience section.  
Expected:
- Eyebrow "—— EXPERIENCIA" + "TRAYECTORIA" heading in Oswald uppercase
- Company names in light text `#e2e8f0`
- Dates in small blue Oswald uppercase
- Descriptions in muted gray `#475569`
- Timeline vertical line in semi-transparent blue

- [ ] **Step 5: Commit**

```bash
git add src/components/Experience.astro
git commit -m "feat: apply blueprint colors and Oswald headings to Experience"
```

---

### Task 6: Technologies

**Files:**
- Modify: `src/components/Tecnologies.astro`

488 lines — colors-only pass. The data array, grid structure, and `<Image>` components stay untouched.

- [ ] **Step 1: Update section h2**

Find (line 173):
```html
    <h2 class="text-3xl md:text-4xl font-bold text-center text-blue-navy mb-12">
      Mis Tecnologías y Herramientas
    </h2>
```

Replace with:
```html
    <div class="text-center mb-12">
      <p class="font-oswald text-xs uppercase tracking-[0.15em] text-blue-bright mb-3">—— Stack</p>
      <h2 class="font-oswald text-3xl md:text-4xl font-bold uppercase tracking-[0.03em] text-[#e2e8f0]">
        Tecnologías y Herramientas
      </h2>
    </div>
```

- [ ] **Step 2: Update all category h3 headings**

There are 5 category subheadings. Find each and replace. The pattern is the same for all — only the text and SVG differ.

**Frontend h3 (line 180–188):**
```html
      <div class="flex items-center justify-center mb-8">
        <h3 class="text-2xl md:text-3xl font-semibold text-blue-royal mr-3">
          Frontend
        </h3>
        <svg ... stroke="#001c57" ...>
```
→
```html
      <div class="flex items-center justify-center mb-8">
        <h3 class="font-oswald text-2xl md:text-3xl font-semibold uppercase tracking-[0.05em] text-[#e2e8f0] mr-3">
          Frontend
        </h3>
        <svg ... stroke="#2851e3" ...>
```

**Backend h3 (line 229–237):** Same pattern — `text-blue-royal` → `font-oswald ... text-[#e2e8f0]`, `stroke="#001c57"` → `stroke="#2851e3"`, add `uppercase tracking-[0.05em]`.

**Herramientas de Desarrollo h3:** Same pattern.

**Base de Datos h3:** Same pattern.

**Sistema Operativo h3:** Same pattern.

For each of the 5 headings: replace `text-blue-royal` with `text-[#e2e8f0]`, add `font-oswald uppercase tracking-[0.05em]`, change SVG `stroke` from `#001c57` to `#2851e3`.

- [ ] **Step 3: Update all tech cards (same pattern, 5 grids)**

Each card currently looks like:
```html
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-neutral-light group">
            <div class="h-36 sm:h-40 flex items-center justify-center p-4 bg-gradient-to-br from-blue-royal/5 to-blue-bright/5">
              ...
            </div>
            <div class="p-4 sm:p-6">
              <h4 class="text-lg font-semibold text-blue-navy mb-2 group-hover:text-blue-bright transition-colors">{tech.name}</h4>
              <p class="text-sm text-neutral-dark mb-4 line-clamp-3">{tech.description}</p>
              <a ... class="inline-flex items-center text-blue-royal hover:text-blue-bright text-sm font-medium transition-colors">
```

Use `replace_all: true` for each of these 4 distinct strings across the file:

**Card outer div** — replace all occurrences of:
```
bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-neutral-light group
```
With:
```
bg-surface rounded border border-[rgba(40,81,227,0.15)] overflow-hidden hover:border-[rgba(40,81,227,0.3)] transition-all duration-300 hover:scale-105 group
```

**Card image container** — replace all:
```
h-36 sm:h-40 flex items-center justify-center p-4 bg-gradient-to-br from-blue-royal/5 to-blue-bright/5
```
With:
```
h-36 sm:h-40 flex items-center justify-center p-4 bg-[rgba(40,81,227,0.05)]
```

**Card title h4** — replace all:
```
text-lg font-semibold text-blue-navy mb-2 group-hover:text-blue-bright transition-colors
```
With:
```
text-lg font-semibold text-[#475569] mb-2 group-hover:text-[#e2e8f0] transition-colors
```

**Card description p** — replace all:
```
text-sm text-neutral-dark mb-4 line-clamp-3
```
With:
```
text-sm text-[#475569] mb-4 line-clamp-3
```

**Card link** — replace all:
```
inline-flex items-center text-blue-royal hover:text-blue-bright text-sm font-medium transition-colors
```
With:
```
inline-flex items-center text-[#475569] hover:text-blue-bright text-sm font-medium transition-colors
```

- [ ] **Step 4: Verify in browser**

Scroll to the Technologies section.  
Expected:
- "—— STACK" eyebrow + "TECNOLOGÍAS Y HERRAMIENTAS" in Oswald uppercase
- 5 category headings in light `#e2e8f0` Oswald uppercase, icons in blue `#2851e3`
- Tech cards: dark surface bg with subtle blue border
- Image container: very subtle blue tint bg
- Tech name in muted gray, brightens on hover to light `#e2e8f0`
- "Ver más" link in muted gray, turns blue on hover
- `hover:scale-105` still works

- [ ] **Step 5: Commit**

```bash
git add src/components/Tecnologies.astro
git commit -m "feat: apply blueprint theme to Technologies — surface cards and Oswald headings"
```

---

### Task 7: Footer

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Replace Footer.astro entirely**

```astro
<footer class="bg-blueprint border-t border-[rgba(40,81,227,0.1)] mt-auto py-6">
    <div class="max-w-screen-xl flex flex-col mx-auto text-[#475569] px-4">
        <h3 class="text-center text-xl font-semibold mb-2 text-[#e2e8f0]">Contáctame :]</h3>
        <p class="text-center mb-4 text-[#475569]">También puedes seguirme en mi LinkedIn!</p>
        <div class="flex justify-center mt-2">
            <a 
                class="transition duration-300 ease-in-out bg-[rgba(40,81,227,0.1)] border border-[rgba(40,81,227,0.2)] text-[#475569] hover:bg-[rgba(40,81,227,0.2)] hover:text-[#e2e8f0] rounded-full p-3 cursor-pointer mr-4 shadow-sm hover:shadow-md" 
                href="https://www.linkedin.com/in/germ%C3%A1n-astudillo-9803b01ba/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="icon icon-tabler icon-tabler-brand-linkedin" 
                    width="30" 
                    height="30" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    fill="none" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                    <path d="M8 11l0 5" />
                    <path d="M8 8l0 .01" />
                    <path d="M12 16l0 -5" />
                    <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                </svg>
            </a>
        </div>
        <div class="text-center text-sm text-[#475569] mt-6">
            &copy; {new Date().getFullYear()} Germán Astudillo
        </div>
    </div>
</footer>
```

- [ ] **Step 2: Verify in browser**

Scroll to the bottom.  
Expected:
- Footer bg matches body dark blue-black (seamless)
- Subtle blue border-top separates footer from content
- "Contáctame :] " in light text, paragraph in muted gray
- LinkedIn icon in a subtle blue-tinted circle, brightens on hover
- Copyright text in muted gray

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: apply blueprint theme to Footer"
```

---

### Task 8: Contact Page

**Files:**
- Modify: `src/layouts/ContactLayout.astro`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Update ContactLayout.astro global styles**

Open `src/layouts/ContactLayout.astro`. Replace the `<style is:global>` block (lines 35–45):

**From:**
```css
<style is:global>

	html {
		font-family: "Rubik", sans-serif;
		background: #0b1b54;
		background-size: 224px;
		color-scheme: light dark;
	}


</style>
```

**To:**
```css
<style is:global>

	html {
		font-family: 'Rubik', sans-serif;
		color-scheme: dark;
	}

	body {
		background-color: #070b14;
		background-image: radial-gradient(circle, rgba(40, 81, 227, 0.18) 1px, transparent 1px);
		background-size: 22px 22px;
		color: #e2e8f0;
	}

</style>
```

- [ ] **Step 2: Update contact.astro — page headings**

Open `src/pages/contact.astro`. Find the two h3 headings (lines 85–87):
```html
  <h3 class="text-2xl uppercase text-white text-center font-bold">¡Muchas gracias por contactar conmigo!</h3>
  <h3 class="text-2xl uppercase text-white text-center font-bold">¿Cómo podría ayudarte?</h3>
```

Replace with:
```html
  <p class="font-oswald text-xs uppercase tracking-[0.15em] text-blue-bright text-center mb-3">—— Contacto</p>
  <h3 class="font-oswald text-2xl uppercase tracking-[0.03em] text-[#e2e8f0] text-center font-bold">¡Muchas gracias por contactar conmigo!</h3>
  <h3 class="font-oswald text-2xl uppercase tracking-[0.03em] text-[#e2e8f0] text-center font-bold">¿Cómo podría ayudarte?</h3>
```

- [ ] **Step 3: Update contact.astro — form border**

Find the `<form>` element (line 95):
```html
<form class="w-max mx-auto border border-amber-50 p-8" method="POST" id="contact-form">
```

Replace with:
```html
<form class="w-max mx-auto border border-[rgba(40,81,227,0.2)] p-8 rounded" method="POST" id="contact-form">
```

- [ ] **Step 4: Update contact.astro — form input fields**

There are two text/email inputs and one textarea. For each, add Blueprint classes.

**Name input (line 105):**
```html
        <input type="text" name="name" id="website-admin" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Nombre Apellido" required>
```
Replace with:
```html
        <input type="text" name="name" id="website-admin" class="rounded-none rounded-e-lg bg-surface border border-[rgba(40,81,227,0.2)] text-[#e2e8f0] placeholder:text-[#475569] focus:ring-blue-bright focus:border-blue-bright block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Nombre Apellido" required>
```

**Email input (line 117):**
```html
        <input type="email" name="email" id="email-address-icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre@correo.com" required>
```
Replace with:
```html
        <input type="email" name="email" id="email-address-icon" class="bg-surface border border-[rgba(40,81,227,0.2)] text-[#e2e8f0] placeholder:text-[#475569] text-sm rounded-lg focus:ring-blue-bright focus:border-blue-bright block w-full ps-10 p-2.5" placeholder="nombre@correo.com" required>
```

**Textarea (line 123):**
```html
    <textarea id="message" rows="4" name="message" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribeme un mensaje..." required></textarea>
```
Replace with:
```html
    <textarea id="message" rows="4" name="message" class="block p-2.5 w-full text-sm text-[#e2e8f0] bg-surface rounded-lg border border-[rgba(40,81,227,0.2)] placeholder:text-[#475569] focus:ring-blue-bright focus:border-blue-bright" placeholder="Escríbeme un mensaje..." required></textarea>
```

- [ ] **Step 5: Update contact.astro — input icon containers and label colors**

The two input icon `<span>` elements on lines 100–104 and the `<div>` wrapper on line 111 have `bg-gray-50` and `text-gray-100`. Replace:

**Name icon span (line 100):**
```html
        <span class="inline-flex items-center px-3 text-sm text-gray-100 bg-gray-50 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
```
Replace with:
```html
        <span class="inline-flex items-center px-3 text-sm text-[#475569] bg-surface border border-e-0 border-[rgba(40,81,227,0.2)] rounded-s-md">
```

**Labels** — find all `class="block mb-2 text-sm font-medium text-gray-100 dark:text-white"` and replace with `class="block mb-2 text-sm font-oswald uppercase tracking-[0.05em] text-[#475569]"`

- [ ] **Step 6: Update contact.astro — submit button**

Find (line 129):
```html
    <button type="submit" id="submit-btn" class="text-white flex bg-gradient-to-r from-cyan-700 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
```

Replace with:
```html
    <button type="submit" id="submit-btn" class="inline-flex items-center border border-blue-bright text-blue-bright px-6 py-2.5 font-oswald uppercase tracking-widest text-sm hover:bg-blue-bright hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-bright me-2 mb-2">
```

- [ ] **Step 7: Navigate to /contact and verify**

Navigate to http://localhost:4321/contact.  
Expected:
- Same dark dot-grid bg as main page
- "—— CONTACTO" eyebrow + headings in Oswald uppercase
- Form border: subtle blue
- All inputs: dark surface bg, blue-tinted border, light text, gray placeholder
- Labels: small Oswald uppercase gray
- Submit button: outlined blue, fills on hover

- [ ] **Step 8: Commit**

```bash
git add src/layouts/ContactLayout.astro src/pages/contact.astro
git commit -m "feat: apply blueprint theme to contact page and form inputs"
```

---

## Final Verification Checklist

After all tasks are complete, do a full-page review at http://localhost:4321:

- [ ] Body: dark `#070b14` with subtle dot grid visible at all viewport widths
- [ ] Nav: dark bg, blue border-bottom, Oswald logo uppercase, small uppercase nav links in muted gray
- [ ] Hero: eyebrow line, large Oswald name, short subtitle, green availability dot, outlined CTA + text CTA, circular photo with blue ring
- [ ] Services: eyebrow + Oswald heading, surface cards with blue borders, `//` labels, top accent lines, outlined CTA buttons, bottom strip with border-top (no gradient)
- [ ] Experience: eyebrow + Oswald "TRAYECTORIA" heading, company names in light text, dates in blue Oswald uppercase, descriptions in muted gray
- [ ] Technologies: eyebrow + Oswald heading, 5 category groups with Oswald uppercase subheadings and blue icon colors, surface cards with blue borders
- [ ] Footer: seamless dark bg, blue border-top, all text in muted gray or light
- [ ] `/contact`: same dot-grid bg, Blueprint form inputs, outlined submit button
- [ ] Responsive: at 375px (mobile) no horizontal overflow, hero text centered, services cards stacked
- [ ] Hover states: cards border brightens, nav links lighten, buttons fill on hover

---

## Notes

- `NavContact.astro` (used in ContactLayout) is NOT in scope — it renders on contact page nav and was not included in the design spec. If it looks visually inconsistent after Task 8, update its colors using the same patterns as `NavLink.astro`.
- The `src/pages/success.astro` page is also out of scope — it inherits `ContactLayout` so the bg change will apply automatically, but any text colors on that page would need a separate pass if desired.
