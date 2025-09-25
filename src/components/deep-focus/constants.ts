// src/components/deep-focus/constants.ts
import { WillpowerLevel, SessionDuration } from './types';

// XP Constants
export const INTERRUPTED_SESSION_XP = 10;

export const BASE_SESSION_XP = 10;

// Willpower multipliers for XP calculation
export const WILLPOWER_MULTIPLIERS: Record<WillpowerLevel, number> = {
  'high': 1.0,   // Piece Of Cake
  'medium': 1.5, // Caffeinated
  'low': 2.0     // Don't Talk To Me
};

// Difficulty quotes matrix (Duke Nukem references)
export const DIFFICULTY_QUOTES: Record<WillpowerLevel, Record<SessionDuration, string>> = {
  'high': {
    60: "I'm Too Young to Die",
    90: "Bring It On",
    120: "Crunch Time"
  },
  'medium': {
    60: "Hey, Not Too Rough",
    90: "Come Get Some",
    120: "Balls of Steel ⚪⚪"
  },
  'low': {
    60: "Damn I'm Good",
    90: "Nightmare Deadline",
    120: "Hail to the King 👑"
  }
};

// Utility functions
export const calculateSessionXP = (duration: SessionDuration, willpower: WillpowerLevel): number => {
  return Math.floor((BASE_SESSION_XP + duration * 0.5) * WILLPOWER_MULTIPLIERS[willpower]);
};

export const getDifficultyQuote = (willpower: WillpowerLevel, duration: SessionDuration): string => {
  return DIFFICULTY_QUOTES[willpower][duration];
};

// Examples of XP calculations:
// 60min 'high' willpower = (10 + 30) × 1.0 = 40 XP
// 90min 'medium' willpower = (10 + 45) × 1.5 = 82 XP
// 120min 'low' willpower = (10 + 60) × 2.0 = 140 XP