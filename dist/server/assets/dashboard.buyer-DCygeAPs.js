import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Download } from "lucide-react";
import { u as useAuth, s as supabase, B as Button } from "./router-CR-vLeYt.js";
import { S as Skeleton, f as fmtPrice } from "./skeleton-CMcJzY_v.js";
import { format } from "date-fns";
import "react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "zustand";
import "sonner";
import "zod";
function BuyerDashboard() {
  const {
    user,
    loading
  } = useAuth();
  const nav = useNavigate();
  const purchases = useQuery({
    enabled: !!user,
    queryKey: ["purchases", user?.id],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("purchases").select("id, amount_cents, currency, status, paid_at, created_at, beats(id, title, cover_url)").eq("buyer_id", user.id).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  if (loading) return null;
  if (!user) {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-md px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-bold", children: "Sign in to view your library" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => nav({
        to: "/auth",
        search: {
          redirect: "/dashboard/buyer"
        }
      }), className: "mt-6 bg-gradient-vault text-primary-foreground", children: "Sign in" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-vault", children: "My library" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-1 font-display text-3xl font-bold md:text-4xl", children: "Purchases & downloads" }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: purchases.isLoading ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: Array.from({
      length: 3
    }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-24 rounded-2xl" }, i)) }) : purchases.data?.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/30 p-12 text-center", children: [
      /* @__PURE__ */ jsx(ShoppingBag, { className: "mx-auto h-10 w-10 text-vault" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-display text-lg", children: "You haven't purchased any beats yet." }),
      /* @__PURE__ */ jsx(Link, { to: "/store", className: "mt-4 inline-block", children: /* @__PURE__ */ jsx(Button, { className: "bg-gradient-vault text-primary-foreground", children: "Browse the store" }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: purchases.data?.map((p) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-3", children: [
      /* @__PURE__ */ jsx("div", { className: "h-16 w-16 overflow-hidden rounded-lg bg-muted", children: p.beats?.cover_url && /* @__PURE__ */ jsx("img", { src: p.beats.cover_url, alt: "", className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "truncate font-medium", children: p.beats?.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: format(new Date(p.paid_at ?? p.created_at), "MMM d, yyyy") })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-mono font-semibold", children: fmtPrice(p.amount_cents, p.currency) }),
      /* @__PURE__ */ jsx("span", { className: `hidden text-xs sm:inline ${p.status === "paid" ? "text-acid" : "text-muted-foreground"}`, children: p.status }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", disabled: p.status !== "paid", children: [
        /* @__PURE__ */ jsx(Download, { className: "mr-1 h-4 w-4" }),
        " Files"
      ] })
    ] }, p.id)) }) })
  ] });
}
export {
  BuyerDashboard as component
};
