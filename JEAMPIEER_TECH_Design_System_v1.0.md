
# Design System — JEAMPIEER.TECH

> Orbital Signal — Personal Portfolio Design Specification (v1.0)

## Vision
A cinematic, bilingual portfolio inspired by Dune, Interstellar, Avatar and Three Body Problem. Minimal dark interface with cyan/turquoise accents.

## Brand Pillars
- Premium engineering.
- Science fiction without looking like a game UI.
- Minimalism first.
- Smooth motion.
- Product-quality polish.

## Color Tokens

| Token | Value | Usage |
|---|---|---|
| bg-primary | #0F1115 | Main background |
| bg-secondary | #171A21 | Sections |
| surface | #1D2230 | Cards |
| border | #2B3342 | Borders |
| accent | #59E1E7 | Primary cyan |
| accent-hover | #7EEBF0 | Hover |
| accent-soft | #1F4E57 | Glow |
| text-primary | #E8EDF2 | Main text |
| text-secondary | #98A2B3 | Secondary text |
| success | #3DDC97 | Success |
| warning | #F5C451 | Warning |
| danger | #FF6B6B | Error |

## Typography

Primary: Geist
Headings: Space Grotesk
Mono: IBM Plex Mono

### Scale
- Hero: 72/64/48
- H1: 56
- H2: 40
- H3: 32
- H4: 24
- Body: 18
- Caption: 14

## Spacing
8px spacing system.
Container max width 1280px.

## Grid
12-column desktop.
8-column tablet.
4-column mobile.

## Responsive Breakpoints
- xs: 360
- sm: 640
- md: 768
- lg: 1024
- xl: 1280
- 2xl: 1536

## Navigation
Transparent navbar.
Blur after scroll.
Language toggle ES/EN.
CTA Download CV.

## Page Structure
1 Hero
2 Identity Signal
3 Orbital Timeline
4 Mission Archive
5 Engineering Arsenal
6 Labs
7 Contact

## Hero
- Typewriter intro.
- Photo with cyan orbital ring.
- CTA buttons.
- Background stars and particles.

## Identity Signal
Four cards:
- About.
- Values.
- Interests.
- Current Mission.

## Timeline
Vertical animated timeline.

## Mission Archive
Project cards include:
- Problem.
- Architecture.
- Technologies.
- Impact.
- Gallery.
- Learnings.

## Engineering Arsenal
Grouped by:
- Frontend.
- Backend.
- Cloud.
- AI.
- Tools.

Never use skill percentages.

## Motion System

### Entrance
Fade + 24px translate.

### Hover
Scale 1.02
Border cyan glow.

### Scroll
Reveal once.

### Background
Slow particle drift.

## Three.js Rules
Only decorative.
FPS friendly.
Disable on low-end mobile.

## Components

### Buttons
Primary cyan.
Secondary outline.
Ghost transparent.

### Cards
Hover elevation.

### Inputs
Minimal outlines.
Cyan focus ring.

## Accessibility
WCAG AA contrast.
Keyboard navigation.
Reduced motion support.


## Internationalization
Next.js
Routes:
- /es
- /en

## Folder Structure


## Codex Rules
- Use TypeScript everywhere.
- App Router only.
- Tailwind v4.
- Framer Motion for animations.
- No Ant Design.
- Reusable components.
- Semantic HTML.
- Mobile-first.
- White mode and Dark mode.
- Respect color tokens.

## Posible Futures
- Blog.
- Three.js planet.
- Interactive constellation.
