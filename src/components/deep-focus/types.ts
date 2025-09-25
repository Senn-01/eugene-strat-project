// src/components/deep-focus/types.ts
export type WillpowerLevel = 'high' | 'medium' | 'low';
export type MindsetLevel = 'high' | 'medium' | 'low';
export type SessionDuration = 60 | 90 | 120;
export type SessionPhase = 'setup' | 'willpower-select' | 'active' | 'complete';

export interface SessionConfig {
  projectId: string;
  projectName: string;
  duration: SessionDuration;
}

export interface ActiveSession {
  id: string;
  projectId: string;
  projectName: string;
  duration: SessionDuration;
  willpower: WillpowerLevel;
  difficultyQuote: string;
  startedAt: Date;
  remainingMs: number;
}

export interface DailyCommitment {
  target: number | null;
  current: number;
}

export interface DeepFocusState {
  phase: SessionPhase;
  availableProjects: Project[];
  sessionConfig: SessionConfig | null;
  activeSession: ActiveSession | null;
  dailyCommitment: DailyCommitment;
  isLoading: boolean;
  error: string | null;
}

// Import Project type from existing types
import { Project } from '@/lib/types/project.types';