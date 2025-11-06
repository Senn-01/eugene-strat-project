/**
 * Focus Quality Chart Component
 * Story 1.9 - Phase 3
 *
 * Line chart showing mindset distribution over 14 days using Recharts
 * Displays three lines: high, medium, low session counts
 */

'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { FocusQualityPoint } from './types';

interface FocusQualityChartProps {
  data: FocusQualityPoint[] | null;
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
      <div className="fqc-tooltip">
        <div className="fqc-tooltip-date">{formatDateAxis(data.date)}</div>
        <div className="fqc-tooltip-item fqc-tooltip-high">
          Shaolin Mode: {data.high_count}
        </div>
        <div className="fqc-tooltip-item fqc-tooltip-medium">
          Getting There: {data.medium_count}
        </div>
        <div className="fqc-tooltip-item fqc-tooltip-low">
          What Zone: {data.low_count}
        </div>
      </div>
    );
  }
  return null;
}

/**
 * Custom legend with mindset labels
 */
function CustomLegend({ payload }: any) {
  const labels: { [key: string]: string } = {
    high_count: 'Shaolin Mode',
    medium_count: 'Getting There',
    low_count: 'What Zone',
  };

  return (
    <div className="fqc-legend">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="fqc-legend-item">
          <div
            className="fqc-legend-color"
            style={{ backgroundColor: entry.color }}
          />
          <span className="fqc-legend-label">{labels[entry.dataKey] || entry.dataKey}</span>
        </div>
      ))}
    </div>
  );
}

export function FocusQualityChart({ data, isLoading }: FocusQualityChartProps) {
  if (isLoading) {
    return (
      <div className="focus-quality-chart">
        <div className="fqc-header">Focus Quality Trends</div>
        <div className="fqc-loading">Loading chart...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="focus-quality-chart">
        <div className="fqc-header">Focus Quality Trends</div>
        <div className="fqc-empty">No quality data available</div>
      </div>
    );
  }

  return (
    <div className="focus-quality-chart">
      <div className="fqc-header">
        <span>Focus Quality Trends</span>
        <span className="fqc-period">Last 14 days</span>
      </div>

      <div className="fqc-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
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
                value: 'Sessions',
                angle: -90,
                position: 'insideLeft',
                style: {
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-family-mono)',
                  fill: '#000000',
                },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Line
              type="monotone"
              dataKey="high_count"
              stroke="#224718"
              strokeWidth={2}
              dot={{ fill: '#224718', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="medium_count"
              stroke="#E5B6E5"
              strokeWidth={2}
              dot={{ fill: '#E5B6E5', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="low_count"
              stroke="#d4d4d2"
              strokeWidth={2}
              dot={{ fill: '#d4d4d2', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
