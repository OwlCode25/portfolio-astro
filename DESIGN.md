---
name: OwlCode
description: Freelance software developer portfolio — a periwinkle-on-near-black technical brand for custom apps, AI automation, and systems integration.
colors:
  periwinkle: "#7AA2F7"
  blueprint: "#11121A"
  surface: "#171923"
  ink: "#F2F4FC"
  ink-muted: "#98A2C7"
typography:
  display:
    fontFamily: "Roboto, sans-serif"
    fontWeight: 200
    letterSpacing: "-0.01em"
    lineHeight: 0.95
  label:
    fontFamily: "Roboto, sans-serif"
    fontWeight: 700
    letterSpacing: "0.1em"
  body:
    fontFamily: "Roboto, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
  md: "6px"
  lg: "8px"
  full: "9999px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.periwinkle}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  button-outline-hover:
    backgroundColor: "{colors.periwinkle}"
    textColor: "{colors.blueprint}"
    rounded: "{rounded.none}"
  button-solid:
    backgroundColor: "{colors.periwinkle}"
    textColor: "{colors.blueprint}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "24px 32px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
---

# Design System: OwlCode

## Overview

**Creative North Star: "The Tech Owl"**

OwlCode is a solo developer's brand carried by one mark and two colors: a periwinkle (#7AA2F7) owl-with-circuit-motif on near-black (#11121A), with nothing else competing for attention. The system replaces an earlier ad-hoc "Blueprint" theme (cyan accent, gold CTA, Oswald type) with a locked, designer-specified identity: the brand's own manual fixes the palette and typography, and this build treats that manual as ground truth rather than a starting point to riff on. Roboto's ExtraLight/Bold contrast — thin, wide display type against bold, tracked labels — does the expressive work that color is not allowed to do, since periwinkle is the *only* accent in the system, full stop, including status indicators.

**Key Characteristics:**
- One accent color, no exceptions — not for status dots, not for a "just this once" second hue.
- Sharp-cornered CTAs against rounded inputs, icon buttons, and chips — a deliberate, consistent split, not an inconsistency.
- Thin ExtraLight display type paired with bold, uppercase, wide-tracked labels — the type pairing carries hierarchy instead of color.
- No kicker/eyebrow lines above headings, even where the source brand mockup used one — the heading always carries its own weight.
- The brand mark itself (isotipo) is usable as hero-scale imagery, not just a small nav glyph — it is confident enough to anchor a first viewport on its own.

## Colors

A two-color system by deliberate constraint: one accent, one near-black ground. Everything else is a tint or a neutral in service of contrast, never a third hue.

### Primary
- **Periwinkle** (`#7AA2F7`): the sole accent. Every border, icon, CTA (outline and solid), focus ring, link hover, active nav state, status indicator, and the isotipo/wordmark itself. If a screen needs to signal "this matters," it is periwinkle — there is no second accent to reach for.

### Neutral
- **Blueprint** (`#11121A`): page background, and the fill on text sitting atop a solid periwinkle surface (buttons, badges).
- **Surface** (`#171923`): card, panel, input, and form-field backgrounds — a step up from the page background, never a hard-edged white card.
- **Ink** (`#F2F4FC`): primary text and headings.
- **Ink Muted** (`#98A2C7`): secondary/body copy, placeholder text, and inactive nav labels — tinted from the periwinkle hue rather than a neutral gray, so muted text still reads as part of the same world. Verified ≥4.5:1 contrast against both `blueprint` and `surface`.

### Named Rules
**The Sole Accent Rule.** Periwinkle is the only accent color anywhere in the interface — including semantic status dots ("Disponible para proyectos" uses periwinkle, not green). The one deliberate exception is the contact form's error state, which uses a restrained red because error semantics are a near-universal usability affordance, not a brand accent; it never appears as decoration or CTA color.

## Typography

**Display Font:** Roboto ExtraLight (200)
**Label/Button Font:** Roboto Bold (700)
**Body Font:** Roboto Regular (400)

**Character:** A single family carrying two extremes of its own weight axis — hairline-thin display headlines against dense, tracked, uppercase labels — so hierarchy comes from weight contrast within one typeface, not from mixing faces.

### Hierarchy
- **Display** (200, `text-4xl` to `text-6xl`, leading 0.95, uppercase): hero and major section headings. Never gets a kicker line above it — the heading itself is always the first thing read.
- **Label** (700, `text-xs`–`text-sm`, tracking-widest, uppercase): nav items, buttons, chips, form field labels.
- **Body** (400, `text-sm`, leading relaxed): paragraphs, descriptions, form placeholder text.

### Named Rules
**The No-Kicker Rule.** No small label, eyebrow, or tagline sits above a heading. Identity or context information that would have lived in a kicker belongs in the nav, the copy itself, or is simply dropped rather than staged as a kicker.

## Layout

