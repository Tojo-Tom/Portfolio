# Tojo Tom — Software Developer Portfolio Code & Layout Guide

This document provides a comprehensive, section-by-section breakdown of every code file in this repository:
- **`index.html`** (Semantic HTML Structure & Content)
- **`css/style.css`** (Design Tokens, Component Styling & Responsive Layout)
- **`js/main.js`** (Interactive Canvas, Particle Physics, Typewriter & Observer Scripts)

---

## 📑 File Structure & Overview

```text
Portfolio/
├── index.html          # HTML5 Document Structure & Sections
├── css/
│   └── style.css       # Design System Tokens, CSS Layout & Animations
├── js/
│   └── main.js         # JavaScript Logic (Particles, Observer, Typing, Form)
├── assets/
│   └── profile.jpg     # Profile avatar image asset
└── README.md           # This Code & Layout Guide
```

---

## 1. 🌐 HTML Markup (`index.html`) — Detailed Code Guide

### Head & Metadata (Lines 1 – 20)
- **`<!DOCTYPE html>` & `<html lang="en">`**: Declares HTML5 document type and sets primary language to English.
- **`<meta charset="UTF-8">` & `<meta name="viewport">`**: Sets UTF-8 text encoding and configures responsive mobile scaling (`width=device-width, initial-scale=1.0`).
- **`<meta name="description">` & `<meta name="author">`**: SEO metadata describing the developer profile and author info for search engines.
- **`<link rel="icon">`**: An inline SVG data URL (`⚡`) used as the site favicon without requiring an external image request.
- **`<link rel="stylesheet" href="css/style.css">`**: Imports the master stylesheet.

### Navigation Header (`#navbar`, Lines 23 – 45)
- **`<nav class="navbar" id="navbar">`**: Sticky container fixed at the top of the browser viewport.
- **`<a href="#hero" class="nav-logo">&lt;AM /&gt;</a>`**: Animated code-bracket brand logo (`<AM />`) linking back to hero top.
- **`<div class="nav-links" id="nav-links">`**: Navigation container holding smooth-scroll section anchor links (`#about`, `#skills`, `#projects`, `#experience`, and `#contact`).
- **`<div class="nav-hamburger" id="nav-hamburger">`**: Mobile menu trigger with 3 stacked `<span>` bars that transform into an "X" close icon when clicked.

### Hero Section (`#hero`, Lines 48 – 90)
- **`<canvas id="particle-canvas"></canvas>`**: Background 2D HTML5 canvas element managed by `js/main.js` to render interactive floating particles.
- **`<div class="hero-orb hero-orb--1">`, `--2`, `--3`**: Radial gradient background spheres styled in CSS with infinite floating keyframe animations and heavy blur.
- **`<div class="hero-content">`**: Flexbox centered content box:
  - `<span class="wave">👋</span>`: Waving hand emoji with CSS keyframe rotation.
  - `<span class="name-highlight">Tojo Tom</span>`: Main title heading styled with gradient text.
  - `<span id="typed-text"></span><span class="typed-cursor"></span>`: Dynamic text target where `main.js` types out developer titles.
  - `<div class="hero-buttons">`: Action button container holding "View Projects" and "Get in Touch" SVG icon buttons.

### About Section (`#about`, Lines 93 – 148)
- **`<div class="about-grid">`**: Two-column layout container:
  - **Left Column (`.about-image-wrapper`)**: Contains the avatar card frame (`.about-image-frame`) with an ambient gradient glow backdrop.
  - **Right Column (`.about-text`)**: Contains developer bio paragraphs and the metrics section (`.about-stats`).
- **`<div class="stat-number" data-count="5" data-suffix="+">0</div>`**: Metric counter targets. `main.js` reads `data-count` (e.g. 5) and `data-suffix` (e.g. "+") to increment from 0 to 5+ when scrolled into view.

### Skills Section (`#skills`, Lines 150 – 376)
- **Grid Layout**: Displays technical capabilities grouped into 4 domain cards (Frontend, Backend, Tools & DevOps, Core CS).
- **Skill Meters**: `<div class="skill-bar-fill" data-level="90"></div>`: Contains custom percentage levels. `main.js` reads `data-level` and smoothly expands the CSS width from `0%` to `90%` when visible.

