import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { f as fetchBeats, G as GENRES, K as KEYS } from "./beats-BIn0uqg8.js";
import { B as BeatCard } from "./beat-card-BfiS7vOG.js";
import { I as Input } from "./input-CBrFH4eS.js";
import { c as cn, R as Route, B as Button } from "./router-CR-vLeYt.js";
import { S as Skeleton } from "./skeleton-CMcJzY_v.js";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-ClDJtkzO.js";
import "@tanstack/react-router";
import "./badge-NdQ-UVa6.js";
import "class-variance-authority";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "zustand";
import "sonner";
import "zod";
import "@radix-ui/react-select";
const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;
function StorePage() {
  const sp = Route.useSearch();
  const nav = Route.useNavigate();
  const [bpm, setBpm] = useState([60, 200]);
  const [maxPrice, setMaxPrice] = useState(5e7);
  const filters = useMemo(() => ({
    q: sp.q,
    genre: sp.genre,
    musicalKey: sp.key,
    minBpm: bpm[0],
    maxBpm: bpm[1],
    maxPriceCents: maxPrice
  }), [sp.q, sp.genre, sp.key, bpm, maxPrice]);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["store", filters],
    queryFn: () => fetchBeats(filters)
  });
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-bold md:text-5xl text-white", children: "Beat Store" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-white/70", children: "Find your next hit. Filter the entire vault." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-3 rounded-2xl border border-border/40 bg-black/40 p-4 backdrop-blur-md md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" }),
        /* @__PURE__ */ jsx(Input, { value: sp.q ?? "", onChange: (e) => nav({
          search: (s) => ({
            ...s,
            q: e.target.value || void 0
          })
        }), placeholder: "Search title, vibe, mood…", className: "bg-black/20 border-border/40 text-white placeholder:text-white/40 pl-10" })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: sp.genre ?? "all", onValueChange: (v) => nav({
        search: (s) => ({
          ...s,
          genre: v === "all" ? void 0 : v
        })
      }), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "md:w-44 bg-black/20 border-border/40 text-white", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Genre" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { className: "bg-neutral-900 border-border/40 text-white", children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All genres" }),
          GENRES.map((g) => /* @__PURE__ */ jsx(SelectItem, { value: g, children: g }, g))
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: sp.key ?? "all", onValueChange: (v) => nav({
        search: (s) => ({
          ...s,
          key: v === "all" ? void 0 : v
        })
      }), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "md:w-32 bg-black/20 border-border/40 text-white", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Key" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { className: "max-h-72 bg-neutral-900 border-border/40 text-white", children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Any key" }),
          KEYS.map((k) => /* @__PURE__ */ jsx(SelectItem, { value: k, children: k }, k))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[260px_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "rounded-2xl border border-border/40 bg-black/40 p-5 backdrop-blur-md self-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4 text-vault" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display font-semibold text-white", children: "Filters" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between text-white/80", children: [
              /* @__PURE__ */ jsx("span", { children: "BPM" }),
              /* @__PURE__ */ jsxs("span", { className: "font-mono text-vault font-semibold", children: [
                bpm[0],
                "–",
                bpm[1]
              ] })
            ] }),
            /* @__PURE__ */ jsx(Slider, { min: 40, max: 220, step: 1, value: bpm, onValueChange: (v) => setBpm([v[0], v[1]]) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between text-white/80", children: [
              /* @__PURE__ */ jsx("span", { children: "Max price" }),
              /* @__PURE__ */ jsxs("span", { className: "font-mono text-vault font-semibold", children: [
                "₦",
                (maxPrice / 100).toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsx(Slider, { min: 5e3, max: 5e7, step: 1e4, value: [maxPrice], onValueChange: (v) => setMaxPrice(v[0]) })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full border-border/60 text-white hover:bg-white/10", onClick: () => {
            setBpm([60, 200]);
            setMaxPrice(5e7);
            nav({
              search: {}
            });
          }, children: "Reset all" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: isLoading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3", children: Array.from({
        length: 9
      }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "aspect-square rounded-2xl bg-white/5" }, i)) }) : data?.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-sm text-white/60", children: [
          data.length,
          " beats"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3", children: data.map((b) => /* @__PURE__ */ jsx(BeatCard, { beat: b }, b.id)) })
      ] }) : (
        /* FIXED: Clean HTML output without the accidental curly bracket wrapper */
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-border/40 bg-black/40 p-12 text-center backdrop-blur-md", children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-lg font-semibold text-white", children: "No beats match your filters." }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/70", children: "Try widening your BPM range or clearing filters." })
        ] })
      ) })
    ] })
  ] });
}
export {
  StorePage as component
};
