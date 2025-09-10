---
rationale: Complete front-end design system specification for Eugene Strat Phase 1, defining neo-brutalist components with organic warmth for strategic project visualization
version: 1.1.0
changelog:
  - 1.0.0: Initial comprehensive front-end specification with TacticalMap wireframes, bento-style modal, and complete component library
  - 1.1.0: Updated for Tailwind CSS v4 compatibility and React 19 patterns (CSS-first configuration, @theme directive, ref prop handling)
links:
  - docs/brief.md: Product vision and feature requirements
  - docs/prd.md: Technical requirements and user stories
  - docs/architecture.md: Fullstack technical architecture alignment
  - docs/reference/: Reference implementation for inspiration
---

# Eugene Strat Front-End Design System

## Executive Summary

Eugene Strat's front-end implements a **Neo-Brutalist Professional Minimalism with Organic Warmth** design philosophy built on **Tailwind CSS v4 + React 19 + Next.js 15**. The interface eliminates cognitive friction through visual clarity, enabling strategic decision-making via a cost/benefit matrix visualization. Key characteristics include 4px black borders, aggressive shadows, bold typography, and hand-drawn grid effects that feel "drawn with pencil" while maintaining professional impact.

**Core Principle**: Strategic thinking through visual clarity—no progressive disclosure, no hidden complexity, immediate helicopter view of project landscape.

**Technology Alignment**: This specification aligns with `docs/architecture.md` modern stack: Tailwind CSS v4 (5x faster builds, P3 color support), React 19 (ref as standard prop), and Next.js 15 App Router patterns for optimal performance and developer experience.

## Design Philosophy

