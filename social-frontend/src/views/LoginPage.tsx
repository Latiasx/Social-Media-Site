import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { api, getErrorMessage } from "../lib/api";
import { setToken } from "../lib/auth";
import { useToast } from "../ui/Toast";

// fastapi-users JWT login expects application/x-www-form-urlencoded
export function LoginPage() {
  const nav = useNavigate();
  const loc = useLocation() as any;
  const { show } = useToast();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const from = loc?.state?.from ?? "/feed";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const body = new URLSearchParams();
      body.set("username", email); // fastapi-users uses "username" field for email
      body.set("password", password);

      const res = await api.post("/auth/jwt/login", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      // response typically: { access_token: "...", token_type: "bearer" }
      const token = res.data?.access_token;
      if (!token) throw new Error("No access_token received");
      setToken(token);
      show("Logged in!", "success");
      nav(from, { replace: true });
    } catch (err: any) {
      show(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2">
      <div className="glass rounded-3xl p-6 shadow-soft">
        <div className="mb-2 text-sm text-indigo-300">Welcome back</div>
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Sign in to view your feed and upload posts.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" loading={loading} className="mt-1">
            Login
          </Button>
        </form>

        <div className="mt-4 text-sm text-zinc-400">
          New here?{" "}
          <Link className="text-indigo-300 hover:text-indigo-200" to="/register">
            Create an account
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 via-zinc-950 to-rose-500/10 p-6 shadow-soft">
        <div className="text-sm text-zinc-300">What you get</div>
        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
          <li className="glass rounded-2xl p-4">✨ Clean, responsive feed UI</li>
          <li className="glass rounded-2xl p-4">🖼️ Upload images/videos with captions</li>
          <li className="glass rounded-2xl p-4">🧠 Cached feed + instant refresh</li>
          <li className="glass rounded-2xl p-4">🧯 Proper error + loading states</li>
        </ul>
      </div>
    </div>
  );
}
