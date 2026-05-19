import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { c as cn, s as supabase, u as useAuth, a as Route, B as Button } from "./router-CR-vLeYt.js";
import { I as Input } from "./input-CBrFH4eS.js";
import { L as Label } from "./label-D9GFEArW.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import "@tanstack/react-query";
import "@supabase/supabase-js";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "zustand";
import "zod";
import "@radix-ui/react-label";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
function AuthPage() {
  const {
    user
  } = useAuth();
  const nav = useNavigate();
  const {
    redirect
  } = Route.useSearch();
  useEffect(() => {
    if (user) nav({
      to: redirect ?? "/",
      replace: true
    });
  }, [user]);
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-10", children: /* @__PURE__ */ jsxs("div", { className: "w-full rounded-2xl border border-border bg-card/60 p-8 shadow-vault backdrop-blur", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-bold", children: "Welcome to dollar.com.beat" }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Sign in to buy beats and access your library." }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "login", className: "mt-6", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "login", children: "Sign in" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "signup", children: "Create account" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "login", children: /* @__PURE__ */ jsx(LoginForm, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsx(SignupForm, {}) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "my-6 flex items-center gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border" }),
      " OR ",
      /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border" })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", onClick: async () => {
      const r = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin
      });
      if (r.error) toast.error(r.error.message ?? "Google sign-in failed");
    }, children: "Continue with Google" })
  ] }) });
}
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return /* @__PURE__ */ jsxs("form", { className: "mt-4 space-y-4", onSubmit: async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    if (error) toast.error(error.message);
  }, children: [
    /* @__PURE__ */ jsx(Field, { label: "Email", children: /* @__PURE__ */ jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Password", children: /* @__PURE__ */ jsx(Input, { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value) }) }),
    /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-gradient-vault text-primary-foreground", children: loading ? "Signing in…" : "Sign in" })
  ] });
}
function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  return /* @__PURE__ */ jsxs("form", { className: "mt-4 space-y-4", onSubmit: async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          display_name: name
        }
      }
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Account created. Check your email to confirm.");
  }, children: [
    /* @__PURE__ */ jsx(Field, { label: "Display name", children: /* @__PURE__ */ jsx(Input, { required: true, value: name, onChange: (e) => setName(e.target.value) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Email", children: /* @__PURE__ */ jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) }) }),
    /* @__PURE__ */ jsx(Field, { label: "Password", children: /* @__PURE__ */ jsx(Input, { type: "password", required: true, minLength: 8, value: password, onChange: (e) => setPassword(e.target.value) }) }),
    /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-gradient-vault text-primary-foreground", children: loading ? "Creating…" : "Create account" })
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
  AuthPage as component
};
