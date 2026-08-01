import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Asegurar que la URL tenga un formato HTTP/HTTPS válido siempre
const supabaseUrl = rawUrl && rawUrl.startsWith("http") 
  ? rawUrl 
  : "https://placeholder.supabase.co";

const supabaseAnonKey = rawKey || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  created_at: string;
  published: boolean;
  image_url?: string;
}