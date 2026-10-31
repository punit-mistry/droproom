"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const ROWS = [
  ["S", "112", "68", "58"],
  ["M", "116", "70", "60"],
  ["L", "120", "72", "62"],
  ["XL", "124", "74", "64"],
  ["XXL", "128", "76", "66"],
];

export function SizeGuide() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="label min-h-11 underline underline-offset-4 hover:text-volt"
      >
        SIZE GUIDE
      </button>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 md:items-center" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sg-title"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full overflow-y-auto border border-white/20 bg-ink p-6 md:max-w-xl md:p-10"
          >
            <div className="flex items-start justify-between">
              <h2 id="sg-title" className="display text-5xl">
                Size guide
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close size guide"
                className="flex h-11 w-11 items-center justify-center border border-white/30 hover:border-volt"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <p className="label mt-3 text-muted">Garment measurements, cm</p>
            <table className="mt-6 w-full text-left">
              <caption className="sr-only">Garment measurements in centimetres by size</caption>
              <thead>
                <tr className="label border-b border-white/30 text-muted">
                  <th scope="col" className="py-3 font-normal">Size</th>
                  <th scope="col" className="py-3 font-normal">Chest</th>
                  <th scope="col" className="py-3 font-normal">Length</th>
                  <th scope="col" className="py-3 font-normal">Sleeve</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]} className="border-b border-white/15">
                    <th scope="row" className="display py-3 text-2xl font-normal">
                      {r[0]}
                    </th>
                    {r.slice(1).map((c, i) => (
                      <td key={i} className="py-3 tabular-nums">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-xs text-muted">
              Measured flat, chest is the full circumference. Bottoms and caps vary — see each product&apos;s fit note. Allow ±2 cm.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
