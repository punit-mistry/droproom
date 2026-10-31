"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/context/cart";
import { formatPrice, type Product, type Size } from "@/lib/products";
import { ProductImage } from "@/components/ui/ProductImage";
import { EASE } from "@/components/ui/Reveal";

interface Props { product: Product; open: boolean; onClose: () => void }

/** Lightweight quick-view dialog. Portalled to <body> so transformed ancestors can't break `fixed`. */
export function QuickView({ product, open, onClose }: Props) {
  const reduce = useReducedMotion();
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [err, setErr] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target only exists on the client
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const addToBag = () => {
    if (!size) return setErr(true);
    add(product.slug, size, 1);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center md:items-center">
          <motion.div
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view — ${product.name}`}
            className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto border border-white/15 bg-ink md:grid-cols-2"
            initial={{ opacity: 0, y: reduce ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 16 }}
            transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE }}
          >
            <div className="aspect-square bg-[var(--surface)]">
              <ProductImage product={product} sizes="(min-width: 768px) 440px, 100vw" />
            </div>
            <div className="flex flex-col p-5 md:p-8">
              <button
                ref={closeBtn}
                onClick={onClose}
                aria-label="Close quick view"
                className="absolute right-2 top-2 grid size-11 place-items-center hover:text-volt"
              >
                <X size={20} />
              </button>
              <p className="label text-muted">{product.category} / {product.index}</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">{product.name}</h2>
              <p className="label mt-2 text-muted">{product.colorway}</p>
              <p className="display mt-5 text-3xl">{formatPrice(product.price)}</p>
              <p className="mt-4 text-sm text-muted">{product.blurb}</p>

              <fieldset className="mt-6">
                <legend className="label text-muted">Size</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const out = product.soldOut?.includes(s);
                    const on = size === s;
                    return (
                      <button
                        key={s}
                        disabled={out}
                        aria-pressed={on}
                        onClick={() => { setSize(s); setErr(false); }}
                        className={`label min-h-11 min-w-11 border px-3 transition-colors disabled:cursor-not-allowed disabled:text-muted disabled:line-through ${
                          on ? "border-volt bg-volt text-ink" : "border-white/15 hover:border-volt"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                {err && <p role="alert" className="label mt-2 text-volt">Select a size</p>}
              </fieldset>

              <div className="mt-auto flex flex-col gap-2 pt-8 sm:flex-row">
                <button onClick={addToBag} className="label min-h-12 flex-1 bg-volt px-6 text-ink transition-colors hover:bg-bone">
                  Add to bag
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="label grid min-h-12 flex-1 place-items-center border border-white/15 px-6 hover:border-volt hover:text-volt"
                >
                  Full details
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
