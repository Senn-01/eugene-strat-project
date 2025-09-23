export interface Project {
  id: string
  user_id: string
  name: string
  description: string
  cost: number // 1-10 range
  benefit: number // 1-10 range
  category: 'work' | 'learn' | 'build' | 'manage'
  priority: 'must' | 'should' | 'nice'
  status: 'active' | 'inactive' | 'completed'
  confidence: 'very_high' | 'high' | 'medium' | 'low' | 'very_low'
  tags: string[]
  due_date?: string | null
  is_boss_battle: boolean
  accuracy_rating?: number | null // 1-5 range, only for completed projects
  xp_earned?: number | null // Calculated on completion
  created_at: string
  updated_at: string
  completed_at?: string | null
}

export interface ProjectCreateInput {
  name: string
  description?: string
  cost: number
  benefit: number
  category: 'work' | 'learn' | 'build' | 'manage'
  priority: 'must' | 'should' | 'nice'
  confidence: 'very_high' | 'high' | 'medium' | 'low' | 'very_low'
  tags?: string[]
  due_date?: string | null
  status?: 'active' | 'inactive'
}

export interface ProjectUpdateInput extends Partial<ProjectCreateInput> {
  id: string
  is_boss_battle?: boolean
}

export interface ProjectCompletionInput {
  id: string
  accuracy_rating: number // 1-5
}

export const MAX_PROJECTS = 20

export const XP_CALCULATION = {
  BASE_MULTIPLIER: 10,
  BOSS_BATTLE_MULTIPLIER: 2,
} as const

export function calculateProjectXP(cost: number, benefit: number, is_boss_battle: boolean = false): number {
  const baseXP = cost * benefit * XP_CALCULATION.BASE_MULTIPLIER
  return is_boss_battle ? baseXP * XP_CALCULATION.BOSS_BATTLE_MULTIPLIER : baseXP
}