import { matrixUtils, xpUtils } from '../utils'

// Basic unit tests for utility functions
describe('matrixUtils', () => {
  describe('coordsToPixels', () => {
    it('should convert cost/benefit to pixel positions correctly', () => {
      // Test corner positions
      expect(matrixUtils.coordsToPixels(1, 1)).toEqual({ x: 40, y: 760 }) // Bottom-left
      expect(matrixUtils.coordsToPixels(10, 10)).toEqual({ x: 760, y: 40 }) // Top-right
      expect(matrixUtils.coordsToPixels(5, 5)).toEqual({ x: 360, y: 440 }) // Center
    })
  })

  describe('pixelsToCoords', () => {
    it('should convert pixel positions back to cost/benefit', () => {
      expect(matrixUtils.pixelsToCoords(40, 760)).toEqual({ cost: 1, benefit: 1 })
      expect(matrixUtils.pixelsToCoords(760, 40)).toEqual({ cost: 10, benefit: 10 })
      expect(matrixUtils.pixelsToCoords(360, 440)).toEqual({ cost: 5, benefit: 5 })
    })
  })

  describe('isPositionOccupied', () => {
    const testProjects = [
      { id: '1', name: 'Test', cost: 5, benefit: 5, category: 'work' as const, status: 'active' as const }
    ]

    it('should return true for occupied positions', () => {
      expect(matrixUtils.isPositionOccupied(5, 5, testProjects)).toBe(true)
    })

    it('should return false for unoccupied positions', () => {
      expect(matrixUtils.isPositionOccupied(3, 3, testProjects)).toBe(false)
    })
  })

  describe('generateUniqueCoords', () => {
    it('should return first available position', () => {
      const projects = [
        { id: '1', name: 'Test', cost: 1, benefit: 1, category: 'work' as const, status: 'active' as const }
      ]
      expect(matrixUtils.generateUniqueCoords(projects)).toEqual({ cost: 1, benefit: 2 })
    })
  })
})

describe('xpUtils', () => {
  describe('calculateProjectXP', () => {
    it('should calculate base XP correctly', () => {
      expect(xpUtils.calculateProjectXP(5, 6)).toBe(300) // 5 * 6 * 10
    })

    it('should double XP for boss battles', () => {
      expect(xpUtils.calculateProjectXP(5, 6, true)).toBe(600) // (5 * 6 * 10) * 2
    })
  })

  describe('calculateTotalXP', () => {
    it('should sum all project XP', () => {
      const projects = [
        { id: '1', name: 'Test1', cost: 2, benefit: 3, category: 'work' as const, status: 'active' as const },
        { id: '2', name: 'Test2', cost: 4, benefit: 5, category: 'learn' as const, status: 'active' as const, isBossBattle: true }
      ]
      // Project 1: 2 * 3 * 10 = 60
      // Project 2: 4 * 5 * 10 * 2 = 400 (boss battle)
      // Total: 460
      expect(xpUtils.calculateTotalXP(projects)).toBe(460)
    })
  })
})

// Manual test runner for when no test framework is available
if (typeof window === 'undefined' && typeof module !== 'undefined' && require.main === module) {
  console.log('Running basic utility tests...')
  
  // Test coordsToPixels
  const pos1 = matrixUtils.coordsToPixels(1, 1)
  console.assert(pos1.x === 40 && pos1.y === 760, 'coordsToPixels test 1 failed')
  
  const pos2 = matrixUtils.coordsToPixels(10, 10)
  console.assert(pos2.x === 760 && pos2.y === 40, 'coordsToPixels test 2 failed')
  
  // Test XP calculation
  const xp = xpUtils.calculateProjectXP(5, 6)
  console.assert(xp === 300, 'XP calculation failed')
  
  console.log('Basic tests completed ✓')
}