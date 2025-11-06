# Migration 20251104: Application Guide

**Story**: 1.8 - DeepFocus Time-Boxing Enhancements
**Date**: November 4, 2025
**Migration File**: `supabase/migrations/20251104_enhance_sessions_timebox.sql`

---

## Quick Start (5 minutes)

```bash
# 1. Open Supabase Dashboard
# 2. Navigate to: SQL Editor
# 3. Paste contents of: supabase/migrations/20251104_enhance_sessions_timebox.sql
# 4. Click "Run"
# 5. Verify success (should see ✅ messages)
```

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Method 1: Supabase Dashboard (Recommended)](#method-1-supabase-dashboard-recommended)
3. [Method 2: Supabase CLI](#method-2-supabase-cli)
4. [Method 3: Direct psql Connection](#method-3-direct-psql-connection)
5. [Verification Steps](#verification-steps)
6. [Rollback Instructions](#rollback-instructions)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### ✅ Checklist Before Migration

- [ ] **Backup your database** (Supabase Dashboard → Database → Backups)
- [ ] **Verify you have database admin access** (can create tables/functions)
- [ ] **Check current schema** (ensure `sessions` table exists)
- [ ] **Review migration rationale** (`docs/database/migration-20251104-rationale.md`)
- [ ] **Have rollback script ready** (`supabase/migrations/20251104_rollback_timebox.sql`)

### ⚠️ Important Notes

- **This migration is backward compatible** - existing sessions unaffected
- **No downtime required** - can run on live database
- **Estimated time**: 5-10 minutes (depends on session count)
- **Changes are immediate** - no need to restart app

---

## Method 1: Supabase Dashboard (Recommended)

**Best for**: Most users, no CLI tools required

### Step 1: Access Supabase Dashboard

1. Navigate to: https://app.supabase.com/
2. Select your project: **Eugene Strat**
3. Go to: **SQL Editor** (left sidebar)

### Step 2: Open Migration File

Open `supabase/migrations/20251104_enhance_sessions_timebox.sql` in your editor and copy all contents.

### Step 3: Paste and Run

1. Click **"+ New query"** in SQL Editor
2. Paste the entire migration file
3. **Review** the SQL (optional but recommended)
4. Click **"Run"** button (bottom right)

### Step 4: Check Output

You should see output like this:

```
NOTICE:  Sessions table extended with goal tracking fields
NOTICE:  Daily intentions table created with RLS enabled
NOTICE:  Test 1 PASSED: Sessions table columns verified
NOTICE:  Test 2 PASSED: Daily intentions table and index verified
NOTICE:  Test 3 PASSED: RPC function verified
NOTICE:  Test 4 PASSED: RLS policies verified
NOTICE:  ✅ Migration 20251104_enhance_sessions_timebox completed successfully
```

### Step 5: Verify

Run verification queries (see [Verification Steps](#verification-steps) below).

---

## Method 2: Supabase CLI

**Best for**: Developers with Supabase CLI installed

### Prerequisites

```bash
# Install Supabase CLI (if not already)
npm install -g supabase

# Verify installation
supabase --version
```

### Option A: Apply Migration Directly

```bash
# Navigate to project root
cd /Users/cedricsecondo/SWE/side-projects/eugene-strat

# Link to your Supabase project (first time only)
supabase link --project-ref YOUR_PROJECT_REF

# Apply migration
supabase db push
```

### Option B: Apply via Migration System

```bash
# Navigate to project root
cd /Users/cedricsecondo/SWE/side-projects/eugene-strat

# Initialize migrations (if not done)
supabase init

# Link to project
supabase link --project-ref YOUR_PROJECT_REF

# Apply all pending migrations
supabase db push

# Or apply specific migration
supabase migration up --file supabase/migrations/20251104_enhance_sessions_timebox.sql
```

### Check Status

```bash
# View applied migrations
supabase migration list

# View database diff
supabase db diff
```

---

## Method 3: Direct psql Connection

**Best for**: Advanced users, direct database access

### Get Connection String

1. Supabase Dashboard → **Settings** → **Database**
2. Copy **Connection string** (Direct connection)
3. Replace `[YOUR-PASSWORD]` with your database password

### Connect and Apply

```bash
# Connect to database
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# At psql prompt, run migration
\i /Users/cedricsecondo/SWE/side-projects/eugene-strat/supabase/migrations/20251104_enhance_sessions_timebox.sql

# Check output for success messages
# Exit psql
\q
```

---

## Verification Steps

### 1. Verify Sessions Table Columns

**Via Supabase Dashboard**:
1. Go to: **Table Editor** → **sessions**
2. Check for new columns:
   - `session_goal` (text)
   - `goal_completed` (bool)
   - `session_notes` (text)

**Via SQL**:
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'sessions'
  AND column_name IN ('session_goal', 'goal_completed', 'session_notes');
```

**Expected output**:
```
    column_name    | data_type | is_nullable
-------------------+-----------+-------------
 session_goal      | text      | YES
 goal_completed    | boolean   | YES
 session_notes     | text      | YES
```

---

### 2. Verify daily_intentions Table

**Via Supabase Dashboard**:
1. Go to: **Table Editor**
2. Find **daily_intentions** table in list

**Via SQL**:
```sql
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_name = 'daily_intentions';
```

**Expected output**:
```
    table_name     | table_type
-------------------+------------
 daily_intentions  | BASE TABLE
```

**Check table structure**:
```sql
\d daily_intentions
```

**Expected columns**:
- `id` (uuid)
- `user_id` (uuid)
- `date` (date)
- `target_hours` (integer)
- `priority_project_id` (uuid)
- `created_at` (timestamp with time zone)

---

### 3. Verify RPC Function

**Via SQL**:
```sql
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_name = 'get_daily_stats';
```

**Expected output**:
```
  routine_name   | routine_type
-----------------+--------------
 get_daily_stats | FUNCTION
```

**Test function call**:
```sql
SELECT get_daily_stats(auth.uid());
```

**Expected output** (JSON structure):
```json
{
  "sessions_completed": 0,
  "total_hours": 0,
  "daily_intention": null,
  "today_sessions": []
}
```

---

### 4. Verify RLS Policies

**Via Supabase Dashboard**:
1. Go to: **Authentication** → **Policies**
2. Find table: **daily_intentions**
3. Check policy exists: "Users can manage their own daily intentions"

**Via SQL**:
```sql
SELECT schemaname, tablename, policyname, roles
FROM pg_policies
WHERE tablename = 'daily_intentions';
```

**Expected output**:
```
 schemaname |   tablename      |            policyname                    | roles
------------+------------------+------------------------------------------+--------------
 public     | daily_intentions | Users can manage their own daily intentions | {authenticated}
```

---

### 5. Verify Indexes

**Via SQL**:
```sql
SELECT indexname, tablename
FROM pg_indexes
WHERE tablename = 'daily_intentions';
```

**Expected output** (includes at least):
```
          indexname             |   tablename
--------------------------------+------------------
 daily_intentions_pkey          | daily_intentions
 unique_user_date               | daily_intentions
 idx_daily_intentions_user_date | daily_intentions
```

---

## Integration Testing

### Test 1: Insert Daily Intention

```sql
-- Insert test intention
INSERT INTO daily_intentions (user_id, date, target_hours)
VALUES (auth.uid(), CURRENT_DATE, 4)
RETURNING *;
```

**Expected**: Success, returns new row

**Test UNIQUE constraint**:
```sql
-- Try inserting duplicate (should fail)
INSERT INTO daily_intentions (user_id, date, target_hours)
VALUES (auth.uid(), CURRENT_DATE, 6);
```

**Expected**: Error: `duplicate key value violates unique constraint "unique_user_date"`

---

### Test 2: Update Session with Goal

```sql
-- Update existing session (replace YOUR_SESSION_ID)
UPDATE sessions
SET session_goal = 'Test migration',
    goal_completed = true,
    session_notes = 'Migration test successful'
WHERE id = 'YOUR_SESSION_ID'
  AND user_id = auth.uid()
RETURNING session_goal, goal_completed, session_notes;
```

**Expected**: Success, returns updated fields

---

### Test 3: Call get_daily_stats

```sql
-- Call RPC function
SELECT get_daily_stats(auth.uid());
```

**Expected**: JSON object with all fields populated

---

### Test 4: RLS Verification

**As User A** (your account):
```sql
-- Should see your intentions
SELECT * FROM daily_intentions WHERE user_id = auth.uid();
```

**Expected**: Your intentions visible

**Try accessing another user** (should fail):
```sql
-- Should return 0 rows (blocked by RLS)
SELECT * FROM daily_intentions WHERE user_id != auth.uid();
```

**Expected**: 0 rows (RLS blocks access)

---

## Rollback Instructions

### When to Rollback

Only rollback if:
- Migration failed partway through
- Critical bug discovered in new schema
- Need to revert Story 1.8 features entirely

### How to Rollback

**Via Supabase Dashboard**:
1. Go to: **SQL Editor**
2. Open: `supabase/migrations/20251104_rollback_timebox.sql`
3. Copy all contents
4. Paste in SQL Editor
5. Click **"Run"**

**Via CLI**:
```bash
psql < supabase/migrations/20251104_rollback_timebox.sql
```

### Verify Rollback

```sql
-- Check sessions columns removed
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'sessions'
  AND column_name IN ('session_goal', 'goal_completed', 'session_notes');
-- Expected: 0 rows

-- Check daily_intentions table removed
SELECT table_name
FROM information_schema.tables
WHERE table_name = 'daily_intentions';
-- Expected: 0 rows
```

---

## Troubleshooting

### Issue 1: "permission denied for table sessions"

**Cause**: Insufficient database permissions

**Solution**:
```sql
-- Grant permissions (run as admin)
GRANT ALL ON sessions TO authenticated;
GRANT ALL ON daily_intentions TO authenticated;
```

---

### Issue 2: "function auth.uid() does not exist"

**Cause**: Running migration outside Supabase context (local postgres)

**Solution**: Run migration via Supabase Dashboard or CLI (not direct psql)

---

### Issue 3: "relation 'sessions' does not exist"

**Cause**: Database not properly initialized

**Solution**:
1. Verify you're connected to correct database
2. Check `sessions` table exists: `\dt sessions`
3. If missing, restore from backup

---

### Issue 4: Migration runs but verification fails

**Cause**: Partial migration execution

**Solution**:
1. Check error messages in SQL output
2. Identify which part failed (Part 1/2/3)
3. Re-run migration (DO blocks prevent duplicate execution)
4. If stuck, rollback and retry

---

### Issue 5: "could not create unique index"

**Cause**: Duplicate intentions already exist for same user+date

**Solution**:
```sql
-- Find duplicates
SELECT user_id, date, COUNT(*)
FROM daily_intentions
GROUP BY user_id, date
HAVING COUNT(*) > 1;

-- Remove duplicates (keep most recent)
DELETE FROM daily_intentions di1
USING daily_intentions di2
WHERE di1.user_id = di2.user_id
  AND di1.date = di2.date
  AND di1.created_at < di2.created_at;

-- Retry migration
```

---

### Issue 6: Performance degradation after migration

**Cause**: Missing indexes or statistics not updated

**Solution**:
```sql
-- Reindex tables
REINDEX TABLE sessions;
REINDEX TABLE daily_intentions;

-- Analyze tables for query planner
ANALYZE sessions;
ANALYZE daily_intentions;

-- Check query performance
EXPLAIN ANALYZE SELECT get_daily_stats(auth.uid());
-- Should show index usage, <100ms execution
```

---

## Post-Migration Checklist

After successful migration:

- [ ] ✅ All verification tests passed
- [ ] ✅ No errors in Supabase logs (Dashboard → Logs → Database)
- [ ] ✅ Existing app functionality works (sessions still created)
- [ ] ✅ Test daily intention creation (insert test row)
- [ ] ✅ Test RPC function call (returns expected JSON)
- [ ] ✅ Performance acceptable (<200ms for get_daily_stats)
- [ ] ✅ Update `.env.local` if needed (no changes required)
- [ ] ✅ Document migration date in project notes

**Next steps**:
1. Update frontend types (`src/components/deep-focus/types.ts`)
2. Replace `get_today_sessions` with `get_daily_stats` in `useDeepFocusState.ts`
3. Implement Story 1.8 UI components

---

## Database Backup & Recovery

### Before Migration: Create Backup

**Via Supabase Dashboard**:
1. Go to: **Database** → **Backups**
2. Click **"Create backup"**
3. Name: "Before Story 1.8 Migration - Nov 4 2025"
4. Wait for completion (~5-10 min)

### After Migration: Create Checkpoint

**Via Supabase Dashboard**:
1. Go to: **Database** → **Backups**
2. Click **"Create backup"**
3. Name: "After Story 1.8 Migration - Nov 4 2025"

### Restore from Backup (if needed)

1. Go to: **Database** → **Backups**
2. Find backup: "Before Story 1.8 Migration"
3. Click **"Restore"**
4. Confirm restoration
5. Wait for completion (~10-20 min)
6. Verify app functionality

---

## Monitoring & Logging

### Check Migration Logs

**Via Supabase Dashboard**:
1. Go to: **Logs** → **Database**
2. Filter: `severity:notice` or `severity:error`
3. Look for migration messages

**Example successful log**:
```
[INFO] Sessions table extended with goal tracking fields
[INFO] Daily intentions table created with RLS enabled
[INFO] ✅ Migration 20251104_enhance_sessions_timebox completed
```

### Monitor Performance

**Via SQL**:
```sql
-- Check query performance
SELECT
  query,
  calls,
  mean_exec_time,
  max_exec_time
FROM pg_stat_statements
WHERE query LIKE '%get_daily_stats%'
ORDER BY calls DESC;
```

**Expected**: mean_exec_time < 200ms

---

## Support & Resources

### Documentation
- **Migration Rationale**: `docs/database/migration-20251104-rationale.md`
- **Story 1.8 Implementation Plan**: `docs/ai-context/story-1.8-implementation-plan.md`
- **Supabase Docs**: https://supabase.com/docs/guides/database/migrations

### Need Help?
1. Check Troubleshooting section above
2. Review Supabase logs for errors
3. Test verification queries to isolate issue
4. Have rollback script ready if needed

---

## Summary

### Migration Files Created

```
eugene-strat/
├── supabase/
│   └── migrations/
│       ├── 20251104_enhance_sessions_timebox.sql  ← Main migration
│       └── 20251104_rollback_timebox.sql          ← Rollback script
└── docs/
    └── database/
        ├── migration-20251104-rationale.md        ← Why
        └── migration-20251104-guide.md            ← How (this file)
```

### Quick Reference

| Action | Command |
|--------|---------|
| **Apply via Dashboard** | SQL Editor → Paste migration → Run |
| **Apply via CLI** | `supabase db push` |
| **Verify columns** | Check Table Editor or run verification SQL |
| **Test RPC** | `SELECT get_daily_stats(auth.uid());` |
| **Rollback** | Run `20251104_rollback_timebox.sql` |

---

**Document Version**: 1.0
**Created**: November 4, 2025
**Status**: Ready for Use ✅
