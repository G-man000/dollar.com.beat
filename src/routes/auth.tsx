import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({ redirect: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Sign in — dollar.com.beat" },
      { name: "description", content: "Sign in or create your dollar.com.beat account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const { redirect } = Route.useSearch();

  useEffect(() => {
    if (user) nav({ to: redirect ?? "/", replace: true } as any);
  }, [user]);

  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl border border-border bg-card/80 p-8 shadow-vault backdrop-blur">
        <h1 className="font-display text-3xl font-bold text-foreground">Welcome to dollar.com.beat</h1>
        <p className="mt-1 text-sm text-foreground/80">Sign in to buy beats and access your library.</p>

        <Tabs defaultValue="login" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="text-foreground/90 font-medium">Sign in</TabsTrigger>
            <TabsTrigger value="signup" className="text-foreground/90 font-medium">Create account</TabsTrigger>
          </TabsList>
          <TabsContent value="login"><LoginForm /></TabsContent>
          <TabsContent value="signup"><SignupForm /></TabsContent>
        </Tabs>

        <div className="my-6 flex items-center gap-3 text-xs text-foreground/70 font-medium">
          <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" className="w-full text-foreground hover:bg-accent" onClick={async () => {
          const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
          if (r.error) toast.error(r.error.message ?? "Google sign-in failed");
        }}>
          Continue with Google
        </Button>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="mt-4 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) toast.error(error.message);
      }}
    >
      <Field label="Email"><Input type="email" required value={email} className="text-foreground" onChange={(e) => setEmail(e.target.value)} /></Field>
      <Field label="Password"><Input type="password" required value={password} className="text-foreground" onChange={(e) => setPassword(e.target.value)} /></Field>
      <Button type="submit" disabled={loading} className="w-full bg-gradient-vault text-primary-foreground font-semibold">
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="mt-4 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name },
          },
        });
        setLoading(false);
        if (error) toast.error(error.message);
        else toast.success("Account created. Check your email to confirm.");
      }}
    >
      <Field label="Display name"><Input required value={name} className="text-foreground" onChange={(e) => setName(e.target.value)} /></Field>
      <Field label="Email"><Input type="email" required value={email} className="text-foreground" onChange={(e) => setEmail(e.target.value)} /></Field>
      <Field label="Password"><Input type="password" required minLength={8} value={password} className="text-foreground" onChange={(e) => setPassword(e.target.value)} /></Field>
      <Button type="submit" disabled={loading} className="w-full bg-gradient-vault text-primary-foreground font-semibold">
        {loading ? "Creating…" : "Create account"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-foreground/90 font-semibold">{label}</Label>
      {children}
    </div>
  );
}