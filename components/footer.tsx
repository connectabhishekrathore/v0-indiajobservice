import Link from "next/link";
import { Briefcase, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
                <Briefcase className="h-5 w-5 text-[hsl(var(--primary-foreground))]" />
              </div>
              <span className="text-xl font-bold text-[hsl(var(--foreground))]">
                IndiaJobService
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              India&apos;s premier job portal connecting talented professionals with top
              employers across the country.
            </p>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
              <Mail className="h-4 w-4" />
              <span>support@indiajobservice.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
              <Phone className="h-4 w-4" />
              <span>+91 1800-123-4567</span>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))]">
              For Job Seekers
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  Career Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/salary-guide"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  Salary Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))]">
              For Employers
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/post-job"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/employer-resources"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  Employer Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/talent-search"
                  className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  Search Talent
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))]">
              Popular Locations
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/jobs?location=bangalore"
                  className="flex items-center gap-1 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  <MapPin className="h-3 w-3" />
                  Jobs in Bangalore
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs?location=mumbai"
                  className="flex items-center gap-1 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  <MapPin className="h-3 w-3" />
                  Jobs in Mumbai
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs?location=delhi"
                  className="flex items-center gap-1 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  <MapPin className="h-3 w-3" />
                  Jobs in Delhi NCR
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs?location=hyderabad"
                  className="flex items-center gap-1 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  <MapPin className="h-3 w-3" />
                  Jobs in Hyderabad
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs?location=remote"
                  className="flex items-center gap-1 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  <MapPin className="h-3 w-3" />
                  Remote Jobs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-8 md:flex-row">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            2024 IndiaJobService. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
