import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Every piece from DROPROOM® Drop 001. Limited release.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8 pt-12 pb-8">
      <div className="flex items-end justify-between gap-4 mb-10">
        <h1 className="display text-[22vw] md:text-[12rem]">Shop</h1>
        <p className="label text-muted pb-2 md:pb-6 text-right">Drop 001<br />Limited release</p>
      </div>
      <Suspense fallback={null}>
        <ShopGrid />
      </Suspense>
    </div>
  );
}
