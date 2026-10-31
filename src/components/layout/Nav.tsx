"use client";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import { useCart } from "@/context/cart";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { EASE } from "@/components/ui/Reveal";

const LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "ABOUT", href: "/about" },
] as const;

function useLock(active: boolean, onEsc: () => void) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && onEsc();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", k);
    };
  }, [active, onEsc]);
}

export function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { count, setOpen, hydrated } = useCart();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const closeMenu = () => setMenu(false);
  const closeSearch = () => {
    setSearch(false);
    setQ("");
  };
  useLock(menu, closeMenu);
  useLock(search, closeSearch);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close overlays on route change
    setMenu(false);
    setSearch(false);
    setQ("");
  }, [pathname]);
  useEffect(() => {
    if (search) inputRef.current?.focus();
  }, [search]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s)) : [];
  }, [q]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const btn = "inline-flex min-h-11 min-w-11 items-center justify-center label hover:text-volt transition-colors";
  const n = hydrated ? count : 0;

  return (
    <header className="sticky top-0 z-40 bg-ink/95 border-b border-white/15">
      <div className="mx-auto max-w-[1600px] h-14 px-4 md:px-8 flex items-center justify-between gap-4">
        <Link href="/" className="display text-2xl md:text-3xl tracking-tight inline-flex min-h-11 items-center" aria-label="DROPROOM home">
          DROPROOM<span className="text-volt text-base align-top ml-0.5">®</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className={`label inline-flex min-h-11 items-center border-b-2 transition-colors hover:text-volt ${active(l.href) ? "border-volt" : "border-transparent"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center md:gap-3">
          <button className={btn} onClick={() => setSearch(true)} aria-label="Search">
            <SearchIcon size={16} className="md:hidden" aria-hidden />
            <span className="hidden md:inline">SEARCH</span>
          </button>
          <ThemeToggle />
          <Link href="/account" className={`${btn} max-md:hidden`}>
            ACCOUNT
          </Link>
          <button className={`${btn} gap-1.5`} onClick={() => setOpen(true)} aria-label={`Open bag, ${n} items`}>
            BAG
            <span
              className={`inline-flex h-5 min-w-5 items-center justify-center px-1 text-[10px] font-bold ${n > 0 ? "bg-volt text-ink" : "border border-white/25 text-muted"}`}
            >
              {n}
            </span>
          </button>
          <button className={`${btn} md:hidden`} onClick={() => setMenu(true)} aria-label="Open menu" aria-expanded={menu}>
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 bg-ink flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
          >
            <div className="h-14 px-4 flex items-center justify-between border-b border-white/15 shrink-0">
              <span className="label text-muted">Menu</span>
              <button autoFocus className={btn} onClick={closeMenu} aria-label="Close menu">
                <X size={22} aria-hidden />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-8 flex flex-col justify-center gap-2">
              {[...LINKS, { label: "SEARCH", href: "#search" }, { label: "ACCOUNT", href: "/account" }].map((l, i) => {
                const isSearch = l.href === "#search";
                const cls = "display block text-[22vw] min-[420px]:text-[88px] leading-[0.95] hover:text-volt transition-colors text-left";
                const inner = (
                  <span className="flex items-baseline gap-3">
                    <span className="label text-muted">0{i + 1}</span>
                    <span className={active(l.href) ? "text-volt" : ""}>{l.label}</span>
                  </span>
                );
                return (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, y: reduce ? 0 : 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0.1 : 0.6, delay: reduce ? 0 : 0.08 + i * 0.07, ease: EASE }}
                  >
                    {isSearch ? (
                      <button
                        className={cls}
                        onClick={() => {
                          setMenu(false);
                          setSearch(true);
                        }}
                      >
                        {inner}
                      </button>
                    ) : (
                      <Link href={l.href} className={cls} onClick={closeMenu}>
                        {inner}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>
            <p className="label text-muted px-4 py-4 border-t border-white/15">Drop 001 — Limited release</p>
          </motion.div>
        )}

        {search && (
          <motion.div
            key="search"
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="fixed inset-0 z-50 bg-ink flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 pt-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between h-12">
                <label htmlFor="site-search" className="label text-muted">
                  Search
                </label>
                <button className={btn} onClick={closeSearch} aria-label="Close search">
                  <X size={22} aria-hidden />
                </button>
              </div>
              <input
                id="site-search"
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="TYPE A PRODUCT"
                autoComplete="off"
                className="display w-full bg-transparent border-b border-white/25 py-3 text-[11vw] md:text-7xl placeholder:text-white/20 focus:outline-none focus:border-volt"
              />
              <div aria-live="polite" className="mt-6">
                {q.trim() && results.length === 0 && <p className="label text-muted">No results for &ldquo;{q.trim()}&rdquo;.</p>}
                <ul>
                  {results.map((p) => (
                    <li key={p.slug} className="border-b border-white/15">
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={closeSearch}
                        className="flex min-h-14 items-center justify-between gap-4 py-3 hover:text-volt"
                      >
                        <span className="display text-3xl md:text-5xl">{p.name}</span>
                        <span className="label shrink-0">{formatPrice(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
