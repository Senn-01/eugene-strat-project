// src/components/deep-focus/DailyCapacityMeter.tsx
'use client'

import { AlertTriangle, Check } from 'lucide-react';
import { DailyStats } from './types';
import { formatHours } from './utils';

interface DailyCapacityMeterProps {
  dailyStats: DailyStats | null;
  isLoading: boolean;
}

export function DailyCapacityMeter({ dailyStats, isLoading }: DailyCapacityMeterProps) {
  if (isLoading || !dailyStats) {
    return (
      <div className="capacity-meter-container">
        <div className="capacity-meter-header">DAILY CAPACITY</div>
        <div className="capacity-no-target">
          Loading...
        </div>
      </div>
    );
  }

  const { daily_intention, total_hours, sessions_completed } = dailyStats;

  // No target set
  if (!daily_intention) {
    return (
      <div className="capacity-meter-container">
        <div className="capacity-meter-header">DAILY CAPACITY</div>
        <div className="capacity-no-target">
          Set target to track progress
        </div>
      </div>
    );
  }

  const targetHours = daily_intention.target_hours;
  const percentage = Math.round((total_hours / targetHours) * 100);
  const isExceeded = percentage > 100;
  const isMet = percentage === 100;

  return (
    <div className="capacity-meter-container">
      <div className="capacity-meter-header">DAILY CAPACITY</div>

      {/* Hours Display */}
      <div className="capacity-hours-display">
        <div className={`capacity-hours ${isExceeded ? 'exceeded' : ''}`}>
          {formatHours(total_hours * 60)} / {targetHours}.0 hours
        </div>
        {isExceeded && <AlertTriangle size={20} className="text-df-special" />}
        {isMet && !isExceeded && <Check size={20} className="text-df-focus" />}
      </div>

      {/* Progress Bar */}
      <div className="capacity-progress-bar">
        <div
          className={`capacity-progress-fill ${isExceeded ? 'exceeded' : ''}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          <span className="capacity-progress-percentage">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="capacity-stats">
        {sessions_completed} session{sessions_completed !== 1 ? 's' : ''} completed
      </div>

      {/* Message */}
      {isExceeded && (
        <div className="capacity-message exceeded">
          Capacity: {percentage}%
        </div>
      )}
      {isMet && !isExceeded && (
        <div className="capacity-message">
          Target met
        </div>
      )}
    </div>
  );
}
