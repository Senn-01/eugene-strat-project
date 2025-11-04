'use client'

import { useState } from 'react';
import { Check, AlertTriangle, X } from 'lucide-react';
import { MindsetLevel, SessionDuration, WillpowerLevel, GoalCompletionStatus } from './types';
import { calculateSessionXP } from './constants';

interface SessionCompleteProps {
  duration: SessionDuration;
  willpower: WillpowerLevel;
  projectName: string;
  sessionGoal?: string;
  onMindsetSubmit: (
    mindset: MindsetLevel,
    goalData?: { goalCompleted: boolean | null; sessionNotes?: string }
  ) => void;
  onNewSession: () => void;
  isLoading: boolean;
}

export function SessionComplete({
  duration,
  willpower,
  projectName,
  sessionGoal,
  onMindsetSubmit,
  onNewSession,
  isLoading
}: SessionCompleteProps) {
  const [selectedMindset, setSelectedMindset] = useState<MindsetLevel | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [goalCompletion, setGoalCompletion] = useState<GoalCompletionStatus | null>(null);
  const [sessionNotes, setSessionNotes] = useState<string>('');

  const xpEarned = calculateSessionXP(duration, willpower);

  const mindsetOptions = [
    { value: 'high' as MindsetLevel, label: 'Shaolin Mode', desc: 'Deep focus achieved' },
    { value: 'medium' as MindsetLevel, label: 'Getting There', desc: 'Some focus, some distraction' },
    { value: 'low' as MindsetLevel, label: 'What Zone', desc: 'Struggled to focus' },
  ];

  const handleMindsetSelect = (mindset: MindsetLevel) => {
    setSelectedMindset(mindset);

    const goalData = sessionGoal ? {
      goalCompleted: goalCompletion === 'yes' ? true : goalCompletion === 'no' ? false : null,
      sessionNotes: sessionNotes.trim() || undefined,
    } : undefined;

    onMindsetSubmit(mindset, goalData);
    setShowReward(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      {/* Maximum brutal impact for achievement */}
      <div className="bg-white border-4 border-black shadow-[12px_12px_0px_#000] p-12">

        {!showReward ? (
          /* Mindset Feedback Collection */
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-black uppercase letter-spacing-wide mb-4">
                Session complete
              </h1>
              <div className="text-xl font-mono text-black/80 uppercase letter-spacing-wide">
                {projectName} • {duration} minutes
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Goal Completion Section (if goal was set) */}
              {sessionGoal && (
                <div className="mb-6 p-4 bg-white border-2 border-black">
                  <div className="text-sm font-semibold mb-2 uppercase letter-spacing-wide opacity-70">
                    Session Goal:
                  </div>
                  <div className="text-lg font-mono mb-4 text-black">
                    {sessionGoal}
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-semibold mb-3 block uppercase letter-spacing-wide">
                      Goal Status:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setGoalCompletion('yes')}
                        className={`goal-completion-button p-3 border-2 border-black transition-all ${
                          goalCompletion === 'yes' ? 'bg-[#224718] text-white' : 'bg-white text-black hover:bg-gray-100'
                        }`}
                      >
                        <Check size={20} className="mx-auto mb-1" />
                        <span className="text-xs font-bold uppercase">YES</span>
                      </button>
                      <button
                        onClick={() => setGoalCompletion('partial')}
                        className={`goal-completion-button p-3 border-2 border-black transition-all ${
                          goalCompletion === 'partial' ? 'bg-[#E5B6E5] text-black' : 'bg-white text-black hover:bg-gray-100'
                        }`}
                      >
                        <AlertTriangle size={20} className="mx-auto mb-1" />
                        <span className="text-xs font-bold uppercase">PARTIAL</span>
                      </button>
                      <button
                        onClick={() => setGoalCompletion('no')}
                        className={`goal-completion-button p-3 border-2 border-black transition-all ${
                          goalCompletion === 'no' ? 'bg-white opacity-70' : 'bg-white text-black hover:bg-gray-100'
                        }`}
                      >
                        <X size={20} className="mx-auto mb-1" />
                        <span className="text-xs font-bold uppercase">NO</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block uppercase letter-spacing-wide">
                      Session Notes <span className="opacity-50">(Optional)</span>
                    </label>
                    <textarea
                      value={sessionNotes}
                      onChange={(e) => setSessionNotes(e.target.value)}
                      placeholder="Quick reflection..."
                      maxLength={500}
                      className="w-full p-3 border-2 border-black font-mono text-sm"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-semibold text-black uppercase letter-spacing-wide">
                Were you in the zone for that session?
              </h2>

              <div className="flex flex-col gap-3">
                {mindsetOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleMindsetSelect(option.value)}
                    disabled={isLoading}
                    className={`w-full p-4 bg-white border-2 border-black text-left font-semibold
                             hover:bg-gray-100 transition-all duration-200 hover:translate-x-1 hover:translate-y-1
                             hover:shadow-[2px_2px_0px_#000] ${
                               isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                             }`}
                  >
                    <div className="text-center">
                      <div className="font-bold text-lg uppercase letter-spacing-wide text-black">
                        {option.label}
                      </div>
                      <div className="text-sm text-black/70 font-mono mt-1">
                        {option.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {isLoading && (
                <div className="text-center text-black font-mono uppercase letter-spacing-wide mt-4">
                  Saving feedback...
                </div>
              )}
            </div>
          </>
        ) : (
          /* Session Logged - Professional, discreet display */
          <div className="flex flex-col gap-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-black uppercase letter-spacing-wide mb-2">
                Session logged
              </h1>
              <div className="text-lg font-mono text-black/80">
                {projectName} • {duration} minutes
              </div>
            </div>

            {/* XP Display - Discreet metric */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-sm font-mono text-black opacity-60">
                {xpEarned} XP
              </span>
              <span className="text-sm font-mono text-black opacity-60">
                •
              </span>
              <span className="text-sm font-mono text-black opacity-60">
                {selectedMindset ? selectedMindset.charAt(0).toUpperCase() + selectedMindset.slice(1) : ''} focus
              </span>
            </div>

            <button
              onClick={onNewSession}
              className="btn-brutal btn-primary text-xl px-8 py-4 w-full
                       shadow-[6px_6px_0px_#000] hover:shadow-[4px_4px_0px_#000]"
            >
              Start Another Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}