import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Le client est créé uniquement si les variables sont présentes
// pour éviter un crash au build Docker
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null as unknown as ReturnType<typeof createClient>;

export interface Lead {
  id?: string;
  nom: string;
  email: string;
  entreprise?: string;
  score_diagnostic?: number;
  roi_estime?: number;
  opt_in?: boolean;
}

export async function saveLead(lead: Lead) {
  const { data, error } = await supabase
    .from("leads")
    .insert([lead])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}