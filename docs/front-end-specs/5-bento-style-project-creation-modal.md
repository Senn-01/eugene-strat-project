# 5. Bento-Style Project Creation Modal

## Modal Container & Layout
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

## Bento Grid Layout
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

## Confidence Scale Implementation
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
