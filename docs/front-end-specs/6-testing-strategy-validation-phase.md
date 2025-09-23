---
rationale: Simplified testing approach for user validation phase focusing on core functionality verification rather than comprehensive coverage, allowing faster iteration and validation
version: 0.1.0
changelog:
  - 0.1.0: Initial validation phase testing strategy document
links:
  - docs/architecture.md: Overall architecture and full testing approach
  - docs/stories/1.4.ui-polish-frontend-testing.md: Implementation story
  - docs/brief.md: Product vision and validation criteria
---

# Testing Strategy - User Validation Phase

## Philosophy

During the **user validation phase**, our testing approach prioritizes speed and core functionality verification over comprehensive coverage. This allows us to iterate quickly based on user feedback without being slowed down by extensive test suites.

### Core Principles

- **Smoke tests only** - Verify "does it work?" not "does it handle every edge case?"
- **30% coverage target** - Focus on critical user paths
- **No unit tests** - Components change rapidly during validation
- **Integration focus** - Test complete user workflows end-to-end
- **Fast feedback** - Tests should run quickly to enable rapid iteration

## What We Test

### 1. Core User Workflows (Integration Tests)
- **Project Creation** - Can user create a project via modal?
- **Project Editing** - Can user modify existing project?
- **Project Completion** - Does completion trigger XP calculation?
- **Boss Battle Toggle** - Can user mark/unmark projects as Boss Battle?

### 2. Critical Business Logic
- **XP Calculation** - Verify correct points awarded
- **Coordinate Validation** - Prevent overlapping projects
- **20-Project Limit** - Enforce maximum project constraint
- **Data Persistence** - Changes save to Supabase correctly

### 3. UI Smoke Tests
- **Modal Open/Close** - Basic modal functionality
- **Form Validation** - Required fields enforced
- **Button States** - Hover, active, disabled states work
- **Navigation** - 2x2 grid navigation functional

## What We DON'T Test

### Deferred to Post-Validation
- **Component Props Variations** - Too granular for validation phase
- **Edge Cases** - Invalid inputs, network failures, race conditions
- **Error Boundaries** - React error handling
- **Accessibility** - WCAG compliance, keyboard navigation
- **Performance Metrics** - Load times, bundle size optimization
- **Browser Compatibility** - Cross-browser testing
- **Mobile Responsiveness** - Focus on desktop experience first

### Rationale for Deferral
These tests are important for production but add development overhead during rapid iteration. Once core user flows are validated, we'll implement comprehensive testing.

## Test Implementation

### Test Structure
```
src/
├── __tests__/
│   ├── integration/
│   │   ├── project-creation-workflow.test.tsx
│   │   ├── project-editing-workflow.test.tsx
│   │   ├── project-completion-workflow.test.tsx
│   │   └── boss-battle-workflow.test.tsx
│   └── smoke/
│       ├── modal-operations.test.tsx
│       ├── navigation.test.tsx
│       └── form-validation.test.tsx
```

### Test Framework
- **Vitest** - Fast test runner with good ESM support
- **Testing Library** - User-centric testing approach
- **MSW (Mock Service Worker)** - Mock Supabase responses
- **JSDOM** - Lightweight DOM simulation

### Coverage Target: 30%
Focus on:
- Main user paths (80% coverage)
- Critical business logic (60% coverage)
- UI interactions (20% coverage)

Ignore:
- Type definitions
- Configuration files
- Test utilities
- Error boundaries

## Example Test Structure

### Integration Test Pattern
```typescript
describe('Project Creation Workflow', () => {
  it('should create project and display on map', async () => {
    // 1. Render TacticalMap
    // 2. Open ProjectModal
    // 3. Fill form with valid data
    // 4. Submit form
    // 5. Verify project appears on map
    // 6. Verify project saved to database
  })
})
```

### Smoke Test Pattern
```typescript
describe('Modal Operations', () => {
  it('should open and close without errors', async () => {
    // 1. Render component with modal trigger
    // 2. Click to open modal
    // 3. Verify modal visible
    // 4. Click to close modal
    // 5. Verify modal hidden
  })
})
```

## Running Tests

### Commands
- `npm run test` - Watch mode for development
- `npm run test:run` - Single run for CI
- `npm run test:ui` - Visual test runner

### CI Integration
- Run tests on every commit
- Block merges if critical tests fail
- Generate coverage report
- No performance requirements (speed over thoroughness)

## Success Criteria

### Validation Phase Complete When:
1. **All integration tests pass** - Core workflows functional
2. **30% coverage achieved** - Critical paths covered
3. **No blocking bugs** - Users can complete main tasks
4. **Performance acceptable** - Under 3 seconds for main operations

### Post-Validation Testing
After user validation success, we'll implement:
- Comprehensive unit tests (70%+ coverage)
- Accessibility testing
- Cross-browser compatibility
- Performance optimization
- Error boundary testing

## Benefits of This Approach

### Speed
- Faster development cycles
- Quick feedback on core functionality
- Reduced test maintenance overhead

### Focus
- Tests align with user validation goals
- Clear separation of critical vs. nice-to-have
- Resources focused on user experience

### Flexibility
- Easy to refactor without breaking extensive test suites
- Can pivot quickly based on user feedback
- No premature optimization of testing infrastructure

This approach ensures we validate core functionality quickly while maintaining the flexibility to iterate based on user feedback.