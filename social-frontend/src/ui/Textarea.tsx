import React from "react";
import { cn } from "./cn";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Textarea({ label, hint, error, className, ...props }: Props) {
  return (
    <label className="block">
      {label ? <div className="mb-1 text-sm text-zinc-200">{label}</div> : null}
      <textarea
        className={cn(
          "min-h-[110px] w-full rounded-xl bg-zinc-900/70 border border-white/10 px-3 py-3 text-zinc-50 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/40",
          className
        )}
        {...props}
      />
      {error ? (
        <div className="mt-1 text-sm text-rose-400">{error}</div>
      ) : hint ? (
        <div className="mt-1 text-sm text-zinc-500">{hint}</div>
      ) : null}
    </label>
  );
}
