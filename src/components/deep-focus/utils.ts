// src/components/deep-focus/utils.ts

/**
 * Formats an ISO datetime string to localized time format
 * @param isoString - ISO datetime string (e.g., "2025-01-04T09:15:00Z")
 * @returns Formatted time string (e.g., "09:15 AM")
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formats duration in minutes to a readable string
 * @param minutes - Duration in minutes
 * @returns Formatted duration (e.g., "90 min")
 */
export function formatDuration(minutes: number): string {
  return `${minutes} min`;
}

/**
 * Converts minutes to hours with one decimal place
 * @param minutes - Duration in minutes
 * @returns Formatted hours (e.g., "1.5")
 */
export function formatHours(minutes: number): string {
  return (minutes / 60).toFixed(1);
}
