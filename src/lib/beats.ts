import { supabase } from "@/integrations/supabase/client";
import type { BeatCardData } from "@/components/beat-card";

export type BeatFilters = {
  q?: string;
  genre?: string;
  minBpm?: number;
  maxBpm?: number;
  musicalKey?: string;
  maxPriceCents?: number;
  limit?: number;
};

export async function fetchBeats(f: BeatFilters = {}): Promise<BeatCardData[]> {
  let q = supabase
    .from("beats")
    .select("id, title, genre, bpm, musical_key, cover_url, preview_url, tags, producer_id, price_cents, currency")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(f.limit ?? 60);

  if (f.q) q = q.ilike("title", `%${f.q}%`);
  if (f.genre) q = q.eq("genre", f.genre);
  if (f.minBpm) q = q.gte("bpm", f.minBpm);
  if (f.maxBpm) q = q.lte("bpm", f.maxBpm);
  if (f.musicalKey) q = q.eq("musical_key", f.musicalKey);
  if (f.maxPriceCents) q = q.lte("price_cents", f.maxPriceCents);

  const { data: beats, error } = await q;
  if (error) throw error;
  if (!beats?.length) return [];

  const ids = Array.from(new Set(beats.map((b: any) => b.producer_id)));
  const { data: profs } = await supabase
    .from("profiles")
    .select("id, display_name, producer_alias")
    .in("id", ids);
  const map = new Map((profs ?? []).map((p: any) => [p.id, p]));

  return beats.map((b: any) => ({
    ...b,
    producer: map.get(b.producer_id) ?? null,
  })) as BeatCardData[];
}

export const GENRES = [
  "Trap", "Drill", "Afrobeats", "Amapiano", "R&B", "Hip-Hop", "Pop", "Lo-Fi", "House", "Reggaeton",
];
export const KEYS = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
  "Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "A#m", "Bm",
];
