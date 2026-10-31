"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryNav } from "@/components/shop/CategoryNav";

export function ShopGrid() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const raw = useSearchParams().get("category")?.toUpperCase();
  const initial = CATEGORIES.find((c) => c === raw);
  const [cat, setCat] = useState<Category | undefined>(initial);
  const list = cat ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS;

  const pick = (c?: Category) => {
    setCat(c);
    router.replace(c ? `/shop?category=${encodeURIComponent(c)}` : "/shop", { scroll: false });
  };

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.05 } } };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.15 : 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div>
      <CategoryNav value={cat} onChange={pick} />
      <p className="label mt-4 text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "piece" : "pieces"}
      </p>
      {/* key re-mounts the grid on category change so the stagger replays — a clean, cheap "switch" transition */}
      <motion.ul
        key={cat ?? "ALL"}
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 md:grid-cols-3 md:gap-y-14 xl:grid-cols-4"
      >
        {list.map((p, i) => (
          <motion.li key={p.slug} variants={item}>
            <ProductCard product={p} index={i} priority={i < 4} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
