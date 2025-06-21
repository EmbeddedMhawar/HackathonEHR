import dotenv from "dotenv";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANONKEY!;

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);
