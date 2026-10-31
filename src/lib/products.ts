export type Category = "T-SHIRTS" | "HOODIES" | "BOTTOMS" | "OUTERWEAR" | "ACCESSORIES";
export type Garment = "tee" | "hoodie" | "cargo" | "jacket" | "sweats" | "cap" | "audio" | "eyewear";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "ONE SIZE";
export type Availability = "available" | "sold-out";
/** Which backdrop the supplied photograph was shot on — drives theme-aware framing. */
export type Backdrop = "dark" | "light";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // INR — reused from the original Drop 001 price list per category
  category: Category;
  garment: Garment;
  image: string; // primary photo, /public path (currently 1024×1024 sources)
  /** Optional extra/higher-res images for the detail gallery. Defaults to [image]. */
  gallery?: string[];
  backdrop: Backdrop;
  sizes: Size[];
  soldOut?: Size[];
  tags: string[];
  isNew?: boolean;
  colorway: string;
  blurb: string;
  description: string;
  materials: string[];
  fit: string;
  index: string;
}

export const IMAGE_SIZE = 1024;
const STD: Size[] = ["S", "M", "L", "XL", "XXL"];
const IMG = (f: string) => `/images/products/${f}.jpg`;
const PNG = (f: string) => `/images/products/${f}.png`;