### Projects Section (`#projects`, Lines 379 – 701)
- **Project Grid**: Showcases portfolio projects using `.glass-card` elements.
- **Each Project Card Contains**:
  - Tech stack tags (`<span class="tech-tag">`).
  - Project Title & detailed feature bullet points.
  - Action buttons linking to Live Demos and GitHub repositories with embedded SVG vector icons.

### Experience Section (`#experience`, Lines 704 – 770)
- **`<div class="timeline">`**: Timeline container featuring a central vertical gradient line drawn via CSS `::before` pseudo-element.
- **`<div class="timeline-item reveal-left">` / `reveal-right`**: Timeline nodes alternating left and right across the line. Contains job title, dates, company name, and key bullet achievements.

### Contact Section (`#contact`, Lines 773 – 871)
- **`<div class="contact-grid">`**: Two-column contact layout:
  - **Left Side (`.contact-info`)**: Direct email (`tojotom2003@gmail.com`), location info, status badge, and GitHub/LinkedIn SVG social links.
  - **Right Side (`.contact-form-card`)**: Interactive contact form (`#contact-form`) with inputs `#form-name`, `#form-email`, `#form-message`, error feedback containers (`.error-message`), and a hidden success card (`#form-success`).

### Footer (`footer`, Lines 874 – 887)
- **`<footer>`**: Bottom copyright bar with animated heart icon and back-to-top floating anchor (`<a href="#hero" class="back-to-top">↑</a>`).

---

## 2. 🎨 Stylesheet (`css/style.css`) — Detailed CSS Guide

### CSS Design System & Variables (`:root`, Lines 8 – 81)
- **Color Variables**:
  - `--bg-primary` (`#0a0a0f`): Dark midnight page background color.
  - `--bg-secondary` (`#12121a`): Slightly lighter background for alternating sections.
  - `--bg-card` (`rgba(255, 255, 255, 0.04)`): Glassmorphic semi-transparent card background.
  - `--accent-1` (`#6C63FF`), `--accent-2` (`#00D4AA`), `--accent-3` (`#FF6B9D`), `--accent-4` (`#FFA63E`): Accent palette (Indigo, Emerald Teal, Coral Pink, Amber).
- **Gradients**: Linear 135deg gradients used for heading text clip (`-webkit-background-clip: text`) and accent button fills.
- **Typography Tokens**: `--font-heading` (`'Outfit'`), `--font-body` (`'Inter'`), font sizes `--fs-xs` through `--fs-5xl`.
- **Layout Variables**: `--max-width: 1200px`, `--nav-height: 72px`.

### Base Styles & Custom Scrollbar (Lines 83 – 145)
- **`*` Reset**: Zeroes margins/paddings across browser defaults and sets `box-sizing: border-box`.
- **`html`**: Sets `scroll-behavior: smooth` and `scroll-padding-top: var(--nav-height)` so anchored jumps don't hide section titles under the fixed navbar.
- **`::-webkit-scrollbar`**: Custom sleek 8px scrollbar styled with accent colors.

### Utility Classes & Glass Cards (Lines 147 – 216)
- **`.container`**: Restricts content to a max width of 1200px, centered horizontally (`margin: 0 auto`).
- **`.gradient-text`**: Applies gradient background and clips it to text outlines (`-webkit-background-clip: text; -webkit-text-fill-color: transparent;`).
- **`.glass-card`**: Creates translucent card tiles using `backdrop-filter: blur(12px)` and subtle border highlights.

### Entrance Animations (Lines 218 – 280)
- **`.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`**: Initial state has `opacity: 0` and translation offsets (`translateY(40px)`, `translateX(-40px)`, etc.).
- **`.visible`**: Applied by `main.js` via `IntersectionObserver` to transition opacity to `1` and transform to `0`.
- **`.stagger-children`**: Uses `nth-child` CSS transition delays (`0.05s`, `0.1s`, `0.15s`...) to cascade child element animations sequentially.

### Navbar Styling (Lines 282 – 434)
- **`.navbar`**: Fixed header layout.
- **`.navbar.scrolled`**: Adds frosted glass blur (`backdrop-filter: blur(20px)`) and semi-transparent background on page scroll.
- **`.nav-links a::after`**: Animated underline pseudo-element expanding from `width: 0` to `width: 100%` on hover or active link state.
- **`.nav-hamburger` & `@media (max-width: 768px)`**: Controls mobile slide-out navigation drawer (`right: -100%` ➔ `right: 0`) and transforms 3 hamburger bars into an "X".

