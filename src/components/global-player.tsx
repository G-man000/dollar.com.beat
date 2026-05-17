import { useEffect, useRef } from "react";
import { Pause, Play, X } from "lucide-react";
import { usePlayer } from "@/lib/player-store";

/**
 * Persistent bottom player bar with animated waveform.
 */
export function GlobalPlayer() {
  const { current, playing, toggle, stop } = usePlayer();
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const a = ref.current;
    if (!a || !current) return;
    if (a.src !== current.preview) a.src = current.preview;
    if (playing) a.play().catch(() => {});
    else a.pause();
  }, [current, playing]);

  if (!current) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl">
      <div className="container mx-auto flex items-center gap-4 px-4 py-3">
        <button
          onClick={toggle}
          className="grid h-11 w-11 place-items-center rounded-full bg-gradient-vault text-primary-foreground shadow-vault transition active:scale-95"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
        </button>
        {current.cover && (
          <img
            src={current.cover}
            alt=""
            className="h-11 w-11 rounded object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium">{current.title}</div>
          <div className="truncate text-xs text-muted-foreground">{current.producer}</div>
        </div>
        <Waveform animated={playing} />
        <button
          onClick={stop}
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close player"
        >
          <X className="h-4 w-4" />
        </button>
        <audio ref={ref} preload="none" />
      </div>
    </div>
  );
}

export function Waveform({ animated = false, bars = 28 }: { animated?: boolean; bars?: number }) {
  return (
    <div className="hidden h-8 items-end gap-[3px] sm:flex" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const h = 25 + ((i * 37) % 70);
        return (
          <span
            key={i}
            className={animated ? "wave-bar w-[3px] rounded-full bg-acid" : "w-[3px] rounded-full bg-muted-foreground/40"}
            style={{
              height: `${h}%`,
              animationDelay: `${(i * 73) % 900}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
