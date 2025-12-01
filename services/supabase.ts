import { createClient } from '@supabase/supabase-js';

// Safe environment variable access helper
const getEnv = (key: string, fallback: string): string => {
  try {
    // Try process.env first (Standard for Vercel/Node)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] as string;
    }
    // Try import.meta.env (Standard for Vite)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key] as string;
    }
  } catch (e) {
    // Ignore errors in environments where these objects don't exist
  }
  return fallback;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL', 'https://jgjdlhyqehhkaqjoljqq.supabase.co');
const supabaseKey = getEnv('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnamRsaHlxZWhoa2Fxam9sanFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1ODk1MDUsImV4cCI6MjA4MDE2NTUwNX0.pMS6gVhj03rRtBpXDuzeFqe_GZAJcVheGFl3qdgyMd8');

export const supabase = createClient(supabaseUrl, supabaseKey);