'use client'

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Project } from '@/lib/types/project.types';
import { SessionConfig, WillpowerLevel, SessionDuration, SessionPhase } from './types';

interface SessionSetupProps {
  projects: Project[];
  phase: SessionPhase;
  sessionConfig: SessionConfig | null;
  onConfigureSession: (projectId: string, duration: SessionDuration) => void;
  onStartSession: (willpower: WillpowerLevel) => void;
  onBack: () => void;
  isLoading: boolean;
}

export function SessionSetup({
  projects,
  phase,
  sessionConfig,
  onConfigureSession,
  onStartSession,
  onBack,
  isLoading
}: SessionSetupProps) {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [duration, setDuration] = useState<SessionDuration>(60);

  // Step 1: Project + Duration Selection
  if (phase === 'setup') {
    const activeProjects = projects.filter(p => p.status === 'active');

    const handleContinue = () => {
      if (selectedProject) {
        onConfigureSession(selectedProject, duration);
      }
    };

    return (
      <div className="w-full p-8">
        <div className="phase-setup p-8">
          <h2 className="text-2xl font-bold mb-6 uppercase letter-spacing-wide">
            Focus Session
          </h2>

          <div className="flex flex-col gap-6">
            {/* Project Selection */}
            <div>
              <label className="field-label">
                Project
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="field-select"
              >
                <option value="">Select project...</option>
                {activeProjects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {activeProjects.length === 0 && (
                <div className="field-guidance">
                  No active projects found. Create projects in TacticalMap first.
                </div>
              )}
            </div>

            {/* Duration Selection */}
            <div>
              <label className="field-label">
                Session Duration
              </label>
              <div className="grid grid-cols-3 gap-4">
                {([60, 90, 120] as SessionDuration[]).map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDuration(mins)}
                    className={`toggle-button ${duration === mins ? 'selected' : ''}`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!selectedProject || activeProjects.length === 0}
              className={`btn-primary ${
                (!selectedProject || activeProjects.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Continue to Willpower Check
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Willpower Assessment
  if (phase === 'willpower-select' && sessionConfig) {
    const willpowerOptions = [
      {
        value: 'high' as WillpowerLevel,
        label: 'Piece Of Cake',
        desc: 'High energy, ready to crush it'
      },
      {
        value: 'medium' as WillpowerLevel,
        label: 'Caffeinated',
        desc: 'Normal energy, need some focus'
      },
      {
        value: 'low' as WillpowerLevel,
        label: "Don't Talk To Me",
        desc: 'Low energy, maximum difficulty'
      },
    ];

    return (
      <div className="w-full p-8">
        <div className="phase-willpower p-8">
          <div className="mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-semibold text-black hover:underline mb-4"
            >
              <ArrowLeft size={16} />
              Back to Project Selection
            </button>
            <h2 className="text-2xl font-bold uppercase letter-spacing-wide">
              Energy Check
            </h2>
            <p className="text-lg opacity-70 mt-2 font-mono">
              {sessionConfig.projectName} • {sessionConfig.duration} minutes
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold mb-4 uppercase letter-spacing-wide">
              How&apos;s your focus energy right now?
            </p>

            {willpowerOptions.map(option => (
              <button
                key={option.value}
                onClick={() => onStartSession(option.value)}
                disabled={isLoading}
                className={`willpower-option w-full p-4 text-left group ${
                           isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                         }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg uppercase letter-spacing-wide">
                      {option.label}
                    </div>
                    <div className="text-sm opacity-70 font-mono">
                      {option.desc}
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {isLoading && (
              <div className="text-center font-mono uppercase letter-spacing-wide mt-4">
                Starting session...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}