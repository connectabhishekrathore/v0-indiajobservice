'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
            India&apos;s Premier Job Portal
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 text-balance">
            Discover your next opportunity with comprehensive job listings, exam resources, and exclusive documents
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90"
            >
              Browse Jobs
            </Link>
            <Link
              href="/admin/login"
              className="px-8 py-3 border-2 border-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 text-balance">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-8">
            <div className="text-4xl font-bold text-primary mb-4">📋</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Comprehensive Listings</h3>
            <p className="text-foreground/70">
              Thousands of job opportunities across India with detailed descriptions, eligibility criteria, and selection processes.
            </p>
          </div>

          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-8">
            <div className="text-4xl font-bold text-secondary mb-4">📚</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Exam Resources</h3>
            <p className="text-foreground/70">
              Access admit cards, results, answer keys, and syllabi for competitive exams all in one place.
            </p>
          </div>

          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-8">
            <div className="text-4xl font-bold text-accent mb-4">🔒</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Secure Payments</h3>
            <p className="text-foreground/70">
              Download PDFs and subscribe to plans with safe, secure payment processing via Razorpay.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Find Your Next Job?</h2>
          <p className="text-foreground/70 mb-8">
            Start exploring opportunities that match your skills and aspirations.
          </p>
          <Link
            href="/jobs"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">India Job Service</h4>
              <p className="text-sm text-foreground/60">Your gateway to career opportunities across India.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><Link href="/jobs" className="hover:text-foreground">Browse Jobs</Link></li>
                <li><Link href="/resources" className="hover:text-foreground">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Admin</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><Link href="/admin/login" className="hover:text-foreground">Admin Login</Link></li>
                <li><Link href="/admin/signup" className="hover:text-foreground">Admin Signup</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-foreground/10 pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2024 India Job Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
