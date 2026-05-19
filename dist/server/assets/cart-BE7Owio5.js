import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { u as useAuth, s as supabase, B as Button } from "./router-CR-vLeYt.js";
import { S as Skeleton, f as fmtPrice } from "./skeleton-CMcJzY_v.js";
import "react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "zustand";
import "zod";
function CartPage() {
  const {
    user,
    loading
  } = useAuth();
  const nav = useNavigate();
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    enabled: !!user,
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("cart_items").select("id, beat_id, beats(id, title, cover_url, producer_id, price_cents, currency)").eq("user_id", user.id).order("added_at", {
        ascending: false
      });
      if (error) throw error;
      return data2;
    }
  });
  if (loading) return null;
  if (!user) {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-md px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsx(ShoppingCart, { className: "mx-auto h-12 w-12 text-vault" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 font-display text-2xl font-bold", children: "Sign in to view your cart" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => nav({
        to: "/auth",
        search: {
          redirect: "/cart"
        }
      }), className: "mt-6 bg-gradient-vault text-primary-foreground", children: "Sign in" })
    ] });
  }
  const items = (data ?? []).map((row) => ({
    ...row,
    price_cents: row.beats?.price_cents ?? 0,
    currency: row.beats?.currency ?? "ngn"
  }));
  const total = items.reduce((s, i) => s + i.price_cents, 0);
  const remove = async (id) => {
    await supabase.from("cart_items").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["cart", user.id]
    });
  };
  const checkout = async () => {
    toast.info("Checkout is being set up — payments will be enabled shortly.");
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-bold md:text-4xl", children: "Your cart" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[1fr_380px]", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: isLoading ? Array.from({
        length: 2
      }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-24 rounded-2xl" }, i)) : items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/30 p-12 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-lg", children: "Your cart is empty." }),
        /* @__PURE__ */ jsx(Link, { to: "/store", className: "mt-4 inline-block", children: /* @__PURE__ */ jsx(Button, { className: "bg-gradient-vault text-primary-foreground", children: "Browse beats" }) })
      ] }) : items.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-3", children: [
        /* @__PURE__ */ jsx("div", { className: "h-16 w-16 overflow-hidden rounded-lg bg-muted", children: item.beats.cover_url && /* @__PURE__ */ jsx("img", { src: item.beats.cover_url, alt: "", className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx(Link, { to: "/beat/$beatId", params: {
            beatId: item.beat_id
          }, className: "block truncate font-medium", children: item.beats.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Full ownership on purchase" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "font-mono font-semibold text-acid", children: fmtPrice(item.price_cents, item.currency) }),
        /* @__PURE__ */ jsx("button", { onClick: () => remove(item.id), className: "rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, item.id)) }),
      /* @__PURE__ */ jsxs("aside", { className: "h-fit rounded-2xl border border-border bg-card/40 p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-lg font-semibold", children: "Order summary" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono", children: fmtPrice(total) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Tax" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono", children: "Calculated at checkout" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t border-border pt-4 flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Total" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-lg font-bold text-vault", children: fmtPrice(total) })
        ] }),
        /* @__PURE__ */ jsx(Button, { disabled: items.length === 0, onClick: checkout, className: "mt-6 w-full bg-gradient-vault text-primary-foreground shadow-vault", size: "lg", children: "Checkout" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
          "By continuing you agree to our",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/terms-and-conditions", className: "text-vault hover:underline", children: "terms" }),
          " and",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/refund-policy", className: "text-vault hover:underline", children: "refund policy" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
export {
  CartPage as component
};
