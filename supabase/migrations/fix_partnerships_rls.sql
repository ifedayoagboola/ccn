-- Fix RLS policies for partnerships table
-- Run this if you're getting "Permission denied" errors

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public insert on partnerships" ON public.partnerships;
DROP POLICY IF EXISTS "Allow authenticated users to read partnerships" ON public.partnerships;
DROP POLICY IF EXISTS "Allow authenticated users to update partnerships" ON public.partnerships;
DROP POLICY IF EXISTS "Allow authenticated users to delete partnerships" ON public.partnerships;

-- Recreate the insert policy - allow anonymous users to insert
CREATE POLICY "Allow public insert on partnerships"
  ON public.partnerships
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can read (admins)
CREATE POLICY "Allow authenticated users to read partnerships"
  ON public.partnerships
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update (admins)
CREATE POLICY "Allow authenticated users to update partnerships"
  ON public.partnerships
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can delete (admins)
CREATE POLICY "Allow authenticated users to delete partnerships"
  ON public.partnerships
  FOR DELETE
  TO authenticated
  USING (true);

-- Verify RLS is enabled
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;

