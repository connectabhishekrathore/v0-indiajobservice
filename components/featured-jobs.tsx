import Link from "next/link";
import { MapPin, Clock, Briefcase, IndianRupee, Star } from "lucide-react";
import { sampleJobs, type Job } from "@/lib/data";

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

export function FeaturedJobs() {
  const featuredJobs = sampleJobs.filter((job) => job.featured).slice(0, 4);
  const recentJobs = sampleJobs.slice(0, 8);

  return (
    <section className="bg-[hsl(var(--muted))]/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Featured Jobs */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] sm:text-4xl">
            Featured Jobs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[hsl(var(--muted-foreground))]">
            Top opportunities from leading companies across India
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Recent Jobs */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] sm:text-4xl">
            Latest Job Openings
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[hsl(var(--muted-foreground))]">
            Fresh opportunities added daily from companies across India
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-6 py-3 font-medium text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/90"
          >
            View All Jobs
            <Briefcase className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