### Hero & Particle Effects (Lines 436 – 520)
- **`.hero`**: Full-screen flex container (`min-height: 100vh; display: flex; align-items: center;`).
- **`#particle-canvas`**: Absolute positioning covering full hero area at `z-index: 0`.
- **`.hero-orb`**: Blurred floating gradient circles styled with `@keyframes float-orb` for continuous drifting animations.

### Timeline, Contact Form & Mobile Responsiveness (Lines 700 – 1441)
- **`.timeline::before`**: Vertical gradient line down the center of the experience timeline.
- **`.contact-form-card`**: Card styling for input fields, focus glow rings, and error state transitions.
- **Form Error Class (`.form-group.error`)**: Highlights input borders in red and displays the corresponding `.error-message`.
- **Media Queries (`@media (max-width: 992px)`, `@media (max-width: 768px)`)**: Converts two-column grids into single-column layouts for mobile phones and tablets.

---

## 3. ⚡ JavaScript Logic (`js/main.js`) — Detailed JS Guide

### DOM Initialization (Lines 5 – 14)
```javascript
document.addEventListener('DOMContentLoaded', () => { ... });
```
Ensures all HTML elements are parsed before launching JS modules.

### Particle Physics Engine (`initParticles()`, Lines 19 – 142)
1. **Canvas Setup**: Obtains 2D rendering context (`ctx = canvas.getContext('2d')`) and scales canvas resolution on resize (`resize()`).
2. **Particle Class**:
   - Spawns 80 particles with random positions (`x`, `y`), radii (`size`), velocities (`vx`, `vy`), and colors.
   - `update()`: Moves particles each frame and reverses velocity (`vx *= -1`) when colliding with canvas borders.
   - **Mouse Repulsion**: Calculates Euclidean distance to cursor (`Math.sqrt(dx*dx + dy*dy)`). If within 150px, applies outward force vector.
3. **Connecting Vector Lines (`drawLines()`)**:
   - Loops over particle pairs `(i, j)`. If distance `< 150px`, calculates line opacity `alpha = (1 - dist / maxDistance) * 0.15` and renders connecting line via `ctx.stroke()`.
4. **Animation Loop (`animate()`)**:
   - Uses `requestAnimationFrame(animate)` to clear and redraw canvas frames at 60 FPS.

### Typewriter Engine (`initTypingEffect()`, Lines 148 – 191)
- Maintains state variables `phraseIndex`, `charIndex`, and boolean `isDeleting`.
- Uses `substring(0, charIndex)` to update text inside `#typed-text`.
- Dynamically adjusts delay speed (`80ms` typing, `40ms` erasing, `2000ms` pause at word end) and calls `setTimeout(type, speed)`.

### Scroll Reveal Observer (`initScrollReveal()`, Lines 197 – 221)
- Instantiates an `IntersectionObserver` observing all `.reveal` target elements.
- When an element enters the viewport threshold (`0.15`), adds the CSS class `.visible` to start keyframe/transition animations.

### Navbar & Scroll Tracking (`initNavbar()`, Lines 227 – 280)
- Listens to `window.addEventListener('scroll')`.
- Adds `.scrolled` class when scroll position `window.scrollY > 50`.
- Calculates current section scroll bounds (`top <= scrollY < top + height`) to update active navigation link underlines (`.nav-links a.active`).

### Skill Bars & Stat Counters (`initSkillBars()`, `initCounterAnimation()`, Lines 302 – 366)
- **Skill Bars**: Reads `data-level` attribute from HTML and sets `bar.style.width = level + '%'`.
- **Metric Counter (`animateCounter()`)**: Calculates step increments over `1500ms` using `setInterval` to count numbers from `0` to target (e.g. `0` ➔ `5+`).

### Form Validation Engine (`initContactForm()`, Lines 372 – 419)
- Intercepts form `submit` event via `e.preventDefault()`.
- Validates 3 conditions:
  1. **Name**: `name.value.trim()` must not be empty.
  2. **Email**: Must match regular expression `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  3. **Message**: `message.value.trim().length` must be `>= 10`.
- If invalid, adds `.error` class to highlight inputs.
- If valid, hides form inputs, displays `#form-success` card with a 🎉 confirmation, and resets form inputs after 4 seconds.
