import { Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GlobalPlayer } from "@/components/global-player";
import { CookieBanner } from "@/components/cookie-banner";
import { Toaster } from "@/components/ui/sonner";

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pb-24">
        <Outlet />
      </main>
      <SiteFooter />
      <GlobalPlayer />
      <CookieBanner />
      <Toaster richColors theme="light" />
    </div>
  );
}
