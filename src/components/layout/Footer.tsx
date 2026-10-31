import Link from "next/link";

const SHOP = [
  ["All products", "/shop"],
  ["T-Shirts", "/shop?category=T-SHIRTS"],
  ["Hoodies", "/shop?category=HOODIES"],
  ["Bottoms", "/shop?category=BOTTOMS"],
  ["Outerwear", "/shop?category=OUTERWEAR"],
  ["Accessories", "/shop?category=ACCESSORIES"],
] as const;

const link = "inline-flex min-h-11 items-center hover:text-volt transition-colors";

export function Footer() {
  return (
    <footer className="border-t border-white/15 mt-24 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 pt-12 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label text-muted">Independent / Experimental</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/80">
            DROPROOM® makes heavy, considered garments in small runs. Each drop is numbered, limited, and not coming back.
          </p>
        </div>
        <nav aria-label="Shop" className="md:col-span-3 md:col-start-7">
          <p className="label text-muted mb-2">Shop</p>
          <ul className="text-sm">
            {SHOP.map(([l, h]) => (
              <li key={h}><Link href={h} className={link}>{l}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-2">
          <p className="label text-muted mb-2">Follow</p>
          <ul className="text-sm">
            {["Instagram", "TikTok", "X"].map((s) => (
              <li key={s}><a href="#" className={link}>{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="label text-muted mb-2">Contact</p>
          <a href="mailto:hello@droproom.example" className={`${link} text-sm break-all`}>hello@droproom.example</a>
        </div>
      </div>

      <div
        aria-hidden
        className="display select-none text-center whitespace-nowrap text-[17.5vw] leading-[0.8] mt-16 -mb-[0.04em] text-bone"
      >
        DROPROOM®
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-4 flex flex-col gap-1 md:flex-row md:items-center md:justify-between label text-muted">
          <span>© 2026 DROPROOM®. All rights reserved.</span>
          <span>Demo storefront — no real orders</span>
          <span className="flex gap-4">
            <a href="#" className="inline-flex min-h-11 items-center hover:text-volt">Terms</a>
            <a href="#" className="inline-flex min-h-11 items-center hover:text-volt">Privacy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
