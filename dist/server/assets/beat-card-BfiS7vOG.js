import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Pause, Play, ShoppingCart } from "lucide-react";
import { d as usePlayer, W as Waveform } from "./router-CR-vLeYt.js";
import { f as fmtPrice } from "./skeleton-CMcJzY_v.js";
import { B as Badge } from "./badge-NdQ-UVa6.js";
function BeatCard({ beat }) {
  const { current, playing, play } = usePlayer();
  const isThis = current?.id === beat.id && playing;
  const producerName = beat.producer?.producer_alias ?? beat.producer?.display_name ?? "dollar.com.beat";
  return /* @__PURE__ */ jsxs("article", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card transition hover:border-vault/50 hover:shadow-vault", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/beat/$beatId",
        params: { beatId: beat.id },
        className: "block aspect-square overflow-hidden bg-muted",
        children: beat.cover_url ? /* @__PURE__ */ jsx(
          "img",
          {
            src: beat.cover_url,
            alt: beat.title,
            loading: "lazy",
            className: "h-full w-full object-cover transition duration-500 group-hover:scale-105"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-vault opacity-30", children: /* @__PURE__ */ jsx("span", { className: "font-display text-6xl font-bold", children: beat.title[0] }) })
      }
    ),
    beat.preview_url && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => play({
          id: beat.id,
          title: beat.title,
          producer: producerName,
          cover: beat.cover_url,
          preview: beat.preview_url
        }),
        className: "absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-gradient-vault text-primary-foreground opacity-0 shadow-vault transition group-hover:opacity-100",
        "aria-label": "Play preview",
        children: isThis ? /* @__PURE__ */ jsx(Pause, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Play, { className: "h-5 w-5 translate-x-0.5" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/beat/$beatId", params: { beatId: beat.id }, className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "truncate font-display text-base font-semibold", children: beat.title }),
          /* @__PURE__ */ jsx("p", { className: "truncate text-xs text-muted-foreground", children: producerName })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "shrink-0 font-mono text-sm font-bold text-acid", children: fmtPrice(beat.price_cents, beat.currency) })
      ] }),
      /* @__PURE__ */ jsx(Waveform, { animated: isThis, bars: 20 }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5 text-[11px]", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-secondary/60", children: beat.genre }),
        /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "bg-secondary/60 font-mono", children: [
          beat.bpm,
          " BPM"
        ] }),
        beat.musical_key && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-secondary/60 font-mono", children: beat.musical_key })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-border/60 pt-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Full ownership on purchase" }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/beat/$beatId",
            params: { beatId: beat.id },
            className: "inline-flex items-center gap-1 text-xs font-semibold text-vault hover:text-vault-glow",
            children: [
              /* @__PURE__ */ jsx(ShoppingCart, { className: "h-3.5 w-3.5" }),
              " Buy"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  BeatCard as B
};
