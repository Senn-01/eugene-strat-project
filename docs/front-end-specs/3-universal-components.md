# 3. Universal Components

## Icon System

**IMPORTANT:** Eugene Strat uses **Lucide React icons exclusively**. No emoji icons in production interface components.

### Icon Standards
```css
.icon-standard {
  width: 16px;
  height: 16px;
  stroke-width: 2;
  transition: color 100ms;
}

/* Icon colors adapt to page context */
.tactical-map-page .icon-interactive {
  color: var(--color-black);
}

.tactical-map-page .icon-interactive:hover {
  color: var(--color-tactical); /* Yellow on TacticalMap */
}

.deep-focus-page .icon-interactive:hover {
  color: var(--color-focus); /* Yellow-green on DeepFocus */
}

.analytics-page .icon-interactive:hover {
  color: var(--color-data); /* Pink on Analytics */
}

.prime-page .icon-interactive:hover {
  color: var(--color-prime); /* Blue on Prime */
}
```

### Icon Mappings
| Component Context | Old (Emoji) | New (Lucide) | Import |
|-------------------|-------------|--------------|---------|
| ProjectActionsMenu | ✏️ | Edit | `import { Edit } from 'lucide-react'` |
| ProjectActionsMenu | ✅ | Check | `import { Check } from 'lucide-react'` |
| ProjectActionsMenu | ⭐ | Star | `import { Star } from 'lucide-react'` |
| ProjectModal | ✕ | X | `import { X } from 'lucide-react'` |
| General menus | ☰ | MoreVertical | `import { MoreVertical } from 'lucide-react'` |

### Icon Implementation Pattern
```typescript
import { Edit, Check, Star, MoreVertical, X } from 'lucide-react'

// Standard usage with proper accessibility
<Edit
  size={16}
  className="icon-standard icon-interactive"
  aria-label="Edit project"
/>

// Page-specific styling example (TacticalMap)
<Star
  size={16}
  className="text-black hover:text-tactical transition-colors"
  aria-label="Toggle Boss Battle"
/>
```

### Icon Accessibility Requirements
- Always include `aria-label` for interactive icons
- Use semantic colors (black default, page color on hover)
- Maintain 16px size for consistency
- Ensure 3:1 contrast ratio minimum

## App Header Component
```css
.app-header {
  height: var(--header-height);
  border-bottom: var(--border-standard);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-lg);
  /* Background changes per page - see Page-Specific Headers below */
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

### Page-Specific Headers
```css
/* Header background adapts to page context */
.app-header.tactical-map {
  background: var(--color-tactical); /* Yellow */
}

.app-header.deep-focus {
  background: var(--color-focus); /* Yellow-green */
}

.app-header.analytics {
  background: var(--color-data); /* Pink */
}

.app-header.prime {
  background: var(--color-prime); /* Blue */
}
```

## XP Display Widget (Inline with Title)
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

## Quick-Nav (2×2 Grid)
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

/* Page-specific colors - each button shows its page color */
.nav-map {
  background: var(--color-tactical); /* Yellow for TacticalMap */
  color: var(--color-black);
}

.nav-focus {
  background: var(--color-focus); /* Yellow-green for DeepFocus */
  color: var(--color-black);
}

.nav-data {
  background: var(--color-data); /* Pink for Analytics */
  color: var(--color-black);
}

.nav-prime {
  background: var(--color-prime); /* Blue for Prime */
  color: var(--color-white); /* White text on blue background */
}

.nav-icon {
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
}
```

## Button Component System

**IMPORTANT:** Button colors adapt to page context while maintaining consistent structure.

### Universal Button Classes
```css
/* Base button structure - consistent across all pages */
.button-base {
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  transition: all 100ms;
  cursor: pointer;
}

.button-base:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hover);
}

.button-base:active {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-active);
}
```

### Page-Specific Button Variants
```css
/* Primary buttons - use page color */
.tactical-map-page .button-primary {
  background: var(--color-tactical); /* Yellow */
  color: var(--color-black);
}

.deep-focus-page .button-primary {
  background: var(--color-focus); /* Yellow-green */
  color: var(--color-black);
}

.analytics-page .button-primary {
  background: var(--color-data); /* Pink */
  color: var(--color-black);
}

.prime-page .button-primary {
  background: var(--color-prime); /* Blue */
  color: var(--color-white);
}

/* Secondary buttons - consistent across all pages */
.button-secondary {
  background: var(--color-white);
  color: var(--color-black);
}

/* Tertiary buttons - consistent across all pages */
.button-tertiary {
  background: var(--color-grey-crayon);
  color: var(--color-black);
}
```
