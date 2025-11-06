/**
 * Weekly Volume Chart Component
 * Story 1.9 - Phase 3
 *
 * Bar chart showing daily hours over 14 days using Recharts
 * Uses 80% default Recharts styling with minimal neo-brutalist overrides
 */

'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import type { VolumeDataPoint } from './types';

interface WeeklyVolumeChartProps {
  data: VolumeDataPoint[] | null;
  isLoading: boolean;
}

/**
 * Format date for chart x-axis (e.g., "Nov 4")
 */
function formatDateAxis(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

/**
 * Custom tooltip content with neo-brutalist styling
 */
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="wvc-tooltip">
        <div className="wvc-tooltip-date">{formatDateAxis(data.date)}</div>
        <div className="wvc-tooltip-value">{data.hours} hours</div>
      </div>
    );
  }
  return null;
}

export function WeeklyVolumeChart({ data, isLoading }: WeeklyVolumeChartProps) {
  if (isLoading) {
    return (
      <div className="weekly-volume-chart">
        <div className="wvc-header">Weekly Volume</div>
        <div className="wvc-loading">Loading chart...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="weekly-volume-chart">
        <div className="wvc-header">Weekly Volume</div>
        <div className="wvc-empty">No volume data available</div>
      </div>
    );
  }

  return (
    <div className="weekly-volume-chart">
      <div className="wvc-header">
        <span>Weekly Volume</span>
        <span className="wvc-period">Last 14 days</span>
      </div>

      <div className="wvc-chart-wrapper">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke="#d4d4d2"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateAxis}
              stroke="#000000"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-family-mono)',
              }}
              tick={{ fill: '#000000' }}
            />
            <YAxis
              stroke="#000000"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-family-mono)',
              }}
              tick={{ fill: '#000000' }}
              label={{
                value: 'Hours',
                angle: -90,
                position: 'insideLeft',
                style: {
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-family-mono)',
                  fill: '#000000',
                },
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(147, 51, 234, 0.1)' }} />
            <Bar dataKey="hours" radius={[0, 0, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.hours > 0 ? '#451969' : '#d4d4d2'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
