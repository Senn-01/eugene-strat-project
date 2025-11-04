'use client'

import { type ActiveSession } from './types';
import { useSessionTimer } from './useSessionTimer';

interface ActiveSessionProps {
  session: ActiveSession;
  onComplete: () => void;
  onInterrupt: () => void;
}

export function ActiveSession({ session, onComplete, onInterrupt }: ActiveSessionProps) {
  const { formattedTime, isComplete } = useSessionTimer({
    startedAt: session.startedAt,
    durationMs: session.duration * 60 * 1000,
    onComplete,
  });

  const handleInterrupt = () => {
    if (window.confirm('Sure?')) {
      onInterrupt();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 text-center">
      {/* Phase-active styling for focus calm */}
      <div className="phase-active p-12">

        {/* Project Info - calm but visible */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold opacity-80 mb-2 uppercase letter-spacing-wide">
            Working on:
          </h2>
          <h1 className="project-name text-3xl font-bold mb-4 font-mono uppercase letter-spacing-wide">
            {session.projectName}
          </h1>

          {/* Session Goal Display */}
          {session.sessionGoal && (
            <div className="session-goal-display mt-4">
              <div className="text-sm font-semibold opacity-70 mb-1 uppercase letter-spacing-wide">
                Session Goal:
              </div>
              <div className="text-lg font-mono text-df-focus">
                {session.sessionGoal}
              </div>
            </div>
          )}
        </div>

        {/* Timer Display - Minimal brutalist styling for focus */}
        <div className="mb-8">
          <div className="timer-display text-6xl sm:text-8xl font-mono font-bold tracking-wider mb-4 p-4 break-all">
            {formattedTime}
          </div>
          <div className="difficulty-quote text-xl font-semibold font-mono uppercase letter-spacing-wide">
            Difficulty chosen: {session.difficultyQuote}
          </div>
        </div>

        {/* Controls - deliberately low emphasis */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleInterrupt}
            className="btn-interrupt px-8 py-3 font-bold uppercase letter-spacing-wide font-mono
                     transition-all duration-200"
          >
            Interrupt Session
          </button>

          <div className="text-sm opacity-70 mt-4 font-mono">
            Session started at {session.startedAt.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}