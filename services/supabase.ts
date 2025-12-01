import { createClient } from '@supabase/supabase-js';

// Use process.env for Vercel deployment, with fallbacks for local/preview environment
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://jgjdlhyqehhkaqjoljqq.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnamRsaHlxZWhoa2Fxam9sanFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1ODk1MDUsImV4cCI6MjA4MDE2NTUwNX0.pMS6gVhj03rRtBpXDuzeFqe_GZAJcVheGFl3qdgyMd8';

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials missing. Check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);