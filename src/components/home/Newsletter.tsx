"use client";
import { useId, useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!v) return setError("Enter your email address.");
    if (!EMAIL_RE.test(v)) return setError("That doesn't look like a valid email.");
    setError("");
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700)); // simulated — no backend
    setBusy(false);
    setDone(true);
  }

  return (
    <section aria-labelledby={`${id}-h`} className="border-t border-white/15 px-4 py-20 md:px-8 md:py-32">
      <h2 id={`${id}-h`} className="display text-[clamp(2.75rem,10vw,9rem)]">
        Get in before
        <br />
        the world does.
      </h2>
      <div className="mt-10 max-w-2xl md:mt-16">
        {done ? (
          <div role="status">
            <p className="display text-3xl text-volt md:text-5xl">You&apos;re on the list.</p>
            <p className="label mt-3 text-bone/70">Demo only — nothing was saved or sent.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <label htmlFor={`${id}-e`} className="label text-muted">
              Email address
            </label>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <input
                id={`${id}-e`}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={busy}
                aria-invalid={!!error}
                aria-describedby={`${id}-err`}
                placeholder="you@domain.com"
                className="min-h-12 w-full flex-1 border-0 border-b border-bone/60 bg-transparent py-2 text-xl text-bone placeholder:text-muted focus:border-volt focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={busy}
                className="label min-h-12 bg-volt px-8 text-ink transition-colors hover:bg-bone disabled:cursor-wait disabled:opacity-60"
              >
                {busy ? "SUBSCRIBING…" : "SUBSCRIBE"}
              </button>
            </div>
            <p id={`${id}-err`} aria-live="polite" className="label mt-3 min-h-4 text-[#ff6b5e]">
              {error}
            </p>
            <p className="mt-4 text-xs text-muted">Demo: emails are not stored or sent.</p>
          </form>
        )}
      </div>
    </section>
  );
}
