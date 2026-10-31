"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, PRODUCTS, byCategory, type Category } from "@/lib/products";

interface Props { value?: Category; onChange: (c?: Category) => void }

const ITEMS: { key: Category | "ALL"; label: string; count: number }[] = [
  { key: "ALL", label: "ALL", count: PRODUCTS.length },
  ...CATEGORIES.map((c) => ({ key: c, label: c, count: byCategory(c).length })),
];

/** Horizontal category rail: hairline borders, mono caps, sliding lime active state. Scrolls on mobile. */
export function CategoryNav({ value, onChange }: Props) {
  const reduce = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const active = value ?? "ALL";

  useEffect(() => {
    const el = rail.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  return (
    <nav aria-label="Product categories" className="-mx-4 md:mx-0">
      <div
        ref={rail}
        className="flex overflow-x-auto border-y border-white/15 px-4 [scrollbar-width:none] md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {ITEMS.map((it, i) => {
          const on = active === it.key;
          return (
            <button
              key={it.key}
              aria-pressed={on}
              onClick={() => onChange(it.key === "ALL" ? undefined : (it.key as Category))}
              className={`label relative min-h-12 shrink-0 whitespace-nowrap px-4 tracking-[0.12em] transition-colors md:flex-1 md:px-3 ${
                i > 0 ? "border-l border-white/15" : "md:border-l md:border-l-white/15"
              } ${on ? "text-[#0c0f16]" : "text-muted hover:text-bone"}`}
            >
              {on && (
                <motion.span
                  layoutId="cat-active"
                  className="absolute inset-0 bg-volt"
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative">
                {it.label} <span className={on ? "opacity-70" : "opacity-60"}>({it.count})</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
