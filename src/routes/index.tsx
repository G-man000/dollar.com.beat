import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles, Search, Music2, ShieldCheck } from "lucide-react";
import { fetchBeats, GENRES } from "@/lib/beats";
import { BeatCard } from "@/components/beat-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "dollar.com.beat — Buy Beats Online" },
      {
        name: "description",
        content:
          "Original beats by K. Kingsley. Preview, buy and download — Trap, Drill, Afrobeats, Amapiano and more.",
      },
      { property: "og:title", content: "dollar.com.beat — Buy Original Beats" },
      {
        property: "og:description",
        content: "Original beats by K. Kingsley. Preview, buy and download instantly.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-beats"],
    queryFn: () => fetchBeats({ limit: 12 }),
  });

  return (
    <>
      <Hero />
      <GenreStrip />

      <section className="container mx-auto px-4 py-16 bg-transparent">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-vault font-semibold">Featured</p>
            <h2 className="mt-1 font-display text-3xl font-bold md:text-4xl text-white">Fresh in the vault</h2>
          </div>
          <Link to="/store" className="inline-flex shrink-0 items-center gap-1 text-sm text-white/60 hover:text-white transition-colors">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : data?.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.map((b) => <BeatCard key={b.id} beat={b} />)}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      <ValueProps />
    </>
  );
}

function Hero() {
  return (
    // FIXED: Removed 'bg-hero' class and changed to 'bg-transparent'
    <section className="relative overflow-hidden bg-transparent">
      {/* FIXED: Completely deleted the static <img src={hero} /> tag block here */}
      <div className="absolute inset-0 grid-noise opacity-20 pointer-events-none" aria-hidden />

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-vault/40 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-vault" /> Original beats by K. Kingsley
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-7xl text-white">
            The vault where{" "}
            <span className="text-gradient-vault">beats live</span>{" "}
            and artists arrive.
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg leading-relaxed">
            Original beats produced in-house. Preview the full track, buy in seconds,
            and download the WAV the moment you pay. Full ownership on purchase.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/store">
              <Button size="lg" className="bg-gradient-vault text-primary-foreground shadow-vault hover:opacity-90 font-semibold">
                <Search className="mr-2 h-4 w-4" /> Browse the store
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-border/40 bg-black/20 text-white hover:bg-white/10 backdrop-blur-sm">
                <Music2 className="mr-2 h-4 w-4" /> About the producer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function GenreStrip() {
  return (
    // Updated background container to translucent dark glass matching headers/footers
    <div className="border-y border-border/40 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-4 scrollbar-none">
        {GENRES.map((g) => (
          <Link
            key={g}
            to="/store"
            search={{ genre: g } as any}
            className="shrink-0 rounded-full border border-border/40 bg-black/20 text-white/80 px-4 py-1.5 text-sm transition hover:border-vault hover:text-vault hover:bg-black/40"
          >
            {g}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ValueProps() {
  const items = [
    { icon: ShieldCheck, title: "Full ownership", body: "One price. Buy the beat, own the rights — no licensing tiers, no surprises." },
    { icon: Music2, title: "Instant delivery", body: "WAV + MP3 auto-delivered the moment your payment clears." },
    { icon: Sparkles, title: "Made in-house", body: "Every beat produced and mixed by K. Kingsley. No middlemen." },
  ];
  return (
    // Updated value properties section to share the dark mesh layout
    <section className="border-t border-border/40 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto grid gap-6 px-4 py-16 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border/40 bg-black/40 p-6 backdrop-blur-md shadow-xl">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-vault text-primary-foreground shadow-vault">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border/40 bg-black/40 p-12 text-center backdrop-blur-md">
      <h3 className="font-display text-xl font-semibold text-white">New beats dropping soon</h3>
      <p className="mt-2 text-sm text-white/70">
        Check back shortly — fresh beats are added to the vault regularly.
      </p>
    </div>
  );
}