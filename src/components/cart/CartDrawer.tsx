"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/cart";
import { getProduct, formatPrice } from "@/lib/products";
import { ProductImage } from "@/components/ui/ProductImage";
import { EASE } from "@/components/ui/Reveal";
import { CheckoutButton } from "@/components/cart/CheckoutButton";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, count, setQty, remove } = useCart();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const lastFocus = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 50);
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input,[tabindex]:not([tabindex='-1'])");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", k);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", k);
      lastFocus?.focus?.();
    };
  }, [open, setOpen]);

  const iconBtn = "inline-flex h-11 w-11 items-center justify-center hover:text-volt transition-colors";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="absolute right-0 top-0 h-full w-full max-w-[440px] bg-ink border-l border-white/15 flex flex-col"
            initial={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE }}
          >
            <div className="flex items-center justify-between pl-5 pr-2 h-14 border-b border-white/15 shrink-0">
              <h2 className="display text-2xl">
                Bag <span className="text-volt">({count})</span>
              </h2>
              <button data-autofocus className={iconBtn} onClick={() => setOpen(false)} aria-label="Close bag">
                <X size={20} aria-hidden />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center px-5">
                <p className="label text-muted">Bag / 00</p>
                <p className="display mt-3 text-7xl">Empty.</p>
                <p className="mt-4 text-sm text-bone/70 max-w-xs">Nothing here yet. Drop 001 is live and limited.</p>
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-flex min-h-12 items-center justify-center bg-volt text-ink label hover:bg-bone transition-colors"
                >
                  Shop the drop
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5">
                  {lines.map((l) => {
                    const p = getProduct(l.slug);
                    if (!p) return null;
                    return (
                      <li key={l.slug + l.size} className="flex gap-4 py-5 border-b border-white/15">
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={() => setOpen(false)}
                          className="relative block w-24 shrink-0 aspect-[4/5] overflow-hidden"
                        >
                          <ProductImage product={p} sizes="96px" />
                        </Link>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex justify-between gap-2">
                            <Link
                              href={`/product/${p.slug}`}
                              onClick={() => setOpen(false)}
                              className="display text-xl leading-none hover:text-volt"
                            >
                              {p.name}
                            </Link>
                            <button
                              className="label text-muted hover:text-volt min-h-11 -mt-3 px-1 shrink-0"
                              onClick={() => remove(l.slug, l.size)}
                              aria-label={`Remove ${p.name}, size ${l.size}`}
                            >
                              Remove
                            </button>
                          </div>
                          <p className="label text-muted mt-1">
                            Size {l.size} / {p.colorway}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-white/15">
                              <button className={iconBtn} onClick={() => setQty(l.slug, l.size, l.qty - 1)} aria-label="Decrease quantity">
                                <Minus size={14} aria-hidden />
                              </button>
                              <span className="label w-6 text-center" aria-live="polite">
                                {l.qty}
                              </span>
                              <button className={iconBtn} onClick={() => setQty(l.slug, l.size, l.qty + 1)} aria-label="Increase quantity">
                                <Plus size={14} aria-hidden />
                              </button>
                            </div>
                            <span className="label">{formatPrice(p.price * l.qty)}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-white/15 px-5 py-5 shrink-0">
                  <div className="flex items-baseline justify-between">
                    <span className="label text-muted">Subtotal</span>
                    <span className="display text-3xl">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="label text-muted mt-1">Shipping and taxes at checkout</p>
                  <CheckoutButton />
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
