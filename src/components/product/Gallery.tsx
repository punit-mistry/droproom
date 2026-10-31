"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { dimsOf, galleryOf, type Product } from "@/lib/products";

/**
 * Product gallery. Shows the ORIGINAL photograph — no CSS zoom "detail" crops (those were
 * the cause of the pixelation: a 1024px source scaled 1.45–2.1×). `object-contain` on a square
 * plinth means nothing is cropped or enlarged beyond its natural size.
 *
 * Images go through next/image at quality 90 (no upscaling past the source). When higher-resolution
 * files are supplied, list them in `product.gallery` and thumbnails appear automatically.
 */
export function Gallery({ product: p }: { product: Product }) {
  const reduce = useReducedMotion();
  const images = galleryOf(p);
  const [i, setI] = useState(0);
  const multi = images.length > 1;
  const [w, h] = dimsOf(images[i]);

  return (
    <div className="mx-auto w-full max-w-[min(100%,calc(100dvh-8rem))] md:sticky md:top-24">
      <div
        data-backdrop={p.backdrop}
        style={{ aspectRatio: `${w} / ${h}` }}
        className={`photo-frame relative w-full overflow-hidden ${p.backdrop === "dark" ? "bg-[#0b0b0b]" : "bg-[var(--surface)]"}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={images[i]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
          >
            <Image
              src={images[i]}
              alt={`${p.name} — image ${i + 1} of ${images.length}`}
              width={w}
              height={h}
              sizes="(min-width: 1024px) 56vw, 100vw"
              priority={i === 0}
              quality={90}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
        {multi && (
          <span className="label absolute bottom-3 left-3 bg-ink/90 px-2 py-1" aria-live="polite">
            {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        )}
      </div>

      {multi && (
        <ul className="mt-3 flex gap-2" aria-label="Product images">
          {images.map((src, n) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setI(n)}
                aria-label={`Show image ${n + 1}`}
                aria-current={n === i}
                className={`relative block size-16 overflow-hidden border bg-[var(--surface)] sm:size-20 ${n === i ? "border-volt" : "border-white/20 hover:border-white/50"}`}
              >
                <Image
                  src={src}
                  alt=""
                  width={160}
                  height={160}
                  sizes="80px"
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
