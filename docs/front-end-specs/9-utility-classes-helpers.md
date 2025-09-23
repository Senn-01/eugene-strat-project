# 9. Utility Classes & Helpers

## Neo-Brutalist Utility Classes
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

## JavaScript Utilities
```javascript
// Direct Grid Positioning Utilities
export const matrixUtils = {
  // Convert cost/benefit (1-10) to direct pixel position on 800px matrix
  coordsToPixels: (cost, benefit) => ({
    x: (cost - 1) * 80 + 40,        // 80px grid spacing, 40px from edge
    y: (10 - benefit) * 80 + 40     // Inverted Y (top = high benefit)
  }),

  // Convert pixel position to cost/benefit coordinates (for drag/drop)
  pixelsToCoords: (x, y) => ({
    cost: Math.round((x - 40) / 80) + 1,
    benefit: 10 - Math.round((y - 40) / 80)
  }),

  // Check if position is occupied
  isPositionOccupied: (cost, benefit, projects) => 
    projects.some(p => p.cost === cost && p.benefit === benefit),

  // Generate unique coordinates
  generateUniqueCoords: (projects) => {
    for (let cost = 1; cost <= 10; cost++) {
      for (let benefit = 1; benefit <= 10; benefit++) {
        if (!this.isPositionOccupied(cost, benefit, projects)) {
          return { cost, benefit }
        }
      }
    }
    return null // Matrix full (100 projects)
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