Single-column content stacked in generous vertical rhythm on a `max-w-screen-xl` centered container, switching to side-by-side (text + visual) only in the hero. Section headings are centered; body content within sections is left-aligned in cards and lists. Responsive collapse is conventional (stacked columns, hamburger nav) below the `lg` breakpoint — the brand statement lives in color, type, and the mark, not in bespoke responsive choreography.

## Elevation & Depth

Flat by default. Depth comes from three devices, never from drop shadows on flat cards: (1) a translucent periwinkle hairline border (`border-brand-accent/15` to `/30`) separating a surface from the page background, (2) a top-edge accent line (a periwinkle gradient, transparent → periwinkle/40 → transparent) on featured cards, and (3) for the hero mark specifically, a soft radial periwinkle glow behind the icon plus a `drop-shadow` under the icon itself — the one place in the system that earns a genuine soft-blur shadow, because it is the brand mark, not a content card.

### Named Rules
**The Flat Card Rule.** Cards and panels never carry a box-shadow. A hairline border and a background-color step (surface vs. blueprint) are the entire depth vocabulary for content containers.

## Shapes

### Named Rules
**The Sharp CTA Rule.** Buttons that trigger an action (outline or solid CTAs) are always sharp-cornered rectangles — zero border-radius. Everything else — text inputs, selects, textareas, icon-only buttons, chips/tags, the mobile menu panel — is rounded (`rounded-lg` for form fields, `rounded-full` for icon buttons and chips). The split is deliberate: action takes a stamped, technical edge; input and navigation take a softer one.

## Components

### Buttons
- **Outline (default CTA):** transparent background, periwinkle border and text, sharp corners, bold uppercase tracked label. Hover fills solid periwinkle with `blueprint`-colored text (never white — white-on-periwinkle fails contrast).
- **Solid:** periwinkle background, `blueprint` text, sharp corners — reserved for the single highest-priority CTA per section (e.g. the "Hablemos" strip), not used for repeated card-level actions.
- **Ghost/link:** no border or fill, `ink-muted` text that brightens to `ink` on hover, used for secondary actions beside a primary CTA.

### Cards / Containers
- **Corner Style:** `rounded` (small radius), consistent across service cards, project cards, form panels.
- **Background:** `surface` (#171923).
- **Border:** hairline periwinkle at 15–30% opacity; a featured/highlighted card increases to the higher end of that range on hover, never adds a second color.
- **Top accent line:** an optional 1px gradient line (transparent → periwinkle/40 → transparent) along the card's top edge on cards meant to read as "featured."

### Inputs / Fields
- **Style:** `surface` background, hairline periwinkle border, `rounded-lg`.
- **Focus:** border and ring shift to full-opacity periwinkle.
- **Placeholder:** `ink-muted`.
- **Error state:** the containing alert uses a uniform (not side-accented) dark red border/background — a semantic exception to the sole-accent rule, reserved for genuine error states only.

### Navigation
- Fixed-position dark (`blueprint`) bar with a hairline periwinkle bottom border. Wordmark is "OWL" (ExtraLight) + isotipo + "CODE" (Bold), all periwinkle. Nav links are `label` typography in `ink-muted`, brightening to `ink` on hover/active; icons use `currentColor` so they inherit that same state transition rather than being hardcoded white. Mobile collapses to a hamburger revealing a bordered dropdown panel.

### Brand Mark (signature component)
The isotipo (owl-with-circuit mark) is usable at hero scale: centered inside a periwinkle-ringed circle with a soft radial glow and a drop-shadow beneath the mark itself. This is the one context in the system where the mark carries a whole viewport rather than sitting small beside a wordmark — used deliberately in place of generic stock illustration.

## Do's and Don'ts

### Do:
- **Do** use periwinkle (`#7AA2F7`) as the only accent, everywhere — icons, borders, CTAs, focus states, status indicators.
- **Do** keep CTA buttons sharp-cornered while inputs, icon buttons, and chips stay rounded.
- **Do** use Roboto ExtraLight for display headlines and Roboto Bold for labels/buttons — no other typeface.
- **Do** build depth with hairline borders, background-color steps, and (for the brand mark only) a soft glow/drop-shadow — never a box-shadow on a content card.
- **Do** tint secondary text from the periwinkle hue (`ink-muted`), never plain gray.

### Don't:
- **Don't** introduce a second or third accent hue for any reason, including "just for this one status dot" — that is exactly how the old gold accent crept in before this redesign.
- **Don't** add a kicker/eyebrow line above a heading, even if a reference mockup shows one — the craft floor bans this unconditionally.
- **Don't** hardcode icon stroke colors as `#fff`/`#ffffff`; use `currentColor` so icons inherit their parent's state transitions.
- **Don't** drop unrecolored, full-color stock illustration onto a brand-critical screen (hero, conversion-completion) — either integrate it into the two-color system or replace it with the brand mark itself.
