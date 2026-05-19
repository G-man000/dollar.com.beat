import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles, Search, Music2, ShieldCheck } from "lucide-react";
import { f as fetchBeats, G as GENRES } from "./beats-BIn0uqg8.js";
import { B as BeatCard } from "./beat-card-BfiS7vOG.js";
import { B as Button } from "./router-CR-vLeYt.js";
import { S as Skeleton } from "./skeleton-CMcJzY_v.js";
import "./badge-NdQ-UVa6.js";
import "class-variance-authority";
import "react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "zustand";
import "sonner";
import "zod";
function HomePage() {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["home-beats"],
    queryFn: () => fetchBeats({
      limit: 12
    })
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(GenreStrip, {}),
    /* @__PURE__ */ jsxs("section", { className: "container mx-auto px-4 py-16 bg-transparent", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-vault font-semibold", children: "Featured" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-1 font-display text-3xl font-bold md:text-4xl text-white", children: "Fresh in the vault" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/store", className: "inline-flex shrink-0 items-center gap-1 text-sm text-white/60 hover:text-white transition-colors", children: [
          "See all ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "aspect-square rounded-2xl bg-white/5" }, i)) }) : data?.length ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: data.map((b) => /* @__PURE__ */ jsx(BeatCard, { beat: b }, b.id)) }) : /* @__PURE__ */ jsx(EmptyState, {})
    ] }),
    /* @__PURE__ */ jsx(ValueProps, {})
  ] });
}
function Hero() {
  return (
    // FIXED: Removed 'bg-hero' class and changed to 'bg-transparent'
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-transparent", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-noise opacity-20 pointer-events-none", "aria-hidden": true }),
      /* @__PURE__ */ jsx("div", { className: "relative container mx-auto px-4 py-20 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-vault/40 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3 text-vault" }),
          " Original beats by K. Kingsley"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 font-display text-4xl font-bold leading-[1.05] md:text-7xl text-white", children: [
          "The vault where",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-vault", children: "beats live" }),
          " ",
          "and artists arrive."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-base text-white/80 md:text-lg leading-relaxed", children: "Original beats produced in-house. Preview the full track, buy in seconds, and download the WAV the moment you pay. Full ownership on purchase." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/store", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "bg-gradient-vault text-primary-foreground shadow-vault hover:opacity-90 font-semibold", children: [
            /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4" }),
            " Browse the store"
          ] }) }),
          /* @__PURE__ */ jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "outline", className: "border-border/40 bg-black/20 text-white hover:bg-white/10 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Music2, { className: "mr-2 h-4 w-4" }),
            " About the producer"
          ] }) })
        ] })
      ] }) })
    ] })
  );
}
function GenreStrip() {
  return (
    // Updated background container to translucent dark glass matching headers/footers
    /* @__PURE__ */ jsx("div", { className: "border-y border-border/40 bg-black/40 backdrop-blur-md", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto flex gap-2 overflow-x-auto px-4 py-4 scrollbar-none", children: GENRES.map((g) => /* @__PURE__ */ jsx(Link, { to: "/store", search: {
      genre: g
    }, className: "shrink-0 rounded-full border border-border/40 bg-black/20 text-white/80 px-4 py-1.5 text-sm transition hover:border-vault hover:text-vault hover:bg-black/40", children: g }, g)) }) })
  );
}
function ValueProps() {
  const items = [{
    icon: ShieldCheck,
    title: "Full ownership",
    body: "One price. Buy the beat, own the rights — no licensing tiers, no surprises."
  }, {
    icon: Music2,
    title: "Instant delivery",
    body: "WAV + MP3 auto-delivered the moment your payment clears."
  }, {
    icon: Sparkles,
    title: "Made in-house",
    body: "Every beat produced and mixed by K. Kingsley. No middlemen."
  }];
  return (
    // Updated value properties section to share the dark mesh layout
    /* @__PURE__ */ jsx("section", { className: "border-t border-border/40 bg-black/20 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto grid gap-6 px-4 py-16 md:grid-cols-3", children: items.map(({
      icon: Icon,
      title,
      body
    }) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/40 bg-black/40 p-6 backdrop-blur-md shadow-xl", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-gradient-vault text-primary-foreground shadow-vault", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-lg font-semibold text-white", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/70 leading-relaxed", children: body })
    ] }, title)) }) })
  );
}
function EmptyState() {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-border/40 bg-black/40 p-12 text-center backdrop-blur-md", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-semibold text-white", children: "New beats dropping soon" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/70", children: "Check back shortly — fresh beats are added to the vault regularly." })
  ] });
}
export {
  HomePage as component
};
