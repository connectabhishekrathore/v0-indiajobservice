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
  );<section className="py-10 px-6">
  <h2 className="text-3xl font-bold mb-6">
    Latest Government Jobs
  </h2>

  <div className="grid gap-4">

    <div className="border p-4 rounded-xl shadow">
      <h3 className="text-xl font-semibold">
        SSC GD Constable 2026
      </h3>

      <p>Qualification: 10th Pass</p>
      <p>Last Date: 15 June 2026</p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
        Apply Now
      </button>
    </div>

    <div className="border p-4 rounded-xl shadow">
      <h3 className="text-xl font-semibold">
        Railway Group D Recruitment
      </h3>

      <p>Qualification: 10th / ITI</p>
      <p>Last Date: 20 June 2026</p>

      <button className="bg-green-600 text-white px-4 py-2 rounded mt-3">
        Apply Now
      </button>
    </div>

  </div>
</section>
}
