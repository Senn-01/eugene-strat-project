// src/components/deep-focus/useSessionTimer.ts
'use client'

import { useState, useEffect, useCallback } from 'react';
import { useInterval } from 'react-use';

interface UseSessionTimerProps {
  startedAt: Date;
  durationMs: number;
  onComplete: () => void;
}

export function useSessionTimer({ startedAt, durationMs, onComplete }: UseSessionTimerProps) {
  const [remainingMs, setRemainingMs] = useState(durationMs);
  const [isRunning, setIsRunning] = useState(true);

  // Calculate remaining time based on actual elapsed time (more accurate)
  const updateTimer = useCallback(() => {
    const elapsed = Date.now() - startedAt.getTime();
    const remaining = Math.max(0, durationMs - elapsed);

    setRemainingMs(remaining);

    // Update document title
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    document.title = `${minutes}:${seconds.toString().padStart(2, '0')} - Eugene Strat`;

    if (remaining <= 0 && isRunning) {
      setIsRunning(false);
      // Play completion sound
      playCompletionSound();
      onComplete();
    }
  }, [startedAt, durationMs, onComplete]);

  // Update every second when running
  useInterval(updateTimer, isRunning ? 1000 : null);

  // Initialize on mount
  useEffect(() => {
    updateTimer();
  }, [updateTimer]);

  // Reset document title on unmount
  useEffect(() => {
    return () => {
      document.title = 'Eugene Strat';
    };
  }, []);

  const playCompletionSound = () => {
    try {
      const audio = new Audio('/sounds/session-complete.wav');
      audio.play().catch(console.warn); // Ignore if sound fails
    } catch (error) {
      console.warn('Could not play completion sound:', error);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    remainingMs,
    formattedTime: formatTime(remainingMs),
    isComplete: remainingMs <= 0,
  };
}