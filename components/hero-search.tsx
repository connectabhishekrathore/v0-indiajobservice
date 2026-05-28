"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { locations } from "@/lib/data";

export function HeroSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl lg:text-6xl">
            Find Your Dream Job
            <span className="block text-[hsl(var(--primary))]">Across India</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
            Connect with 50,000+ employers and discover opportunities in IT,
            Finance, Engineering, Healthcare and more. Start your career journey
            today.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="flex flex-col gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-lg sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2">
            {/* Keyword Input */}
            <div className="flex flex-1 items-center gap-3 px-4">
              <Search className="h-5 w-5 shrink-0 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="Job title, skills, or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent py-3 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none"
              />
            </div>

            <div className="hidden h-8 w-px bg-[hsl(var(--border))] sm:block" />

            {/* Location Selector */}
            <div className="relative flex flex-1 items-center gap-3 px-4">
              <MapPin className="h-5 w-5 shrink-0 text-[hsl(var(--muted-foreground))]" />
              <button
                type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex w-full items-center justify-between py-3 text-left"
              >
                <span
                  className={
                    location
                      ? "text-[hsl(var(--foreground))]"
                      : "text-[hsl(var(--muted-foreground))]"
                  }
                >
                  {location || "Select location"}
                </span>
                <ChevronDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              </button>

              {showLocationDropdown && (
                <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setLocation("");
                      setShowLocationDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
                  >
                    All Locations
                  </button>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setLocation(loc);
                        setShowLocationDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="rounded-lg bg-[hsl(var(--primary))] px-8 py-3 font-medium text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/90 sm:rounded-full"
            >
              Search Jobs
            </button>
          </div>
        </form>

        {/* Popular Searches */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-[hsl(var(--muted-foreground))]">Popular:</span>
          {["Software Engineer", "Data Analyst", "Product Manager", "Marketing", "Finance"].map(
            (term) => (
              <button
                key={term}
                onClick={() => router.push(`/jobs?q=${encodeURIComponent(term)}`)}
                className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
              >
                {term}
              </button>
            )
          )}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { value: "50K+", label: "Active Jobs" },
            { value: "12K+", label: "Companies" },
            { value: "2M+", label: "Job Seekers" },
            { value: "500K+", label: "Placements" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-[hsl(var(--primary))] sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
