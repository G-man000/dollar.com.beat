import { Link } from "@tanstack/react-router";
import { Play, Pause, ShoppingCart } from "lucide-react";
import { usePlayer } from "@/lib/player-store";
import { Waveform } from "@/components/global-player";
import { fmtPrice } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export type BeatCardData = {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  musical_key: string | null;
  cover_url: string | null;
  preview_url: string | null;
  tags: string[];
  price_cents: number;
  currency: string;
  producer: { producer_alias: string | null; display_name: string | null } | null;
};

export function BeatCard({ beat }: { beat: BeatCardData }) {
  const { current, playing, play } = usePlayer();
  const isThis = current?.id === beat.id && playing;
  const producerName = beat.producer?.producer_alias ?? beat.producer?.display_name ?? "dollar.com.beat";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card transition hover:border-vault/50 hover:shadow-vault">
      <Link
        to="/beat/$beatId"
        params={{ beatId: beat.id }}
        className="block aspect-square overflow-hidden bg-muted"
      >
        {beat.cover_url ? (
          <img
            src={beat.cover_url}
            alt={beat.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-vault opacity-30">
            <span className="font-display text-6xl font-bold">{beat.title[0]}</span>
          </div>
        )}
      </Link>

      {beat.preview_url && (
        <button
          onClick={() =>
            play({
              id: beat.id,
              title: beat.title,
              producer: producerName,
              cover: beat.cover_url,
              preview: beat.preview_url!,
            })
          }
          className="absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-gradient-vault text-primary-foreground opacity-0 shadow-vault transition group-hover:opacity-100"
          aria-label="Play preview"
        >
          {isThis ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
        </button>
      )}

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to="/beat/$beatId" params={{ beatId: beat.id }} className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold">{beat.title}</h3>
            <p className="truncate text-xs text-muted-foreground">{producerName}</p>
          </Link>
          <span className="shrink-0 font-mono text-sm font-bold text-acid">
            {fmtPrice(beat.price_cents, beat.currency)}
          </span>
        </div>
        <Waveform animated={isThis} bars={20} />
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <Badge variant="secondary" className="bg-secondary/60">{beat.genre}</Badge>
          <Badge variant="secondary" className="bg-secondary/60 font-mono">{beat.bpm} BPM</Badge>
          {beat.musical_key && <Badge variant="secondary" className="bg-secondary/60 font-mono">{beat.musical_key}</Badge>}
        </div>
        <div className="flex items-center justify-between border-t border-border/60 pt-3">
          <span className="text-xs text-muted-foreground">Full ownership on purchase</span>
          <Link
            to="/beat/$beatId"
            params={{ beatId: beat.id }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-vault hover:text-vault-glow"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Buy
          </Link>
        </div>
      </div>
    </article>
  );
}