### Neo-Brutalist Core
- **Raw Power**: 4px black borders on ALL interactive elements
- **Aggressive Shadows**: 4px base, 6px hover, 2px active states
- **Bold Typography**: Font-weight 900, uppercase, generous letter-spacing
- **High Contrast**: Yellow (#FDE047) primary, black text, no subtle grays
- **Sharp Edges**: No border-radius, uncompromising geometric forms

### Organic Warmth Layer
- **Hand-Drawn Grid**: SVG filters create pencil-sketch effect
- **Crayon Background**: Warm grey (#e8e8e6) like pencil on paper
- **Subtle Texture**: Paper grain and displacement effects
- **Human Touch**: Imperfect lines while maintaining brutal impact

### Color Strategy
- **Yellow Dominance**: #FDE047 for all primary actions and selections
- **Black Structure**: Borders, text, and shadows for definition
- **Crayon Grey**: #e8e8e6 background with organic warmth
- **Strategic Accent**: Page-specific colors for spatial navigation (future)

## 1. Design Tokens & Tailwind v4 Theme Configuration

### Tailwind v4 CSS-First Configuration
```css
@import "tailwindcss";

@theme {
  --font-family-primary: system-ui, -apple-system, sans-serif;
  --font-family-mono: Monaco, 'Cascadia Code', 'Fira Code', monospace;
  
  /* Color System - Enhanced with P3 Gamut Support */
  --color-yellow-primary: #FDE047;
  --color-grey-crayon: #e8e8e6;     /* Warm pencil-on-paper */
  --color-grey-grid: #d4d4d2;       /* Soft grid lines */
  --color-grey-unselected: #9ca3af; /* Unselected states */
  --color-black: #000000;
  --color-white: #ffffff;

  /* Page-Specific Colors (Future) */
  --color-tactical: #FDE047;  /* Yellow */
  --color-focus: #CFE820;     /* Yellow-Green */
  --color-data: #E5B6E5;      /* Pink */
  --color-prime: #2563EB;     /* Blue */

  /* Typography Scale */
  --font-size-display: 3rem;
  --font-size-heading: 2rem;
  --font-size-subheading: 1.25rem;
  --font-size-body: 1rem;
  --font-size-caption: 0.875rem;

  /* Typography Weights */
  --font-weight-black: 900;
  --font-weight-bold: 700;
  --font-weight-normal: 500;

  /* Letter Spacing */
  --letter-spacing-wider: 0.05em;
  --letter-spacing-wide: 0.04em;
  --letter-spacing-normal: 0.02em;

  /* Spacing System */
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 1.5rem;   /* 24px */
  --spacing-lg: 2rem;     /* 32px */
  --spacing-xl: 3rem;     /* 48px */
  --spacing-2xl: 4rem;    /* 64px */

  /* Custom Design System Variables */
  --border-standard: 4px solid theme(colors.black);
  --border-emphasis: 6px solid theme(colors.black);
  --border-subtle: 2px solid theme(colors.black);

  --shadow-base: 4px 4px 0px theme(colors.black);
  --shadow-hover: 6px 6px 0px theme(colors.black);
  --shadow-active: 2px 2px 0px theme(colors.black);
  --shadow-large: 8px 8px 0px theme(colors.black);

  /* Layout Constants */
  --header-height: 60px;
  --matrix-size: 800px;
  --modal-width: 900px;
  --modal-height: 700px;
  --nav-size: 48px;
}
```

### Font System
```css
/* Primary Interface Font */
.font-primary {
  font-family: system-ui, -apple-system, sans-serif;
}

/* Monospace for Data */
.font-mono {
  font-family: Monaco, 'Cascadia Code', 'Fira Code', monospace;
}

/* Typography Classes */
.text-display {
  font-size: var(--font-display);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  line-height: 1.1;
}

.text-heading {
  font-size: var(--font-heading);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  line-height: 1.2;
}

.text-subheading {
  font-size: var(--font-subheading);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  line-height: 1.3;
}

.text-body {
  font-size: var(--font-body);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-normal);
  line-height: 1.4;
}

.text-mono {
  font-family: Monaco, monospace;
  font-size: var(--font-body);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
}
```

## 2. SVG Filters for Organic Effects

### Complete Filter Definitions
```svg
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <defs>
    <!-- Pencil sketch effect for grid lines -->
    <filter id="pencil-effect">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.02" 
        numOctaves="2" 
        seed="5" />
      <feDisplacementMap 
        in="SourceGraphic" 
        scale="0.8" />
      <feGaussianBlur 
        stdDeviation="0.2" />
    </filter>
    
    <!-- Paper texture background -->
    <filter id="paper-texture">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.04" 
        numOctaves="4" 
        seed="42" />
      <feColorMatrix 
        type="saturate" 
        values="0"/>
      <feComponentTransfer>
        <feFuncA 
          type="discrete" 
          tableValues="0 0.02 0.04 0.02 0"/>
      </feComponentTransfer>
      <feComposite 
        operator="over" 
        in2="SourceGraphic"/>
    </filter>
    
    <!-- Hand-drawn border wobble -->
    <filter id="hand-drawn-border">
      <feTurbulence 
        type="turbulence" 
        baseFrequency="0.01" 
        numOctaves="1" 
        seed="10" />
      <feDisplacementMap 
        in="SourceGraphic" 
        scale="1.2" />
    </filter>

    <!-- Subtle grid line variation -->
    <filter id="grid-variation">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.015" 
        numOctaves="1" 
        seed="100" />
      <feDisplacementMap 
        in="SourceGraphic" 
        scale="0.5" />
    </filter>
  </defs>
</svg>
```

## 3. Universal Components

### App Header Component
```css
.app-header {
  height: var(--header-height);
  border-bottom: var(--border-standard);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-lg);
  background: var(--color-tactical);
  position: relative;
}

.header-left {
  flex-shrink: 0;
}

.header-logo {
  font-size: 1.5rem;
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--black);
}

.header-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}

.brain-dump-placeholder {
  background: var(--black);
  color: var(--white);
  border: var(--border-standard);
  padding: var(--space-sm) var(--space-md);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  box-shadow: var(--shadow-base);
  transition: all 100ms;
}

.brain-dump-placeholder:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-shrink: 0;
}

.header-menu-button {
  background: #f7f7f5;
  border: var(--border-standard);
  padding: var(--space-sm);
  box-shadow: var(--shadow-base);
  transition: all 100ms;
}

.header-menu-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}
```

### XP Display Widget (Inline with Title)
```css
.title-section {
  text-align: center;
  margin-bottom: var(--space-lg);
  position: relative;
}

.title-main {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: var(--space-xl);
  margin-bottom: var(--space-xs); /* Tighter spacing */
}

.strategic-title {
  font-size: var(--font-display);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--black);
}

.xp-display {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: Monaco, monospace;
  font-size: var(--font-body);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  color: var(--black);
}

.xp-icon {
  color: var(--yellow-primary);
  font-size: 1.2em;
  filter: drop-shadow(2px 2px 0px var(--black));
}

.subtitle {
  font-size: var(--font-subheading);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: rgba(0, 0, 0, 0.7);
  margin-top: var(--space-xs); /* Reduced from default */
}
```

### Quick-Nav (2×2 Grid)
```css
.quick-nav {
  position: fixed;
  bottom: var(--space-lg);
  right: var(--space-lg);
  display: grid;
  grid-template-columns: var(--nav-size) var(--nav-size);
  grid-template-rows: var(--nav-size) var(--nav-size);
  gap: 4px;
  background: var(--white);
  border: var(--border-standard);
  padding: 4px;
  box-shadow: var(--shadow-base);
  z-index: 50;
}

.nav-button {
  border: var(--border-standard);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: var(--weight-black);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: var(--tracking-wide);
  transition: all 100ms;
  cursor: pointer;
  opacity: 0.5; /* All dimmed by default */
}

.nav-button.active {
  opacity: 1;
  box-shadow: 2px 2px 0px var(--black);
}

.nav-button:hover {
  transform: translate(-1px, -1px);
}

/* Page-specific colors (all visible) */
.nav-map { 
  background: var(--color-tactical);
  color: var(--black);
}

.nav-focus { 
  background: var(--color-focus);
  color: var(--black);
}

.nav-data { 
  background: var(--color-data);
  color: var(--black);
}

.nav-prime { 
  background: var(--color-prime);
  color: var(--white);
}

.nav-icon {
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
}
```

## 4. TacticalMap Page Layout

### Complete Page Wireframe Implementation
```css
.tactical-map-page {
  min-width: 1024px;
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--space-lg);
  background: #FFF8DC; /* Cream background */
}

.chart-container {
  max-width: 1280px;
  margin: 0 auto;
  background: var(--white);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
}

.chart-header {
  background: var(--yellow-primary);
  border-bottom: var(--border-standard);
  padding: var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.chart-title-section {
  display: flex;
  flex-direction: column;
}

.chart-title {
  font-size: 1.875rem; /* 30px */
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--black);
  margin-bottom: var(--space-xs);
}

.projects-visible {
  font-size: var(--font-body);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: rgba(0, 0, 0, 0.7);
  font-family: Monaco, monospace;
}

.chart-actions {
  display: flex;
  gap: var(--space-md);
}

.action-button {
  background: var(--yellow-primary);
  border: var(--border-standard);
  padding: var(--space-sm) var(--space-md);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  box-shadow: var(--shadow-base);
  transition: all 100ms;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.action-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

.action-button:active {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-active);
}
```

### Square Matrix (800×800px) Implementation
```css
.matrix-wrapper {
  display: flex;
  justify-content: center;
  padding: var(--space-lg);
}

.matrix-container {
  width: var(--matrix-size);
  height: var(--matrix-size);
  background: var(--grey-crayon);
  border: var(--border-standard);
  position: relative;
  filter: url(#paper-texture);
  overflow: visible;
}

/* Grid System */
.matrix-grid {
  position: absolute;
  inset: 0;
}

.grid-line {
  stroke: var(--grey-grid);
  stroke-width: 1px;
  filter: url(#grid-variation);
  opacity: 0.3;
}

.grid-line-major {
  stroke: var(--black);
  stroke-width: 4px;
  filter: url(#hand-drawn-border);
  opacity: 1;
}

/* Quadrant Labels */
.quadrant-label {
  position: absolute;
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--black);
}

.quadrant-title {
  font-size: 1.25rem;
  margin-bottom: var(--space-xs);
}

.quadrant-subtitle {
  font-size: var(--font-caption);
  font-weight: var(--weight-bold);
  color: rgba(0, 0, 0, 0.6);
  font-family: Monaco, monospace;
}

.quadrant-top-left {
  top: var(--space-md);
  left: var(--space-md);
}

.quadrant-top-right {
  top: var(--space-md);
  right: var(--space-md);
  text-align: right;
}

.quadrant-bottom-left {
  bottom: var(--space-md);
  left: var(--space-md);
}

.quadrant-bottom-right {
  bottom: var(--space-md);
  right: var(--space-md);
  text-align: right;
}

/* Axis Labels */
.axis-label {
  position: absolute;
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: rgba(0, 0, 0, 0.8);
  font-family: Monaco, monospace;
  font-size: 1.125rem;
}

.axis-benefit {
  top: 50%;
  left: -60px;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: center;
}

.axis-cost {
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
}
```

### Project Nodes with Rectangle Patterns
```css
.project-node {
  position: absolute;
  width: 32px;
  height: 32px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 100ms;
}

.project-rectangle {
  width: 100%;
  height: 100%;
  border: var(--border-standard);
  background: #f7f7f5;
  box-shadow: var(--shadow-base);
  position: relative;
  overflow: hidden;
}

.project-rectangle:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

.project-rectangle.high-priority {
  box-shadow: 4px 4px 0px #FFD700;
}

.project-rectangle.high-priority:hover {
  box-shadow: 6px 6px 0px #FFD700;
}

/* Pattern Implementations */
.pattern-work {
  background: #f7f7f5;
  background-image: 
    radial-gradient(circle at 2px 2px, #9ca3af 1px, transparent 1px),
    radial-gradient(circle at 6px 6px, #9ca3af 1px, transparent 1px),
    radial-gradient(circle at 10px 10px, #9ca3af 1px, transparent 1px);
  background-size: 8px 8px, 8px 8px, 8px 8px;
  background-position: 0 0, 4px 4px, 8px 8px;
}

.pattern-learn {
  background: #f7f7f5;
  background-image: repeating-linear-gradient(
    45deg,
    #9ca3af,
    #9ca3af 1.5px,
    transparent 1.5px,
    transparent 8px
  );
}

.pattern-build {
  background: #f7f7f5;
  background-image: 
    linear-gradient(#9ca3af 1px, transparent 1px),
    linear-gradient(90deg, #9ca3af 1px, transparent 1px);
  background-size: 6px 6px;
}

.pattern-manage {
  background: #f7f7f5;
  background-image: repeating-linear-gradient(
    0deg,
    #9ca3af,
    #9ca3af 1.5px,
    transparent 1.5px,
    transparent 6px
  );
}

/* Boss Battle Overlay */
.boss-battle-star {
  position: absolute;
  top: -4px;
  right: -4px;
  color: var(--yellow-primary);
  font-size: 14px;
  font-weight: var(--weight-black);
  text-shadow: 
    1px 1px 0px var(--black),
    -1px -1px 0px var(--black),
    1px -1px 0px var(--black),
    -1px 1px 0px var(--black);
  z-index: 10;
}

/* Deadline Pulse Animation */
.project-deadline-pulse {
  animation: pulse-gentle 2s ease-in-out infinite;
}

@keyframes pulse-gentle {
  0%, 100% { 
    transform: scale(1); 
    opacity: 1; 
  }
  50% { 
    transform: scale(1.05); 
    opacity: 0.9; 
  }
}
```

### Legend Below Matrix
```css
.matrix-legend {
  margin-top: var(--space-lg);
  padding: var(--space-md);
  background: var(--white);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
}

.legend-title {
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  margin-bottom: var(--space-md);
  color: var(--black);
}

.legend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-md);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.legend-pattern {
  width: 24px;
  height: 24px;
  border: 2px solid var(--black);
  flex-shrink: 0;
}

.legend-text {
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  font-size: var(--font-caption);
}

.legend-special {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-top: var(--space-sm);
  padding-top: var(--space-sm);
  border-top: 2px solid var(--black);
}

.legend-special-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-caption);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
  font-family: Monaco, monospace;
}
```

## 5. Bento-Style Project Creation Modal

### Modal Container & Layout
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-container {
  width: var(--modal-width);
  max-width: 90vw;
  height: var(--modal-height);
  max-height: 90vh;
  background: #d1d5db;
  border: var(--border-standard);
  box-shadow: var(--shadow-large);
  display: flex;
  flex-direction: column;
}

.modal-header {
  background: var(--yellow-primary);
  border-bottom: var(--border-standard);
  padding: var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--black);
}

.modal-subtitle {
  font-size: var(--font-body);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: rgba(0, 0, 0, 0.8);
}

.modal-body {
  flex: 1;
  padding: var(--space-md);
  overflow-y: auto;
}
```

### Bento Grid Layout
```css
.bento-form {
  display: grid;
  gap: var(--space-md);
  height: 100%;
}

/* Project Name - Full Width */
.field-project-name {
  grid-column: 1 / -1;
}

.field-label {
  display: block;
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--black);
  margin-bottom: var(--space-sm);
}

