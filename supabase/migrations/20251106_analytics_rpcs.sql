-- ============================================================================
-- Analytics Dashboard RPC Functions (FIXED)
-- Story 1.9 - Phase 1: Database Setup
-- Created: November 6, 2025
-- Updated: November 6, 2025 - Fixed GROUP BY errors
-- ============================================================================
-- Purpose: Create 6 RPC functions for Analytics Dashboard data aggregation
-- These functions provide optimized single-call data retrieval for charts
-- All functions use SECURITY DEFINER with auth.uid() validation
-- ============================================================================

-- ============================================================================
-- Query 1: Weekly Hero Metrics
-- Purpose: Top bar stats (sessions, hours, XP, streak)
-- Returns: JSON object with weekly aggregate statistics
-- ============================================================================

CREATE OR REPLACE FUNCTION get_weekly_stats(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  -- Verify user authorization
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  SELECT json_build_object(
    'sessions_count', COUNT(*),
    'total_hours', ROUND(CAST(SUM(duration) AS NUMERIC) / 60.0, 1),
    'total_xp', COALESCE(SUM(xp_earned), 0),
    'current_streak', 0  -- Placeholder: streak calculation deferred to Phase 2
  )
  INTO result
  FROM sessions
  WHERE user_id = user_id_param
    AND is_completed = true
    AND started_at >= NOW() - INTERVAL '7 days';

  RETURN result;
END;
$$;

COMMENT ON FUNCTION get_weekly_stats IS 'Returns weekly aggregate stats for hero metrics bar';

-- ============================================================================
-- Query 2: Recent Sessions Feed (FIXED)
-- Purpose: Last 7 sessions with project names
-- Returns: JSON array of session objects with project data
-- ============================================================================

CREATE OR REPLACE FUNCTION get_recent_sessions(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  -- Use subquery to order before aggregation
  SELECT json_agg(row_to_json(t))
  INTO result
  FROM (
    SELECT
      s.id,
      s.started_at,
      s.duration,
      s.session_goal,
      s.goal_completed,
      s.mindset,
      s.xp_earned,
      p.name AS project_name
    FROM sessions s
    JOIN projects p ON p.id = s.project_id
    WHERE s.user_id = user_id_param
      AND s.is_completed = true
    ORDER BY s.started_at DESC
    LIMIT 7
  ) t;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

COMMENT ON FUNCTION get_recent_sessions IS 'Returns last 7 completed sessions with project names';

-- ============================================================================
-- Query 3: Project Segments (FIXED)
-- Purpose: Time investment per project (table data)
-- Returns: JSON array of project statistics sorted by total hours
-- ============================================================================

CREATE OR REPLACE FUNCTION get_project_segments(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  -- Use subquery to calculate aggregates first, then convert to JSON
  SELECT json_agg(row_to_json(t))
  INTO result
  FROM (
    SELECT
      p.id AS project_id,
      p.name AS project_name,
      COALESCE(COUNT(s.id), 0) AS session_count,
      ROUND(CAST(COALESCE(SUM(s.duration), 0) AS NUMERIC) / 60.0, 1) AS total_hours,
      ROUND(CAST(AVG(s.duration) AS NUMERIC), 0) AS avg_duration,
      ROUND(
        CAST(COUNT(*) FILTER (WHERE s.mindset = 'high') AS NUMERIC) * 100.0 /
        NULLIF(COUNT(*), 0),
        0
      ) AS high_mindset_pct
    FROM projects p
    LEFT JOIN sessions s ON s.project_id = p.id
      AND s.is_completed = true
      AND s.user_id = user_id_param
    WHERE p.user_id = user_id_param
    GROUP BY p.id, p.name
    HAVING COUNT(s.id) > 0
    ORDER BY total_hours DESC
  ) t;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

COMMENT ON FUNCTION get_project_segments IS 'Returns time investment statistics per project';

-- ============================================================================
-- Query 4: Weekly Volume Data (14 days) (FIXED)
-- Purpose: Bar chart data (hours per day)
-- Returns: JSON array with all 14 days (even if 0 sessions)
-- ============================================================================

CREATE OR REPLACE FUNCTION get_weekly_volume(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  -- Use CTE to generate date series, aggregate, then convert to JSON
  WITH date_series AS (
    SELECT generate_series(
      CURRENT_DATE - INTERVAL '13 days',
      CURRENT_DATE,
      '1 day'
    )::date AS date
  ),
  aggregated_data AS (
    SELECT
      ds.date,
      ROUND(CAST(COALESCE(SUM(s.duration), 0) AS NUMERIC) / 60.0, 1) AS hours
    FROM date_series ds
    LEFT JOIN sessions s ON DATE(s.started_at) = ds.date
      AND s.user_id = user_id_param
      AND s.is_completed = true
    GROUP BY ds.date
    ORDER BY ds.date
  )
  SELECT json_agg(json_build_object('date', date, 'hours', hours))
  INTO result
  FROM aggregated_data;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

COMMENT ON FUNCTION get_weekly_volume IS 'Returns daily hours for last 14 days (bar chart data)';

-- ============================================================================
-- Query 5: Focus Quality Trends (14 days) (FIXED)
-- Purpose: Line chart data (mindset distribution over time)
-- Returns: JSON array with daily mindset counts
-- ============================================================================

CREATE OR REPLACE FUNCTION get_focus_quality(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  -- Use CTE to generate date series, aggregate, then convert to JSON
  WITH date_series AS (
    SELECT generate_series(
      CURRENT_DATE - INTERVAL '13 days',
      CURRENT_DATE,
      '1 day'
    )::date AS date
  ),
  aggregated_data AS (
    SELECT
      ds.date,
      COALESCE(COUNT(*) FILTER (WHERE s.mindset = 'high'), 0) AS high_count,
      COALESCE(COUNT(*) FILTER (WHERE s.mindset = 'medium'), 0) AS medium_count,
      COALESCE(COUNT(*) FILTER (WHERE s.mindset = 'low'), 0) AS low_count
    FROM date_series ds
    LEFT JOIN sessions s ON DATE(s.started_at) = ds.date
      AND s.user_id = user_id_param
      AND s.is_completed = true
    GROUP BY ds.date
    ORDER BY ds.date
  )
  SELECT json_agg(json_build_object(
    'date', date,
    'high_count', high_count,
    'medium_count', medium_count,
    'low_count', low_count
  ))
  INTO result
  FROM aggregated_data;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

COMMENT ON FUNCTION get_focus_quality IS 'Returns daily mindset distribution for last 14 days (line chart data)';

-- ============================================================================
-- Query 6: Personal Records
-- Purpose: Best day, best week, longest session
-- Returns: JSON object with three personal records
-- ============================================================================

CREATE OR REPLACE FUNCTION get_personal_records(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  best_day_sessions INT;
  best_day_date DATE;
  best_week_xp INT;
  best_week_start DATE;
  longest_duration INT;
  longest_date TIMESTAMP;
  result JSON;
BEGIN
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access';
  END IF;

  -- Best Day (most sessions)
  SELECT COUNT(*), DATE(started_at)
  INTO best_day_sessions, best_day_date
  FROM sessions
  WHERE user_id = user_id_param AND is_completed = true
  GROUP BY DATE(started_at)
  ORDER BY COUNT(*) DESC
  LIMIT 1;

  -- Best Week (highest XP)
  SELECT SUM(xp_earned), DATE_TRUNC('week', started_at)::date
  INTO best_week_xp, best_week_start
  FROM sessions
  WHERE user_id = user_id_param AND is_completed = true
  GROUP BY DATE_TRUNC('week', started_at)
  ORDER BY SUM(xp_earned) DESC
  LIMIT 1;

  -- Longest Session
  SELECT duration, started_at
  INTO longest_duration, longest_date
  FROM sessions
  WHERE user_id = user_id_param AND is_completed = true
  ORDER BY duration DESC
  LIMIT 1;

  SELECT json_build_object(
    'best_day', json_build_object(
      'sessions', COALESCE(best_day_sessions, 0),
      'date', best_day_date
    ),
    'best_week', json_build_object(
      'xp', COALESCE(best_week_xp, 0),
      'week_start', best_week_start
    ),
    'longest_session', json_build_object(
      'duration', COALESCE(longest_duration, 0),
      'date', longest_date
    )
  )
  INTO result;

  RETURN result;
END;
$$;

COMMENT ON FUNCTION get_personal_records IS 'Returns personal best statistics (best day, week, longest session)';

-- ============================================================================
-- Migration Verification
-- Run these queries to verify all functions were created successfully
-- ============================================================================

-- Test 1: Verify all 6 functions exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_weekly_stats') THEN
    RAISE EXCEPTION 'get_weekly_stats function not created';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_recent_sessions') THEN
    RAISE EXCEPTION 'get_recent_sessions function not created';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_project_segments') THEN
    RAISE EXCEPTION 'get_project_segments function not created';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_weekly_volume') THEN
    RAISE EXCEPTION 'get_weekly_volume function not created';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_focus_quality') THEN
    RAISE EXCEPTION 'get_focus_quality function not created';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_personal_records') THEN
    RAISE EXCEPTION 'get_personal_records function not created';
  END IF;

  RAISE NOTICE '✅ VERIFICATION PASSED: All 6 RPC functions created successfully';
END $$;
