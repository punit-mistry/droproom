"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";
import { getProduct } from "@/lib/products";

const jacket = getProduct("system-failure-jacket")!;
const hoodie = getProduct("industrial-hoodie")!;
const cap = getProduct("archive-cap")!;

const CSS = `
@keyframes hr-up{from{transform:translateY(108%)}to{transform:translateY(0)}}
@keyframes hr-clip{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes hr-clip-x{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes hr-fade{from{opacity:0}to{opacity:1}}
.hr-up{animation:hr-up 1.1s var(--ease) both;animation-delay:var(--d,0s)}
.hr-clip{animation:hr-clip 1.3s var(--ease) both;animation-delay:var(--d,0s)}
.hr-clipx{animation:hr-clip-x 1.2s var(--ease) both;animation-delay:var(--d,0s)}
.hr-fade{animation:hr-fade 1s ease both;animation-delay:var(--d,0s)}
@media (prefers-reduced-motion: reduce){.hr-up,.hr-clip,.hr-clipx,.hr-fade{animation:none}}
`;

const META = ["DROP 001", "SS—FW", "06 PIECES", "MUMBAI—IN", "19.0760°N 72.8777°E"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const r = reduce ? 0 : 1;
  const yJacket = useTransform(p, [0, 1], [0, -90 * r]);
  const scaleJacket = useTransform(p, [0, 1], [1, 1 + 0.12 * r]);
  const yHoodie = useTransform(p, [0, 1], [0, 140 * r]);
  const yCap = useTransform(p, [0, 1], [0, -200 * r]);
  const yWord = useTransform(p, [0, 1], [0, 60 * r]);

  return (
    <section
      ref={ref}
      aria-label="Drop 001 campaign"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden border-b border-white/15 bg-ink"
    >
      <style>{CSS}</style>

      {/* IMAGERY */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* hairline grid */}
        <div className="absolute inset-y-0 left-1/4 w-px bg-white/10" />
        <div className="absolute inset-y-0 left-2/4 hidden w-px bg-white/10 md:block" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-white/10" />

        {/* main jacket */}
        <motion.div
          style={{ y: yJacket }}
          className="hr-clip absolute right-0 top-14 h-[58%] w-[82%] md:top-0 md:h-[88%] md:w-[48%]"
        >
          <motion.div style={{ scale: scaleJacket }} className="h-full w-full origin-center">
            <ProductImage product={jacket} view={0} priority sizes="(min-width: 768px) 48vw, 82vw" />
          </motion.div>
        </motion.div>

        {/* hoodie, layered behind-left */}
        <motion.div
          style={{ y: yHoodie }}
          className="hr-clipx [--d:0.35s] absolute bottom-[34%] left-0 z-[1] aspect-[4/5] w-[44%] border-r border-t border-white/20 md:bottom-auto md:left-[9%] md:top-[18%] md:w-[24%]"
        >
          <ProductImage product={hoodie} view={2} sizes="(min-width: 768px) 24vw, 44vw" />
        </motion.div>

        {/* cap chip */}
        <motion.div
          style={{ y: yCap }}
          className="hr-clip [--d:0.55s] absolute right-[6%] top-[46%] z-[1] hidden aspect-square w-[11%] border border-ink md:block"
        >
          <ProductImage product={cap} view={0} sizes="12vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent md:hidden" />
      </div>

      {/* META BAR */}
      <div className="label relative z-20 flex items-center justify-between gap-x-6 border-b border-white/15 px-4 py-3 text-bone md:px-8">
        <div className="hr-fade flex flex-wrap gap-x-5 gap-y-1" style={{ "--d": "0.2s" } as React.CSSProperties}>
          {META.map((m, i) => (
            <span key={m} className={i > 2 ? "hidden md:inline" : i === 0 ? "text-volt" : ""}>
              {m}
            </span>
          ))}
        </div>
        <span className="hr-fade hidden text-muted md:inline" style={{ "--d": "0.4s" } as React.CSSProperties}>
          SCROLL ↓
        </span>
      </div>

      <div className="relative z-10 flex-1" />

      {/* COPY + CTAs */}
      <div className="relative z-20 px-4 pb-2 md:px-8">
        <div className="relative z-20 mb-5 w-fit max-w-[16rem] bg-ink pr-4 pt-2 md:mb-10 md:max-w-sm">
          <p className="overflow-hidden">
            <span className="hr-up display block text-[clamp(2rem,6.5vw,3.75rem)] text-bone" style={{ "--d": "0.5s" } as React.CSSProperties}>
              NOT MADE
            </span>
          </p>
          <p className="overflow-hidden">
            <span className="hr-up display block text-[clamp(2rem,6.5vw,3.75rem)] text-volt" style={{ "--d": "0.6s" } as React.CSSProperties}>
              TO FIT IN.
            </span>
          </p>
        </div>
        <div className="hr-fade flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.9s" } as React.CSSProperties}>
          <Link
            href="/shop"
            className="label group inline-flex min-h-12 items-center justify-between gap-6 bg-volt px-5 text-ink transition-colors hover:bg-bone sm:justify-start"
          >
            EXPLORE DROP 001
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/about"
            className="label inline-flex min-h-12 items-center justify-between gap-6 border border-bone/60 bg-ink/40 px-5 text-bone transition-colors hover:border-volt hover:text-volt sm:justify-start"
          >
            DISCOVER THE BRAND
          </Link>
        </div>
      </div>

      {/* WORDMARK */}
      <motion.h1
        style={{ y: yWord }}
        className="display relative z-10 mt-3 select-none whitespace-nowrap px-[2vw] pb-[1.5vw] text-[21.5vw] leading-[0.82] text-[#ece8df] mix-blend-difference md:mt-0 md:text-[19.5vw]"
      >
        <span className="block overflow-hidden pt-[0.04em]">
          <span className="hr-up block" style={{ "--d": "0.15s" } as React.CSSProperties}>
            DROPROOM<span className="align-top text-[0.35em]">®</span>
          </span>
        </span>
      </motion.h1>
    </section>
  );
}
