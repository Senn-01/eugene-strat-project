'use client'

import { useEffect, useRef } from 'react';
import { SessionSetup } from '@/components/deep-focus/SessionSetup';
import { ActiveSession } from '@/components/deep-focus/ActiveSession';
import { SessionComplete } from '@/components/deep-focus/SessionComplete';
// import { DailyCommitmentSlider } from '@/components/deep-focus/DailyCommitmentSlider'; // Story 1.8: Removed - replaced by DailyCapacityMeter
import { useDeepFocusState } from '@/components/deep-focus/useDeepFocusState';
import { MindsetLevel } from '@/components/deep-focus/types';
// Story 1.8: New Components
import { DailyIntentionModal } from '@/components/deep-focus/DailyIntentionModal';
import { DailyCapacityMeter } from '@/components/deep-focus/DailyCapacityMeter';
import { TodaysActivityFeed } from '@/components/deep-focus/TodaysActivityFeed';

export default function DeepFocusPage() {
  const { state, actions } = useDeepFocusState();
  const hasCheckedIntention = useRef(false);

  // Load initial data on mount
  useEffect(() => {
    actions.fetchActiveProjects();
    actions.loadDailyStats();
  }, []); // Empty dependency array since functions are now stable

  // Story 1.8: Check if daily intention modal should be shown (once per page load)
  useEffect(() => {
    // Only check ONCE after dailyStats has loaded
    if (state.dailyStats !== null && !hasCheckedIntention.current) {
      hasCheckedIntention.current = true;

      // Show modal only if no intention set for today
      if (!state.dailyStats.daily_intention) {
        actions.showDailyIntentionModal();
      }
    }
  }, [state.dailyStats, actions]); // Run when dailyStats changes

  const handleSessionComplete = () => {
    // Timer reached zero - transition to completion phase for mindset selection
    actions.transitionToComplete();
  };

  const handleMindsetSubmit = (
    mindset: MindsetLevel,
    goalData?: { goalCompleted: boolean | null; sessionNotes?: string }
  ) => {
    actions.completeSession(mindset, goalData);
  };

  const handleNewSession = () => {
    actions.resetToSetup();
  };

  const handleInterrupt = () => {
    actions.interruptSession();
  };

  return (
    <div className="deep-focus-page" data-page-theme="deep-focus">
      {/* Story 1.8: Daily Intention Modal */}
      <DailyIntentionModal
        isOpen={state.showDailyIntentionModal}
        availableProjects={state.availableProjects}
        onSetIntention={actions.createDailyIntention}
        onSkip={actions.hideDailyIntentionModal}
        isLoading={state.isLoading}
      />

      <div className="deep-focus-container">
        <div className="deep-focus-main">

          {/* Main Content Area */}
          <div className="deep-focus-content">
            <div className="session-component">

              {/* Error Display */}
              {state.error && (
                <div className="mb-6 p-4 bg-red-100 border-2 border-red-600 text-red-800 font-mono uppercase">
                  {state.error}
                </div>
              )}

              {/* Phase 1 & 2: Setup and Willpower Selection */}
              {(state.phase === 'setup' || state.phase === 'willpower-select') && (
                <SessionSetup
                  projects={state.availableProjects}
                  phase={state.phase}
                  sessionConfig={state.sessionConfig}
                  onConfigureSession={actions.configureSession}
                  onStartSession={actions.startSession}
                  onBack={actions.resetToSetup}
                  isLoading={state.isLoading}
                />
              )}

              {/* Phase 3: Active Session */}
              {state.phase === 'active' && state.activeSession && (
                <ActiveSession
                  session={state.activeSession}
                  onComplete={handleSessionComplete}
                  onInterrupt={handleInterrupt}
                />
              )}

              {/* Phase 4: Session Complete */}
              {state.phase === 'complete' && state.activeSession && (
                <SessionComplete
                  duration={state.activeSession.duration}
                  willpower={state.activeSession.willpower}
                  projectName={state.activeSession.projectName}
                  sessionGoal={state.activeSession.sessionGoal}
                  onMindsetSubmit={handleMindsetSubmit}
                  onNewSession={handleNewSession}
                  isLoading={state.isLoading}
                />
              )}

            </div>
          </div>

          {/* Sidebar */}
          <div className="deep-focus-sidebar">

            {/* Story 1.8: Daily Capacity Meter - Hour-based progress */}
            <DailyCapacityMeter
              dailyStats={state.dailyStats}
              isLoading={state.isLoading}
            />

            {/* Story 1.8: Today's Activity Feed - Session history */}
            <TodaysActivityFeed
              sessions={state.dailyStats?.today_sessions || []}
              isLoading={state.isLoading}
            />

            {/* Story 1.8: DailyCommitmentSlider removed - replaced by DailyCapacityMeter (hour-based vs session-based) */}

          </div>
        </div>
      </div>
    </div>
  );
}