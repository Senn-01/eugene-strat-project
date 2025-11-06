-- ============================================================================
-- Migration: Story 1.8 - DeepFocus Time-Boxing Enhancements
-- ============================================================================
-- Created: November 4, 2025
-- Description: Extends sessions table and creates daily_intentions table
--              to support session goal tracking and daily capacity planning
--
-- Changes:
--   1. Extend sessions table with goal tracking fields
--   2. Create daily_intentions table for daily hour targets
--   3. Create get_daily_stats RPC for efficient data retrieval
--
-- Safety: All changes are backward compatible (nullable columns)
-- ============================================================================

-- ============================================================================
-- PART 1: Extend sessions table
-- ============================================================================

DO $$
BEGIN
  -- Only add columns if they don't already exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'sessions' AND column_name = 'session_goal') THEN

    ALTER TABLE sessions
      ADD COLUMN session_goal TEXT,
      ADD COLUMN goal_completed BOOLEAN,
      ADD COLUMN session_notes TEXT;

    -- Add column comments for documentation
    COMMENT ON COLUMN sessions.session_goal IS
      'User''s planned objective for this session (optional, max 200 chars)';

    COMMENT ON COLUMN sessions.goal_completed IS
      'Goal achievement status: true=completed, false=not completed, null=partial or no goal set';

    COMMENT ON COLUMN sessions.session_notes IS
      'Post-session reflection notes (optional, max 500 chars)';

    RAISE NOTICE 'Sessions table extended with goal tracking fields';
  ELSE
    RAISE NOTICE 'Sessions table already has goal tracking fields - skipping';
  END IF;
END $$;

-- Verify no unexpected data in new columns (safety check)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM sessions WHERE session_goal IS NOT NULL) THEN
    RAISE WARNING 'Unexpected data found in session_goal column';
  END IF;
END $$;


-- ============================================================================
-- PART 2: Create daily_intentions table
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables
                 WHERE table_name = 'daily_intentions') THEN

    CREATE TABLE daily_intentions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      date DATE NOT NULL,
      target_hours INTEGER NOT NULL CHECK (target_hours >= 1 AND target_hours <= 8),
      priority_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

      -- Ensure one intention per user per day
      CONSTRAINT unique_user_date UNIQUE(user_id, date)
    );

    -- Index for fast daily lookups (critical for RLS performance)
    CREATE INDEX idx_daily_intentions_user_date
      ON daily_intentions(user_id, date);

    -- Add table comment
    COMMENT ON TABLE daily_intentions IS
      'Daily focus hour commitments for capacity planning and habit tracking';

    COMMENT ON COLUMN daily_intentions.target_hours IS
      'Planned focus hours for the day (1-8 hour range)';

    COMMENT ON COLUMN daily_intentions.priority_project_id IS
      'Optional project to prioritize for the day (can be NULL)';

    -- Enable Row Level Security
    ALTER TABLE daily_intentions ENABLE ROW LEVEL SECURITY;

    -- RLS Policy: Users can only access their own intentions
    CREATE POLICY "Users can manage their own daily intentions"
      ON daily_intentions
      FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);

    RAISE NOTICE 'Daily intentions table created with RLS enabled';
  ELSE
    RAISE NOTICE 'Daily intentions table already exists - skipping';
  END IF;
END $$;

-- Verify RLS is enabled (safety check)
DO $$
BEGIN
  IF NOT (SELECT relrowsecurity FROM pg_class WHERE relname = 'daily_intentions') THEN
    RAISE EXCEPTION 'RLS not enabled on daily_intentions - migration failed';
  END IF;
END $$;


-- ============================================================================
-- PART 3: Create get_daily_stats RPC function
-- ============================================================================

