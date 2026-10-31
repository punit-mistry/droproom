import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, byCategory } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import { ProductImage } from "@/components/ui/ProductImage";

export const metadata: Metadata = {
  title: "Collections",
  description: "Drop 001 by category — tees, hoodies, bottoms, outerwear, accessories.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8 pt-12">
      <p className="label text-volt">Drop 001</p>
      <h1 className="display mt-3 text-[20vw] md:text-[13rem]">
        The<br />Collection
      </h1>
      <p className="mt-8 max-w-md text-bone/80">
        Six pieces. One run. Browse Drop 001 by category, or go straight to everything.
      </p>

      <ul className="mt-16 border-t border-white/15">
        {CATEGORIES.map((c, i) => {
          const items = byCategory(c);
          const lead = items[0];
          return (
            <li key={c} className="border-b border-white/15">
              <Reveal y={16}>
                <Link
                  href={`/shop?category=${encodeURIComponent(c)}`}
                  className="group grid grid-cols-12 items-center gap-4 py-6 md:py-8 min-h-11"
                >
                  <span className="label text-muted col-span-2 md:col-span-1">0{i + 1}</span>
                  <span className="display col-span-10 md:col-span-7 text-[15vw] md:text-[8rem] transition-all duration-300 group-hover:text-volt md:group-hover:translate-x-4">
                    {c}
                  </span>
                  <span className="hidden md:flex col-span-3 justify-end">
                    {lead && (
                      <span className="block w-28 aspect-[4/5] overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity">
                        <ProductImage product={lead} sizes="112px" />
                      </span>
                    )}
                  </span>
                  <span className="label col-span-12 md:col-span-1 flex items-center justify-between md:justify-end gap-2 text-muted group-hover:text-volt">
                    {items.length} {items.length === 1 ? "piece" : "pieces"}
                    <ArrowUpRight size={16} aria-hidden />
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <Link href="/shop" className="mt-10 inline-flex min-h-12 items-center bg-volt px-8 label text-ink hover:bg-bone transition-colors">
        View everything
      </Link>
    </div>
  );
}
