"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  IndianRupee,
  Star,
  Filter,
  X,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  sampleJobs,
  categories,
  locations,
  experienceLevels,
  type Job,
} from "@/lib/data";

function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group relative flex flex-col rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all hover:border-[hsl(var(--primary))] hover:shadow-md"
    >
      {job.featured && (
        <div className="absolute -top-px right-6 flex items-center gap-1 rounded-b-lg bg-[hsl(var(--accent))] px-3 py-1 text-xs font-medium text-[hsl(var(--accent-foreground))]">
          <Star className="h-3 w-3" />
          Featured
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--muted))] text-lg font-bold text-[hsl(var(--primary))]">
          {job.company.charAt(0)}
        </div>
        <span className="rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-xs font-medium text-[hsl(var(--primary))]">
          {job.type}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))]">
        {job.title}
      </h3>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        {job.company}
      </p>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
        {job.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-[hsl(var(--muted-foreground))]">
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          {job.experience}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[hsl(var(--border))] pt-4">
        <span className="flex items-center gap-1 font-semibold text-[hsl(var(--success))]">
          <IndianRupee className="h-4 w-4" />
          {job.salary}
        </span>
        <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
          <Clock className="h-3 w-3" />
          {new Date(job.postedDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>
    </Link>
  );
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-sm transition-colors hover:border-[hsl(var(--primary))]"
      >
        <span className={value ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]"}>
          {value || label}
        </span>
        <ChevronDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-2 max-h-60 w-48 overflow-auto rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-2 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
          >
            All {label}
          </button>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-[hsl(var(--muted))] ${
                value === option
                  ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                  : "text-[hsl(var(--foreground))]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function JobsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [experienceFilter, setExperienceFilter] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    return sampleJobs.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesCategory =
        !categoryFilter ||
        job.category.toLowerCase().includes(
          categories.find((c) => c.id === categoryFilter)?.name.toLowerCase() || categoryFilter.toLowerCase()
        );

      const matchesExperience =
        !experienceFilter || job.experience === experienceFilter;

      return matchesSearch && matchesLocation && matchesCategory && matchesExperience;
    });
  }, [searchQuery, locationFilter, categoryFilter, experienceFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setCategoryFilter("");
    setExperienceFilter("");
  };

  const hasActiveFilters = searchQuery || locationFilter || categoryFilter || experienceFilter;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[hsl(var(--muted))]/30">
        {/* Search Header */}
        <div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
              Find Jobs
            </h1>
            <p className="mt-2 text-[hsl(var(--muted-foreground))]">
              Discover {sampleJobs.length.toLocaleString()}+ job opportunities across India
            </p>

            {/* Search Bar */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-3 pl-12 pr-4 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/20"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center justify-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--primary))] sm:hidden"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Desktop Filters */}
            <div className="mt-4 hidden flex-wrap items-center gap-3 sm:flex">
              <FilterDropdown
                label="Location"
                options={locations}
                value={locationFilter}
                onChange={setLocationFilter}
              />
              <FilterDropdown
                label="Category"
                options={categories.map((c) => c.name)}
                value={categoryFilter ? categories.find((c) => c.id === categoryFilter)?.name || categoryFilter : ""}
                onChange={(value) => {
                  const cat = categories.find((c) => c.name === value);
                  setCategoryFilter(cat?.id || "");
                }}
              />
              <FilterDropdown
                label="Experience"
                options={experienceLevels}
                value={experienceFilter}
                onChange={setExperienceFilter}
              />
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 rounded-lg bg-[hsl(var(--destructive))]/10 px-3 py-2 text-sm font-medium text-[hsl(var(--destructive))] transition-colors hover:bg-[hsl(var(--destructive))]/20"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="mt-4 flex flex-col gap-3 sm:hidden">
                <FilterDropdown
                  label="Location"
                  options={locations}
                  value={locationFilter}
                  onChange={setLocationFilter}
                />
                <FilterDropdown
                  label="Category"
                  options={categories.map((c) => c.name)}
                  value={categoryFilter ? categories.find((c) => c.id === categoryFilter)?.name || categoryFilter : ""}
                  onChange={(value) => {
                    const cat = categories.find((c) => c.name === value);
                    setCategoryFilter(cat?.id || "");
                  }}
                />
                <FilterDropdown
                  label="Experience"
                  options={experienceLevels}
                  value={experienceFilter}
                  onChange={setExperienceFilter}
                />
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-1 rounded-lg bg-[hsl(var(--destructive))]/10 px-3 py-2 text-sm font-medium text-[hsl(var(--destructive))] transition-colors hover:bg-[hsl(var(--destructive))]/20"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Showing{" "}
              <span className="font-semibold text-[hsl(var(--foreground))]">
                {filteredJobs.length}
              </span>{" "}
              jobs
            </p>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-16">
              <Briefcase className="h-12 w-12 text-[hsl(var(--muted-foreground))]" />
              <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">
                No jobs found
              </h3>
              <p className="mt-2 text-center text-[hsl(var(--muted-foreground))]">
                Try adjusting your search or filters to find more opportunities.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-lg bg-[hsl(var(--primary))] px-6 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/90"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function JobsLoadingFallback() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[hsl(var(--muted))]/30">
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--primary))]" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<JobsLoadingFallback />}>
      <JobsContent />
    </Suspense>
  );
}