.field-input {
  width: 100%;
  background: var(--white);
  border: var(--border-standard);
  box-shadow: 4px 4px 0px var(--yellow-primary);
  padding: var(--space-sm);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--black);
  font-family: Monaco, monospace;
  font-size: 1.125rem;
  transition: all 100ms;
}

.field-input:focus {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--yellow-primary);
  outline: none;
}

.field-input::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

/* Cost/Benefit Row */
.fields-cost-benefit {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.field-cost, .field-benefit {
  background: var(--white);
  border: var(--border-standard);
  padding: var(--space-md);
}

.field-cost-title, .field-benefit-title {
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--black);
  margin-bottom: var(--space-sm);
}

.field-select {
  width: 100%;
  background: var(--white);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
  padding: var(--space-sm);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  color: var(--black);
  font-family: Monaco, monospace;
  transition: all 100ms;
}

.field-select:focus {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

.field-guidance {
  margin-top: var(--space-sm);
  font-size: var(--font-caption);
  font-weight: var(--weight-bold);
  color: rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
  letter-spacing: var(--tracking-normal);
}

/* Category/Priority Row */
.fields-category-priority {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.field-category {
  background: var(--white);
  border: var(--border-standard);
  padding: var(--space-md);
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  margin-top: var(--space-sm);
}

.category-button {
  border: var(--border-standard);
  padding: var(--space-sm);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  transition: all 100ms;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}

.category-button.selected {
  background: var(--yellow-primary);
  color: var(--black);
  box-shadow: var(--shadow-base);
}

.category-button:not(.selected) {
  background: var(--grey-unselected);
  color: var(--white);
}

.category-button:hover {
  transform: translate(-1px, -1px);
}

.category-label {
  font-size: var(--font-body);
  margin-bottom: 2px;
}

.category-description {
  font-size: var(--font-caption);
  font-weight: var(--weight-normal);
  opacity: 0.8;
}

.field-priority-status {
  background: var(--white);
  border: var(--border-standard);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.priority-group, .status-group {
  display: flex;
  gap: var(--space-xs);
}

.priority-button, .status-button {
  flex: 1;
  border: var(--border-standard);
  padding: var(--space-xs) var(--space-sm);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  font-size: var(--font-caption);
  transition: all 100ms;
  cursor: pointer;
}

.priority-button.selected, .status-button.selected {
  background: var(--yellow-primary);
  color: var(--black);
}

.priority-button:not(.selected), .status-button:not(.selected) {
  background: var(--grey-unselected);
  color: var(--white);
}
```

### Confidence Scale Implementation
```css
.field-confidence {
  grid-column: 1 / -1;
  background: var(--white);
  border: var(--border-standard);
  padding: var(--space-md);
}

.confidence-scale {
  display: flex;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
}

.confidence-option {
  flex: 1;
  border: var(--border-standard);
  padding: var(--space-sm) var(--space-xs);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  font-size: var(--font-caption);
  transition: all 100ms;
  cursor: pointer;
  text-align: center;
  position: relative;
}

.confidence-option.selected {
  background: var(--yellow-primary);
  color: var(--black);
}

.confidence-option:not(.selected) {
  background: var(--grey-unselected);
  color: var(--white);
}

.confidence-number {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: var(--weight-bold);
  color: rgba(0, 0, 0, 0.6);
  font-family: Monaco, monospace;
}

/* Tags/Due Date Row */
.fields-tags-date {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.field-tags, .field-date {
  background: var(--white);
  border: var(--border-standard);
  padding: var(--space-md);
}

.field-date input[type="date"] {
  width: 100%;
  background: var(--white);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
  padding: var(--space-sm);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  color: var(--black);
  font-family: Monaco, monospace;
}

/* Description - Full Width */
.field-description {
  grid-column: 1 / -1;
  background: var(--white);
  border: var(--border-standard);
  padding: var(--space-md);
}

.field-textarea {
  width: 100%;
  background: var(--white);
  border: var(--border-standard);
  box-shadow: 4px 4px 0px var(--grey-unselected);
  padding: var(--space-sm);
  font-weight: var(--weight-bold);
  color: var(--black);
  font-family: Monaco, monospace;
  resize: vertical;
  min-height: 80px;
  transition: all 100ms;
}

.field-textarea:focus {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--grey-unselected);
  outline: none;
}

/* Modal Actions */
.modal-actions {
  display: flex;
  justify-content: space-between;
  padding: var(--space-md);
  border-top: var(--border-standard);
  background: #d1d5db;
}

.button-cancel, .button-create {
  border: var(--border-standard);
  padding: var(--space-sm) var(--space-md);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  transition: all 100ms;
  cursor: pointer;
  box-shadow: var(--shadow-base);
}

.button-cancel {
  background: var(--grey-unselected);
  color: var(--white);
}

.button-create {
  background: var(--yellow-primary);
  color: var(--black);
}

.button-cancel:hover, .button-create:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

.button-cancel:active, .button-create:active {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-active);
}
```

## 6. Animation System (Framer Motion)

### Core Animation Variants
```javascript
// Button Interaction Animation
export const buttonAnimation = {
  initial: { 
    scale: 1,
    x: 0,
    y: 0 
  },
  hover: { 
    x: -2, 
    y: -2,
    boxShadow: "6px 6px 0px #000000",
    transition: { duration: 0.1, ease: "easeOut" }
  },
  tap: { 
    x: 2, 
    y: 2,
    boxShadow: "2px 2px 0px #000000",
    transition: { duration: 0.05, ease: "easeOut" }
  }
}

// XP Counter Animation
export const xpCounterAnimation = {
  initial: { 
    scale: 0.8, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 15,
      duration: 0.3
    }
  },
  update: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
}

// Project Placement Animation
export const projectPlaceAnimation = {
  initial: { 
    scale: 0, 
    opacity: 0,
    rotate: -180 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    rotate: 0,
    transition: { 
      duration: 0.3,
      ease: "backOut",
      delay: 0.1
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    rotate: 180,
    transition: {
      duration: 0.2,
      ease: "backIn"
    }
  }
}

// Modal Enter/Exit Animation
export const modalAnimation = {
  initial: { 
    scale: 0.9, 
    opacity: 0,
    y: 50 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.4
    }
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
}

// Page Transition Animation
export const pageTransition = {
  initial: { 
    opacity: 0,
    x: 20 
  },
  animate: { 
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut" 
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
}

// Deadline Pulse Animation
export const deadlinePulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Achievement Notification
export const achievementAnimation = {
  initial: { 
    y: 100, 
    opacity: 0,
    scale: 0.8 
  },
  animate: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 500,
      damping: 20
    }
  },
  exit: {
    y: -100,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
}

// Boss Battle Star Animation
export const bossBattleAnimation = {
  initial: { 
    scale: 0,
    rotate: -360 
  },
  animate: { 
    scale: 1,
    rotate: 0,
    transition: { 
      type: "spring",
      stiffness: 600,
      damping: 15,
      delay: 0.2
    }
  },
  pulse: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}
```

### Animation Usage Examples (React 19 Compatible)
```jsx
// Button Component with Animation - React 19 Compatible
import { motion } from "framer-motion"
import { buttonAnimation } from "./animations"

const BrutalButton = ({ children, onClick, variant = "primary", ref, ...props }) => (
  <motion.button
    ref={ref}
    className={`brutal-button ${variant}`}
    onClick={onClick}
    variants={buttonAnimation}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    {...props}
  >
    {children}
  </motion.button>
)

// XP Counter with Update Animation
const XPDisplay = ({ points, isUpdating }) => (
  <motion.div
    className="xp-display"
    variants={xpCounterAnimation}
    initial="initial"
    animate={isUpdating ? "update" : "animate"}
  >
    <span className="xp-icon">⚡</span>
    <span className="xp-number">{points.toLocaleString()} Points</span>
  </motion.div>
)

// Project Node with Placement Animation
const ProjectNode = ({ project, position }) => (
  <motion.div
    className="project-node"
    style={{ left: `${position.x}%`, top: `${position.y}%` }}
    variants={projectPlaceAnimation}
    initial="initial"
    animate="animate"
    exit="exit"
    layout
  >
    <div className={`project-rectangle pattern-${project.category}`}>
      {project.isBossBattle && (
        <motion.span
          className="boss-battle-star"
          variants={bossBattleAnimation}
          initial="initial"
          animate="animate"
        >
          ★
        </motion.span>
      )}
    </div>
  </motion.div>
)
```

## 7. Responsive Layout System

### Desktop-First Approach
```css
/* Base Layout Container */
.app-container {
  min-width: 1024px;
  max-width: 1440px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Page-Specific Layouts */
.page-layout {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-lg);
}

/* Matrix Container Centering */
.matrix-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

.matrix-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Grid System for Forms */
.form-grid {
  display: grid;
  gap: var(--space-md);
  max-width: 100%;
}

.form-grid-2 {
  grid-template-columns: 1fr 1fr;
}

.form-grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.form-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.form-full-width {
  grid-column: 1 / -1;
}

/* Viewport-Specific Adjustments */
@media (max-width: 1280px) {
  .page-content {
    padding: var(--space-md);
  }
  
  .matrix-container {
    width: 700px;
    height: 700px;
  }
}

@media (max-width: 1024px) {
  .app-container {
    min-width: 1024px; /* Maintain minimum */
    overflow-x: auto;
  }
}
```

## 8. State Management Patterns

### Component State Examples
```jsx
// TacticalMap Page State
const useTacticalMapState = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bossBattleProject, setBossBattleProject] = useState(null)
  const [xpPoints, setXPPoints] = useState(0)

  const handleProjectCreate = (projectData) => {
    // Validate coordinates
    const isPositionTaken = projects.some(
      p => p.cost === projectData.cost && p.benefit === projectData.benefit
    )
    
    if (isPositionTaken) {
      throw new Error('Position already occupied')
    }

    const newProject = {
      ...projectData,
      id: generateId(),
      created_at: new Date().toISOString()
    }

    setProjects(prev => [...prev, newProject])
    setIsModalOpen(false)
  }

  const handleBossBattleToggle = (projectId) => {
    setBossBattleProject(prev => prev === projectId ? null : projectId)
  }

  const handleProjectComplete = (projectId, accuracyRating) => {
    const project = projects.find(p => p.id === projectId)
    const xpEarned = project.cost * project.benefit * 10 * (bossBattleProject === projectId ? 2 : 1)
    
    setXPPoints(prev => prev + xpEarned)
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, status: 'completed', accuracy: accuracyRating } : p
    ))
  }

  return {
    projects,
    selectedProject,
    isModalOpen,
    bossBattleProject,
    xpPoints,
    handleProjectCreate,
    handleBossBattleToggle,
    handleProjectComplete,
    setIsModalOpen,
    setSelectedProject
  }
}

