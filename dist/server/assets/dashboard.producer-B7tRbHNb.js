import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { X, Music2, TrendingUp, DollarSign, Plus, Upload } from "lucide-react";
import { c as cn, u as useAuth, s as supabase, B as Button } from "./router-CR-vLeYt.js";
import { I as Input } from "./input-CBrFH4eS.js";
import { L as Label } from "./label-D9GFEArW.js";
import { f as fmtPrice, S as Skeleton } from "./skeleton-CMcJzY_v.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-ClDJtkzO.js";
import { G as GENRES, K as KEYS } from "./beats-BIn0uqg8.js";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "zustand";
import "zod";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
function ProducerDashboard() {
  const {
    user,
    loading
  } = useAuth();
  const nav = useNavigate();
  const qc = useQueryClient();
  const beats = useQuery({
    enabled: !!user,
    queryKey: ["my-beats", user?.id],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("beats").select("*").eq("producer_id", user.id).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const sales = useQuery({
    enabled: !!user,
    queryKey: ["sales", user?.id],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("purchases").select("amount_cents, status, paid_at, beats(title)").eq("producer_id", user.id).eq("status", "paid").order("paid_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  if (loading) return null;
  if (!user) {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-md px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-bold", children: "Sign in to access your producer dashboard" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => nav({
        to: "/auth",
        search: {
          redirect: "/dashboard/producer"
        }
      }), className: "mt-6 bg-gradient-vault text-primary-foreground", children: "Sign in" })
    ] });
  }
  const totalEarned = (sales.data ?? []).reduce((s, p) => s + p.amount_cents, 0);
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-vault", children: "Producer" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 font-display text-3xl font-bold md:text-4xl", children: "Your studio" })
      ] }),
      /* @__PURE__ */ jsx(UploadDialog, { onCreated: () => qc.invalidateQueries({
        queryKey: ["my-beats", user.id]
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsx(Stat, { icon: Music2, label: "Beats published", value: String(beats.data?.length ?? 0) }),
      /* @__PURE__ */ jsx(Stat, { icon: TrendingUp, label: "Total sales", value: String(sales.data?.length ?? 0) }),
      /* @__PURE__ */ jsx(Stat, { icon: DollarSign, label: "Total earned", value: fmtPrice(totalEarned) })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "mt-12 font-display text-xl font-semibold", children: "Your beats" }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3", children: beats.isLoading ? Array.from({
      length: 3
    }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-20 rounded-2xl" }, i)) : beats.data?.length === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center text-sm text-muted-foreground", children: "No beats yet. Upload your first one above." }) : beats.data?.map((b) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-3", children: [
      /* @__PURE__ */ jsx("div", { className: "h-14 w-14 overflow-hidden rounded-lg bg-muted", children: b.cover_url && /* @__PURE__ */ jsx("img", { src: b.cover_url, alt: "", className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx(Link, { to: "/beat/$beatId", params: {
          beatId: b.id
        }, className: "block truncate font-medium", children: b.title }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          b.genre,
          " · ",
          b.bpm,
          " BPM · ",
          b.musical_key ?? "—"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx("span", { className: "rounded-md bg-secondary px-2 py-0.5 text-xs font-mono", children: fmtPrice(b.price_cents ?? 0, b.currency ?? "ngn") }) }),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: async () => {
        await supabase.from("beats").delete().eq("id", b.id);
        qc.invalidateQueries({
          queryKey: ["my-beats", user.id]
        });
        toast.success("Beat deleted");
      }, children: "Delete" })
    ] }, b.id)) }),
    /* @__PURE__ */ jsx("h2", { className: "mt-12 font-display text-xl font-semibold", children: "Recent sales" }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-2xl border border-border bg-card/40 p-4", children: sales.isLoading ? /* @__PURE__ */ jsx(Skeleton, { className: "h-24" }) : sales.data?.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No sales yet." }) : /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border", children: sales.data?.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "flex justify-between py-3 text-sm", children: [
      /* @__PURE__ */ jsx("span", { children: s.beats?.title ?? "Beat" }),
      /* @__PURE__ */ jsx("span", { className: "font-mono text-acid", children: fmtPrice(s.amount_cents) })
    ] }, i)) }) })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-card/40 p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-vault/15 text-vault", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsx("p", { className: "font-display text-xl font-bold", children: value })
    ] })
  ] }) });
}
function UploadDialog({
  onCreated
}) {
  const {
    user
  } = useAuth();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    genre: GENRES[0],
    bpm: 140,
    musical_key: "Cm",
    tags: "",
    price: 5e3
  });
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [master, setMaster] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    if (!user || !preview) {
      toast.error("Upload a preview MP3 to continue");
      return;
    }
    setBusy(true);
    try {
      const previewPath = `${user.id}/${crypto.randomUUID()}-${preview.name}`;
      const {
        error: pe
      } = await supabase.storage.from("previews").upload(previewPath, preview, {
        contentType: preview.type
      });
      if (pe) throw pe;
      const previewUrl = supabase.storage.from("previews").getPublicUrl(previewPath).data.publicUrl;
      let coverUrl = null;
      if (cover) {
        const cp = `${user.id}/${crypto.randomUUID()}-${cover.name}`;
        const {
          error: ce
        } = await supabase.storage.from("covers").upload(cp, cover, {
          contentType: cover.type
        });
        if (ce) throw ce;
        coverUrl = supabase.storage.from("covers").getPublicUrl(cp).data.publicUrl;
      }
      let masterPath = null;
      let masterFormat = null;
      if (master) {
        const mp = `${user.id}/${crypto.randomUUID()}-${master.name}`;
        const {
          error: me
        } = await supabase.storage.from("masters").upload(mp, master, {
          contentType: master.type
        });
        if (me) throw me;
        masterPath = mp;
        masterFormat = master.name.toLowerCase().endsWith(".wav") ? "wav" : "mp3";
      }
      const {
        error
      } = await supabase.from("beats").insert({
        producer_id: user.id,
        title: form.title,
        description: form.description || null,
        genre: form.genre,
        bpm: form.bpm,
        musical_key: form.musical_key,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        cover_url: coverUrl,
        preview_url: previewUrl,
        master_path: masterPath,
        master_format: masterFormat,
        price_cents: Math.round(form.price * 100),
        currency: "ngn"
      });
      if (error) throw error;
      toast.success("Beat uploaded");
      setOpen(false);
      setForm((f) => ({
        ...f,
        title: "",
        description: "",
        tags: ""
      }));
      setPreview(null);
      setCover(null);
      setMaster(null);
      onCreated();
    } catch (err) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "bg-gradient-vault text-primary-foreground shadow-vault", children: [
      /* @__PURE__ */ jsx(Plus, { className: "mr-1 h-4 w-4" }),
      "Upload beat"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto sm:max-w-2xl", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-display text-2xl", children: "Upload a beat" }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsx(Field, { label: "Title", children: /* @__PURE__ */ jsx(Input, { required: true, value: form.title, onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Description (optional)", children: /* @__PURE__ */ jsx(Textarea, { rows: 3, value: form.description, onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsx(Field, { label: "Genre", children: /* @__PURE__ */ jsxs(Select, { value: form.genre, onValueChange: (v) => setForm({
            ...form,
            genre: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: GENRES.map((g) => /* @__PURE__ */ jsx(SelectItem, { value: g, children: g }, g)) })
          ] }) }),
          /* @__PURE__ */ jsx(Field, { label: "BPM", children: /* @__PURE__ */ jsx(Input, { type: "number", min: 40, max: 300, value: form.bpm, onChange: (e) => setForm({
            ...form,
            bpm: +e.target.value
          }) }) }),
          /* @__PURE__ */ jsx(Field, { label: "Key", children: /* @__PURE__ */ jsxs(Select, { value: form.musical_key, onValueChange: (v) => setForm({
            ...form,
            musical_key: v
          }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { className: "max-h-72", children: KEYS.map((k) => /* @__PURE__ */ jsx(SelectItem, { value: k, children: k }, k)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "Tags (comma-separated)", children: /* @__PURE__ */ jsx(Input, { value: form.tags, onChange: (e) => setForm({
          ...form,
          tags: e.target.value
        }), placeholder: "dark, melodic, 808" }) }),
        /* @__PURE__ */ jsx(Field, { label: "Price (₦)", children: /* @__PURE__ */ jsx(Input, { type: "number", min: 0, step: 100, value: form.price, onChange: (e) => setForm({
          ...form,
          price: +e.target.value
        }) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Preview MP3 (required)", children: /* @__PURE__ */ jsx(Input, { type: "file", accept: "audio/mpeg,audio/mp3", required: true, onChange: (e) => setPreview(e.target.files?.[0] ?? null) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Cover art (optional)", children: /* @__PURE__ */ jsx(Input, { type: "file", accept: "image/*", onChange: (e) => setCover(e.target.files?.[0] ?? null) }) }),
        /* @__PURE__ */ jsx(Field, { label: "Master WAV/MP3 (optional)", children: /* @__PURE__ */ jsx(Input, { type: "file", accept: "audio/wav,audio/mpeg,audio/mp3", onChange: (e) => setMaster(e.target.files?.[0] ?? null) }) }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: busy, className: "w-full bg-gradient-vault text-primary-foreground", children: busy ? "Uploading…" : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Upload, { className: "mr-2 h-4 w-4" }),
          " Publish beat"
        ] }) })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsx(Label, { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
export {
  ProducerDashboard as component
};
