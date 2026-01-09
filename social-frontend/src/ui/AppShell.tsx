import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { ToastProvider } from "./Toast";
import { clearToken, isAuthed } from "../lib/auth";
import { Button } from "./Button";
import { LogOut, Sparkles } from "lucide-react";

export function AppShell() {
  return (
    <ToastProvider>
      <div className="min-h-dvh">
        <TopBar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6">
          <Outlet />
        </main>
      </div>
    </ToastProvider>
  );
}

function TopBar() {
  const nav = useNavigate();
  const loc = useLocation();
  const authed = isAuthed();

  const onLogout = () => {
    clearToken();
    nav("/login", { replace: true, state: { from: loc.pathname } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link to="/feed" className="inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-indigo-500/15 border border-indigo-500/25">
            <Sparkles className="h-5 w-5 text-indigo-300" />
          </span>
          <div>
            <div className="text-sm font-semibold leading-4">Social</div>
            <div className="text-xs text-zinc-400">mini feed</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {!authed ? (
            <>
              <Link to="/login">
                <Button variant="secondary" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Sign up</Button>
              </Link>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
