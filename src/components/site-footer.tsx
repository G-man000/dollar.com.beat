import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        {/* Top: brand description on the left */}
        <div className="max-w-md">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <img src={logo} alt="dollar.com.beat" width={28} height={28} className="h-7 w-7" loading="lazy" />
            dollar.com.beat
          </div>
          <p className="mt-3 text-sm text-white/70">
            Original beats by K. Kingsley. One price, full ownership, instant download.
          </p>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-border/40" />

        {/* Link columns */}
        <div className="grid gap-8 sm:grid-cols-3">
          <FooterCol title="Marketplace" links={[["Store", "/store"], ["Sell beats", "/dashboard/producer"], ["About", "/about"]]} />
          <FooterCol
            title="Legal"
            links={[
              ["Privacy Policy", "/privacy-policy"],
              ["Terms & Conditions", "/terms-and-conditions"],
              ["Refund Policy", "/refund-policy"],
              ["Cookie Notice", "/cookie-notice"],
            ]}
          />
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Contact</h4>
            <p className="mt-3 text-sm text-white/50">
              Data requests:<br />
              <a href="mailto:kkingsley265@gmail.com" className="text-white/80 hover:text-vault transition-colors">kkingsley265@gmail.com</a>
            </p>
            <p className="mt-4 text-sm text-white/50">
              Phone / WhatsApp:<br />
              <a href="https://wa.me/2349112885397" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-vault transition-colors block mt-1">
                +234 911 288 5397
              </a>
              <a href="https://wa.me/2348162935095" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-vault transition-colors block mt-1">
                +234 816 293 5095
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar: copyright left, socials right */}
      <div className="border-t border-border/40 bg-black/20">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} dollar.com.beat. NDPA 2026 compliant.
          </p>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <Button
                key={s.name}
                asChild
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-white/60 hover:bg-vault/20 hover:text-vault transition-colors"
              >
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <s.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-white">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="text-white/70 hover:text-white transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type IconProps = React.SVGProps<SVGSVGElement>;

const Brand = ({ children, ...p }: IconProps & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...p}>
    {children}
  </svg>
);

const Instagram = (p: IconProps) => (
  <Brand {...p}>
    <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.2.05 1.8.25 2.2.42.6.22 1 .5 1.5 1s.78.9 1 1.5c.17.4.37 1 .42 2.2.06 1.2.07 1.6.07 4.8s-.01 3.6-.07 4.8c-.05 1.2-.25 1.8-.42 2.2a4 4 0 0 1-1 1.5 4 4 0 0 1-1.5 1c-.4.17-1 .37-2.2.42-1.2.06-1.6.07-4.8.07s-3.6-.01-4.8-.07c-1.2-.05-1.8-.25-2.2-.42a4 4 0 0 1-1.5-1 4 4 0 0 1-1-1.5c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.05-1.2.25-1.8.42-2.2.22-.6.5-1 1-1.5s.9-.78 1.5-1c.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.7.07-.95.04-1.46.2-1.8.34-.46.18-.78.4-1.13.74-.34.34-.56.67-.74 1.13-.13.34-.3.85-.34 1.8C3.2 8.5 3.2 8.85 3.2 12s0 3.5.07 4.7c.04.95.2 1.46.34 1.8.18.46.4.78.74 1.13.34.34.67.56 1.13.74.34.13.85.3 1.8.34 1.2.06 1.55.07 4.7.07s3.5 0 4.7-.07c.95-.04 1.46-.2 1.8-.34.46-.18.78-.4 1.13-.74.34-.34.56-.67.74-1.13.13-.34.3-.85.34-1.8.06-1.2.07-1.55.07-4.7s0-3.5-.07-4.7c-.04-.95-.2-1.46-.34-1.8a3 3 0 0 0-.74-1.13 3 3 0 0 0-1.13-.74c-.34-.13-.85-.3-1.8-.34C15.5 4 15.15 4 12 4zm0 3.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3zm5.15-2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
  </Brand>
);

const YouTubeMusic = (p: IconProps) => (
  <Brand {...p}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.18a8.18 8.18 0 1 1 0-16.36 8.18 8.18 0 0 1 0 16.36zM10 8v8l6-4-6-4z" />
  </Brand>
);

const TikTok = (p: IconProps) => (
  <Brand {...p}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
  </Brand>
);

const BandLab = (p: IconProps) => (
  <Brand {...p}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v6.5a2.5 2.5 0 1 1-2-2.45V7zm5 0h2v8.5a2.5 2.5 0 1 1-2-2.45V7z" />
  </Brand>
);

const Audiomack = (p: IconProps) => (
  <Brand {...p}>
    <path d="M3 14h2V8H3v6zm4 0h2V6H7v8zm4 0h2V4h-2v10zm4 0h2V7h-2v7zm4 0h2v-5h-2v5z" />
  </Brand>
);

const WhatsApp = (p: IconProps) => (
  <Brand {...p}>
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.37-1.67a11.85 11.85 0 0 0 5.66 1.44h.01c6.55 0 11.87-5.32 11.87-11.86 0-3.17-1.23-6.15-3.39-8.43zM12.04 21.7h-.01a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.78.99 1-3.68-.23-.38a9.83 9.83 0 0 1-1.51-5.18c0-5.44 4.43-9.86 9.88-9.86 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.97c0 5.44-4.42 9.86-9.85 9.86zm5.41-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.63.71.22 1.36.19 1.88.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
  </Brand>
);

const Spotify = (p: IconProps) => (
  <Brand {...p}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12C24 5.4 18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.1 9.36c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.38-1.32 11.4-1.08 15.9 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
  </Brand>
);

const XTwitter = (p: IconProps) => (
  <Brand {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </Brand>
);

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/okoriekingsley0911?igsh=aHp1Yms5ZXkzZXpv", icon: Instagram },
  { name: "X (Twitter)", href: "https://x.com/KingsleyKidx", icon: XTwitter },
  { name: "WhatsApp", href: "https://whatsapp.com/channel/0029Vb6UkL6JJhzPAPKlE70i", icon: WhatsApp },
  { name: "Spotify", href: "https://open.spotify.com/user/31iyn434nedg767nsnsifxjy6rta?si=Z7WQ02gTRRmZdt49DfkHMQ", icon: Spotify },
  { name: "YouTube Music", href: "https://music.youtube.com/playlist?list=RDATjuUC_CBf48pXVA6NFrXmCK5qxQ&playnext=1&si=Mj3gzneQV46w21FO", icon: YouTubeMusic },
  { name: "TikTok", href: "https://www.tiktok.com/@kingsley_606?_r=1&_t=ZS-96Ls2q7EG7Z", icon: TikTok },
  { name: "Audiomack", href: "https://audiomack.com/okoriekingsley0911", icon: Audiomack },
  { name: "BandLab", href: "https://www.bandlab.com/dollar_com_b", icon: BandLab },
];