// Project Form State
const useProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    benefit: '',
    category: '',
    priority: '',
    status: 'focus',
    confidence: '',
    tags: '',
    dueDate: '',
    description: ''
  })

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      cost: '',
      benefit: '',
      category: '',
      priority: '',
      status: 'focus',
      confidence: '',
      tags: '',
      dueDate: '',
      description: ''
    })
  }

  const validateForm = () => {
    const required = ['name', 'cost', 'benefit', 'category', 'priority', 'confidence']
    return required.every(field => formData[field])
  }

  return {
    formData,
    updateField,
    resetForm,
    validateForm,
    isValid: validateForm()
  }
}
```

## 9. Utility Classes & Helpers

### Neo-Brutalist Utility Classes
```css
/* Button Utilities */
.btn-brutal {
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
  font-weight: var(--weight-black);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  transition: all 100ms;
  cursor: pointer;
}

.btn-brutal:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

.btn-brutal:active {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-active);
}

.btn-primary {
  background: var(--yellow-primary);
  color: var(--black);
}

.btn-secondary {
  background: var(--grey-unselected);
  color: var(--white);
}

.btn-danger {
  background: #dc2626;
  color: var(--white);
}

/* Input Utilities */
.input-brutal {
  background: var(--white);
  border: var(--border-standard);
  box-shadow: 4px 4px 0px var(--yellow-primary);
  padding: var(--space-sm);
  font-weight: var(--weight-bold);
  transition: all 100ms;
}

