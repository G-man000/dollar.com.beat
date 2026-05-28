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
import { User, ShieldAlert } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) nav({ to: redirect ?? "/", replace: true } as any);
  }, [user]);

  // --- NATIVE GOOGLE OAUTH HANDLER ---
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Dynamic landing routing support back to their destination intent
          redirectTo: redirect
            ? `${window.location.origin}${redirect}`
            : window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Google sign-in initialization failed");
    } finally {
      setLoading(false);
    }
  };

  // --- EMAIL-FREE ANONYMOUS GUEST HANDLER ---
  const handleAnonymousSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      toast.success("Logged in securely as Guest!");
    } catch (error: any) {
      toast.error(error.message || "Guest authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-vault">

        <div className="space-y-1">
          <h1 className="font-display text-3xl font-bold text-foreground">Welcome to dollar.com.beat</h1>
          <p className="text-sm font-medium text-muted-foreground">Sign in to buy beats and access your library.</p>
        </div>

        <Tabs defaultValue="login" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-secondary p-1 rounded-lg">
            <TabsTrigger value="login" className="data-[state=active]:bg-card text-foreground font-bold text-xs py-2">Sign in</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-card text-foreground font-bold text-xs py-2">Create account</TabsTrigger>
          </TabsList>
          <TabsContent value="login"><LoginForm /></TabsContent>
          <TabsContent value="signup"><SignupForm /></TabsContent>
        </Tabs>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground font-mono font-bold uppercase">
          <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
        </div>

        {/* Action Provider Buttons Group */}
        <div className="space-y-3">
          {/* Active Google Identity Integration */}
          <Button
            variant="outline"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full border-border bg-secondary text-foreground hover:bg-muted font-bold flex items-center justify-center gap-2 h-11 shadow-sm"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>

          {/* New Email-Free Guest Authentication Mode */}
          <Button
            variant="ghost"
            type="button"
            disabled={loading}
            onClick={handleAnonymousSignIn}
            className="w-full text-muted-foreground hover:text-foreground hover:bg-secondary font-semibold flex items-center justify-center gap-2 h-11 border border-dashed border-border rounded-lg transition-all"
          >
            <User className="h-4 w-4 shrink-0 text-primary" />
            Enter as Anonymous Guest
          </Button>
        </div>

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
      <Field label="Email"><Input type="email" required value={email} className="bg-secondary text-foreground border-border h-11" onChange={(e) => setEmail(e.target.value)} /></Field>
      <Field label="Password"><Input type="password" required value={password} className="bg-secondary text-foreground border-border h-11" onChange={(e) => setPassword(e.target.value)} /></Field>
      <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-vault text-primary-foreground font-bold shadow-md hover:opacity-95 transition-all">
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
        else toast.success("Account created! Confirm the verification email to activate your vault link.");
      }}
    >
      <Field label="Display name"><Input required value={name} className="bg-secondary text-foreground border-border h-11" onChange={(e) => setName(e.target.value)} /></Field>
      <Field label="Email"><Input type="email" required value={email} className="bg-secondary text-foreground border-border h-11" onChange={(e) => setEmail(e.target.value)} /></Field>
      <Field label="Password"><Input type="password" required minLength={8} value={password} className="bg-secondary text-foreground border-border h-11" onChange={(e) => setPassword(e.target.value)} /></Field>
      <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-vault text-primary-foreground font-bold shadow-md hover:opacity-95 transition-all">
        {loading ? "Creating…" : "Create account"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-foreground font-bold">{label}</Label>
      {children}
    </div>
  );
}