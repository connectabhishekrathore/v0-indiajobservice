import Link from "next/link";
import { Building2, Upload, CheckCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* For Job Seekers */}
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
              <Upload className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-[hsl(var(--foreground))]">
              For Job Seekers
            </h3>
            <p className="mt-4 leading-relaxed text-[hsl(var(--muted-foreground))]">
              Create your profile, upload your resume, and get discovered by top
              employers across India.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Free profile creation",
                "Apply to unlimited jobs",
                "Get personalized job alerts",
                "Track your applications",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[hsl(var(--foreground))]"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-[hsl(var(--success))]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-6 py-3 font-medium text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary))]/90"
            >
              Create Free Account
            </Link>
          </div>

          {/* For Employers */}
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))]">
              <Building2 className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-[hsl(var(--foreground))]">
              For Employers
            </h3>
            <p className="mt-4 leading-relaxed text-[hsl(var(--muted-foreground))]">
              Find the perfect candidates for your organization from our pool of
              2 million+ verified professionals.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Post jobs in minutes",
                "Access verified candidates",
                "Advanced search filters",
                "Dedicated support team",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[hsl(var(--foreground))]"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-[hsl(var(--success))]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/post-job"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border-2 border-[hsl(var(--accent))] bg-transparent px-6 py-3 font-medium text-[hsl(var(--accent))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
