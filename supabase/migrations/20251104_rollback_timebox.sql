-- ============================================================================
-- ROLLBACK Migration: Story 1.8 - DeepFocus Time-Boxing Enhancements
-- ============================================================================
-- Created: November 4, 2025
-- Description: Safely rollback all changes from 20251104_enhance_sessions_timebox
--
-- WARNING: This will delete the daily_intentions table and remove columns
--          from sessions table. Session goal data will be lost.
--
-- Only run this if you need to completely undo Story 1.8 changes.
-- ============================================================================

-- ============================================================================
-- STEP 1: Drop RPC function
-- ============================================================================

DROP FUNCTION IF EXISTS get_daily_stats(UUID);

RAISE NOTICE 'Step 1/3: Dropped get_daily_stats RPC function';


-- ============================================================================
-- STEP 2: Drop daily_intentions table
-- ============================================================================

DROP TABLE IF EXISTS daily_intentions CASCADE;

RAISE NOTICE 'Step 2/3: Dropped daily_intentions table';


-- ============================================================================
-- STEP 3: Remove columns from sessions table
-- ============================================================================

DO $$
BEGIN
  -- Drop session_goal column
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'sessions' AND column_name = 'session_goal') THEN
    ALTER TABLE sessions DROP COLUMN session_goal;
    RAISE NOTICE 'Dropped sessions.session_goal column';
  END IF;

  -- Drop goal_completed column
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'sessions' AND column_name = 'goal_completed') THEN
    ALTER TABLE sessions DROP COLUMN goal_completed;
    RAISE NOTICE 'Dropped sessions.goal_completed column';
  END IF;

  -- Drop session_notes column
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name = 'sessions' AND column_name = 'session_notes') THEN
    ALTER TABLE sessions DROP COLUMN session_notes;
    RAISE NOTICE 'Dropped sessions.session_notes column';
  END IF;

  RAISE NOTICE 'Step 3/3: Removed goal tracking columns from sessions table';
END $$;


-- ============================================================================
-- VERIFICATION: Ensure rollback completed
-- ============================================================================

DO $$
BEGIN
  -- Check sessions table columns removed
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sessions' AND column_name = 'session_goal'
  ) THEN
    RAISE EXCEPTION 'Rollback failed: session_goal column still exists';
  END IF;

  -- Check daily_intentions table removed
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name = 'daily_intentions'
  ) THEN
    RAISE EXCEPTION 'Rollback failed: daily_intentions table still exists';
  END IF;

  -- Check RPC function removed
  IF EXISTS (
    SELECT 1 FROM pg_proc
    WHERE proname = 'get_daily_stats'
  ) THEN
    RAISE EXCEPTION 'Rollback failed: get_daily_stats function still exists';
  END IF;

  RAISE NOTICE '✅ Rollback verification passed';
END $$;


-- ============================================================================
-- ROLLBACK COMPLETE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '============================================================';
  RAISE NOTICE '✅ Rollback 20251104_rollback_timebox completed successfully';
  RAISE NOTICE '============================================================';
  RAISE NOTICE 'All Story 1.8 database changes have been reverted.';
  RAISE NOTICE '';
  RAISE NOTICE 'What was removed:';
  RAISE NOTICE '  ❌ sessions.session_goal column';
  RAISE NOTICE '  ❌ sessions.goal_completed column';
  RAISE NOTICE '  ❌ sessions.session_notes column';
  RAISE NOTICE '  ❌ daily_intentions table (including all data)';
  RAISE NOTICE '  ❌ get_daily_stats RPC function';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Update frontend to remove Story 1.8 features';
  RAISE NOTICE '  2. Restore get_today_sessions calls in useDeepFocusState.ts';
  RAISE NOTICE '============================================================';
END $$;
