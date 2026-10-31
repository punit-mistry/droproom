"use client";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { formatPrice, related, type Product, type Size } from "@/lib/products";
import { useCart } from "@/context/cart";
import { Gallery } from "./Gallery";
import { SizePicker } from "./SizePicker";
import { SizeGuide } from "./SizeGuide";
import { Accordion } from "./Accordion";
import { ProductCard } from "./ProductCard";

export function ProductDetail({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(
    p.sizes.length === 1 && !p.soldOut?.includes(p.sizes[0]) ? p.sizes[0] : null,
  );
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");
  const rel = related(p.slug, 4);
  const allOut = p.sizes.every((s) => p.soldOut?.includes(s));

  function onAdd() {
    if (!size) return setMsg("Select a size first.");
    setMsg("");
    add(p.slug, size, qty);
  }

  return (
    <div>
      <nav aria-label="Breadcrumb" className="label px-4 pb-4 pt-24 text-muted md:px-8">
        <ol className="flex flex-wrap gap-2">
          <li><Link href="/" className="hover:text-bone">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/shop" className="hover:text-bone">Shop</Link></li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/shop?category=${encodeURIComponent(p.category)}`} className="hover:text-bone">
              {p.category}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-bone">{p.name}</li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-12">
        <div className="md:col-span-7">
          <Gallery product={p} />
        </div>
        <div className="px-4 py-8 md:col-span-5 md:px-8">
          <div className="md:sticky md:top-24">
            <p className="label text-muted">N°{p.index} — DROP 001</p>
            <h1 className="display mt-3 text-[clamp(2.5rem,6vw,5rem)]">{p.name}</h1>
            <p className="display mt-4 text-3xl text-volt">{formatPrice(p.price)}</p>
            <p className="label mt-4">
              Colorway: <span className="text-muted">{p.colorway}</span>
            </p>
            <p className="mt-4 text-sm text-bone/80">
              {p.blurb} {p.fit}
            </p>

            <div className="mt-8 flex items-center justify-between">
              <span className="label">Size</span>
              <SizeGuide />
            </div>
            <div className="mt-2">
              <SizePicker
                sizes={p.sizes}
                soldOut={p.soldOut}
                value={size}
                onChange={(s) => {
                  setSize(s);
                  setMsg("");
                }}
              />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="label" id="qty-l">Qty</span>
              <div role="group" aria-labelledby="qty-l" className="flex items-center border border-white/30">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={qty <= 1}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center disabled:opacity-30"
                >
                  <Minus size={16} aria-hidden />
                </button>
                <output aria-live="polite" className="w-10 text-center tabular-nums">{qty}</output>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={qty >= 10}
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="flex h-12 w-12 items-center justify-center disabled:opacity-30"
                >
                  <Plus size={16} aria-hidden />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onAdd}
              disabled={allOut}
              className="label mt-6 min-h-14 w-full bg-volt px-6 text-ink transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-muted"
            >
              {allOut ? "SOLD OUT" : "ADD TO BAG"}
            </button>
            <p role="alert" className="label mt-3 min-h-4 text-[#ff6b5e]">{msg}</p>
            <p className="mt-2 text-xs text-muted">Checkout is a demo — no payment processed.</p>

            <div className="mt-8">
              <Accordion
                items={[
                  { title: "DESCRIPTION", body: <p>{p.description}</p> },
                  {
                    title: "MATERIALS & CARE",
                    body: (
                      <>
                        <ul className="list-disc pl-5">
                          {p.materials.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                        <p className="mt-3">Wash cold, inside out. Do not tumble dry. Iron low, never on prints.</p>
                      </>
                    ),
                  },
                  {
                    title: "SHIPPING & RETURNS",
                    body: (
                      <p>
                        DROPROOM is a demo store: nothing is shipped and no orders are fulfilled. In a live store, shipping and return
                        terms would appear here.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="rel-h" className="border-t border-white/15 px-4 py-20 md:px-8">
        <h2 id="rel-h" className="display mb-10 text-[clamp(2.5rem,8vw,7rem)]">
          You may also want
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {rel.map((r, i) => (
            <ProductCard key={r.slug} product={r} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
