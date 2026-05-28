import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSearch } from "@/components/hero-search";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedJobs } from "@/components/featured-jobs";
import { CTASection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSearch />
        <CategoryGrid />
        <FeaturedJobs />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
