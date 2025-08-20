import { Hero } from "@/components/home/Hero";
import { FeaturedSections } from "@/components/home/FeaturedSections";
import { CategorySection } from "@/components/home/CategorySection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedSections />
      <CategorySection />
    </main>
  );
}
