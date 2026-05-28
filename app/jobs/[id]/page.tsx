import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Building2,
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { sampleJobs } from "@/lib/data";

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = sampleJobs.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[hsl(var(--muted))]/30">
        {/* Breadcrumb */}
        <div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Job Header */}
              <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-2xl font-bold text-[hsl(var(--primary))]">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
                        {job.title}
                      </h1>
                      <p className="mt-1 text-lg text-[hsl(var(--muted-foreground))]">
                        {job.company}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-sm font-medium text-[hsl(var(--primary))]">
                          {job.type}
                        </span>
                        <span className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-sm font-medium text-[hsl(var(--foreground))]">
                          {job.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                    >
                      <Bookmark className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Key Details */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[hsl(var(--border))] pt-6 sm:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Location
                      </p>
                      <p className="font-medium text-[hsl(var(--foreground))]">
                        {job.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]">
                      <IndianRupee className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Salary
                      </p>
                      <p className="font-medium text-[hsl(var(--foreground))]">
                        {job.salary}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))]">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Experience
                      </p>
                      <p className="font-medium text-[hsl(var(--foreground))]">
                        {job.experience}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Posted
                      </p>
                      <p className="font-medium text-[hsl(var(--foreground))]">
                        {new Date(job.postedDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mt-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:p-8">
                <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">
                  Job Description
                </h2>
                <p className="mt-4 leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {job.description}
                </p>

                <h3 className="mt-8 text-lg font-semibold text-[hsl(var(--foreground))]">
                  Requirements
                </h3>
                <ul className="mt-4 space-y-3">
                  {job.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--success))]" />
                      {req}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-lg font-semibold text-[hsl(var(--foreground))]">
                  About the Role
                </h3>
                <p className="mt-4 leading-relaxed text-[hsl(var(--muted-foreground))]">
                  This is an exciting opportunity to join {job.company} and work
                  on challenging projects in a collaborative environment. You
                  will be part of a talented team that values innovation,
                  continuous learning, and professional growth.
                </p>

                <h3 className="mt-8 text-lg font-semibold text-[hsl(var(--foreground))]">
                  Benefits
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Competitive salary and performance bonuses",
                    "Health insurance for you and your family",
                    "Flexible work arrangements",
                    "Learning and development opportunities",
                    "Collaborative and inclusive work culture",
                  ].map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--success))]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="sticky top-24 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <div className="text-center">
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Annual Salary
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[hsl(var(--success))]">
                    {job.salary}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-6 w-full rounded-lg bg-[hsl(var(--primary))] py-3 font-medium text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/90"
                >
                  Apply Now
                </button>

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[hsl(var(--border))] py-3 font-medium text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                >
                  <Bookmark className="h-4 w-4" />
                  Save Job
                </button>

                <p className="mt-4 text-center text-xs text-[hsl(var(--muted-foreground))]">
                  Apply before:{" "}
                  {new Date(
                    new Date(job.postedDate).setMonth(
                      new Date(job.postedDate).getMonth() + 1
                    )
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Company Card */}
              <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[hsl(var(--muted))] text-xl font-bold text-[hsl(var(--primary))]">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[hsl(var(--foreground))]">
                      {job.company}
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {job.category}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                    <Building2 className="h-4 w-4" />
                    <span>1000+ employees</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                    <MapPin className="h-4 w-4" />
                    <span>Multiple locations in India</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                    <Briefcase className="h-4 w-4" />
                    <span>12 open positions</span>
                  </div>
                </div>

                <Link
                  href={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[hsl(var(--border))] py-2 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                >
                  View Company Profile
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>

              {/* Share Card */}
              <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                <h3 className="font-semibold text-[hsl(var(--foreground))]">
                  Share this job
                </h3>
                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                  Know someone who would be perfect for this role? Share it with
                  them!
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-lg border border-[hsl(var(--border))] py-2 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                  >
                    Copy Link
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-lg border border-[hsl(var(--border))] py-2 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return sampleJobs.map((job) => ({
    id: job.id,
  }));
}
