import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, formatPrice } from "@/lib/products";
import { ProductDetail } from "@/components/product/ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Not found — DROPROOM" };
  return { title: `${p.name} — DROPROOM`, description: `${p.blurb} ${formatPrice(p.price)}. ${p.colorway}.` };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  return <ProductDetail product={p} />;
}
