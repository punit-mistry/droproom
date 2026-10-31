"use client";
import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

export function Accordion({ items }: { items: { title: string; body: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-white/15">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title} className="border-b border-white/15">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`acc-${i}`}
                id={`acc-h-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="label flex min-h-14 w-full items-center justify-between text-left"
              >
                {it.title}
                <Plus size={16} aria-hidden className={`transition-transform motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`} />
              </button>
            </h3>
            <div id={`acc-${i}`} role="region" aria-labelledby={`acc-h-${i}`} hidden={!isOpen} className="pb-5 text-sm leading-relaxed text-bone/80">
              {it.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}