export const PRODUCTS: Product[] = [
  // ── T-SHIRTS ───────────────────────────────────────────────
  {
    id: "dr-001", slug: "droproom-oversized-tee", name: "DROPROOM OVERSIZED TEE", price: 2499,
    category: "T-SHIRTS", garment: "tee", image: PNG("tee-new-2"), backdrop: "dark",
    gallery: ["tee-new-2", "tee-new-1", "tee-new-3", "tee-new-5", "tee-new-8"].map(PNG),
    sizes: STD, soldOut: ["XXL"], tags: ["DROP 001", "ESSENTIAL"], isNew: true, colorway: "MATTE BLACK",
    blurb: "Boxy. Heavy. Drop-shoulder.",
    description: "A 280 GSM boxy tee cut wide through the chest with a dropped shoulder and a cropped hem. Garment-dyed and enzyme washed for a lived-in hand from day one. Minimal chest print.",
    materials: ["100% combed cotton, 280 GSM", "Garment dyed, enzyme washed", "Rubberised screen print", "Made in India"],
    fit: "Oversized. Take your usual size for the intended fit, size down for a closer cut.", index: "001",
  },
  {
    id: "dr-002", slug: "void-star-tee", name: "SIGNAL IN THE NOISE TEE", price: 2499,
    category: "T-SHIRTS", garment: "tee", image: PNG("tee-sig-2"), backdrop: "dark",
    gallery: ["tee-sig-2", "tee-sig-1", "tee-sig-3"].map(PNG),
    sizes: STD, tags: ["DROP 001"], isNew: true, colorway: "VOID BLACK",
    blurb: "Black on black. One signal.",
    description: "Heavyweight black tee with a large distressed four-point star printed at the chest, DROPROOM® and MMXXVI type below it, and a woven star label at the hem. Quiet by design.",
    materials: ["100% combed cotton, 280 GSM", "Distressed screen print", "Woven star label", "Made in India"],
    fit: "Oversized. True to size for a roomy fit.", index: "002",
  },
  {
    id: "dr-003", slug: "lost-in-progress-tee", name: "LOST IN PROGRESS TEE", price: 2499,
    category: "T-SHIRTS", garment: "tee", image: IMG("t-shirts_02"), backdrop: "dark",
    sizes: STD, tags: ["DROP 001", "GRAPHIC"], colorway: "WASHED GREY",
    blurb: "Acid-washed. Photographic print.",
    description: "Stone-washed grey tee with a monochrome photographic print at the chest and contrast stitching at the cuffs and hem.",
    materials: ["100% cotton, 300 GSM", "Stone washed", "Photographic screen print", "Made in India"],
    fit: "Oversized. True to size.", index: "003",
  },
  // ── HOODIES ────────────────────────────────────────────────
  {
    id: "dr-004", slug: "industrial-hoodie", name: "INDUSTRIAL HOODIE", price: 4999,
    category: "HOODIES", garment: "hoodie", image: IMG("hoodies_01"), backdrop: "dark",
    sizes: STD, tags: ["DROP 001", "HEAVYWEIGHT"], isNew: true, colorway: "SLAG BLACK",
    blurb: "480 GSM brushed fleece.",
    description: "Built from 480 GSM brushed-back loopback fleece with a double-layer hood and a distressed star graphic across the back. Heavy enough to hold a silhouette, soft enough to live in.",
    materials: ["100% organic cotton fleece, 480 GSM", "Double-layer hood", "Flat-lock seams", "Distressed back print"],
    fit: "Relaxed oversized. True to size for a roomy fit.", index: "004",
  },
  {
    id: "dr-005", slug: "discipline-hoodie", name: "DISCIPLINE HOODIE", price: 4999,
    category: "HOODIES", garment: "hoodie", image: IMG("hoodies_02"), backdrop: "dark",
    sizes: STD, tags: ["DROP 001", "GRAPHIC"], colorway: "ASH WHITE",
    blurb: "One word across the back.",
    description: "Ash-white heavyweight hoodie with a bold block-type back print and a ribbed hem. Statement, not slogan.",
    materials: ["100% organic cotton fleece, 480 GSM", "Double-layer hood", "Ribbed cuffs and hem", "Rubberised back print"],
    fit: "Relaxed oversized. True to size.", index: "005",
  },
  {
    id: "dr-006", slug: "northstar-hoodie", name: "NORTHSTAR HOODIE", price: 4999,
    category: "HOODIES", garment: "hoodie", image: IMG("hoodies_03"), backdrop: "light",
    sizes: STD, tags: ["DROP 001"], colorway: "BONE",
    blurb: "Bone fleece. Charcoal star.",
    description: "Bone-coloured brushed fleece with an oversized charcoal star printed across the back and a drop shoulder.",
    materials: ["100% organic cotton fleece, 480 GSM", "Double-layer hood", "Ribbed cuffs and hem", "Pigment back print"],
    fit: "Relaxed oversized. True to size.", index: "006",
  },
  // ── BOTTOMS ────────────────────────────────────────────────
  {
    id: "dr-007", slug: "afterhours-cargo", name: "AFTERHOURS CARGO", price: 3999,
    category: "BOTTOMS", garment: "cargo", image: IMG("bottoms_01"), backdrop: "dark",
    sizes: ["S", "M", "L", "XL"], soldOut: ["S"], tags: ["DROP 001", "UTILITY"], isNew: true, colorway: "BLACK",
    blurb: "Six pockets. Zero apologies.",
    description: "Wide-leg cargo in a ripstop cotton blend with articulated knees, bellowed utility pockets and elasticated toggle hems. Cut for movement after dark.",
    materials: ["98% cotton, 2% elastane ripstop", "Bellowed cargo pockets", "Hem elastic + drawcord", "YKK hardware"],
    fit: "Wide leg. Mid rise. Size up for extra volume.", index: "007",
  },
  {
    id: "dr-008", slug: "raw-form-cargo", name: "RAW FORM CARGO", price: 3499,
    category: "BOTTOMS", garment: "cargo", image: IMG("bottoms_02"), backdrop: "dark",
    sizes: STD, tags: ["DROP 001", "UTILITY"], colorway: "STONE",
    blurb: "Washed twill. Heavy pockets.",
    description: "Stone-washed cotton twill cargo with oversized flap pockets, a drawcord waist and gathered cuffs.",
    materials: ["100% cotton twill, 340 GSM", "Stone washed", "Flap cargo pockets", "Elasticated cuffs"],
    fit: "Relaxed wide leg. True to size.", index: "008",
  },
  {
    id: "dr-009", slug: "salt-flat-cargo", name: "SALT FLAT CARGO", price: 3999,
    category: "BOTTOMS", garment: "cargo", image: IMG("bottoms_03"), backdrop: "light",
    sizes: STD, tags: ["DROP 001", "UTILITY"], colorway: "BONE",
    blurb: "Bone twill. Wide leg.",
    description: "Bone-coloured cargo with a distressed knee patch, drawcord waist and gathered ribbed cuffs.",
    materials: ["98% cotton, 2% elastane", "Distressed knee detail", "Flap cargo pockets", "Ribbed cuffs"],
    fit: "Wide leg. Size up for extra volume.", index: "009",
  },
  // ── OUTERWEAR ──────────────────────────────────────────────
  {
    id: "dr-010", slug: "system-failure-jacket", name: "SYSTEM FAILURE JACKET", price: 6999,
    category: "OUTERWEAR", garment: "jacket", image: IMG("outerwear_02"), backdrop: "dark",
    sizes: STD, tags: ["DROP 001", "STATEMENT"], isNew: true, colorway: "BONE / BLACK",
    blurb: "Two-tone. Raglan. Cropped.",
    description: "A two-tone raglan track jacket with a stand collar, full-length zip and gathered hem. The centrepiece of Drop 001.",
    materials: ["Shell: 100% nylon taslan", "Contrast raglan sleeves", "Full-length metal zip", "Ribbed hem"],
    fit: "Boxy. Cropped length. True to size.", index: "010",
  },
  {
    id: "dr-011", slug: "night-shift-track-jacket", name: "NIGHT SHIFT TRACK JACKET", price: 6999,
    category: "OUTERWEAR", garment: "jacket", image: IMG("outerwear_01"), backdrop: "dark",
    sizes: STD, tags: ["DROP 001"], colorway: "BLACK",
    blurb: "Panelled. Tonal. Zip-through.",
    description: "Tonal black track jacket with seam-taped panels, hand pockets and a small chest mark.",
    materials: ["Shell: 100% nylon", "Taped seams", "Full-length zip", "Elasticated hem"],
    fit: "Boxy. True to size.", index: "011",
  },
  {
    id: "dr-012", slug: "static-track-jacket", name: "STATIC TRACK JACKET", price: 6999,
    category: "OUTERWEAR", garment: "jacket", image: IMG("outerwear_03"), backdrop: "light",
    sizes: STD, tags: ["DROP 001"], colorway: "STATIC GREY",
    blurb: "Pale grey. Stand collar.",
    description: "Pale grey track jacket with a stand collar, raglan sleeves and a ribbed hem. Clean, quiet and cropped.",
    materials: ["Shell: 100% nylon", "Raglan sleeves", "Full-length zip", "Ribbed hem and cuffs"],
    fit: "Boxy. Cropped length. True to size.", index: "012",
  },
  // ── ACCESSORIES ────────────────────────────────────────────
  {
    id: "dr-013", slug: "archive-cap", name: "ARCHIVE CAP", price: 1499,
    category: "ACCESSORIES", garment: "cap", image: IMG("accessories_01"), backdrop: "dark",
    sizes: ["ONE SIZE"], tags: ["DROP 001"], isNew: true, colorway: "BLACK",
    blurb: "Six-panel. Distressed brim.",
    description: "Washed six-panel cap with a distressed brim, tonal stitching and an embroidered four-point star.",
    materials: ["100% washed cotton twill", "Embroidered star", "Metal eyelets", "Adjustable strap"],
    fit: "One size, adjustable.", index: "013",
  },
  {
    id: "dr-014", slug: "signal-headphones", name: "SIGNAL HEADPHONES", price: 1499,
    category: "ACCESSORIES", garment: "audio", image: PNG("headphones-new-4"), backdrop: "dark",
    gallery: ["headphones-new-4", "headphones-new-6", "headphones-new-7"].map(PNG),
    sizes: ["ONE SIZE"], tags: ["DROP 001", "OBJECT"], colorway: "MATTE BLACK",
    blurb: "Matte over-ear. Star mark.",
    description: "Matte black over-ear headphones with a brushed star mark on each cup.",
    materials: ["Matte ABS shell", "Memory-foam cushions", "Foldable headband", "Demo product listing"],
    fit: "One size, adjustable.", index: "014",
  },
  {
    id: "dr-015", slug: "monolith-shades", name: "MONOLITH SHADES", price: 1499,
    category: "ACCESSORIES", garment: "eyewear", image: IMG("accessories_03"), backdrop: "light",
    sizes: ["ONE SIZE"], tags: ["DROP 001", "OBJECT"], colorway: "GLOSS BLACK",
    blurb: "Rectangular. Wide temple.",
    description: "Gloss black rectangular acetate frames with dark lenses and a metal cross detail on the temple.",
    materials: ["Acetate frame", "UV400 lenses", "Metal temple detail", "Demo product listing"],
    fit: "One size.", index: "015",
  },
];

