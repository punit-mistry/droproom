"use client";
import type { Size } from "@/lib/products";

interface Props {
  sizes: Size[];
  soldOut?: Size[];
  value: Size | null;
  onChange: (s: Size) => void;
}

export function SizePicker({ sizes, soldOut = [], value, onChange }: Props) {
  return (
    <div role="group" aria-label="Size" className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const out = soldOut.includes(s);
        const on = value === s;
        return (
          <button
            key={s}
            type="button"
            disabled={out}
            aria-pressed={on}
            aria-label={out ? `${s}, sold out` : s}
            onClick={() => onChange(s)}
            className={`label min-h-12 min-w-14 border px-4 transition-colors ${
              on ? "border-volt bg-volt text-ink" : "border-white/30 hover:border-bone"
            } ${out ? "cursor-not-allowed text-muted line-through opacity-50 hover:border-white/30" : ""}`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
