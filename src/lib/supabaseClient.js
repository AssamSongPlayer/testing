// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fmuherccixmmotybpxcm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdWhlcmNjaXhtbW90eWJweGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzcxNDAsImV4cCI6MjA2NzAxMzE0MH0.M1jBxv9FafNK_2c8-T-PpDtxzkKvpC8i9-hk-2ws-Q4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
