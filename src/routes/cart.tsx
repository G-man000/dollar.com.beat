import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — dollar.com.beat" },
      { name: "description", content: "Review your beats before checkout." },
    ],
  }),
  component: CartPage,
});

type Row = {
  id: string;
  beat_id: string;
  beats: {
    id: string;
    title: string;
    cover_url: string | null;
    producer_id: string;
    price_cents: number;
    currency: string;
  };
};

function CartPage() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cart_items")
        .select("id, beat_id, beats(id, title, cover_url, producer_id, price_cents, currency)")
        .eq("user_id", user!.id)
        .order("added_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Row[];
    },
  });

  if (loading) return null;
  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <ShoppingCart className="mx-auto h-12 w-12 text-vault" />
        <h1 className="mt-4 font-display text-2xl font-bold">Sign in to view your cart</h1>
        <Button onClick={() => nav({ to: "/auth", search: { redirect: "/cart" } as any })}
          className="mt-6 bg-gradient-vault text-primary-foreground">Sign in</Button>
      </div>
    );
  }

  const items = (data ?? []).map((row) => ({
    ...row,
    price_cents: row.beats?.price_cents ?? 0,
    currency: row.beats?.currency ?? "ngn",
  }));
  const total = items.reduce((s, i) => s + i.price_cents, 0);

  const remove = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["cart", user.id] });
  };

  const checkout = async () => {
    toast.info("Checkout is being set up — payments will be enabled shortly.");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold md:text-4xl">Your cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/30 p-12 text-center">
              <p className="font-display text-lg">Your cart is empty.</p>
              <Link to="/store" className="mt-4 inline-block">
                <Button className="bg-gradient-vault text-primary-foreground">Browse beats</Button>
              </Link>
            </div>
          ) : items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-3">
              <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                {item.beats.cover_url && (
                  <img src={item.beats.cover_url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <Link to="/beat/$beatId" params={{ beatId: item.beat_id }} className="block truncate font-medium">
                  {item.beats.title}
                </Link>
                <p className="text-xs text-muted-foreground">Full ownership on purchase</p>
              </div>
              <span className="font-mono font-semibold text-acid">{fmtPrice(item.price_cents, item.currency)}</span>
              <button onClick={() => remove(item.id)} className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="font-display text-lg font-semibold">Order summary</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-mono">{fmtPrice(total)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-mono">Calculated at checkout</span>
          </div>
          <div className="mt-4 border-t border-border pt-4 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-mono text-lg font-bold text-vault">{fmtPrice(total)}</span>
          </div>
          <Button
            disabled={items.length === 0}
            onClick={checkout}
            className="mt-6 w-full bg-gradient-vault text-primary-foreground shadow-vault"
            size="lg"
          >
            Checkout
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link to="/terms-and-conditions" className="text-vault hover:underline">terms</Link> and{" "}
            <Link to="/refund-policy" className="text-vault hover:underline">refund policy</Link>.
          </p>
        </aside>
      </div>
    </div>
  );
}