CREATE OR REPLACE FUNCTION get_daily_stats(user_id_param UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
  today_date DATE := CURRENT_DATE;
BEGIN
  -- Validate user_id matches authenticated user
  IF auth.uid() != user_id_param THEN
    RAISE EXCEPTION 'Unauthorized access: user_id does not match authenticated user';
  END IF;

  -- Build comprehensive daily statistics JSON object
  SELECT json_build_object(
    'sessions_completed',
      COUNT(s.id) FILTER (WHERE s.is_completed = true),

    'total_hours',
      COALESCE(SUM(s.duration) FILTER (WHERE s.is_completed = true) / 60.0, 0),

    'daily_intention', (
      SELECT json_build_object(
        'id', di.id,
        'target_hours', di.target_hours,
        'priority_project_id', di.priority_project_id,
        'priority_project_name', p.name
      )
      FROM daily_intentions di
      LEFT JOIN projects p ON p.id = di.priority_project_id
      WHERE di.user_id = user_id_param
        AND di.date = today_date
      LIMIT 1
    ),

    'today_sessions', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'id', s.id,
          'project_id', s.project_id,
          'project_name', proj.name,
          'duration', s.duration,
          'started_at', s.started_at,
          'willpower', s.willpower,
          'mindset', s.mindset,
          'session_goal', s.session_goal,
          'goal_completed', s.goal_completed,
          'session_notes', s.session_notes,
          'xp_earned', s.xp_earned
        )
        ORDER BY s.started_at DESC
      ), '[]'::json)
      FROM sessions s
      JOIN projects proj ON proj.id = s.project_id
      WHERE s.user_id = user_id_param
        AND DATE(s.started_at) = today_date
        AND s.is_completed = true
    )
  ) INTO result
  FROM sessions s
  WHERE s.user_id = user_id_param
    AND DATE(s.started_at) = today_date;

  RETURN result;
END;
$$;

-- Add function comment
COMMENT ON FUNCTION get_daily_stats IS
  'Retrieve comprehensive daily statistics including sessions, intentions, and progress';

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_daily_stats TO authenticated;

-- Revoke from public for security
REVOKE EXECUTE ON FUNCTION get_daily_stats FROM PUBLIC;


-- ============================================================================
-- VERIFICATION QUERIES (for manual testing)
-- ============================================================================

-- Test 1: Verify sessions columns exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sessions'
      AND column_name IN ('session_goal', 'goal_completed', 'session_notes')
    GROUP BY table_name
    HAVING COUNT(*) = 3
  ) THEN
    RAISE EXCEPTION 'Sessions table columns not created properly';
  END IF;
  RAISE NOTICE 'Test 1 PASSED: Sessions table columns verified';
END $$;

-- Test 2: Verify daily_intentions table structure
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name = 'daily_intentions'
  ) THEN
    RAISE EXCEPTION 'Daily intentions table not created';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'daily_intentions'
      AND indexname = 'idx_daily_intentions_user_date'
  ) THEN
    RAISE EXCEPTION 'Daily intentions index not created';
  END IF;

  RAISE NOTICE 'Test 2 PASSED: Daily intentions table and index verified';
END $$;

-- Test 3: Verify RPC function exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc
    WHERE proname = 'get_daily_stats'
  ) THEN
    RAISE EXCEPTION 'get_daily_stats function not created';
  END IF;
  RAISE NOTICE 'Test 3 PASSED: RPC function verified';
END $$;

-- Test 4: Verify RLS policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'daily_intentions'
  ) THEN
    RAISE EXCEPTION 'RLS policies not created for daily_intentions';
  END IF;
  RAISE NOTICE 'Test 4 PASSED: RLS policies verified';
END $$;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Migration 20251104_enhance_sessions_timebox completed successfully';
  RAISE NOTICE 'Summary:';
  RAISE NOTICE '  - Sessions table: 3 new columns added';
  RAISE NOTICE '  - Daily intentions table: created with RLS';
  RAISE NOTICE '  - get_daily_stats RPC: created';
  RAISE NOTICE 'Next steps: Update frontend to use new schema';
END $$;
