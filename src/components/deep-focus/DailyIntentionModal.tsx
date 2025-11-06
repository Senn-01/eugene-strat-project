// src/components/deep-focus/DailyIntentionModal.tsx
'use client'

import { useState } from 'react';
import { Project } from '@/lib/types/project.types';

interface DailyIntentionModalProps {
  isOpen: boolean;
  availableProjects: Project[];
  onSetIntention: (hours: number, projectId?: string) => Promise<void>;
  onSkip: () => void;
  isLoading: boolean;
}

export function DailyIntentionModal({
  isOpen,
  availableProjects,
  onSetIntention,
  onSkip,
  isLoading
}: DailyIntentionModalProps) {
  const [hours, setHours] = useState(4);
  const [projectId, setProjectId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    await onSetIntention(hours, projectId || undefined);
  };

  return (
    <div
      className="daily-intention-modal-overlay"
      onClick={onSkip}
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-intention-title"
    >
      <div
        className="daily-intention-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="daily-intention-header">
          <h2 id="daily-intention-title">SET TARGET</h2>
        </div>

        {/* Body */}
        <div className="daily-intention-body">
          {/* Hours slider */}
          <div className="mb-6">
            <label htmlFor="hours-slider" className="field-label mb-2">
              How many hours will you focus today?
            </label>
            <div className="flex items-center gap-4">
              <input
                id="hours-slider"
                type="range"
                min="1"
                max="8"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="daily-intention-slider flex-1"
                aria-label={`Target hours: ${hours}`}
                aria-valuemin={1}
                aria-valuemax={8}
                aria-valuenow={hours}
              />
              <div className="capacity-hours text-2xl" aria-hidden="true">
                {hours}h
              </div>
            </div>
            <div className="flex justify-between text-xs mt-2 opacity-60">
              <span>1h</span>
              <span>8h</span>
            </div>
          </div>

          {/* Priority project (optional) */}
          <div className="mb-6">
            <label htmlFor="priority-project" className="field-label mb-2">
              Priority Project <span className="opacity-50">(Optional)</span>
            </label>
            <select
              id="priority-project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="field-select"
              aria-label="Select priority project (optional)"
            >
              <option value="">No specific priority</option>
              {availableProjects
                .filter(p => p.status === 'active')
                .map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onSkip}
              disabled={isLoading}
              className="btn-secondary-df flex-1"
            >
              Skip Today
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn-primary-df flex-1"
            >
              {isLoading ? 'Saving...' : 'Set Target'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
