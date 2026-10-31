"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ProductImage } from "@/components/ui/ProductImage";
import { getProduct, type Product } from "@/lib/products";

const jacket = getProduct("system-failure-jacket")!;
const hoodie = getProduct("industrial-hoodie")!;
const cargo = getProduct("afterhours-cargo")!;
const tee = getProduct("droproom-oversized-tee")!;

function Frame({
  product,
  view,
  range,
  className,
  caption,
}: {
  product: Product;
  view: 0 | 1 | 2;
  range: number;
  className: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [range, -range]);
  return (
    <motion.figure ref={ref} style={{ y }} className={className}>
      <div className="relative h-full w-full overflow-hidden border border-white/20">
        <ProductImage product={product} view={view} sizes="(min-width: 768px) 42vw, 85vw" />
      </div>
      <figcaption className="label mt-2 flex justify-between text-muted">
        <span>{caption}</span>
        <span>{product.index}</span>
      </figcaption>
    </motion.figure>
  );
}

const DETAILS: [string, string][] = [
  ["COLLECTION", "DROP 001"],
  ["CAMPAIGN", "SYSTEM FAILURE"],
  ["PIECES", "06"],
  ["LOCATION", "MUMBAI, IN"],
  ["PALETTE", "SLAG / CONCRETE / VOLT"],
  ["RUN", "LIMITED — NUMBERED"],
];

export function Campaign() {
  const band = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: band, offset: ["start end", "end start"] });
  const bandY = useTransform(p, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const titleX = useTransform(p, [0, 1], reduce ? ["0px", "0px"] : ["30px", "-30px"]);

  return (
    <section id="campaign" className="relative border-t border-white/15 bg-ink py-20 md:py-32">
      <div className="mb-8 flex items-center justify-between px-4 md:mb-12 md:px-8">
        <p className="label text-muted">( 03 ) CAMPAIGN</p>
        <p className="label text-muted">SS—FW / FILM 001</p>
      </div>

      {/* full-bleed band */}
      <div ref={band} className="relative h-[62svh] min-h-[22rem] w-full overflow-hidden md:h-[80svh]">
        <motion.div style={{ y: bandY }} className="absolute -inset-y-[10%] inset-x-0">
          <ProductImage product={jacket} view={2} sizes="100vw" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-ink/35" />
        <motion.h2
          style={{ x: titleX }}
          className="display absolute bottom-3 left-4 z-10 whitespace-nowrap text-[clamp(3.25rem,15vw,15rem)] leading-[0.85] text-bone md:bottom-6 md:left-8"
        >
          SYSTEM
          <br />
          <span className="text-volt">FAILURE</span>
        </motion.h2>
        <span className="label absolute right-4 top-4 z-10 bg-ink px-2 py-1 text-bone md:right-8 md:top-6">REC ● 00:00:06</span>
      </div>

      {/* asymmetric frames */}
      <div className="relative mt-12 grid grid-cols-6 gap-x-3 gap-y-10 px-4 md:mt-24 md:grid-cols-12 md:gap-x-6 md:px-8">
        <Frame product={hoodie} view={0} range={30} caption="FRAME 01" className="col-span-4 aspect-[3/4] md:col-span-4 md:col-start-1" />
        <Frame product={jacket} view={1} range={50} caption="FRAME 02" className="col-span-5 col-start-2 aspect-[4/5] md:col-span-5 md:col-start-6 md:mt-40" />
        <Frame product={cargo} view={2} range={20} caption="FRAME 03" className="col-span-3 aspect-square md:col-span-3 md:col-start-2 md:-mt-24" />
        <Frame product={tee} view={1} range={40} caption="FRAME 04" className="col-span-3 aspect-[2/3] md:col-span-3 md:col-start-10 md:-mt-16" />
      </div>

      {/* details */}
      <Reveal className="mt-16 grid gap-8 px-4 md:mt-32 md:grid-cols-12 md:px-8">
        <p className="display text-[clamp(1.75rem,4vw,3.5rem)] md:col-span-6">
          SIX PIECES. ONE BROKEN SYSTEM. BUILT TO BE WORN HARD.
        </p>
        <dl className="border-t border-white/20 md:col-span-5 md:col-start-8">
          {DETAILS.map(([k, v]) => (
            <div key={k} className="label flex justify-between gap-4 border-b border-white/20 py-3">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right text-bone">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
