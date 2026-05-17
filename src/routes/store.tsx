import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search, SlidersHorizontal } from "lucide-react";
import { fetchBeats, GENRES, KEYS } from "@/lib/beats";
import { BeatCard } from "@/components/beat-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const searchSchema = z.object({
  genre: z.string().optional(),
  q: z.string().optional(),
  key: z.string().optional(),
});

export const Route = createFileRoute("/store")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Beat Store — dollar.com.beat" },
      { name: "description", content: "Filter by BPM, key, genre and price. Preview every beat before you buy." },
      { property: "og:title", content: "Beat Store — dollar.com.beat" },
      { property: "og:description", content: "Filter by BPM, key, genre and price." },
    ],
  }),
  component: StorePage,
});

function StorePage() {
  const sp = Route.useSearch();
  const nav = Route.useNavigate();
  const [bpm, setBpm] = useState<[number, number]>([60, 200]);
  const [maxPrice, setMaxPrice] = useState(50000000);

  const filters = useMemo(
    () => ({
      q: sp.q,
      genre: sp.genre,
      musicalKey: sp.key,
      minBpm: bpm[0],
      maxBpm: bpm[1],
      maxPriceCents: maxPrice,
    }),
    [sp.q, sp.genre, sp.key, bpm, maxPrice],
  );

  const { data, isLoading } = useQuery({
    queryKey: ["store", filters],
    queryFn: () => fetchBeats(filters),
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold md:text-5xl text-white">Beat Store</h1>
        <p className="mt-2 text-white/70">Find your next hit. Filter the entire vault.</p>
      </div>

      {/* Top Bar Container */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-border/40 bg-black/40 p-4 backdrop-blur-md md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <Input
            value={sp.q ?? ""}
            onChange={(e) => nav({ search: (s: any) => ({ ...s, q: e.target.value || undefined }) })}
            placeholder="Search title, vibe, mood…"
            className="bg-black/20 border-border/40 text-white placeholder:text-white/40 pl-10"
          />
        </div>
        <Select
          value={sp.genre ?? "all"}
          onValueChange={(v) => nav({ search: (s: any) => ({ ...s, genre: v === "all" ? undefined : v }) })}
        >
          <SelectTrigger className="md:w-44 bg-black/20 border-border/40 text-white"><SelectValue placeholder="Genre" /></SelectTrigger>
          <SelectContent className="bg-neutral-900 border-border/40 text-white">
            <SelectItem value="all">All genres</SelectItem>
            {GENRES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select
          value={sp.key ?? "all"}
          onValueChange={(v) => nav({ search: (s: any) => ({ ...s, key: v === "all" ? undefined : v }) })}
        >
          <SelectTrigger className="md:w-32 bg-black/20 border-border/40 text-white"><SelectValue placeholder="Key" /></SelectTrigger>
          <SelectContent className="max-h-72 bg-neutral-900 border-border/40 text-white">
            <SelectItem value="all">Any key</SelectItem>
            {KEYS.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar Container */}
        <aside className="rounded-2xl border border-border/40 bg-black/40 p-5 backdrop-blur-md self-start">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-vault" />
            <h2 className="font-display font-semibold text-white">Filters</h2>
          </div>

          <div className="space-y-6 text-sm">
            <div>
              <div className="mb-2 flex justify-between text-white/80">
                <span>BPM</span>
                <span className="font-mono text-vault font-semibold">{bpm[0]}–{bpm[1]}</span>
              </div>
              <Slider min={40} max={220} step={1} value={bpm} onValueChange={(v) => setBpm([v[0], v[1]] as [number, number])} />
            </div>

            <div>
              <div className="mb-2 flex justify-between text-white/80">
                <span>Max price</span>
                <span className="font-mono text-vault font-semibold">
                  ₦{(maxPrice / 100).toLocaleString()}
                </span>
              </div>
              <Slider
                min={5000}
                max={50000000}
                step={10000}
                value={[maxPrice]}
                onValueChange={(v) => setMaxPrice(v[0])}
              />
            </div>

            <Button
              variant="outline"
              className="w-full border-border/60 text-white hover:bg-white/10"
              onClick={() => {
                setBpm([60, 200]);
                setMaxPrice(50000000);
                nav({ search: {} });
              }}
            >
              Reset all
            </Button>
          </div>
        </aside>

        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded-2xl bg-white/5" />)}
            </div>
          ) : data?.length ? (
            <>
              <p className="mb-4 text-sm text-white/60">{data.length} beats</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {data.map((b) => <BeatCard key={b.id} beat={b} />)}
              </div>
            </>
          ) : (
            /* FIXED: Clean HTML output without the accidental curly bracket wrapper */
            <div className="rounded-2xl border border-dashed border-border/40 bg-black/40 p-12 text-center backdrop-blur-md">
              <p className="font-display text-lg font-semibold text-white">No beats match your filters.</p>
              <p className="mt-2 text-sm text-white/70">Try widening your BPM range or clearing filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}