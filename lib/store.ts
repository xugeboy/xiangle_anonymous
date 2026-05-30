import { createClient } from "@supabase/supabase-js";
import type { Confession, PublicConfessionInput } from "@/lib/types";

type ConfessionRow = {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      confessions: {
        Row: ConfessionRow;
        Insert: {
          id?: string;
          nickname?: string;
          content: string;
          created_at?: string;
        };
        Update: {
          nickname?: string;
          content?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let supabaseClient: ReturnType<typeof createClient<Database>> | undefined;

function getSupabase() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  supabaseClient = createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  return supabaseClient;
}

function toConfession(row: ConfessionRow): Confession {
  return {
    id: row.id,
    nickname: row.nickname,
    content: row.content,
    createdAt: row.created_at
  };
}

export async function listConfessions(): Promise<Confession[]> {
  const { data, error } = await getSupabase()
    .from("confessions")
    .select("id,nickname,content,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(toConfession);
}

export async function createConfession(input: PublicConfessionInput) {
  const cleanContent = input.content.trim();
  const cleanNickname = input.nickname?.trim() || "匿名同事";

  const { data, error } = await getSupabase()
    .from("confessions")
    .insert({
      nickname: cleanNickname.slice(0, 24),
      content: cleanContent
    })
    .select("id,nickname,content,created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return toConfession(data);
}
