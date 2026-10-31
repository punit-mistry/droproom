import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ProductImage } from "@/components/ui/ProductImage";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "About",
  description: "DROPROOM® is an independent experimental streetwear label. Not made to fit in.",
};

const PRINCIPLES = [
  ["01", "Heavy", "Fabric you can feel. 280 GSM tees, 480 GSM fleece. If it floats, it is not ours."],
  ["02", "Limited", "Each drop is numbered and made once. When it is gone, it is gone."],
  ["03", "Raw", "Exposed seams, raw hems, broken prints. We leave the process visible."],
  ["04", "Honest", "No fake countdowns, no invented scarcity. What you see is what exists."],
];

export default function AboutPage() {
  const a = PRODUCTS[3];
  const b = PRODUCTS[1];
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8 pt-12">
      <p className="label text-volt">About / Manifesto</p>
      <h1 className="display mt-3 text-[19vw] md:text-[12rem]">
        Not made<br />
        <span className="text-volt">to fit in.</span>
      </h1>

      <section className="mt-24 grid gap-10 md:grid-cols-12 border-t border-white/15 pt-10">
        <Reveal className="md:col-span-4">
          <p className="label text-muted">Who</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <p className="display text-4xl md:text-6xl">
            An independent label building garments for people who dress like it matters.
          </p>
          <p className="mt-8 max-w-xl text-bone/80 leading-relaxed">
            DROPROOM® started as a room, a table and a stack of blanks. We wanted clothes with weight and attitude, cut loose, built to be worn hard. We still work in
            small runs, and every release is called a drop: numbered, finite, and finished.
          </p>
        </Reveal>
      </section>

      <section className="mt-24 grid gap-4 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-5 aspect-[4/5] overflow-hidden">
          <ProductImage product={a} sizes="(min-width: 768px) 40vw, 100vw" />
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-4 md:col-start-8 aspect-[4/5] overflow-hidden md:mb-24">
          <ProductImage product={b} view={1} sizes="(min-width: 768px) 33vw, 100vw" />
        </Reveal>
      </section>

      <section className="mt-24 border-t border-white/15">
        {PRINCIPLES.map(([n, t, d]) => (
          <Reveal key={n} y={16} className="grid grid-cols-12 gap-4 items-baseline border-b border-white/15 py-8">
            <span className="label text-muted col-span-2 md:col-span-1">{n}</span>
            <h2 className="display col-span-10 md:col-span-6 text-[16vw] md:text-9xl">{t}</h2>
            <p className="col-span-12 md:col-span-4 md:col-start-9 text-bone/80 max-w-sm">{d}</p>
          </Reveal>
        ))}
      </section>

      <Reveal className="mt-24 text-center">
        <p className="label text-muted">Drop 001</p>
        <Link href="/shop" className="display mt-4 inline-block text-[16vw] md:text-[9rem] hover:text-volt transition-colors">
          See the drop
        </Link>
      </Reveal>
    </div>
  );
}
