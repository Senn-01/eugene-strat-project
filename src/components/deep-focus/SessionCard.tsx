// src/components/deep-focus/SessionCard.tsx
'use client'

import { Check, AlertTriangle, X, Minus } from 'lucide-react';
import { CompletedSession } from './types';
import { formatTime, formatDuration } from './utils';

interface SessionCardProps {
  session: CompletedSession;
  onClick?: () => void;
}

export function SessionCard({ session, onClick }: SessionCardProps) {
  const renderGoalStatus = () => {
    if (!session.session_goal) {
      return (
        <div className="session-card-goal goal-not-set">
          <Minus size={16} className="session-card-goal-icon" />
          <span>No goal set</span>
        </div>
      );
    }

    const icons = {
      true: <Check size={16} />,
      false: <X size={16} />,
      null: <AlertTriangle size={16} />,
    };

    const statusClass =
      session.goal_completed === true ? 'goal-completed' :
      session.goal_completed === false ? 'goal-not-completed' :
      'goal-partial';

    return (
      <div className={`session-card-goal ${statusClass}`}>
        <span className="session-card-goal-icon">
          {icons[String(session.goal_completed) as 'true' | 'false' | 'null']}
        </span>
        <span>{session.session_goal}</span>
      </div>
    );
  };

  const getMindsetClass = () => {
    return `mindset-${session.mindset}`;
  };

  const getMindsetLabel = () => {
    const labels = {
      high: 'Shaolin Mode',
      medium: 'Getting There',
      low: 'What Zone',
    };
    return labels[session.mindset];
  };

  const getGoalStatusLabel = () => {
    if (!session.session_goal) return 'No goal set';
    if (session.goal_completed === true) return 'Goal completed';
    if (session.goal_completed === false) return 'Goal not completed';
    return 'Goal partially completed';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="session-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View details for ${session.project_name} session at ${formatTime(session.started_at)}` : undefined}
    >
      {/* Header: Time & XP (discreet) */}
      <div className="session-card-header">
        <span className="session-card-time">
          {formatTime(session.started_at)} • {formatDuration(session.duration)}
        </span>
        <span className="session-card-xp">{session.xp_earned} XP</span>
      </div>

      {/* Project Name */}
      <div className="session-card-project">
        {session.project_name}
      </div>

      {/* Goal Status */}
      {renderGoalStatus()}

      {/* Mindset Badge */}
      <div className={`session-card-mindset ${getMindsetClass()}`}>
        {getMindsetLabel()}
      </div>
    </div>
  );
}
