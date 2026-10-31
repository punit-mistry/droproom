"use client";
import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    ["DAYS", Math.floor(s / 86400)],
    ["HRS", Math.floor((s % 86400) / 3600)],
    ["MIN", Math.floor((s % 3600) / 60)],
    ["SEC", s % 60],
  ] as const;
}

/** Renders placeholders on the server and first client paint, then ticks — no hydration mismatch. */
export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const end = new Date(target).getTime();
  if (Number.isNaN(end)) return null;
  const live = now !== null;
  const done = live && now >= end;
  const vals = live ? parts(end - now) : parts(0);
  return (
    <div role="timer" aria-label={done ? "Drop is live" : "Time until release"} className="flex gap-4 md:gap-8">
      {done ? (
        <span className="display text-5xl">LIVE NOW</span>
      ) : (
        vals.map(([l, v]) => (
          <div key={l}>
            <div className="display text-[clamp(2.5rem,9vw,6rem)] tabular-nums">{live ? String(v).padStart(2, "0") : "--"}</div>
            <div className="label opacity-70">{l}</div>
          </div>
        ))
      )}
    </div>
  );
}
