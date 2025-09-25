'use client'

import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { MindsetLevel, SessionDuration, WillpowerLevel } from './types';
import { calculateSessionXP } from './constants';

interface SessionCompleteProps {
  duration: SessionDuration;
  willpower: WillpowerLevel;
  projectName: string;
  onMindsetSubmit: (mindset: MindsetLevel) => void;
  onNewSession: () => void;
  isLoading: boolean;
}

export function SessionComplete({
  duration,
  willpower,
  projectName,
  onMindsetSubmit,
  onNewSession,
  isLoading
}: SessionCompleteProps) {
  const [selectedMindset, setSelectedMindset] = useState<MindsetLevel | null>(null);
  const [showReward, setShowReward] = useState(false);

  const xpEarned = calculateSessionXP(duration, willpower);

  const mindsetOptions = [
    { value: 'high' as MindsetLevel, label: 'Shaolin mode!', desc: 'Deep focus achieved' },
    { value: 'medium' as MindsetLevel, label: 'Getting there', desc: 'Some focus, some distraction' },
    { value: 'low' as MindsetLevel, label: 'What the heck is the zone?', desc: 'Struggled to focus' },
  ];

  const handleMindsetSelect = (mindset: MindsetLevel) => {
    setSelectedMindset(mindset);
    onMindsetSubmit(mindset);
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
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy size={32} className="text-black" />
                <h1 className="text-4xl font-bold text-black uppercase letter-spacing-wide">
                  Session Complete!
                </h1>
                <Trophy size={32} className="text-black" />
              </div>
              <div className="text-xl font-mono text-black/80 uppercase letter-spacing-wide">
                {projectName} • {duration} minutes
              </div>
            </div>

            <div className="flex flex-col gap-6">
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
          /* XP Reward Display - Maximum brutal celebration */
          <div className="flex flex-col gap-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-black uppercase letter-spacing-wide mb-2">
                Well Done!
              </h1>
              <div className="text-lg font-mono text-black/80">
                Your focus session is complete
              </div>
            </div>

            {/* XP Reward with maximum emphasis */}
            <div className="bg-black text-white border-4 border-black p-6
                          shadow-[8px_8px_0px_#000] mb-6">
              <div className="text-6xl font-bold font-mono text-white">
                +{xpEarned} XP
              </div>
              <div className="text-lg font-mono uppercase letter-spacing-wide mt-2">
                Experience Gained
              </div>
            </div>

            <div className="text-lg text-black font-mono uppercase letter-spacing-wide mb-6">
              Great job! Reward yourself and take a break.
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