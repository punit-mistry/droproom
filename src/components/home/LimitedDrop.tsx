import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DROP_RELEASE_DATE, PRODUCTS } from "@/lib/products";
import { ProductImage } from "@/components/ui/ProductImage";
import { Reveal } from "@/components/ui/Reveal";
import { Countdown } from "./Countdown";

export function LimitedDrop() {
  const shots = PRODUCTS.slice(0, 3);
  return (
    <section aria-labelledby="drop-h" className="bg-volt px-4 py-20 text-ink md:px-8 md:py-32">
      <div className="flex items-center justify-between gap-4 border-b border-ink/30 pb-4">
        <span className="label">DROP 001</span>
        <span className="label text-right">Limited run — numbered pieces</span>
      </div>
      <Reveal className="mt-10 md:mt-16">
        <h2 id="drop-h" className="display text-[clamp(3rem,12vw,11rem)]">
          When it&apos;s gone,
          <br />
          it&apos;s gone.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <dl className="grid grid-cols-2 gap-px bg-ink/30 [&>div]:bg-volt [&>div]:py-4">
            <div>
              <dt className="label opacity-70">Collection</dt>
              <dd className="display mt-1 text-3xl">DROP 001</dd>
            </div>
            <div>
              <dt className="label opacity-70">Pieces</dt>
              <dd className="display mt-1 text-3xl">{String(PRODUCTS.length).padStart(2, "0")}</dd>
            </div>
            <div className="col-span-2">
              <dt className="label opacity-70">Run size</dt>
              <dd className="mt-1 font-medium">Limited run — numbered pieces. Once a size is out, it is not restocked.</dd>
            </div>
          </dl>
          <div className="mt-8">
            {DROP_RELEASE_DATE ? (
              <Countdown target={DROP_RELEASE_DATE} />
            ) : (
              <p className="label border border-ink px-4 py-3">RELEASE DATE: TO BE ANNOUNCED</p>
            )}
          </div>
          <Link
            href="/shop"
            className="group mt-8 inline-flex min-h-12 items-center gap-3 bg-ink px-6 text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <span className="label">EXPLORE DROP 001</span>
            <ArrowRight size={18} aria-hidden className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-px bg-ink/30 md:col-span-8">
          {shots.map((p, i) => (
            <div key={p.slug} className={`relative aspect-[3/5] overflow-hidden ${i === 1 ? "md:mt-12" : ""}`}>
              <ProductImage product={p} sizes="(min-width: 768px) 22vw, 33vw" />
              <span className={`label absolute left-2 top-2 ${p.backdrop === "dark" ? "text-bone" : "text-ink"}`}>
                N°{p.index}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
