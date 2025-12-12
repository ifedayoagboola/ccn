-- Create partnerships table
-- This table stores all partnership form submissions from the partnerships page

CREATE TABLE IF NOT EXISTS public.partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organisation TEXT NOT NULL,
  
  -- Partnership Details
  need TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'completed', 'declined')),
  
  -- Additional Metadata (optional fields for future extensibility)
  phone TEXT,
  website TEXT,
  partnership_type TEXT CHECK (partnership_type IN ('hiring', 'collaboration', 'sponsorship', 'other')),
  expected_timeline TEXT,
  budget_range TEXT,
  additional_notes TEXT,
  
  -- Admin Notes (for internal use)
  admin_notes TEXT,
  assigned_to UUID REFERENCES auth.users(id),
  
  -- Audit Fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT name_length CHECK (char_length(name) >= 2 AND char_length(name) <= 200),
  CONSTRAINT organisation_length CHECK (char_length(organisation) >= 2 AND char_length(organisation) <= 200),
  CONSTRAINT need_length CHECK (char_length(need) >= 10 AND char_length(need) <= 5000)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_partnerships_email ON public.partnerships(email);
CREATE INDEX IF NOT EXISTS idx_partnerships_status ON public.partnerships(status);
CREATE INDEX IF NOT EXISTS idx_partnerships_created_at ON public.partnerships(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partnerships_organisation ON public.partnerships(organisation);

-- Create updated_at trigger function (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_partnerships_updated_at ON public.partnerships;
CREATE TRIGGER update_partnerships_updated_at
  BEFORE UPDATE ON public.partnerships
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for form submissions)
CREATE POLICY "Allow public insert on partnerships"
  ON public.partnerships
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can read (admins)
-- Note: You may want to create a more specific policy based on user roles
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

-- Add comment to table
COMMENT ON TABLE public.partnerships IS 'Stores partnership form submissions from the partnerships page';
COMMENT ON COLUMN public.partnerships.status IS 'Current status of the partnership request: pending, contacted, in_progress, completed, declined';
COMMENT ON COLUMN public.partnerships.partnership_type IS 'Type of partnership: hiring, collaboration, sponsorship, other';
COMMENT ON COLUMN public.partnerships.admin_notes IS 'Internal notes for admin use only';
COMMENT ON COLUMN public.partnerships.assigned_to IS 'User ID of the admin assigned to handle this partnership';

