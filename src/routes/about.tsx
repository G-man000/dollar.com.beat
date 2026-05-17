import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — dollar.com.beat" },
      { name: "description", content: "The origin story and team behind dollar.com.beat — the vault where producers and artists meet." },
      { property: "og:title", content: "About — dollar.com.beat" },
      { property: "og:description", content: "How dollar.com.beat started and the people building it." },
    ],
  }),
  component: AboutPage,
});

const team = [
  { name: "K. Kingsley", role: "Founder & CEO", bio: "Producer-turned-builder. Started dollar.com.beat to give independent producers a fair shot at global distribution.", initial: "K" },
];

function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-vault font-semibold">About</p>
      <h1 className="mt-2 font-display text-5xl font-bold md:text-6xl text-white">
        The vault for sound.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-white/90">
        dollar.com.beat is a marketplace built by producers, for producers — and for the artists hunting the
        beat that turns a hook into a hit.
      </p>

      <section className="mt-16 grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-border/40 bg-black/40 p-8 backdrop-blur-sm">
          <h2 className="font-display text-2xl font-semibold text-white">Our origin</h2>
          <div className="mt-4 space-y-4 text-white/80">
            <p>
              In 2024, founder K. Kingsley was selling beats out of a Telegram channel. Files got leaked,
              licenses got disputed, and producers in Lagos kept losing money to platforms
              that took 50% and answered no emails.
            </p>
            <p>
              dollar.com.beat was built as the opposite of that. A clean, fast vault: previewable beats,
              one transparent price per beat, full ownership transferred on purchase, and instant
              signed-URL delivery — no tiers, no fine print, no waiting.
            </p>
            <p>
              We launched publicly in 2026 and have grown into a global marketplace serving thousands of
              independent producers and the artists who license their work.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border/40 bg-black/40 p-8 shadow-vault backdrop-blur-sm">
          <h3 className="font-display text-xl font-semibold text-white">What we believe</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>• Producers own their masters. Always.</li>
            <li>• One price per beat. No fine print.</li>
            <li>• Payouts should land in days, not months.</li>
            <li>• Search should find the right beat in three filters.</li>
            <li>• Audio quality is non-negotiable.</li>
          </ul>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-2xl font-semibold text-white">The team</h2>
        {/* FIXED GRID: Removed max-w-sm constraint so the single card has room to display beautifully */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border/40 bg-black/50 p-6 backdrop-blur-sm shadow-xl">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-vault font-display text-2xl font-bold text-primary-foreground shadow-vault">
                {m.initial}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{m.name}</h3>
              <p className="text-xs uppercase tracking-wider text-vault font-medium">{m.role}</p>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-2xl border border-border/40 bg-gradient-vault/10 p-10 text-center backdrop-blur-md">
        <h2 className="font-display text-3xl font-bold text-white">Build with us.</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Whether you're grabbing your first beat or your hundredth, dollar.com.beat is the vault.
        </p>
        <p className="mt-4 text-sm text-white/90">
          Press, partnerships and questions:{" "}
          <a href="mailto:kkingsley265@gmail.com" className="text-vault hover:underline font-semibold">kkingsley265@gmail.com</a>
        </p>
      </section>
    </div>
  );
}