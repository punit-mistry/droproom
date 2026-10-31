"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ProductImage } from "@/components/ui/ProductImage";
import { getProduct } from "@/lib/products";

const jacket = getProduct("system-failure-jacket")!;
const LINES = ["WE DON'T FOLLOW", "THE CULTURE.", "WE BUILD", "OUR OWN."];
const WORDS = LINES.flatMap((l, li) => l.split(" ").map((w) => ({ w, li })));

function Word({ w, i, total, p, reduce }: { w: string; i: number; total: number; p: MotionValue<number>; reduce: boolean }) {
  const start = (i / total) * 0.85;
  const opacity = useTransform(p, [start, start + 0.08], [reduce ? 1 : 0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {w}
    </motion.span>
  );
}

function Cross({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={`absolute h-5 w-5 ${className}`}>
      <path d="M10 0V20M0 10H20" stroke="#111" strokeWidth="1" />
    </svg>
  );
}
function Rivet({ className }: { className: string }) {
  return <span aria-hidden className={`absolute h-2.5 w-2.5 rounded-full border border-ink/60 bg-[#9b9b96] shadow-[inset_0_-1px_0_rgba(0,0,0,.4)] ${className}`} />;
}

export function Manifesto() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  let idx = -1;

  return (
    <section id="manifesto" className="relative overflow-hidden bg-bone px-4 py-20 text-ink md:px-8 md:py-40">
      <div className="mb-10 flex items-center justify-between border-t border-ink/20 pt-4 md:mb-16">
        <p className="label">( 02 ) MANIFESTO</p>
        <p className="label text-ink/50">DROPROOM® / EST. 2025</p>
      </div>

      <h2 ref={ref} aria-label="We don't follow the culture. We build our own." className="display text-[clamp(2.9rem,12.5vw,12.5rem)] leading-[0.86]">
        {LINES.map((line, li) => (
          <span key={li} aria-hidden className={`block ${li % 2 ? "md:pl-[12vw]" : ""} ${li === 3 ? "text-ink/90" : ""}`}>
            {line.split(" ").map((w) => {
              idx++;
              return (
                <span key={idx} className="mr-[0.22em] inline-block last:mr-0">
                  <Word w={w} i={idx} total={WORDS.length} p={p} reduce={reduce} />
                </span>
              );
            })}
          </span>
        ))}
      </h2>

      <div className="mt-16 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col justify-between md:col-span-5">
          <Reveal>
            <p className="max-w-md text-base leading-relaxed md:text-lg">
              Streetwear got loud and forgot why. DROPROOM® is built the other way: fewer pieces, heavier cloth, harder construction. Every drop is cut, tested and numbered in small runs out of Mumbai, then gone.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/60">
              No seasons to chase. No trends to borrow. Just garments made to outlast the noise, and the people who wear them without asking permission.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 grid grid-cols-3 border-t border-ink/25">
            {[
              ["06", "PIECES"],
              ["480", "GSM MAX"],
              ["001", "DROP"],
            ].map(([n, l]) => (
              <div key={l} className="border-r border-ink/25 py-4 pl-3 last:border-r-0 md:pl-4">
                <div className="display text-4xl md:text-5xl">{n}</div>
                <div className="label mt-1 text-ink/60">{l}</div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* industrial composition */}
        <Reveal y={40} className="md:col-span-7">
          <figure className="relative mx-auto aspect-[5/4] w-full overflow-hidden border border-ink bg-[#8a8a85] md:aspect-[6/5]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(17,17,17,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,.35) 1px, transparent 1px)",
                backgroundSize: "12.5% 16.66%",
              }}
            />
            {/* concrete slabs */}
            <div aria-hidden className="absolute -left-[2%] top-[8%] h-[40%] w-[34%] bg-[#6e6e69]" />
            <div aria-hidden className="absolute bottom-0 right-0 h-[34%] w-[46%] bg-[#a9a9a3]" />
            <div aria-hidden className="absolute bottom-[10%] left-[6%] h-[18%] w-[22%] bg-ink" />
            {/* image crop */}
            <div className="absolute left-[24%] top-[12%] h-[74%] w-[52%] border border-ink">
              <ProductImage product={jacket} view={2} sizes="(min-width: 768px) 35vw, 52vw" />
            </div>
            <div aria-hidden className="absolute right-[6%] top-[10%] flex flex-col items-end gap-1">
              <span className="display text-[clamp(2.5rem,7vw,5.5rem)] text-ink">04</span>
              <span className="h-[3px] w-12 bg-volt" />
            </div>
            <Cross className="left-2 top-2" />
            <Cross className="right-2 top-2" />
            <Cross className="bottom-2 left-2" />
            <Cross className="bottom-2 right-2" />
            <Rivet className="left-[26%] top-[14%]" />
            <Rivet className="right-[26%] top-[14%]" />
            <Rivet className="bottom-[16%] left-[26%]" />
            <Rivet className="bottom-[16%] right-[26%]" />
            <figcaption className="label absolute bottom-3 left-[8%] z-10 text-bone mix-blend-difference md:left-[7%]">
              FIG. 01 — PANEL 04 / STATIC GREY
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
