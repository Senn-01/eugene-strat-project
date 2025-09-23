# 4. TacticalMap Page Layout

## Complete Page Wireframe Implementation
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

## Square Matrix (800×800px) Implementation
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

## Project Nodes with Rectangle Patterns
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

## Legend Below Matrix
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
