import { Hero } from "@/components/home/Hero";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { Manifesto } from "@/components/home/Manifesto";
import { Campaign } from "@/components/home/Campaign";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { LimitedDrop } from "@/components/home/LimitedDrop";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCollection />
      <Manifesto />
      <Campaign />
      <CategoryTiles />
      <LimitedDrop />
      <Newsletter />
    </div>
  );
}
