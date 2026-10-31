import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, PRODUCTS, byCategory, type Category } from "@/lib/products";
import { ProductImage } from "@/components/ui/ProductImage";
import { Reveal } from "@/components/ui/Reveal";

// Desktop mosaic placement (12-col grid) + mobile spans (2-col grid)
const LAYOUT: Record<Category, string> = {
  "T-SHIRTS": "col-span-2 aspect-[4/3] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[640px]",
  HOODIES: "col-span-1 aspect-[3/4] md:col-span-5 md:aspect-auto md:min-h-[310px]",
  BOTTOMS: "col-span-1 aspect-[3/4] md:col-span-5 md:aspect-auto md:min-h-[310px]",
  OUTERWEAR: "col-span-1 aspect-[3/4] md:col-span-5 md:aspect-auto md:min-h-[360px]",
  ACCESSORIES: "col-span-1 aspect-[3/4] md:col-span-7 md:aspect-auto md:min-h-[360px]",
};

export function CategoryTiles() {
  return (
    <section aria-labelledby="cat-h" className="border-t border-white/15 px-4 py-20 md:px-8 md:py-32">
      <Reveal className="mb-10 flex items-end justify-between gap-4 md:mb-16">
        <h2 id="cat-h" className="display text-[clamp(2.75rem,10vw,9rem)]">
          Shop by<br />category
        </h2>
        <span className="label hidden text-muted md:block">05 Categories</span>
      </Reveal>
      <div className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-12">
        {CATEGORIES.map((c) => {
          const items = byCategory(c);
          const p = items[0] ?? PRODUCTS[0];
          return (
            <Link
              key={c}
              href={`/shop?category=${encodeURIComponent(c)}`}
              aria-label={`${c}, ${items.length} ${items.length === 1 ? "item" : "items"}`}
              className={`group relative block min-h-[200px] overflow-hidden ${LAYOUT[c]}`}
              style={{ background: p.backdrop === "dark" ? "#0a0a0a" : "#e9e7e1" }}
            >
              <ProductImage
                product={p}
                sizes="(min-width: 768px) 58vw, 50vw"
                className="absolute inset-0 scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.2] motion-reduce:transition-none motion-reduce:group-hover:scale-110"
              />
              <div className={`absolute inset-0 flex flex-col justify-between p-4 md:p-6 ${p.backdrop === "dark" ? "text-bone" : "text-ink"}`}>
                <div className="flex items-start justify-between">
                  <span className="label">
                    {String(items.length).padStart(2, "0")} {items.length === 1 ? "item" : "items"}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center border border-current transition-colors group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
                    <ArrowUpRight size={20} aria-hidden />
                  </span>
                </div>
                <span className="display block text-[clamp(1.75rem,6vw,5.5rem)] transition-transform duration-500 group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                  {c}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
