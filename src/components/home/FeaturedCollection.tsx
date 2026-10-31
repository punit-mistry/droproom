import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { getProduct, PRODUCTS, type Product } from "@/lib/products";

const FEATURED = ["droproom-oversized-tee", "industrial-hoodie", "afterhours-cargo", "system-failure-jacket", "raw-form-cargo", "archive-cap"]
  .map((s) => getProduct(s))
  .filter((p): p is Product => Boolean(p));

// Deliberately uneven: spans, offsets and aspect ratios per piece.
const LAYOUT: { cell: string }[] = [
  { cell: "col-span-2 md:col-span-5 md:col-start-1" },
  { cell: "col-span-1 mt-10 md:col-span-4 md:col-start-7 md:mt-32" },
  { cell: "col-span-1 md:col-span-3 md:col-start-10 md:mt-12" },
  { cell: "col-span-2 md:col-span-7 md:col-start-2 md:-mt-6" },
  { cell: "col-span-1 md:col-span-3 md:col-start-9 md:mt-24" },
  { cell: "col-span-1 mt-10 md:col-span-4 md:col-start-5 md:mt-0" },
];

export function FeaturedCollection() {
  return (
    <section id="collection" className="relative px-4 py-20 md:px-8 md:py-36">
      <div className="mb-12 grid items-end gap-6 border-t border-white/15 pt-4 md:mb-24 md:grid-cols-12">
        <p className="label text-muted md:col-span-2">( 01 ) COLLECTION</p>
        <Reveal className="md:col-span-8">
          <h2 className="display text-[clamp(3.5rem,13vw,13rem)]">
            THE FIRST
            <br />
            <span className="text-volt">DROP.</span>
          </h2>
        </Reveal>
        <div className="flex items-end md:col-span-2 md:justify-end">
          <Link
            href="/shop"
            className="label group inline-flex min-h-11 items-center gap-2 border-b border-bone pb-1 transition-colors hover:border-volt hover:text-volt"
          >
            VIEW ALL ({PRODUCTS.length})
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-12 md:gap-x-6 md:gap-y-16">
        {FEATURED.map((p, i) => {
          const l = LAYOUT[i % LAYOUT.length];
          return (
            <Reveal key={p.slug} delay={(i % 3) * 0.08} className={l.cell}>
              <ProductCard product={p} index={i} sizes="(min-width: 768px) 40vw, 50vw" priority={i < 2} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
