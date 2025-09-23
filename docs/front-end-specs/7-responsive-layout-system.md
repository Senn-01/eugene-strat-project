# 7. Responsive Layout System

## Desktop-First Approach
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
