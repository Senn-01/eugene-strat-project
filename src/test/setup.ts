import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'

// Setup MSW (Mock Service Worker) if needed
// This would be configured for API mocking

// Clean up after each test
afterEach(() => {
  cleanup()
})

// Setup test environment
beforeAll(() => {
  // Any global setup needed for tests
})

afterAll(() => {
  // Any global cleanup needed after all tests
})