import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Pause, Play, ShoppingCart, Music2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { usePlayer } from "@/lib/player-store";
import { Waveform } from "@/components/global-player";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtPrice } from "@/lib/format";

export const Route = createFileRoute("/beat/$beatId")({
  head: () => ({
    meta: [
      { title: "Beat — dollar.com.beat" },
      { name: "description", content: "Preview, buy and download this beat." },
    ],
  }),
  component: BeatDetail,
});

function BeatDetail() {
  const { beatId } = Route.useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const { current, playing, play } = usePlayer();

  const { data, isLoading } = useQuery({
    queryKey: ["beat", beatId],
    queryFn: async () => {
      const { data: beat, error } = await supabase
        .from("beats")
        .select("*")
        .eq("id", beatId)
        .single();
      if (error) throw error;
      const { data: prof } = await supabase
        .from("profiles")
        .select("display_name, producer_alias, avatar_url")
        .eq("id", beat.producer_id)
        .maybeSingle();
      return { ...beat, producer: prof };
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-[400px_1fr]">
        <Skeleton className="aspect-square rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }
  if (!data) return null;

  const beat = data as any;
  const producerName = beat.producer?.producer_alias ?? beat.producer?.display_name ?? "dollar.com.beat";
  const isThis = current?.id === beat.id && playing;

  const addToCart = async () => {
    if (!user) {
      toast.info("Sign in to add to cart");
      nav({ to: "/auth", search: { redirect: `/beat/${beat.id}` } as any });
      return;
    }
    const { error } = await supabase.from("cart_items").upsert(
      { user_id: user.id, beat_id: beat.id },
      { onConflict: "user_id,beat_id" },
    );
    if (error) toast.error(error.message);
    else toast.success(`Added "${beat.title}" to cart`);
  };

  return (
    <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[420px_1fr]">
      <div>
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          {beat.cover_url ? (
            <img src={beat.cover_url} alt={beat.title} className="aspect-square w-full object-cover" />
          ) : (
            <div className="grid aspect-square place-items-center bg-gradient-vault">
              <Music2 className="h-20 w-20" />
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-vault">{beat.genre}</p>
        <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{beat.title}</h1>
        <p className="mt-2 text-muted-foreground">
          by <span className="text-foreground">{producerName}</span>
        </p>

        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-4">
          {beat.preview_url && (
            <button
              onClick={() => play({
                id: beat.id,
                title: beat.title,
                producer: producerName,
                cover: beat.cover_url,
                preview: beat.preview_url,
              })}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-vault shadow-vault"
              aria-label="Play"
            >
              {isThis ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-0.5" />}
            </button>
          )}
          <Waveform animated={isThis} bars={48} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>{beat.bpm} BPM</Badge>
          {beat.musical_key && <Badge>{beat.musical_key}</Badge>}
          {beat.tags?.map((t: string) => <Badge key={t} variant="outline">{t}</Badge>)}
        </div>

        {beat.description && (
          <p className="mt-6 whitespace-pre-wrap text-muted-foreground">{beat.description}</p>
        )}

        <div className="mt-8 rounded-2xl border border-border bg-card/40 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Price</p>
              <p className="mt-1 font-display text-3xl font-bold text-vault">
                {fmtPrice(beat.price_cents ?? 0, beat.currency ?? "ngn")}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              One-time purchase. Full WAV + MP3 delivered after payment.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="flex-1 bg-gradient-vault text-primary-foreground shadow-vault hover:opacity-90"
              onClick={addToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to cart
            </Button>
            <Link to="/cart" className="flex-1">
              <Button size="lg" variant="outline" className="w-full">View cart</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
