"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { formatPrice, isSoldOut, type Product } from "@/lib/products";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuickView } from "@/components/product/QuickView";

interface Props {
  product: Product;
  index?: number;
  /** pass true for above-the-fold cards */
  priority?: boolean;
  sizes?: string;
}

export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 50vw",
}: Props) {
  const [qv, setQv] = useState(false);
  const close = useCallback(() => setQv(false), []);
  const out = isSoldOut(product);
  const href = `/product/${product.slug}`;

  return (
    <article className="group">
      {/* Square frame on a themed surface. data-backdrop lets CSS balance light/dark photos per theme. */}
      <div data-backdrop={product.backdrop} className="photo-frame relative aspect-square overflow-hidden bg-[var(--surface)]">
        {/* Image link is decorative duplicate of the title link — hidden from keyboard/AT to avoid double tab stops. */}
        <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0 block">
          <ProductImage
            product={product}
            priority={priority}
            sizes={sizes}
            className="transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </Link>
        <span className="pointer-events-none absolute right-2 top-2 flex gap-1">
          {product.isNew && !out && <span className="label bg-volt px-2 py-1 text-ink">NEW</span>}
          {out && <span className="label bg-bone px-2 py-1 text-ink">SOLD OUT</span>}
        </span>
        {!out && (
          <button
            onClick={() => setQv(true)}
            aria-label={`Quick view ${product.name}`}
            className="label absolute inset-x-2 bottom-2 flex items-center justify-center gap-2 border border-white/15 bg-ink/90 py-2.5 transition-[opacity,transform] duration-300 hover:border-volt hover:text-volt focus-visible:translate-y-0 focus-visible:opacity-100 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100"
          >
            <Eye size={14} /> Quick view
          </button>
        )}
      </div>

      <Link href={href} className="mt-3 flex items-start justify-between gap-3" aria-label={`${product.name}, ${formatPrice(product.price)}`}>
        <div className="min-w-0">
          <h3 className="display text-lg leading-none sm:text-xl lg:text-2xl">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_2px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
              {product.name}
            </span>
          </h3>
          <p className="label mt-2 text-muted">{product.category}</p>
        </div>
        <p className="label shrink-0 pt-0.5">{formatPrice(product.price)}</p>
      </Link>

      <QuickView product={product} open={qv} onClose={close} />
    </article>
  );
}
