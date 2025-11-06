/**
 * Project Segments Table Component
 * Story 1.9 - Phase 3
 *
 * Displays time investment per project in sortable HTML table
 * Shows sessions, hours, average duration, and quality percentage
 */

'use client'

import { useState } from 'react';
import type { ProjectSegment } from './types';

interface ProjectSegmentsTableProps {
  segments: ProjectSegment[] | null;
  isLoading: boolean;
}

type SortColumn = 'project_name' | 'session_count' | 'total_hours' | 'avg_duration' | 'high_mindset_pct';
type SortDirection = 'asc' | 'desc';

export function ProjectSegmentsTable({ segments, isLoading }: ProjectSegmentsTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>('total_hours');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Handle column header click for sorting
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to descending
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  // Sort segments based on current sort state
  const sortedSegments = segments ? [...segments].sort((a, b) => {
    let aVal: string | number = a[sortColumn];
    let bVal: string | number = b[sortColumn];

    // Handle string comparison for project names
    if (sortColumn === 'project_name') {
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    }

    // Numeric comparison
    const aNum = Number(aVal);
    const bNum = Number(bVal);

    return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
  }) : [];

  if (isLoading) {
    return (
      <div className="project-segments-table">
        <div className="pst-header">Project Segments</div>
        <div className="pst-loading">Loading project data...</div>
      </div>
    );
  }

  if (!segments || segments.length === 0) {
    return (
      <div className="project-segments-table">
        <div className="pst-header">Project Segments</div>
        <div className="pst-empty">
          No project data yet. Complete some sessions to see time allocation.
        </div>
      </div>
    );
  }

  return (
    <div className="project-segments-table">
      <div className="pst-header">
        <span>Project Segments</span>
        <span className="pst-count">({segments.length} projects)</span>
      </div>

      <div className="pst-table-wrapper">
        <table className="pst-table">
          <thead>
            <tr>
              <th
                className={sortColumn === 'project_name' ? 'pst-th-active' : ''}
                onClick={() => handleSort('project_name')}
              >
                Project
                {sortColumn === 'project_name' && (
                  <span className="pst-sort-indicator">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th
                className={sortColumn === 'session_count' ? 'pst-th-active' : ''}
                onClick={() => handleSort('session_count')}
              >
                Sessions
                {sortColumn === 'session_count' && (
                  <span className="pst-sort-indicator">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th
                className={sortColumn === 'total_hours' ? 'pst-th-active' : ''}
                onClick={() => handleSort('total_hours')}
              >
                Hours
                {sortColumn === 'total_hours' && (
                  <span className="pst-sort-indicator">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th
                className={sortColumn === 'avg_duration' ? 'pst-th-active' : ''}
                onClick={() => handleSort('avg_duration')}
              >
                Avg Session
                {sortColumn === 'avg_duration' && (
                  <span className="pst-sort-indicator">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th
                className={sortColumn === 'high_mindset_pct' ? 'pst-th-active' : ''}
                onClick={() => handleSort('high_mindset_pct')}
              >
                Quality
                {sortColumn === 'high_mindset_pct' && (
                  <span className="pst-sort-indicator">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSegments.map((segment) => (
              <tr key={segment.project_id} className="pst-row">
                <td className="pst-project-name">{segment.project_name}</td>
                <td className="pst-numeric">{segment.session_count}</td>
                <td className="pst-numeric">{segment.total_hours}h</td>
                <td className="pst-numeric">{segment.avg_duration}m</td>
                <td className="pst-numeric">{segment.high_mindset_pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
