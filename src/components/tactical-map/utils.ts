interface Project {
  id: string
  name: string
  cost: number
  benefit: number
  category: 'work' | 'learn' | 'build' | 'manage'
  status: 'active' | 'inactive' | 'completed'
  isBossBattle?: boolean
}

interface ProjectPosition {
  x: number
  y: number
}

// Direct Grid Positioning Utilities
export const matrixUtils = {
  // Convert cost/benefit (1-10) to direct pixel position on 800px matrix
  coordsToPixels: (cost: number, benefit: number): ProjectPosition => ({
    x: (cost - 1) * 80 + 40,        // 80px grid spacing, 40px from edge
    y: (10 - benefit) * 80 + 40     // Inverted Y (top = high benefit)
  }),

  // Convert pixel position to cost/benefit coordinates (for drag/drop)
  pixelsToCoords: (x: number, y: number) => ({
    cost: Math.round((x - 40) / 80) + 1,
    benefit: 10 - Math.round((y - 40) / 80)
  }),

  // Check if position is occupied
  isPositionOccupied: (cost: number, benefit: number, projects: Project[]): boolean => 
    projects.some(p => p.cost === cost && p.benefit === benefit),

  // Generate unique coordinates
  generateUniqueCoords: (projects: Project[]) => {
    for (let cost = 1; cost <= 10; cost++) {
      for (let benefit = 1; benefit <= 10; benefit++) {
        if (!matrixUtils.isPositionOccupied(cost, benefit, projects)) {
          return { cost, benefit }
        }
      }
    }
    return null // Matrix full (100 projects)
  }
}

// XP Calculation Utilities
export const xpUtils = {
  calculateProjectXP: (cost: number, benefit: number, isBossBattle = false): number => {
    const baseXP = cost * benefit * 10
    return isBossBattle ? baseXP * 2 : baseXP
  },

  calculateTotalXP: (projects: Project[]): number => {
    return projects.reduce((total, project) => {
      return total + xpUtils.calculateProjectXP(project.cost, project.benefit, project.isBossBattle)
    }, 0)
  }
}