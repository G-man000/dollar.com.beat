import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Music2, Plus, Upload, DollarSign, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { GENRES, KEYS } from "@/lib/beats";
import { fmtPrice } from "@/lib/format";

export const Route = createFileRoute("/dashboard/producer")({
  head: () => ({
    meta: [
      { title: "Producer Dashboard — dollar.com.beat" },
      { name: "description", content: "Upload beats, set prices and manage your sales." },
    ],
  }),
  component: ProducerDashboard,
});

function ProducerDashboard() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const qc = useQueryClient();

  const beats = useQuery({
    enabled: !!user,
    queryKey: ["my-beats", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("beats")
        .select("*")
        .eq("producer_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const sales = useQuery({
    enabled: !!user,
    queryKey: ["sales", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("purchases")
        .select("amount_cents, status, paid_at, beats(title)")
        .eq("producer_id", user!.id)
        .eq("status", "paid")
        .order("paid_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (loading) return null;
  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Sign in to access your producer dashboard</h1>
        <Button onClick={() => nav({ to: "/auth", search: { redirect: "/dashboard/producer" } as any })}
          className="mt-6 bg-gradient-vault text-primary-foreground">Sign in</Button>
      </div>
    );
  }

  const totalEarned = (sales.data ?? []).reduce((s, p: any) => s + p.amount_cents, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-vault">Producer</p>
          <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Your studio</h1>
        </div>
        <UploadDialog onCreated={() => qc.invalidateQueries({ queryKey: ["my-beats", user.id] })} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat icon={Music2} label="Beats published" value={String(beats.data?.length ?? 0)} />
        <Stat icon={TrendingUp} label="Total sales" value={String(sales.data?.length ?? 0)} />
        <Stat icon={DollarSign} label="Total earned" value={fmtPrice(totalEarned)} />
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold">Your beats</h2>
      <div className="mt-4 space-y-3">
        {beats.isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)
        ) : beats.data?.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center text-sm text-muted-foreground">
            No beats yet. Upload your first one above.
          </p>
        ) : (
          beats.data?.map((b: any) => (
            <div key={b.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-3">
              <div className="h-14 w-14 overflow-hidden rounded-lg bg-muted">
                {b.cover_url && <img src={b.cover_url} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <Link to="/beat/$beatId" params={{ beatId: b.id }} className="block truncate font-medium">{b.title}</Link>
                <p className="text-xs text-muted-foreground">{b.genre} · {b.bpm} BPM · {b.musical_key ?? "—"}</p>
              </div>
              <div className="hidden sm:block">
                <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-mono">
                  {fmtPrice(b.price_cents ?? 0, b.currency ?? "ngn")}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={async () => {
                await supabase.from("beats").delete().eq("id", b.id);
                qc.invalidateQueries({ queryKey: ["my-beats", user.id] });
                toast.success("Beat deleted");
              }}>Delete</Button>
            </div>
          ))
        )}
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold">Recent sales</h2>
      <div className="mt-4 rounded-2xl border border-border bg-card/40 p-4">
        {sales.isLoading ? <Skeleton className="h-24" /> : sales.data?.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sales yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {sales.data?.map((s: any, i) => (
              <li key={i} className="flex justify-between py-3 text-sm">
                <span>{s.beats?.title ?? "Beat"}</span>
                <span className="font-mono text-acid">{fmtPrice(s.amount_cents)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-vault/15 text-vault">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-display text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function UploadDialog({ onCreated }: { onCreated: () => void }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    genre: GENRES[0],
    bpm: 140,
    musical_key: "Cm",
    tags: "",
    price: 5000,
  });
  const [cover, setCover] = useState<File | null>(null);
  const [preview, setPreview] = useState<File | null>(null);
  const [master, setMaster] = useState<File | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !preview) {
      toast.error("Upload a preview MP3 to continue");
      return;
    }
    setBusy(true);
    try {
      // Upload preview
      const previewPath = `${user.id}/${crypto.randomUUID()}-${preview.name}`;
      const { error: pe } = await supabase.storage.from("previews").upload(previewPath, preview, {
        contentType: preview.type,
      });
      if (pe) throw pe;
      const previewUrl = supabase.storage.from("previews").getPublicUrl(previewPath).data.publicUrl;

      // Optional cover
      let coverUrl: string | null = null;
      if (cover) {
        const cp = `${user.id}/${crypto.randomUUID()}-${cover.name}`;
        const { error: ce } = await supabase.storage.from("covers").upload(cp, cover, { contentType: cover.type });
        if (ce) throw ce;
        coverUrl = supabase.storage.from("covers").getPublicUrl(cp).data.publicUrl;
      }

      // Optional master
      let masterPath: string | null = null;
      let masterFormat: string | null = null;
      if (master) {
        const mp = `${user.id}/${crypto.randomUUID()}-${master.name}`;
        const { error: me } = await supabase.storage.from("masters").upload(mp, master, { contentType: master.type });
        if (me) throw me;
        masterPath = mp;
        masterFormat = master.name.toLowerCase().endsWith(".wav") ? "wav" : "mp3";
      }

      const { error } = await supabase.from("beats").insert({
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
        currency: "ngn",
      });
      if (error) throw error;

      toast.success("Beat uploaded");
      setOpen(false);
      setForm((f) => ({ ...f, title: "", description: "", tags: "" }));
      setPreview(null); setCover(null); setMaster(null);
      onCreated();
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-vault text-primary-foreground shadow-vault"><Plus className="mr-1 h-4 w-4" />Upload beat</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader><DialogTitle className="font-display text-2xl">Upload a beat</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Title">
            <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Description (optional)">
            <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Genre">
              <Select value={form.genre} onValueChange={(v) => setForm({ ...form, genre: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{GENRES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="BPM">
              <Input type="number" min={40} max={300} value={form.bpm}
                onChange={(e) => setForm({ ...form, bpm: +e.target.value })} />
            </Field>
            <Field label="Key">
              <Select value={form.musical_key} onValueChange={(v) => setForm({ ...form, musical_key: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">{KEYS.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
          </div>
          <Field label="Tags (comma-separated)">
            <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="dark, melodic, 808" />
          </Field>

          <Field label="Price (₦)">
            <Input type="number" min={0} step={100} value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} />
          </Field>

          <Field label="Preview MP3 (required)">
            <Input type="file" accept="audio/mpeg,audio/mp3" required onChange={(e) => setPreview(e.target.files?.[0] ?? null)} />
          </Field>
          <Field label="Cover art (optional)">
            <Input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] ?? null)} />
          </Field>
          <Field label="Master WAV/MP3 (optional)">
            <Input type="file" accept="audio/wav,audio/mpeg,audio/mp3" onChange={(e) => setMaster(e.target.files?.[0] ?? null)} />
          </Field>

          <Button type="submit" disabled={busy} className="w-full bg-gradient-vault text-primary-foreground">
            {busy ? "Uploading…" : <><Upload className="mr-2 h-4 w-4" /> Publish beat</>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
