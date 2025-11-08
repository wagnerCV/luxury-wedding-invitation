import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://javfiorjnisekjnrjtsg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphdmZpb3JqbmlzZWtqbnJqdHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzUyNTQsImV4cCI6MjA3ODIxMTI1NH0.aYjImaRVuactHjnMYLGBSSQeMeSCMNktWZROCv9qEyQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for RSVP
export interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  guests_count: number;
  message: string | null;
  created_at: string;
}

export interface RSVPInsert {
  name: string;
  email: string;
  phone?: string;
  guests_count: number;
  message?: string;
}
