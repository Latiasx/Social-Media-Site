import React from "react";

type ToastState = { message: string; kind?: "info" | "error" | "success" } | null;

const ToastContext = React.createContext<{
  toast: ToastState;
  show: (message: string, kind?: ToastState["kind"]) => void;
  clear: () => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<ToastState>(null);

  const clear = () => setToast(null);
  const show = (message: string, kind: ToastState["kind"] = "info") => {
    setToast({ message, kind });
    window.setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ toast, show, clear }}>
      {children}
      {toast ? <ToastView toast={toast} /> : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastView({ toast }: { toast: NonNullable<ToastState> }) {
  const tone =
    toast.kind === "error"
      ? "border-rose-500/30 bg-rose-500/10 text-rose-100"
      : toast.kind === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : "border-indigo-500/30 bg-indigo-500/10 text-indigo-100";

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,480px)] -translate-x-1/2">
      <div className={`glass rounded-2xl px-4 py-3 shadow-soft border ${tone}`}>
        <div className="text-sm">{toast.message}</div>
      </div>
    </div>
  );
}
