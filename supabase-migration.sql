-- Create RSVP table in Supabase
-- Run this SQL in your Supabase SQL Editor: https://javfiorjnisekjnrjtsg.supabase.co

CREATE TABLE IF NOT EXISTS rsvp (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guests_count INTEGER NOT NULL CHECK (guests_count > 0),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp(created_at DESC);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_rsvp_email ON rsvp(email);

-- Enable Row Level Security (RLS)
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert RSVPs (public form submission)
CREATE POLICY "Allow public RSVP submissions"
  ON rsvp
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all RSVPs (for admin dashboard)
CREATE POLICY "Allow authenticated users to read RSVPs"
  ON rsvp
  FOR SELECT
  TO authenticated
  USING (true);

-- Grant permissions
GRANT INSERT ON rsvp TO anon;
GRANT SELECT ON rsvp TO authenticated;

-- Verify table creation
SELECT 'RSVP table created successfully!' AS status;
