---
rationale: Stacked section modal design for TacticalMap project creation, replacing complex bento grid with intuitive vertical flow for better user experience during validation phase
version: 0.1.0
changelog:
  - 0.1.0: Complete rewrite from bento-style to stacked sections for improved UX and reduced complexity
links:
  - docs/stories/1.4.ui-polish-frontend-testing.md: Implementation story for TacticalMap UI polish
  - docs/front-end-specs/1-design-tokens-tailwind-v4-theme-configuration.md: Design system and color tokens
  - docs/front-end-specs/3-universal-components.md: Universal component patterns and icon system
  - docs/brief.md: Business context and terminology requirements
---

# Stacked Section Modal Design - TacticalMap Project Creation

## Design Philosophy

The **ProjectModal** uses a **stacked sections layout** that guides users through project creation with clear visual hierarchy and intuitive flow. This approach prioritizes:

- **Cognitive simplicity** - One section focus at a time
- **Visual clarity** - Clear section separation and grouping
- **Reduced modal width** - 700px for focused experience
- **TacticalMap context** - Yellow-dominant neo-brutalist styling

## Modal Container & Layout

### Container Specifications
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
  width: 700px; /* Reduced from 900px */
  max-width: 90vw;
  height: 700px;
  max-height: 90vh;
  background: var(--color-grey-crayon);
  border: var(--border-standard);
  box-shadow: var(--shadow-large);
  display: flex;
  flex-direction: column;
}
```

### Header Section
```css
.modal-header {
  background: var(--color-tactical); /* Yellow for TacticalMap */
  border-bottom: var(--border-standard);
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-black);
}

.modal-subtitle {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: rgba(0, 0, 0, 0.8);
}
```

## Stacked Sections Layout

### Section Structure
```css
.modal-body {
  flex: 1;
  padding: var(--spacing-md);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-section {
  background: var(--color-white);
  border: var(--border-standard);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-base);
}

.section-title {
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-black);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-subheading);
}
```

## Section Breakdown

### Section 1: Core Information
```css
.section-core-info {
  /* Full project identification */
}

.field-project-name {
  margin-bottom: var(--spacing-md);
}

.field-description {
  /* Optional context field */
}

.field-input {
  width: 100%;
  background: var(--color-white);
  border: var(--border-standard);
  box-shadow: 4px 4px 0px var(--color-tactical);
  padding: var(--spacing-sm);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-black);
  font-family: var(--font-family-mono);
  font-size: 1.125rem;
  transition: all 100ms;
}

.field-input:focus {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--color-tactical);
  outline: none;
}
```

### Section 2: Strategic Position (Cost/Benefit)
```css
.section-strategic-position {
  /* Cost and benefit sliders */
}

.strategic-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
}

.slider-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.slider-label {
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-black);
  font-size: var(--font-size-body);
}

.slider-input {
  width: 100%;
  height: 40px;
  background: var(--color-white);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
  border-radius: 0;
  appearance: none;
  cursor: pointer;
}

.slider-input::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  background: var(--color-tactical);
  border: 2px solid var(--color-black);
  cursor: pointer;
}

.slider-value {
  text-align: center;
  font-family: var(--font-family-mono);
  font-weight: var(--font-weight-black);
  font-size: 1.5rem;
  color: var(--color-black);
}

.slider-guidance {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-bold);
  color: rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-normal);
  text-align: center;
}
```

### Section 3: Quick Settings (Category, Priority, Status)
```css
.section-quick-settings {
  /* Category, priority, and status toggles */
}

.settings-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.setting-label {
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-black);
  font-size: var(--font-size-body);
}

/* Category Grid (2x2) */
.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
}

.category-button {
  border: var(--border-standard);
  padding: var(--spacing-sm);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  transition: all 100ms;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  font-size: var(--font-size-caption);
}

.category-button.selected {
  background: var(--color-tactical);
  color: var(--color-black);
  box-shadow: var(--shadow-base);
}

.category-button:not(.selected) {
  background: var(--color-grey-unselected);
  color: var(--color-white);
}

/* Priority/Status Buttons */
.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toggle-button {
  border: var(--border-standard);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  font-size: var(--font-size-caption);
  transition: all 100ms;
  cursor: pointer;
  text-align: center;
}

.toggle-button.selected {
  background: var(--color-tactical);
  color: var(--color-black);
}

