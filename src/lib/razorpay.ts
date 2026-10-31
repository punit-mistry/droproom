import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { getProduct, PRODUCTS, type Size } from "@/lib/products";

export interface CheckoutLine { slug: string; size: Size; qty: number }

export function razorpayKeys() {
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!id || !secret) return null;
  // Test-mode only: refuse live keys so this demo can never charge real money.
  if (!id.startsWith("rzp_test_")) return null;
  return { id, secret };
}

/** Price the cart server-side from the catalogue — never trust client amounts. Returns paise. */
export function priceLines(lines: CheckoutLine[]): number | null {
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) return null;
  let rupees = 0;
  for (const l of lines) {
    const p = getProduct(l.slug);
    if (!p || !p.sizes.includes(l.size) || p.soldOut?.includes(l.size)) return null;
    if (!Number.isInteger(l.qty) || l.qty < 1 || l.qty > 10) return null;
    rupees += p.price * l.qty;
  }
  return rupees * 100;
}

export function verifySignature(orderId: string, paymentId: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const KNOWN_SLUGS = PRODUCTS.map((p) => p.slug);