.input-brutal:focus {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--yellow-primary);
  outline: none;
}

/* Card Utilities */
.card-brutal {
  background: var(--white);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
  padding: var(--space-md);
}

.card-brutal-hover:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

/* Selection State Utilities */
.selected {
  background: var(--yellow-primary) !important;
  color: var(--black) !important;
  font-weight: var(--weight-black);
}

.unselected {
  background: var(--grey-unselected) !important;
  color: var(--white) !important;
}

/* Spacing Utilities */
.space-xs { margin: var(--space-xs); }
.space-sm { margin: var(--space-sm); }
.space-md { margin: var(--space-md); }
.space-lg { margin: var(--space-lg); }
.space-xl { margin: var(--space-xl); }

.gap-xs { gap: var(--space-xs); }
.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
.gap-lg { gap: var(--space-lg); }
.gap-xl { gap: var(--space-xl); }

/* Typography Utilities */
.text-uppercase {
  text-transform: uppercase;
}

.text-bold {
  font-weight: var(--weight-bold);
}

.text-black {
  font-weight: var(--weight-black);
}

.tracking-wide {
  letter-spacing: var(--tracking-wide);
}

.tracking-wider {
  letter-spacing: var(--tracking-wider);
}

/* Layout Utilities */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-center {
  display: grid;
  place-items: center;
}

/* Border Utilities */
.border-brutal {
  border: var(--border-standard);
}

.border-emphasis {
  border: var(--border-emphasis);
}

