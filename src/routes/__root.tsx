import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import "../styles.css"; // Directly import your global styles natively
import { AuthProvider } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GlobalPlayer } from "@/components/global-player";
import { CookieBanner } from "@/components/cookie-banner";
import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "../router";

// --- IMPORT YOUR LOCAL IMAGES ---
import heroBg from "@/assets/hero.jpg";
import pic1 from "@/assets/pic1.jpg";
import pic2 from "@/assets/pic2.jpg";
import pic3 from "@/assets/pic3.jpg";
import pic4 from "@/assets/pic4.jpeg";
import pic5 from "@/assets/pic5.jpeg";
import pic6 from "@/assets/pic6.jpeg";
import pic7 from "@/assets/pic7.jpeg";

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
  return (
    <div className="flex min-h-screen items-center justify-center bg-background/50 px-4 backdrop-blur-sm">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gradient-vault">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-white">Track not found</h2>
        <p className="mt-2 text-sm text-gray-300">
          This beat doesn't exist or has been pulled from the vault.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gradient-vault px-4 py-2 text-sm font-medium text-primary-foreground shadow-vault transition hover:opacity-90"
          >
            Back to dollar.com.beat
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background/50 px-4 backdrop-blur-sm">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold text-white">Something broke</h1>
        <p className="mt-2 text-sm text-gray-300">{error.message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-gradient-vault px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-input text-white px-4 py-2 text-sm font-medium">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "dollar.com.beat — Buy Original Beats Online" },
      {
        name: "description",
        content:
          "dollar.com.beat — original beats by K. Kingsley. Preview, buy and download instantly. One price, full ownership.",
      },
      { name: "author", content: "dollar.com.beat" },
      { property: "og:title", content: "dollar.com.beat — Buy Original Beats" },
      { property: "og:description", content: "Original beats by K. Kingsley. One price, full ownership." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#000000" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
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
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const rotateX = scrollY * 0.015;
  const translateY = scrollY * 0.4;
  const scale = 1 + (scrollY * 0.0004);
  const transformString = `translate3d(0px, ${translateY}px, -150px) rotateX(${rotateX}deg) scale(${scale})`;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
          <div className="fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1000px" }}>
            {backgrounds.map((bg, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  top: "-20%", left: "-10%", width: "120%", height: "140%",
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transformStyle: "preserve-3d",
                  transform: transformString,
                  willChange: "transform, opacity",
                  opacity: currentBgIndex === index ? 1 : 0,
                  transition: "opacity 2s ease-in-out",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[4px]" />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 pb-24">
              <Outlet />
            </main>
            <SiteFooter />
            <GlobalPlayer />
            <CookieBanner />
            <Toaster richColors theme="dark" />
          </div>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}