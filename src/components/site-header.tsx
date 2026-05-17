import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Search, ShoppingCart, Upload, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return setCount(0);
    let active = true;
    const load = async () => {
      const { count } = await supabase
        .from("cart_items")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);
      if (active) setCount(count ?? 0);
    };
    load();
    const ch = supabase
      .channel(`cart-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cart_items", filter: `user_id=eq.${user.id}` },
        load,
      )
      .subscribe();
    return () => {
      active = false;
      supabase.removeChannel(ch);
    };
  }, [user]);

  return (
    // Changed background to a premium translucent dark glass layer
    <header className="sticky top-0 z-40 border-b border-border/40 bg-black/40 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center gap-6 px-4">
        {/* Brand logo text forced to sharp, stable text-white */}
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <img src={logo} alt="dollar.com.beat" width={32} height={32} className="h-8 w-8" />
          <span>dollar.com.beat</span>
        </Link>

        {/* Nav Links: shifted from gray to white opacity layers with crisp hover transitions */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            to="/store"
            activeProps={{ className: "text-white font-semibold" }}
            className="text-white/70 hover:text-white transition-colors"
          >
            Store
          </Link>
          <Link
            to="/dashboard/producer"
            activeProps={{ className: "text-white font-semibold" }}
            className="text-white/70 hover:text-white transition-colors"
          >
            Sell beats
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-white font-semibold" }}
            className="text-white/70 hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Action icon buttons updated to clear white-contrast states */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => nav({ to: "/store" })}
            aria-label="Search"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-vault px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/dashboard/producer">
                <Button variant="ghost" size="sm" className="gap-1 text-white/80 hover:text-white hover:bg-white/10">
                  <Upload className="h-4 w-4" /> Upload
                </Button>
              </Link>
              <Link to="/dashboard/buyer">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Account"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                >
                  <UserIcon className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                aria-label="Sign out"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="bg-gradient-vault text-primary-foreground hover:opacity-90 font-medium">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}