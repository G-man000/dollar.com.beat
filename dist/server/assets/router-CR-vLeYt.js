import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useNavigate, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { Search, ShoppingCart, Upload, User, LogOut, Pause, Play, X, Cookie } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { Toaster as Toaster$1 } from "sonner";
import { z } from "zod";
const appCss = "/assets/styles-DkNPdekp.css";
function createSupabaseClient() {
  const SUPABASE_URL = "https://kpvtdboipxfivwcppygz.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdnRkYm9pcHhmaXZ3Y3BweWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MjU3OTMsImV4cCI6MjA5NDAwMTc5M30.w8PFa_41K7NC38uOmgoBciyX1vXjaZqZUDxfiqg6fTk";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const Ctx = createContext({ user: null, session: null, loading: true, signOut: async () => {
} });
function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsx(
    Ctx.Provider,
    {
      value: {
        user: session?.user ?? null,
        session,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        }
      },
      children
    }
  );
}
const useAuth = () => useContext(Ctx);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const logo = "/assets/logo-BBmA893O.png";
function SiteHeader() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!user) return setCount(0);
    let active = true;
    const load = async () => {
      const { count: count2 } = await supabase.from("cart_items").select("id", { count: "exact", head: true }).eq("user_id", user.id);
      if (active) setCount(count2 ?? 0);
    };
    load();
    const ch = supabase.channel(`cart-${user.id}`).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "cart_items", filter: `user_id=eq.${user.id}` },
      load
    ).subscribe();
    return () => {
      active = false;
      supabase.removeChannel(ch);
    };
  }, [user]);
  return (
    // Changed background to a premium translucent dark glass layer
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 border-b border-border/40 bg-black/40 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-16 items-center gap-6 px-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-display text-xl font-bold text-white", children: [
        /* @__PURE__ */ jsx("img", { src: logo, alt: "dollar.com.beat", width: 32, height: 32, className: "h-8 w-8" }),
        /* @__PURE__ */ jsx("span", { children: "dollar.com.beat" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-6 text-sm md:flex", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/store",
            activeProps: { className: "text-white font-semibold" },
            className: "text-white/70 hover:text-white transition-colors",
            children: "Store"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/dashboard/producer",
            activeProps: { className: "text-white font-semibold" },
            className: "text-white/70 hover:text-white transition-colors",
            children: "Sell beats"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/about",
            activeProps: { className: "text-white font-semibold" },
            className: "text-white/70 hover:text-white transition-colors",
            children: "About"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => nav({ to: "/store" }),
            "aria-label": "Search",
            className: "text-white/80 hover:text-white hover:bg-white/10",
            children: /* @__PURE__ */ jsx(Search, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxs(Link, { to: "/cart", className: "relative", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              "aria-label": "Cart",
              className: "text-white/80 hover:text-white hover:bg-white/10",
              children: /* @__PURE__ */ jsx(ShoppingCart, { className: "h-5 w-5" })
            }
          ),
          count > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-vault px-1 text-[10px] font-bold text-primary-foreground", children: count })
        ] }),
        user ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Link, { to: "/dashboard/producer", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "gap-1 text-white/80 hover:text-white hover:bg-white/10", children: [
            /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
            " Upload"
          ] }) }),
          /* @__PURE__ */ jsx(Link, { to: "/dashboard/buyer", children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              "aria-label": "Account",
              className: "text-white/80 hover:text-white hover:bg-white/10",
              children: /* @__PURE__ */ jsx(User, { className: "h-5 w-5" })
            }
          ) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: signOut,
              "aria-label": "Sign out",
              className: "text-white/80 hover:text-white hover:bg-white/10",
              children: /* @__PURE__ */ jsx(LogOut, { className: "h-5 w-5" })
            }
          )
        ] }) : /* @__PURE__ */ jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsx(Button, { variant: "default", size: "sm", className: "bg-gradient-vault text-primary-foreground hover:opacity-90 font-medium", children: "Sign in" }) })
      ] })
    ] }) })
  );
}
function SiteFooter() {
  return /* @__PURE__ */ jsxs("footer", { className: "border-t border-border/40 bg-black/40 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-display text-lg font-bold text-white", children: [
          /* @__PURE__ */ jsx("img", { src: logo, alt: "dollar.com.beat", width: 28, height: 28, className: "h-7 w-7", loading: "lazy" }),
          "dollar.com.beat"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-white/70", children: "Original beats by K. Kingsley. One price, full ownership, instant download." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "my-10 h-px w-full bg-border/40" }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-8 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsx(FooterCol, { title: "Marketplace", links: [["Store", "/store"], ["Sell beats", "/dashboard/producer"], ["About", "/about"]] }),
        /* @__PURE__ */ jsx(
          FooterCol,
          {
            title: "Legal",
            links: [
              ["Privacy Policy", "/privacy-policy"],
              ["Terms & Conditions", "/terms-and-conditions"],
              ["Refund Policy", "/refund-policy"],
              ["Cookie Notice", "/cookie-notice"]
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-display text-sm font-semibold text-white", children: "Contact" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-white/50", children: [
            "Data requests:",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "mailto:kkingsley265@gmail.com", className: "text-white/80 hover:text-vault transition-colors", children: "kkingsley265@gmail.com" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-white/50", children: [
            "Phone / WhatsApp:",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "https://wa.me/2349112885397", target: "_blank", rel: "noopener noreferrer", className: "text-white/80 hover:text-vault transition-colors block mt-1", children: "+234 911 288 5397" }),
            /* @__PURE__ */ jsx("a", { href: "https://wa.me/2348162935095", target: "_blank", rel: "noopener noreferrer", className: "text-white/80 hover:text-vault transition-colors block mt-1", children: "+234 816 293 5095" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-border/40 bg-black/20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/60", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " dollar.com.beat. NDPA 2026 compliant."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: socials.map((s) => /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          size: "icon",
          className: "h-9 w-9 rounded-full text-white/60 hover:bg-vault/20 hover:text-vault transition-colors",
          children: /* @__PURE__ */ jsx("a", { href: s.href, target: "_blank", rel: "noopener noreferrer", "aria-label": s.name, children: /* @__PURE__ */ jsx(s.icon, { className: "h-4 w-4" }) })
        },
        s.name
      )) })
    ] }) })
  ] });
}
function FooterCol({ title, links }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h4", { className: "font-display text-sm font-semibold text-white", children: title }),
    /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2 text-sm", children: links.map(([label, to]) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to, className: "text-white/70 hover:text-white transition-colors", children: label }) }, to)) })
  ] });
}
const Brand = ({ children, ...p }) => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", ...p, children });
const Instagram = (p) => /* @__PURE__ */ jsx(Brand, { ...p, children: /* @__PURE__ */ jsx("path", { d: "M12 2.2c3.2 0 3.6 0 4.8.07 1.2.05 1.8.25 2.2.42.6.22 1 .5 1.5 1s.78.9 1 1.5c.17.4.37 1 .42 2.2.06 1.2.07 1.6.07 4.8s-.01 3.6-.07 4.8c-.05 1.2-.25 1.8-.42 2.2a4 4 0 0 1-1 1.5 4 4 0 0 1-1.5 1c-.4.17-1 .37-2.2.42-1.2.06-1.6.07-4.8.07s-3.6-.01-4.8-.07c-1.2-.05-1.8-.25-2.2-.42a4 4 0 0 1-1.5-1 4 4 0 0 1-1-1.5c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.05-1.2.25-1.8.42-2.2.22-.6.5-1 1-1.5s.9-.78 1.5-1c.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.7.07-.95.04-1.46.2-1.8.34-.46.18-.78.4-1.13.74-.34.34-.56.67-.74 1.13-.13.34-.3.85-.34 1.8C3.2 8.5 3.2 8.85 3.2 12s0 3.5.07 4.7c.04.95.2 1.46.34 1.8.18.46.4.78.74 1.13.34.34.67.56 1.13.74.34.13.85.3 1.8.34 1.2.06 1.55.07 4.7.07s3.5 0 4.7-.07c.95-.04 1.46-.2 1.8-.34.46-.18.78-.4 1.13-.74.34-.34.56-.67.74-1.13.13-.34.3-.85.34-1.8.06-1.2.07-1.55.07-4.7s0-3.5-.07-4.7c-.04-.95-.2-1.46-.34-1.8a3 3 0 0 0-.74-1.13 3 3 0 0 0-1.13-.74c-.34-.13-.85-.3-1.8-.34C15.5 4 15.15 4 12 4zm0 3.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3zm5.15-2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" }) });
const YouTubeMusic = (p) => /* @__PURE__ */ jsx(Brand, { ...p, children: /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.18a8.18 8.18 0 1 1 0-16.36 8.18 8.18 0 0 1 0 16.36zM10 8v8l6-4-6-4z" }) });
const TikTok = (p) => /* @__PURE__ */ jsx(Brand, { ...p, children: /* @__PURE__ */ jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" }) });
const BandLab = (p) => /* @__PURE__ */ jsx(Brand, { ...p, children: /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v6.5a2.5 2.5 0 1 1-2-2.45V7zm5 0h2v8.5a2.5 2.5 0 1 1-2-2.45V7z" }) });
const Audiomack = (p) => /* @__PURE__ */ jsx(Brand, { ...p, children: /* @__PURE__ */ jsx("path", { d: "M3 14h2V8H3v6zm4 0h2V6H7v8zm4 0h2V4h-2v10zm4 0h2V7h-2v7zm4 0h2v-5h-2v5z" }) });
const WhatsApp = (p) => /* @__PURE__ */ jsx(Brand, { ...p, children: /* @__PURE__ */ jsx("path", { d: "M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.37-1.67a11.85 11.85 0 0 0 5.66 1.44h.01c6.55 0 11.87-5.32 11.87-11.86 0-3.17-1.23-6.15-3.39-8.43zM12.04 21.7h-.01a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.78.99 1-3.68-.23-.38a9.83 9.83 0 0 1-1.51-5.18c0-5.44 4.43-9.86 9.88-9.86 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.97c0 5.44-4.42 9.86-9.85 9.86zm5.41-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.63.71.22 1.36.19 1.88.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" }) });
const Spotify = (p) => /* @__PURE__ */ jsx(Brand, { ...p, children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12C24 5.4 18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.1 9.36c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.38-1.32 11.4-1.08 15.9 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" }) });
const XTwitter = (p) => /* @__PURE__ */ jsx(Brand, { ...p, children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) });
const socials = [
  { name: "Instagram", href: "https://www.instagram.com/okoriekingsley0911?igsh=aHp1Yms5ZXkzZXpv", icon: Instagram },
  { name: "X (Twitter)", href: "https://x.com/KingsleyKidx", icon: XTwitter },
  { name: "WhatsApp", href: "https://whatsapp.com/channel/0029Vb6UkL6JJhzPAPKlE70i", icon: WhatsApp },
  { name: "Spotify", href: "https://open.spotify.com/user/31iyn434nedg767nsnsifxjy6rta?si=Z7WQ02gTRRmZdt49DfkHMQ", icon: Spotify },
  { name: "YouTube Music", href: "https://music.youtube.com/playlist?list=RDATjuUC_CBf48pXVA6NFrXmCK5qxQ&playnext=1&si=Mj3gzneQV46w21FO", icon: YouTubeMusic },
  { name: "TikTok", href: "https://www.tiktok.com/@kingsley_606?_r=1&_t=ZS-96Ls2q7EG7Z", icon: TikTok },
  { name: "Audiomack", href: "https://audiomack.com/okoriekingsley0911", icon: Audiomack },
  { name: "BandLab", href: "https://www.bandlab.com/dollar_com_b", icon: BandLab }
];
const usePlayer = create((set, get) => ({
  current: null,
  playing: false,
  play: (t) => {
    const cur = get().current;
    if (cur?.id === t.id) {
      set({ playing: !get().playing });
    } else {
      set({ current: t, playing: true });
    }
  },
  toggle: () => set({ playing: !get().playing }),
  stop: () => set({ current: null, playing: false })
}));
function GlobalPlayer() {
  const { current, playing, toggle, stop } = usePlayer();
  const ref = useRef(null);
  useEffect(() => {
    const a = ref.current;
    if (!a || !current) return;
    if (a.src !== current.preview) a.src = current.preview;
    if (playing) a.play().catch(() => {
    });
    else a.pause();
  }, [current, playing]);
  if (!current) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 inset-x-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center gap-4 px-4 py-3", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: toggle,
        className: "grid h-11 w-11 place-items-center rounded-full bg-gradient-vault text-primary-foreground shadow-vault transition active:scale-95",
        "aria-label": playing ? "Pause" : "Play",
        children: playing ? /* @__PURE__ */ jsx(Pause, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Play, { className: "h-5 w-5 translate-x-0.5" })
      }
    ),
    current.cover && /* @__PURE__ */ jsx(
      "img",
      {
        src: current.cover,
        alt: "",
        className: "h-11 w-11 rounded object-cover"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "truncate font-medium", children: current.title }),
      /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-muted-foreground", children: current.producer })
    ] }),
    /* @__PURE__ */ jsx(Waveform, { animated: playing }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: stop,
        className: "rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground",
        "aria-label": "Close player",
        children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx("audio", { ref, preload: "none" })
  ] }) });
}
function Waveform({ animated = false, bars = 28 }) {
  return /* @__PURE__ */ jsx("div", { className: "hidden h-8 items-end gap-[3px] sm:flex", "aria-hidden": true, children: Array.from({ length: bars }).map((_, i) => {
    const h = 25 + i * 37 % 70;
    return /* @__PURE__ */ jsx(
      "span",
      {
        className: animated ? "wave-bar w-[3px] rounded-full bg-acid" : "w-[3px] rounded-full bg-muted-foreground/40",
        style: {
          height: `${h}%`,
          animationDelay: `${i * 73 % 900}ms`
        }
      },
      i
    );
  }) });
}
const KEY = "bv_cookie_consent_v1";
function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);
  const record = async (analytics, marketing) => {
    localStorage.setItem(KEY, JSON.stringify({ analytics, marketing, at: Date.now() }));
    setShow(false);
    const { data } = await supabase.auth.getUser();
    await supabase.from("cookie_consents").insert({
      user_id: data.user?.id ?? null,
      necessary: true,
      analytics,
      marketing
    });
  };
  if (!show) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-5 shadow-vault backdrop-blur-xl md:bottom-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(Cookie, { className: "mt-0.5 h-5 w-5 shrink-0 text-vault" }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "We use cookies" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-muted-foreground", children: [
          "Necessary cookies keep dollar.com.beat working. Optional analytics & marketing cookies help us improve. See our",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/cookie-notice", className: "text-vault hover:underline", children: "Cookie Notice" }),
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-end gap-2 md:ml-auto", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => record(false, false), children: "Reject all" }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => record(true, false), children: "Analytics only" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          className: "bg-gradient-vault text-primary-foreground",
          onClick: () => record(true, true),
          children: "Accept all"
        }
      )
    ] })
  ] }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const heroBg = "/assets/hero-B20j4aIv.jpg";
