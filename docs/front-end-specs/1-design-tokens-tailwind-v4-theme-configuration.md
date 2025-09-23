# 1. Design Tokens & Tailwind v4 Theme Configuration

## Tailwind v4 CSS-First Configuration
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

  /* Page-Specific Colors - Each page has its own dominant color */
  --color-tactical: #FDE047;  /* Yellow - TacticalMap page */
  --color-focus: #CFE820;     /* Yellow-Green - DeepFocus page */
  --color-data: #E5B6E5;      /* Pink - Analytics page */
  --color-prime: #2563EB;     /* Blue - Prime page */

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

## Page-Specific Color System

**IMPORTANT:** Each page in Eugene Strat has its own dominant color while sharing the same black and grey foundation. This creates visual wayfinding while maintaining design cohesion.

### Color Inheritance Pattern

Each page uses a **three-color palette**:
1. **Primary Color** - Unique to each page (dominant color)
2. **Secondary Color** - Black (shared across all pages)
3. **Tertiary Color** - Grey (shared across all pages)

### Page Color Specifications

#### TacticalMap Page
```css
/* TacticalMap uses yellow dominance */
.tactical-map-page {
  --page-primary: var(--color-tactical); /* #FDE047 */
  --page-secondary: var(--color-black);
  --page-tertiary: var(--color-grey-crayon);
}

/* All buttons on TacticalMap use yellow */
.tactical-map-page .button-primary {
  background: var(--color-tactical);
  color: var(--color-black);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
}
```

#### DeepFocus Page
```css
/* DeepFocus uses yellow-green dominance */
.deep-focus-page {
  --page-primary: var(--color-focus); /* #CFE820 */
  --page-secondary: var(--color-black);
  --page-tertiary: var(--color-grey-crayon);
}

/* All buttons on DeepFocus use yellow-green */
.deep-focus-page .button-primary {
  background: var(--color-focus);
  color: var(--color-black);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
}
```

#### Analytics/Data Page
```css
/* Analytics uses pink dominance */
.analytics-page {
  --page-primary: var(--color-data); /* #E5B6E5 */
  --page-secondary: var(--color-black);
  --page-tertiary: var(--color-grey-crayon);
}

/* All buttons on Analytics use pink */
.analytics-page .button-primary {
  background: var(--color-data);
  color: var(--color-black);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
}
```

#### Prime Page
```css
/* Prime uses blue dominance */
.prime-page {
  --page-primary: var(--color-prime); /* #2563EB */
  --page-secondary: var(--color-black);
  --page-tertiary: var(--color-grey-crayon);
}

/* All buttons on Prime use blue */
.prime-page .button-primary {
  background: var(--color-prime);
  color: var(--color-white); /* Note: white text on blue */
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
}
```

### Universal Button System

#### Button Variants per Page
```css
/* Primary buttons adapt to page context */
.button-primary {
  /* Color set by page context */
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  transition: all 100ms;
}

.button-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

/* Secondary buttons - same across all pages */
.button-secondary {
  background: var(--color-white);
  color: var(--color-black);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
}

/* Tertiary buttons - same across all pages */
.button-tertiary {
  background: var(--color-grey-crayon);
  color: var(--color-black);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
}
```

### Implementation Guidelines

#### DO's
- Use page-specific primary color for main actions and highlights
- Maintain black borders and shadows across all pages
- Use grey for backgrounds and disabled states
- Apply consistent typography regardless of page

#### DON'Ts
- **Don't mix page colors** - TacticalMap components should NEVER use pink, blue, or green
- **Don't use colors outside the palette** - No purple, red, orange, etc.
- **Don't ignore page context** - Modals and components inherit page color scheme

### Header Color Application
```css
.app-header {
  /* Header background changes per page */
  background: var(--page-primary);
  border-bottom: var(--border-standard);
}

/* Specific implementations */
.app-header.tactical-map { background: var(--color-tactical); }
.app-header.deep-focus { background: var(--color-focus); }
.app-header.analytics { background: var(--color-data); }
.app-header.prime { background: var(--color-prime); }
```

## Font System
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
