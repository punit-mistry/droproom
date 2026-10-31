"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { getProduct, type Size } from "@/lib/products";

export interface CartLine { slug: string; size: Size; qty: number }
type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "setQty"; slug: string; size: Size; qty: number }
  | { type: "remove"; slug: string; size: Size }
  | { type: "clear" };

const KEY = "droproom.cart.v1";
const MAX_QTY = 10;

function reducer(state: CartLine[], a: Action): CartLine[] {
  switch (a.type) {
    case "hydrate": return a.lines;
    case "add": {
      const i = state.findIndex((l) => l.slug === a.line.slug && l.size === a.line.size);
      if (i === -1) return [...state, { ...a.line, qty: Math.min(a.line.qty, MAX_QTY) }];
      return state.map((l, j) => (j === i ? { ...l, qty: Math.min(l.qty + a.line.qty, MAX_QTY) } : l));
    }
    case "setQty":
      return a.qty <= 0
        ? state.filter((l) => !(l.slug === a.slug && l.size === a.size))
        : state.map((l) => (l.slug === a.slug && l.size === a.size ? { ...l, qty: Math.min(a.qty, MAX_QTY) } : l));
    case "remove": return state.filter((l) => !(l.slug === a.slug && l.size === a.size));
    case "clear": return [];
  }
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  hydrated: boolean;
  setOpen: (o: boolean) => void;
  add: (slug: string, size: Size, qty?: number) => void;
  setQty: (slug: string, size: Size, qty: number) => void;
  remove: (slug: string, size: Size) => void;
  clear: () => void;
}
const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        dispatch({ type: "hydrate", lines: parsed.filter((l) => getProduct(l.slug) && l.qty > 0) });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mark localStorage hydration complete
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, hydrated]);

  const add = useCallback((slug: string, size: Size, qty = 1) => {
    dispatch({ type: "add", line: { slug, size, qty } });
    setOpen(true);
  }, []);
  const setQty = useCallback((slug: string, size: Size, qty: number) => dispatch({ type: "setQty", slug, size, qty }), []);
  const remove = useCallback((slug: string, size: Size) => dispatch({ type: "remove", slug, size }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
    return { lines, count, subtotal, open, hydrated, setOpen, add, setQty, remove, clear };
  }, [lines, open, hydrated, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
