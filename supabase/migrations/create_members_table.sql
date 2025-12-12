-- Create members table for paid users
-- This table stores users who have completed payment to join the community

CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- User Information
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  
  -- Payment Information
  payment_reference TEXT NOT NULL UNIQUE,
  payment_amount DECIMAL(10, 2) NOT NULL,
  payment_currency TEXT NOT NULL DEFAULT 'NGN',
  payment_status TEXT NOT NULL DEFAULT 'success' CHECK (payment_status IN ('success', 'pending', 'failed', 'refunded')),
  
  -- Membership Status
  membership_status TEXT NOT NULL DEFAULT 'active' CHECK (membership_status IN ('active', 'inactive', 'suspended')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Additional Information
  slack_invited BOOLEAN DEFAULT false,
  slack_invite_sent_at TIMESTAMPTZ,
  
  -- Audit Fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT name_length CHECK (char_length(name) >= 2 AND char_length(name) <= 200)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_members_email ON public.members(email);
CREATE INDEX IF NOT EXISTS idx_members_payment_reference ON public.members(payment_reference);
CREATE INDEX IF NOT EXISTS idx_members_joined_at ON public.members(joined_at DESC);
CREATE INDEX IF NOT EXISTS idx_members_membership_status ON public.members(membership_status);

-- Create updated_at trigger
DROP TRIGGER IF EXISTS update_members_updated_at ON public.members;
CREATE TRIGGER update_members_updated_at
  BEFORE UPDATE ON public.members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Policy: Allow server to insert (for payment processing)
CREATE POLICY "Allow server insert on members"
  ON public.members
  FOR INSERT
  TO service_role, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can read
CREATE POLICY "Allow authenticated users to read members"
  ON public.members
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Allow authenticated users to update members"
  ON public.members
  FOR UPDATE
  TO authenticated
  USING (true);

-- Add comments
COMMENT ON TABLE public.members IS 'Stores paid community members who have completed payment';
COMMENT ON COLUMN public.members.payment_reference IS 'Paystack transaction reference';
COMMENT ON COLUMN public.members.membership_status IS 'Current membership status: active, inactive, suspended';

