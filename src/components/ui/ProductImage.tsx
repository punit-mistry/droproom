import Image from "next/image";
import { IMAGE_SIZE, type Product } from "@/lib/products";

interface Props {
  product: Pick<Product, "image" | "name">;
  /** 0 = full frame, 1 = tighter crop, 2 = detail crop — all crops of the same real photograph */
  view?: 0 | 1 | 2;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

const CROPS = [
  { scale: 1, origin: "50% 50%" },
  { scale: 1.45, origin: "50% 38%" },
  { scale: 2.1, origin: "52% 42%" },
] as const;

/**
 * Real product photography (1024×1024). Wrapper is `relative overflow-hidden` and fills its
 * parent, so give the parent an aspect ratio to avoid layout shift. Never distorts: object-cover on a square source.
 */
export function ProductImage({ product, view = 0, sizes, priority, className = "", imgClassName = "" }: Props) {
  const c = CROPS[view];
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={product.image}
        alt={product.name}
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        sizes={sizes}
        priority={priority}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        style={view === 0 ? undefined : { transform: `scale(${c.scale})`, transformOrigin: c.origin }}
      />
    </div>
  );
}
