import { HeroSection } from "@/components/home/hero-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { LatestJobsSection } from "@/components/home/latest-jobs-section";
import { JobTypesSection } from "@/components/home/job-types-section";
import { StateWiseJobs } from "@/components/home/state-wise-jobs";
import { PremiumSection } from "@/components/home/premium-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <LatestJobsSection />
      <JobTypesSection />
      <StateWiseJobs />
      <PremiumSection />
    </>
  );
}