const pic1 = "/assets/pic1-CZRaWZEM.jpg";
const pic2 = "/assets/pic2-D4vVgWsG.jpg";
const pic3 = "/assets/pic3-BxHe34zZ.jpg";
const pic4 = "/assets/pic4-r017QYxh.jpeg";
const pic5 = "/assets/pic5-Dn1HWLeR.jpeg";
const pic6 = "/assets/pic6-BsH9ejWj.jpeg";
const pic7 = "/assets/pic7-IhASZXzz.jpeg";
const backgrounds = [
  heroBg,
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  pic7
];
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background/50 px-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-7xl font-bold text-gradient-vault", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 font-display text-xl font-semibold text-white", children: "Track not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-300", children: "This beat doesn't exist or has been pulled from the vault." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-gradient-vault px-4 py-2 text-sm font-medium text-primary-foreground shadow-vault transition hover:opacity-90",
        children: "Back to dollar.com.beat"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background/50 px-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-xl font-semibold text-white", children: "Something broke" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-300", children: error.message }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-gradient-vault px-4 py-2 text-sm font-medium text-primary-foreground",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx("a", { href: "/", className: "rounded-md border border-input text-white px-4 py-2 text-sm font-medium", children: "Home" })
    ] })
  ] }) });
}
const Route$c = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "dollar.com.beat — Buy Original Beats Online" },
      {
        name: "description",
        content: "dollar.com.beat — original beats by K. Kingsley. Preview, buy and download instantly. One price, full ownership."
      },
      { name: "author", content: "dollar.com.beat" },
      { property: "og:title", content: "dollar.com.beat — Buy Original Beats" },
      { property: "og:description", content: "Original beats by K. Kingsley. One price, full ownership." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "theme-color",
        content: "#000000"
      }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$c.useRouteContext();
  const [scrollY, setScrollY] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 2e4);
    return () => clearInterval(interval);
  }, []);
  const rotateX = scrollY * 0.015;
  const translateY = scrollY * 0.4;
  const scale = 1 + scrollY * 4e-4;
  const transformString = `translate3d(0px, ${translateY}px, -150px) rotateX(${rotateX}deg) scale(${scale})`;
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen overflow-x-hidden bg-black text-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-0 overflow-hidden", style: { perspective: "1000px" }, children: [
      backgrounds.map((bg, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute",
          style: {
            top: "-20%",
            left: "-10%",
            width: "120%",
            height: "140%",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformStyle: "preserve-3d",
            transform: transformString,
            willChange: "transform, opacity",
            opacity: currentBgIndex === index ? 1 : 0,
            transition: "opacity 2s ease-in-out"
          }
        },
        index
      )),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/45 backdrop-blur-[4px]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsx(SiteHeader, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1 pb-24", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(SiteFooter, {}),
      /* @__PURE__ */ jsx(GlobalPlayer, {}),
      /* @__PURE__ */ jsx(CookieBanner, {}),
      /* @__PURE__ */ jsx(Toaster, { richColors: true, theme: "dark" })
    ] })
  ] }) }) });
}
const $$splitComponentImporter$b = () => import("./terms-and-conditions-CBVSczgW.js");
const Route$b = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [{
      title: "Terms of Service — dollar.com.beat"
    }, {
      name: "description",
      content: "Terms of service for dollar.com.beat. Use of the platform is at your sole risk."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./store-CPABXXI5.js");
const searchSchema = z.object({
  genre: z.string().optional(),
  q: z.string().optional(),
  key: z.string().optional()
});
const Route$a = createFileRoute("/store")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Beat Store — dollar.com.beat"
    }, {
      name: "description",
      content: "Filter by BPM, key, genre and price. Preview every beat before you buy."
    }, {
      property: "og:title",
      content: "Beat Store — dollar.com.beat"
    }, {
      property: "og:description",
      content: "Filter by BPM, key, genre and price."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./refund-policy-Ces5Q5fO.js");
const Route$9 = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [{
      title: "Refund Policy — dollar.com.beat"
    }, {
      name: "description",
      content: "Refund eligibility, the 48-hour reporting window and dispute process."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./privacy-policy-OJCDPl7S.js");
const Route$8 = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [{
      title: "Privacy Policy — dollar.com.beat"
    }, {
      name: "description",
      content: "How dollar.com.beat collects, uses and protects your data — and the limits of our liability."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
function Legal({
  title,
  updated,
  children
}) {
  return /* @__PURE__ */ jsxs("article", { className: "container mx-auto max-w-3xl px-6 py-12 my-8 rounded-2xl border border-border/40 bg-black/40 backdrop-blur-md shadow-xl", children: [
    /* @__PURE__ */ jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-vault font-semibold", children: "Legal" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-4xl font-bold md:text-5xl text-white", children: title }),
    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-white/60", children: [
      "Last updated: ",
      updated
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-invert mt-8 max-w-none space-y-4 text-white/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-4 [&_li]:list-disc [&_b]:text-white [&_strong]:text-white [&_a]:text-vault [&_a]:font-semibold", children })
  ] });
}
function H2({
  children
}) {
  return /* @__PURE__ */ jsx("h2", { children });
}
const $$splitComponentImporter$7 = () => import("./cookie-notice-C-wp-eaD.js");
const Route$7 = createFileRoute("/cookie-notice")({
  head: () => ({
    meta: [{
      title: "Cookie Notice — dollar.com.beat"
    }, {
      name: "description",
      content: "Cookies and tracking technologies used by dollar.com.beat."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./cart-BE7Owio5.js");
const Route$6 = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Your Cart — dollar.com.beat"
    }, {
      name: "description",
      content: "Review your beats before checkout."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./auth-CmwVgpNy.js");
const Route$5 = createFileRoute("/auth")({
  validateSearch: z.object({
    redirect: z.string().optional()
  }),
  head: () => ({
    meta: [{
      title: "Sign in — dollar.com.beat"
    }, {
      name: "description",
      content: "Sign in or create your dollar.com.beat account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./about-BBm0sHC7.js");
const Route$4 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — dollar.com.beat"
    }, {
      name: "description",
      content: "The origin story and team behind dollar.com.beat — the vault where producers and artists meet."
    }, {
      property: "og:title",
      content: "About — dollar.com.beat"
    }, {
      property: "og:description",
      content: "How dollar.com.beat started and the people building it."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-D17nckty.js");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "dollar.com.beat — Buy Beats Online"
    }, {
      name: "description",
      content: "Original beats by K. Kingsley. Preview, buy and download — Trap, Drill, Afrobeats, Amapiano and more."
    }, {
      property: "og:title",
      content: "dollar.com.beat — Buy Original Beats"
    }, {
      property: "og:description",
      content: "Original beats by K. Kingsley. Preview, buy and download instantly."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard.producer-B7tRbHNb.js");
const Route$2 = createFileRoute("/dashboard/producer")({
  head: () => ({
    meta: [{
      title: "Producer Dashboard — dollar.com.beat"
    }, {
      name: "description",
      content: "Upload beats, set prices and manage your sales."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard.buyer-DCygeAPs.js");
const Route$1 = createFileRoute("/dashboard/buyer")({
  head: () => ({
    meta: [{
      title: "My Library — dollar.com.beat"
    }, {
      name: "description",
      content: "Your purchases and downloads."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./beat._beatId-DkB11-i4.js");
const Route = createFileRoute("/beat/$beatId")({
  head: () => ({
    meta: [{
      title: "Beat — dollar.com.beat"
    }, {
      name: "description",
      content: "Preview, buy and download this beat."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TermsAndConditionsRoute = Route$b.update({
  id: "/terms-and-conditions",
  path: "/terms-and-conditions",
  getParentRoute: () => Route$c
});
const StoreRoute = Route$a.update({
  id: "/store",
  path: "/store",
  getParentRoute: () => Route$c
});
const RefundPolicyRoute = Route$9.update({
  id: "/refund-policy",
  path: "/refund-policy",
  getParentRoute: () => Route$c
});
const PrivacyPolicyRoute = Route$8.update({
  id: "/privacy-policy",
  path: "/privacy-policy",
  getParentRoute: () => Route$c
});
const CookieNoticeRoute = Route$7.update({
  id: "/cookie-notice",
  path: "/cookie-notice",
  getParentRoute: () => Route$c
});
const CartRoute = Route$6.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$c
});
const AuthRoute = Route$5.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$c
});
const AboutRoute = Route$4.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const DashboardProducerRoute = Route$2.update({
  id: "/dashboard/producer",
  path: "/dashboard/producer",
  getParentRoute: () => Route$c
});
const DashboardBuyerRoute = Route$1.update({
  id: "/dashboard/buyer",
  path: "/dashboard/buyer",
  getParentRoute: () => Route$c
});
const BeatBeatIdRoute = Route.update({
  id: "/beat/$beatId",
  path: "/beat/$beatId",
  getParentRoute: () => Route$c
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AuthRoute,
  CartRoute,
  CookieNoticeRoute,
  PrivacyPolicyRoute,
  RefundPolicyRoute,
  StoreRoute,
  TermsAndConditionsRoute,
  BeatBeatIdRoute,
  DashboardBuyerRoute,
  DashboardProducerRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  H2 as H,
  Legal as L,
  Route$a as R,
  Waveform as W,
  Route$5 as a,
  Route as b,
  cn as c,
  usePlayer as d,
  router as r,
  supabase as s,
  useAuth as u
};
