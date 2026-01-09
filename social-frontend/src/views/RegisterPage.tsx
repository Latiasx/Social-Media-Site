import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { api, getErrorMessage } from "../lib/api";
import { useToast } from "../ui/Toast";

export function RegisterPage() {
  const nav = useNavigate();
  const { show } = useToast();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // fastapi-users register expects JSON body at POST /auth/register
      await api.post("/auth/register", { email, password });
      show("Account created! Please log in.", "success");
      nav("/login", { replace: true });
    } catch (err: any) {
      show(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="glass rounded-3xl p-6 shadow-soft">
        <div className="mb-2 text-sm text-indigo-300">Join the party</div>
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Register and then log in to access your feed.
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
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            hint="Minimum requirements depend on your backend config."
          />
          <Button type="submit" loading={loading} className="mt-1">
            Sign up
          </Button>
        </form>

        <div className="mt-4 text-sm text-zinc-400">
          Already have an account?{" "}
          <Link className="text-indigo-300 hover:text-indigo-200" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
