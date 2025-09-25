'use client'

import { useState, useEffect } from 'react';
import { Target } from 'lucide-react';

interface DailyCommitmentSliderProps {
  currentTarget: number | null;
  completedSessions: number;
  onUpdateCommitment: (target: number | null) => void;
}

export function DailyCommitmentSlider({
  currentTarget,
  completedSessions,
  onUpdateCommitment
}: DailyCommitmentSliderProps) {
  const [sliderValue, setSliderValue] = useState(currentTarget || 0);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!currentTarget);

  useEffect(() => {
    setSliderValue(currentTarget || 0);
    setHasChanges(false);
    setIsEditMode(!currentTarget);
  }, [currentTarget]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    setHasChanges(value !== (currentTarget || 0));
  };

  const handleSave = () => {
    onUpdateCommitment(sliderValue === 0 ? null : sliderValue);
    setHasChanges(false);
  };

  const handleEditTarget = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setSliderValue(currentTarget || 0);
    setHasChanges(false);
    setIsEditMode(false);
  };

  const progressPercentage = currentTarget && currentTarget > 0
    ? Math.min(100, (completedSessions / currentTarget) * 100)
    : 0;

  const isCompleted = currentTarget && completedSessions >= currentTarget;

  return (
    <div className="daily-commitment-slider p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target size={20} />
          <h3 className="font-bold text-lg uppercase letter-spacing-wide">
            Daily Target
          </h3>
        </div>
        <div className="text-sm font-mono uppercase">
          {completedSessions}/{currentTarget || '—'} sessions
        </div>
      </div>

      {/* Show progress view when target is set and not in edit mode */}
      {currentTarget && !isEditMode ? (
        <div className="space-y-4">
          {/* Progress Display */}
          <div className="text-center">
            <div className="text-2xl font-mono font-bold mb-2">
              {completedSessions} / {currentTarget}
            </div>
            <div className="text-sm font-semibold uppercase letter-spacing-wide">
              {isCompleted ? 'Target Achieved! 🎉' :
               `${currentTarget - completedSessions} more session${currentTarget - completedSessions === 1 ? '' : 's'} to go`}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-black/20 h-3 border border-black/40">
            <div
              className={`progress-bar h-full transition-all duration-300 ${
                isCompleted ? 'completed' : ''
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Change Target Button */}
          <div className="text-center">
            <button
              onClick={handleEditTarget}
              className="text-xs px-3 py-1 border border-black/40 hover:bg-black/10
                         font-mono uppercase letter-spacing-wide transition-colors"
            >
              Change Target
            </button>
          </div>
        </div>
      ) : (
        /* Show slider when no target is set or in edit mode */
        <div className="space-y-3">
          {/* Slider Labels */}
          <div className="flex items-center justify-between text-xs font-semibold uppercase">
            <span>Optional</span>
            <span>1</span>
            <span>5</span>
            <span>10 sessions</span>
          </div>

          {/* Slider Input */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-3 bg-black/20 appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:h-6
                       [&::-webkit-slider-thumb]:w-6
                       [&::-webkit-slider-thumb]:bg-black
                       [&::-webkit-slider-thumb]:border-2
                       [&::-webkit-slider-thumb]:border-white
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-[2px_2px_0px_rgba(0,0,0,0.3)]
                       [&::-moz-range-thumb]:h-6
                       [&::-moz-range-thumb]:w-6
                       [&::-moz-range-thumb]:bg-black
                       [&::-moz-range-thumb]:border-2
                       [&::-moz-range-thumb]:border-white
                       [&::-moz-range-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:border-radius-0"
            />
          </div>

          {/* Current value display */}
          <div className="text-center">
            <span className="font-mono font-bold text-lg">
              {sliderValue === 0 ? 'No target set' : `${sliderValue} session${sliderValue === 1 ? '' : 's'}`}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            {hasChanges && (
              <button
                onClick={handleSave}
                className="text-on-black px-4 py-2 font-mono font-bold uppercase
                           border-2 border-black shadow-[2px_2px_0px_#000]
                           hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_#000]
                           transition-all duration-200"
              >
                Save Target
              </button>
            )}
            {isEditMode && currentTarget && (
              <button
                onClick={handleCancelEdit}
                className="px-3 py-2 text-xs border border-black/40 hover:bg-black/10
                           font-mono uppercase letter-spacing-wide transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}