.toggle-button:not(.selected) {
  background: var(--color-grey-unselected);
  color: var(--color-white);
}
```

### Section 4: Confidence & Timeline
```css
.section-confidence-timeline {
  /* Confidence slider and optional due date */
}

.confidence-timeline-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
}

.confidence-slider-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.confidence-slider {
  width: 100%;
  height: 40px;
  background: var(--color-white);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
  border-radius: 0;
  appearance: none;
  cursor: pointer;
}

.confidence-labels {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-xs);
}

.confidence-label {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-bold);
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
}

.due-date-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.date-input {
  width: 100%;
  background: var(--color-white);
  border: var(--border-standard);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-sm);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  color: var(--color-black);
  font-family: var(--font-family-mono);
}
```

## Business Terminology Integration

### Confidence Labels (1-5 Scale)
```typescript
const confidenceLabels = [
  { value: 'very_low', label: 'Britney Spears', number: 1 },
  { value: 'low', label: 'Leap Faith', number: 2 },
  { value: 'medium', label: 'Gut Feel', number: 3 },
  { value: 'high', label: 'Magna Cum', number: 4 },
  { value: 'very_high', label: 'JCVD', number: 5 },
]
```

### Status Labels
```typescript
const statusOptions = [
  { value: 'active', label: 'Focus' },
  { value: 'inactive', label: 'Visible' },
]
```

### Category Options
```typescript
const categoryOptions = [
  { value: 'work', label: 'Work', desc: 'Professional' },
  { value: 'learn', label: 'Learn', desc: 'Education' },
  { value: 'build', label: 'Build', desc: 'Creation' },
  { value: 'manage', label: 'Manage', desc: 'Operations' },
]
```

## Modal Actions

### Action Bar
```css
.modal-actions {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-top: var(--border-standard);
  background: var(--color-grey-crayon);
  gap: var(--spacing-md);
}

.button-cancel, .button-create {
  border: var(--border-standard);
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  transition: all 100ms;
  cursor: pointer;
  box-shadow: var(--shadow-base);
  flex: 1;
}

.button-cancel {
  background: var(--color-grey-unselected);
  color: var(--color-white);
}

.button-create {
  background: var(--color-tactical); /* Yellow for TacticalMap */
  color: var(--color-black);
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

## Interactive Elements

### Form Validation
```css
.field-error {
  margin-top: var(--spacing-xs);
  padding: var(--spacing-xs);
  background: #fee2e2;
  border: 2px solid #dc2626;
  color: #dc2626;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  font-size: var(--font-size-caption);
}

.coordinate-error {
  grid-column: 1 / -1;
  background: #fef3c7;
  border: 2px solid #f59e0b;
  color: #92400e;
  padding: var(--spacing-sm);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  font-size: var(--font-size-caption);
}
```

### Accessibility Features
```css
.field-input:focus,
.slider-input:focus,
.toggle-button:focus,
.category-button:focus {
  outline: 3px solid var(--color-tactical);
  outline-offset: 2px;
}

.button-cancel:focus,
.button-create:focus {
  outline: 3px solid var(--color-black);
  outline-offset: 2px;
}
```

## Responsive Behavior

### Mobile Adaptations
```css
@media (max-width: 768px) {
  .modal-container {
    width: 95vw;
    height: 95vh;
  }

  .strategic-grid {
    grid-template-columns: 1fr;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .confidence-timeline-grid {
    grid-template-columns: 1fr;
  }

  .category-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
}
```

## Implementation Benefits

### User Experience
- **Reduced cognitive load** - One section focus at a time
- **Clear progression** - Visual flow from core info to settings
- **Faster completion** - Sliders are more intuitive than dropdowns
- **Better mobile experience** - Stacked layout adapts well

### Development Benefits
- **Simpler CSS** - No complex grid calculations
- **Easier maintenance** - Clear section separation
- **Better testing** - Each section can be tested independently
- **Reduced complexity** - Fewer layout edge cases

### Design System Compliance
- **TacticalMap context** - Yellow dominance maintained
- **Neo-brutalist patterns** - Black borders and shadows
- **Typography consistency** - Design token usage
- **Icon integration** - Lucide icons with proper sizing

This stacked section approach provides a more intuitive and maintainable modal design while respecting the TacticalMap's yellow-dominant neo-brutalist aesthetic.