/* Shadow Utilities */
.shadow-base {
  box-shadow: var(--shadow-base);
}

.shadow-hover {
  box-shadow: var(--shadow-hover);
}

.shadow-large {
  box-shadow: var(--shadow-large);
}
```

### JavaScript Utilities
```javascript
// Coordinate Conversion Utilities
export const matrixUtils = {
  // Convert cost/benefit (1-10) to percentage position on 800px matrix
  coordsToPosition: (cost, benefit) => ({
    x: ((cost - 1) / 9) * 100, // 0% to 100%
    y: 100 - ((benefit - 1) / 9) * 100 // Inverted Y (top = high benefit)
  }),

  // Convert pixel position to cost/benefit coordinates
  positionToCoords: (x, y, matrixSize = 800) => ({
    cost: Math.round((x / matrixSize) * 9) + 1,
    benefit: Math.round(((matrixSize - y) / matrixSize) * 9) + 1
  }),

  // Check if position is occupied
  isPositionOccupied: (cost, benefit, projects) => 
    projects.some(p => p.cost === cost && p.benefit === benefit),

  // Generate unique coordinates
  generateUniqueCoords: (projects) => {
    for (let cost = 1; cost <= 10; cost++) {
      for (let benefit = 1; benefit <= 10; benefit++) {
        if (!isPositionOccupied(cost, benefit, projects)) {
          return { cost, benefit }
        }
      }
    }
    return null // Matrix full
  }
}

// XP Calculation Utilities
export const xpUtils = {
  calculateProjectXP: (cost, benefit, isBossBattle = false) => {
    const baseXP = cost * benefit * 10
    return isBossBattle ? baseXP * 2 : baseXP
  },

  calculateSessionXP: (duration, willpower) => {
    const multipliers = {
      high: 1.0,
      medium: 1.5,
      low: 2.0
    }
    return Math.round((10 + duration * 0.5) * multipliers[willpower])
  },

  formatXP: (xp) => xp.toLocaleString()
}

// Form Validation Utilities
export const validationUtils = {
  required: (value) => value && value.trim() !== '',
  
  range: (min, max) => (value) => {
    const num = parseInt(value)
    return num >= min && num <= max
  },

  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),

  uniqueCoordinate: (cost, benefit, projects, excludeId = null) => {
    return !projects.some(p => 
      p.id !== excludeId && p.cost === cost && p.benefit === benefit
    )
  }
}

// Animation Utilities
export const animationUtils = {
  // Staggered children animation
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },

  staggerChild: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  },

  // Count-up animation for numbers
  countUp: (from, to, duration = 1000, callback) => {
    const start = Date.now()
    const step = () => {
      const progress = Math.min((Date.now() - start) / duration, 1)
      const current = Math.floor(from + (to - from) * progress)
      callback(current)
      
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }
}

// Date Utilities
export const dateUtils = {
  isApproachingDeadline: (dueDate, daysThreshold = 3) => {
    if (!dueDate) return false
    const now = new Date()
    const due = new Date(dueDate)
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24))
    return diffDays <= daysThreshold && diffDays >= 0
  },

  formatDate: (date) => new Date(date).toLocaleDateString(),
  
  getWeekStart: () => {
    const now = new Date()
    const monday = new Date(now)
    monday.setDate(now.getDate() - now.getDay() + 1)
    monday.setHours(0, 0, 0, 0)
    return monday
  }
}
```

## 10. Implementation Checklist

### Phase 1 Core Components ✓
- [ ] Universal App Header with Brain Dump placeholder
- [ ] XP Display Widget (inline with title)
- [ ] 2×2 Quick Navigation Grid (all colors visible)
- [ ] Neo-brutalist Button System
- [ ] Input/Form Components with brutal styling

### TacticalMap Implementation ✓
- [ ] Square Matrix Container (800×800px)
- [ ] Organic Grid Lines with SVG filters
- [ ] Cost/Benefit Axes with proper labels
- [ ] Quadrant Labels (NO-BRAINER, BREAKTHROUGH, Side-Projects, Trap-Zone)
- [ ] Project Nodes with Rectangle Patterns
  - [ ] WORK: Dots pattern
  - [ ] LEARN: Diagonal lines
  - [ ] BUILD: Grid pattern
  - [ ] MANAGE: Horizontal lines
- [ ] Boss Battle Star Overlay
- [ ] High Priority Gold Shadow
- [ ] Deadline Pulse Animation
- [ ] Chart Header with Action Buttons
- [ ] Legend Below Matrix

### Bento-Style Modal ✓
- [ ] Modal Container (900×700px)
- [ ] Bento Grid Layout
- [ ] Project Name Field (full width)
- [ ] Cost/Benefit Row (50/50)
- [ ] Category Grid (2×2)
- [ ] Priority/Status Combined
- [ ] Confidence Scale (horizontal)
- [ ] Tags/Due Date Row
- [ ] Description Field
- [ ] Form Validation
- [ ] Selection State Styling (yellow/grey)

### Animation System ✓
- [ ] Button Hover/Click Animations
- [ ] XP Counter Update Animation
- [ ] Project Placement Animation
- [ ] Modal Enter/Exit
- [ ] Page Transitions
- [ ] Deadline Pulse Effect
- [ ] Boss Battle Star Animation

### SVG Filters & Effects ✓
- [ ] Pencil Effect for Grid Lines
- [ ] Paper Texture Background
- [ ] Hand-Drawn Border Wobble
- [ ] Grid Line Variation

### Desktop Layout System ✓
- [ ] 1024px Minimum Width
- [ ] Centered Content (max 1280px)
- [ ] Matrix Centering
- [ ] Modal Centering
- [ ] Fixed Navigation Positioning

### Styling Integration ✓
- [ ] CSS Variables Implementation
- [ ] Neo-brutalist Component Classes
- [ ] Utility Class System
- [ ] Typography Scale
- [ ] Color System
- [ ] Shadow System
- [ ] Border System
- [ ] Spacing System



## 12. Performance Considerations

### Modern Stack Performance Benefits

**Tailwind CSS v4 Improvements:**
- **Build Performance**: 5x faster full builds, 100x+ faster incremental builds
- **Bundle Size**: 35% reduction in framework overhead with CSS-first architecture
- **Color Rendering**: Enhanced P3 gamut support for neo-brutalist color palette
- **CSS Processing**: Zero-config optimization with new plugin system
- **Hot Reload**: Dramatically improved development experience

**React 19 + Next.js 15 Benefits:**
- **Concurrent Features**: Smoother animations and user interactions
- **Server Components**: Reduced client-side JavaScript bundle
- **App Router**: Optimized routing and code splitting
- **Runtime Performance**: Enhanced rendering with modern React patterns

### Optimization Guidelines
```css
/* GPU Acceleration for Animations */
.will-change-transform {
  will-change: transform;
}