export const CATEGORIES: Category[] = ["T-SHIRTS", "HOODIES", "BOTTOMS", "OUTERWEAR", "ACCESSORIES"];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const related = (slug: string, n = 4) => {
  const me = getProduct(slug);
  const same = PRODUCTS.filter((p) => p.slug !== slug && p.category === me?.category);
  const rest = PRODUCTS.filter((p) => p.slug !== slug && p.category !== me?.category);
  return [...same, ...rest].slice(0, n);
};
export const byCategory = (c: Category) => PRODUCTS.filter((p) => p.category === c);
export const isSoldOut = (p: Product) => p.sizes.every((s) => p.soldOut?.includes(s));
export const availability = (p: Product): Availability => (isSoldOut(p) ? "sold-out" : "available");

/** Set an ISO date to enable a real countdown. null = "Date TBA" — no fake timers. */
export const DROP_RELEASE_DATE: string | null = null;

export const formatPrice = (n: number) => "₹" + n.toLocaleString("en-IN");

export const galleryOf = (p: Product) => (p.gallery && p.gallery.length ? p.gallery : [p.image]);

/** Intrinsic pixel sizes for non-square sources (everything else is 1024×1024). Keeps gallery frames ratio-true with no layout shift. */
const IMAGE_DIMS: Record<string, [number, number]> = {
  "/images/products/tee-new-1.png": [1536, 1024],
  "/images/products/tee-new-2.png": [1254, 1254],
  "/images/products/tee-new-3.png": [1536, 1024],
  "/images/products/tee-new-5.png": [1278, 1230],
  "/images/products/tee-new-8.png": [1254, 1254],
  "/images/products/tee-sig-1.png": [1278, 1230],
  "/images/products/tee-sig-2.png": [1254, 1254],
  "/images/products/tee-sig-3.png": [1278, 1230],
  "/images/products/headphones-new-4.png": [1269, 1240],
  "/images/products/headphones-new-6.png": [1536, 1024],
  "/images/products/headphones-new-7.png": [1330, 1182],
};
export const dimsOf = (src: string): [number, number] => IMAGE_DIMS[src] ?? [IMAGE_SIZE, IMAGE_SIZE];
