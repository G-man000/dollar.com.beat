import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Music2, Pause, Play, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { b as Route, u as useAuth, d as usePlayer, s as supabase, W as Waveform, B as Button } from "./router-CR-vLeYt.js";
import { B as Badge } from "./badge-NdQ-UVa6.js";
import { S as Skeleton, f as fmtPrice } from "./skeleton-CMcJzY_v.js";
import "react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "zustand";
import "zod";
function BeatDetail() {
  const {
    beatId
  } = Route.useParams();
  const {
    user
  } = useAuth();
  const nav = useNavigate();
  const {
    current,
    playing,
    play
  } = usePlayer();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["beat", beatId],
    queryFn: async () => {
      const {
        data: beat2,
        error
      } = await supabase.from("beats").select("*").eq("id", beatId).single();
      if (error) throw error;
      const {
        data: prof
      } = await supabase.from("profiles").select("display_name, producer_alias, avatar_url").eq("id", beat2.producer_id).maybeSingle();
      return {
        ...beat2,
        producer: prof
      };
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto grid gap-8 px-4 py-10 md:grid-cols-[400px_1fr]", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "aspect-square rounded-2xl" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-96 rounded-2xl" })
    ] });
  }
  if (!data) return null;
  const beat = data;
  const producerName = beat.producer?.producer_alias ?? beat.producer?.display_name ?? "dollar.com.beat";
  const isThis = current?.id === beat.id && playing;
  const addToCart = async () => {
    if (!user) {
      toast.info("Sign in to add to cart");
      nav({
        to: "/auth",
        search: {
          redirect: `/beat/${beat.id}`
        }
      });
      return;
    }
    const {
      error
    } = await supabase.from("cart_items").upsert({
      user_id: user.id,
      beat_id: beat.id
    }, {
      onConflict: "user_id,beat_id"
    });
    if (error) toast.error(error.message);
    else toast.success(`Added "${beat.title}" to cart`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[420px_1fr]", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-muted", children: beat.cover_url ? /* @__PURE__ */ jsx("img", { src: beat.cover_url, alt: beat.title, className: "aspect-square w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "grid aspect-square place-items-center bg-gradient-vault", children: /* @__PURE__ */ jsx(Music2, { className: "h-20 w-20" }) }) }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-vault", children: beat.genre }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-4xl font-bold md:text-5xl", children: beat.title }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-muted-foreground", children: [
        "by ",
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: producerName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-4", children: [
        beat.preview_url && /* @__PURE__ */ jsx("button", { onClick: () => play({
          id: beat.id,
          title: beat.title,
          producer: producerName,
          cover: beat.cover_url,
          preview: beat.preview_url
        }), className: "grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-vault shadow-vault", "aria-label": "Play", children: isThis ? /* @__PURE__ */ jsx(Pause, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Play, { className: "h-6 w-6 translate-x-0.5" }) }),
        /* @__PURE__ */ jsx(Waveform, { animated: isThis, bars: 48 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxs(Badge, { children: [
          beat.bpm,
          " BPM"
        ] }),
        beat.musical_key && /* @__PURE__ */ jsx(Badge, { children: beat.musical_key }),
        beat.tags?.map((t) => /* @__PURE__ */ jsx(Badge, { variant: "outline", children: t }, t))
      ] }),
      beat.description && /* @__PURE__ */ jsx("p", { className: "mt-6 whitespace-pre-wrap text-muted-foreground", children: beat.description }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-card/40 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Price" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-display text-3xl font-bold text-vault", children: fmtPrice(beat.price_cents ?? 0, beat.currency ?? "ngn") })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "One-time purchase. Full WAV + MP3 delivered after payment." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs(Button, { size: "lg", className: "flex-1 bg-gradient-vault text-primary-foreground shadow-vault hover:opacity-90", onClick: addToCart, children: [
            /* @__PURE__ */ jsx(ShoppingCart, { className: "mr-2 h-5 w-5" }),
            " Add to cart"
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/cart", className: "flex-1", children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "w-full", children: "View cart" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  BeatDetail as component
};
