import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const KEY = "bv_cookie_consent_v1";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const record = async (analytics: boolean, marketing: boolean) => {
    localStorage.setItem(KEY, JSON.stringify({ analytics, marketing, at: Date.now() }));
    setShow(false);
    const { data } = await supabase.auth.getUser();
    await supabase.from("cookie_consents").insert({
      user_id: data.user?.id ?? null,
      necessary: true,
      analytics,
      marketing,
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-5 shadow-vault backdrop-blur-xl md:bottom-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-vault" />
          <div className="text-sm">
            <p className="font-medium text-foreground">We use cookies</p>
            <p className="mt-1 text-muted-foreground">
              Necessary cookies keep dollar.com.beat working. Optional analytics & marketing cookies help us
              improve. See our{" "}
              <Link to="/cookie-notice" className="text-vault hover:underline">
                Cookie Notice
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2 md:ml-auto">
          <Button variant="ghost" size="sm" onClick={() => record(false, false)}>
            Reject all
          </Button>
          <Button variant="outline" size="sm" onClick={() => record(true, false)}>
            Analytics only
          </Button>
          <Button
            size="sm"
            className="bg-gradient-vault text-primary-foreground"
            onClick={() => record(true, true)}
          >
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