.will-change-shadow {
  will-change: box-shadow;
}

/* Efficient Filters */
.matrix-container {
  /* Use transform3d to trigger hardware acceleration */
  transform: translate3d(0, 0, 0);
  /* Filter optimization */
  filter: url(#paper-texture);
  /* Reduce repaints */
  backface-visibility: hidden;
}

/* Optimized Animations */
.project-node {
  /* Use transform for positioning instead of left/top changes */
  transform: translate3d(var(--x), var(--y), 0) translate(-50%, -50%);
  /* Optimize repaints */
  contain: layout style paint;
}
```

### JavaScript Performance
```javascript
// Debounced coordinate validation
const debouncedValidation = useMemo(
  () => debounce((cost, benefit, projects) => {
    return !matrixUtils.isPositionOccupied(cost, benefit, projects)
  }, 300),
  []
)

// Memoized project positioning
const projectPositions = useMemo(
  () => projects.map(project => ({
    ...project,
    position: matrixUtils.coordsToPosition(project.cost, project.benefit)
  })),
  [projects]
)

// Optimized rendering with React.memo
const ProjectNode = React.memo(({ project, position }) => (
  <motion.div
    className="project-node"
    style={{
      '--x': `${position.x}%`,
      '--y': `${position.y}%`
    }}
  >
    <ProjectRectangle project={project} />
  </motion.div>
), (prev, next) => {
  return (
    prev.project.id === next.project.id &&
    prev.project.category === next.project.category &&
    prev.project.isBossBattle === next.project.isBossBattle &&
    prev.position.x === next.position.x &&
    prev.position.y === next.position.y
  )
})
```

---

## Summary

This comprehensive front-end specification provides everything needed to implement Eugene Strat's Phase 1 UI/UX system. The design successfully balances neo-brutalist impact with organic warmth, creating a unique interface that enables strategic thinking through visual clarity.

**Key Deliverables:**
- Complete design token system with CSS variables
- Full TacticalMap implementation with 800×800 square matrix
- Bento-style project creation modal with professional layout
- Universal components (header, XP display, quick-nav)
- SVG filters for organic/crayon effects
- Complete animation system with Framer Motion
- Responsive desktop-first layout system
- Comprehensive utility classes and helpers

**Design Philosophy Achieved:**
- ✅ Neo-brutalist professional minimalism
- ✅ Visual-first strategic thinking
- ✅ Raw power with organic warmth
- ✅ No progressive disclosure complexity
- ✅ Yellow dominance with brutal structure
- ✅ Hand-drawn grid with professional impact

---

## TacticalMap Page Wireframe

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  EUGENE STRAT         [BRAIN DUMP PLACEHOLDER]              [≡] [MENU]              │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│                         Strategic View                      ⚡ 42,350 POINTS         │
│                         Visual Command Center                                       │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │ COST VS BENEFIT ANALYSIS              [ADD PROJECT] [PARKING LOT] [TRIAGE (3)] │   │
│  │ 23 PROJECTS VISIBLE                                                        │   │
│  ├─────────────────────────────────────────────────────────────────────────────┤   │
│  │    BENEFIT (HIGH)                                                          │   │
│  │         ↑                                                                  │   │
│  │  ┌─────────────────────────────────────────────────────────────────────┐   │   │
│  │  │ NO-BRAINER                    │ BREAKTHROUGH                       │   │   │
│  │  │ Low Cost, High Benefit        │ High Cost, High Benefit          │   │   │
│  │  │                               │                                   │   │   │
│  │  │  [••] [//] [##]              │  [//] [★•] [++]                   │   │   │
│  │  │  [++] [##] [--]              │  [••] [##] [//]                   │   │   │
│  │  │  [//] [••] [++]              │  [--] [//] [••]                   │   │   │
│  │  │                               │                                   │   │   │
│  │  ├───────────────────────────────┼───────────────────────────────────┤   │   │
│  │  │ SIDE-PROJECTS                 │ TRAP-ZONE                         │   │   │
│  │  │ Low Cost, Low Benefit         │ High Cost, Low Benefit            │   │   │
│  │  │                               │                                   │   │   │
│  │  │  [••] [--] [++]              │  [##] [//] [••]                   │   │   │
│  │  │  [//] [++] [--]              │  [--] [++] [--]                   │   │   │
│  │  │  [##] [••] [//]              │  [••] [##] [++]                   │   │   │
│  │  │                               │                                   │   │   │
│  │  └─────────────────────────────────────────────────────────────────────┘   │   │
│  │                         COST (HIGH) →                                      │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │ LEGEND                                                                      │   │
│  │                                                                             │   │
│  │ PATTERNS:  [••] WORK    [//] LEARN    [++] BUILD    [--] MANAGE             │   │
│  │                                                                             │   │
│  │ SPECIAL:   ★ Boss Battle    ◊ High Priority    ◉ Deadline Pulse            │   │
│  │                                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│                                                                                     │
│                                                      ┌─────────┐                   │
│                                                      │ MAP │FOC│                   │
│                                                      ├─────┼───┤                   │
│                                                      │ DAT │PRI│                   │
│                                                      └─────────┘                   │
│                                                    2×2 Quick-Nav                   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

**Wireframe Elements:**

1. **App Header**: Eugene Strat logo, Brain Dump placeholder, menu button
2. **Page Title Section**: "Strategic View" with XP counter (⚡ 42,350 POINTS)  
3. **Page Subtitle**: "Visual Command Center"
4. **Chart Container**:
   - **Header**: "COST VS BENEFIT ANALYSIS" with action buttons
   - **Project Counter**: "23 PROJECTS VISIBLE"
   - **Matrix**: 800×800px square with quadrant labels and axis labels
   - **Project Nodes**: 32×32px rectangles with category patterns
5. **Legend**: Pattern explanations and special indicators
6. **Quick-Nav**: Fixed 2×2 grid with page shortcuts

**Project Node Patterns:**
- `[••]` = WORK (dots pattern)
- `[//]` = LEARN (diagonal lines)  
- `[++]` = BUILD (grid pattern)
- `[--]` = MANAGE (horizontal lines)
- `[★•]` = Boss Battle project (star overlay)

**Matrix Quadrants:**
- **NO-BRAINER**: Low Cost, High Benefit (top-left)
- **BREAKTHROUGH**: High Cost, High Benefit (top-right)  
- **SIDE-PROJECTS**: Low Cost, Low Benefit (bottom-left)
- **TRAP-ZONE**: High Cost, Low Benefit (bottom-right)

---

## Project Creation Modal Wireframe

```
                ┌───────────────────────────────────────────────────────────────────────────────┐
                │                               MODAL OVERLAY                                   │
                │  ┌─────────────────────────────────────────────────────────────────────────┐  │
                │  │ CREATE NEW PROJECT                                                  [×] │  │
                │  │ Strategic Assessment Required                                           │  │
                │  ├─────────────────────────────────────────────────────────────────────────┤  │
                │  │                                                                         │  │
                │  │  ┌───────────────────────────────────────────────────────────────────┐  │  │
                │  │  │ PROJECT NAME                                                      │  │  │
                │  │  │ [ENTER PROJECT TITLE_________________________________________]    │  │  │
                │  │  └───────────────────────────────────────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │  │
                │  │  │ COST                        │  │ BENEFIT                         │  │  │
                │  │  │ [7 HIGH INVESTMENT      ▼]  │  │ [8 MAJOR IMPACT         ▼]     │  │  │
                │  │  │ Time, effort, resources     │  │ Strategic value gained          │  │  │
                │  │  └─────────────────────────────┘  └─────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │  │
                │  │  │ CATEGORY                    │  │ PRIORITY & STATUS               │  │  │
                │  │  │ ┌───────────┬─────────────┐ │  │ PRIORITY:                       │  │  │
                │  │  │ │   WORK    │    LEARN    │ │  │ [MUST-DO] [SHOULD] [NICE-TO]    │  │  │
                │  │  │ │  Execute  │   Study     │ │  │                                 │  │  │
                │  │  │ ├───────────┼─────────────┤ │  │ STATUS:                         │  │  │
                │  │  │ │   BUILD   │   MANAGE    │ │  │ [FOCUS] [VISIBLE]              │  │  │
                │  │  │ │  Create   │  Organize   │ │  │                                 │  │  │
                │  │  │ └───────────┴─────────────┘ │  │                                 │  │  │
                │  │  └─────────────────────────────┘  └─────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌───────────────────────────────────────────────────────────────────┐  │  │
                │  │  │ CONFIDENCE LEVEL (cost/benefit evaluation)                    │  │  │
                │  │  │ [JCVD] [MAGNA CUM] [GUT FEEL] [LEAP FAITH] [BRITNEY SPEARS]       │  │  │
                │  │  │   1        2          3           4             5                 │  │  │
                │  │  └───────────────────────────────────────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │  │
                │  │  │ TAGS                        │  │ DUE DATE                        │  │  │
                │  │  │ [urgent, client, Q4_______] │  │ [📅 2024-12-31______________]   │  │  │
                │  │  └─────────────────────────────┘  └─────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌───────────────────────────────────────────────────────────────────┐  │  │
                │  │  │ DESCRIPTION                                                       │  │  │
                │  │  │ [Detailed project scope and requirements explaining the          │  │  │
                │  │  │  strategic value and implementation approach for this            │  │  │
                │  │  │  initiative...]                                                   │  │  │
                │  │  └───────────────────────────────────────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  ├─────────────────────────────────────────────────────────────────────────┤  │
                │  │ [CANCEL]                                              [CREATE PROJECT] │  │
                │  └─────────────────────────────────────────────────────────────────────────┘  │
                └───────────────────────────────────────────────────────────────────────────────┘
```

**Modal Specifications:**

**Dimensions & Layout:**
- **Modal Size**: 900px width × 700px height (landscape orientation)
- **Container**: #d1d5db gray with 4px black border and 8px shadow
- **Grid Layout**: Bento-style responsive grid with 24px gaps

**Header Content:**
- **Title**: "CREATE NEW PROJECT" 
- **Subtitle**: "Strategic Assessment Required"
- **Background**: Yellow (#FDE047) with 4px black bottom border

**Form Field Content:**

1. **Project Name** (Full width):
   - Label: "PROJECT NAME"
   - Placeholder: "ENTER PROJECT TITLE"

2. **Cost/Benefit** (50/50 split):
   - **Cost**: Label "COST", Dropdown with 1-10 scale, Guidance: "Time, effort, resources"
   - **Benefit**: Label "BENEFIT", Dropdown with 1-10 scale, Guidance: "Strategic value gained"

3. **Category/Priority** (50/50 split):
   - **Category**: 2×2 grid with options: "WORK", "LEARN", "BUILD", "MANAGE"
   - **Priority**: Three options: "MUST-DO", "SHOULD-DO", "NICE-TO-HAVE"
   - **Status**: Three options: "FOCUS", "VISIBLE",

4. **Confidence Scale** (Full width):
   - Label: "CONFIDENCE LEVEL"
   - Options: "JCVD" (1), "MAGNA CUM" (2), "GUT FEEL" (3), "LEAP FAITH" (4), "BRITNEY SPEARS" (5)

5. **Tags/Date** (50/50 split):
   - **Tags**: Text input with comma-separated values
   - **Due Date**: Date picker input

6. **Description** (Full width):
   - Label: "DESCRIPTION"
   - Textarea for detailed project information (optional field)

**Action Buttons:**
- **Cancel**: Gray background (#9ca3af), white text, 4px black border
- **Create Project**: Yellow background (#FDE047), black text, 4px black border
- Both buttons have 4px shadows and hover animations (translate -2px, -2px)

