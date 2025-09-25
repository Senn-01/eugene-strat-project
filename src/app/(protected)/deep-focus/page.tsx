'use client'

import { useEffect } from 'react';
import { SessionSetup } from '@/components/deep-focus/SessionSetup';
import { ActiveSession } from '@/components/deep-focus/ActiveSession';
import { SessionComplete } from '@/components/deep-focus/SessionComplete';
import { DailyCommitmentSlider } from '@/components/deep-focus/DailyCommitmentSlider';
import { useDeepFocusState } from '@/components/deep-focus/useDeepFocusState';
import { MindsetLevel } from '@/components/deep-focus/types';

export default function DeepFocusPage() {
  const { state, actions } = useDeepFocusState();

  // Load initial data on mount
  useEffect(() => {
    actions.fetchActiveProjects();
    actions.loadDailyStats();
  }, []); // Empty dependency array since functions are now stable

  const handleSessionComplete = () => {
    // Timer reached zero - transition to completion phase for mindset selection
    actions.transitionToComplete();
  };

  const handleMindsetSubmit = (mindset: MindsetLevel) => {
    actions.completeSession(mindset);
  };

  const handleNewSession = () => {
    actions.resetToSetup();
  };

  const handleInterrupt = () => {
    actions.interruptSession();
  };

  return (
    <div className="deep-focus-page" data-page-theme="deep-focus">
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
                  onMindsetSubmit={handleMindsetSubmit}
                  onNewSession={handleNewSession}
                  isLoading={state.isLoading}
                />
              )}

            </div>
          </div>

          {/* Sidebar */}
          <div className="deep-focus-sidebar">

            {/* Daily Commitment Slider - Always Visible */}
            <DailyCommitmentSlider
              currentTarget={state.dailyCommitment.target}
              completedSessions={state.dailyCommitment.current}
              onUpdateCommitment={actions.setDailyCommitment}
            />


          </div>
        </div>
      </div>
    </div>
  );
}