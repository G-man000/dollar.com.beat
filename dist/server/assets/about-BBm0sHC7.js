import { jsxs, jsx } from "react/jsx-runtime";
const team = [{
  name: "K. Kingsley",
  role: "Founder & CEO",
  bio: "Producer-turned-builder. Started dollar.com.beat to give independent producers a fair shot at global distribution.",
  initial: "K"
}];
function AboutPage() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-5xl px-4 py-16", children: [
    /* @__PURE__ */ jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-vault font-semibold", children: "About" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-5xl font-bold md:text-6xl text-white", children: "The vault for sound." }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-lg text-white/90", children: "dollar.com.beat is a marketplace built by producers, for producers — and for the artists hunting the beat that turns a hook into a hit." }),
    /* @__PURE__ */ jsxs("section", { className: "mt-16 grid gap-10 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/40 bg-black/40 p-8 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-semibold text-white", children: "Our origin" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4 text-white/80", children: [
          /* @__PURE__ */ jsx("p", { children: "In 2024, founder K. Kingsley was selling beats out of a Telegram channel. Files got leaked, licenses got disputed, and producers in Lagos kept losing money to platforms that took 50% and answered no emails." }),
          /* @__PURE__ */ jsx("p", { children: "dollar.com.beat was built as the opposite of that. A clean, fast vault: previewable beats, one transparent price per beat, full ownership transferred on purchase, and instant signed-URL delivery — no tiers, no fine print, no waiting." }),
          /* @__PURE__ */ jsx("p", { children: "We launched publicly in 2026 and have grown into a global marketplace serving thousands of independent producers and the artists who license their work." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/40 bg-black/40 p-8 shadow-vault backdrop-blur-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-semibold text-white", children: "What we believe" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-3 text-sm text-white/80", children: [
          /* @__PURE__ */ jsx("li", { children: "• Producers own their masters. Always." }),
          /* @__PURE__ */ jsx("li", { children: "• One price per beat. No fine print." }),
          /* @__PURE__ */ jsx("li", { children: "• Payouts should land in days, not months." }),
          /* @__PURE__ */ jsx("li", { children: "• Search should find the right beat in three filters." }),
          /* @__PURE__ */ jsx("li", { children: "• Audio quality is non-negotiable." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-semibold text-white", children: "The team" }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full", children: team.map((m) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border/40 bg-black/50 p-6 backdrop-blur-sm shadow-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-14 w-14 place-items-center rounded-full bg-gradient-vault font-display text-2xl font-bold text-primary-foreground shadow-vault", children: m.initial }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-lg font-semibold text-white", children: m.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-vault font-medium", children: m.role }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/80 leading-relaxed", children: m.bio })
      ] }, m.name)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-20 rounded-2xl border border-border/40 bg-gradient-vault/10 p-10 text-center backdrop-blur-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold text-white", children: "Build with us." }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-xl text-white/80", children: "Whether you're grabbing your first beat or your hundredth, dollar.com.beat is the vault." }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-white/90", children: [
        "Press, partnerships and questions:",
        " ",
        /* @__PURE__ */ jsx("a", { href: "mailto:kkingsley265@gmail.com", className: "text-vault hover:underline font-semibold", children: "kkingsley265@gmail.com" })
      ] })
    ] })
  ] });
}
export {
  AboutPage as component
};
