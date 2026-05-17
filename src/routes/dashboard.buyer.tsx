import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtPrice } from "@/lib/format";
import { format } from "date-fns";

export const Route = createFileRoute("/dashboard/buyer")({
  head: () => ({
    meta: [
      { title: "My Library — dollar.com.beat" },
      { name: "description", content: "Your purchases and downloads." },
    ],
  }),
  component: BuyerDashboard,
});

function BuyerDashboard() {
  const { user, loading } = useAuth();
  const nav = useNavigate();

  const purchases = useQuery({
    enabled: !!user,
    queryKey: ["purchases", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("purchases")
        .select("id, amount_cents, currency, status, paid_at, created_at, beats(id, title, cover_url)")
        .eq("buyer_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
  });

  if (loading) return null;
  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Sign in to view your library</h1>
        <Button onClick={() => nav({ to: "/auth", search: { redirect: "/dashboard/buyer" } as any })}
          className="mt-6 bg-gradient-vault text-primary-foreground">Sign in</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-vault">My library</p>
      <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Purchases & downloads</h1>

      <div className="mt-8">
        {purchases.isLoading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}</div>
        ) : purchases.data?.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/30 p-12 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-vault" />
            <p className="mt-4 font-display text-lg">You haven't purchased any beats yet.</p>
            <Link to="/store" className="mt-4 inline-block">
              <Button className="bg-gradient-vault text-primary-foreground">Browse the store</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {purchases.data?.map((p) => (
              <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-3">
                <div className="h-16 w-16 overflow-hidden rounded-lg bg-muted">
                  {p.beats?.cover_url && <img src={p.beats.cover_url} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{p.beats?.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(p.paid_at ?? p.created_at), "MMM d, yyyy")}
                  </p>
                </div>
                <span className="font-mono font-semibold">{fmtPrice(p.amount_cents, p.currency)}</span>
                <span className={`hidden text-xs sm:inline ${p.status === "paid" ? "text-acid" : "text-muted-foreground"}`}>
                  {p.status}
                </span>
                <Button variant="outline" size="sm" disabled={p.status !== "paid"}>
                  <Download className="mr-1 h-4 w-4" /> Files
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
