import Link from "next/link";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  quickLinks: [
    { href: "/latest-jobs", label: "Latest Jobs" },
    { href: "/admit-card", label: "Admit Card" },
    { href: "/result", label: "Results" },
    { href: "/answer-key", label: "Answer Key" },
    { href: "/syllabus", label: "Syllabus" },
    { href: "/admission", label: "Admissions" },
  ],
  jobCategories: [
    { href: "/category/central-govt", label: "Central Govt Jobs" },
    { href: "/category/state-govt", label: "State Govt Jobs" },
    { href: "/category/bank", label: "Bank Jobs" },
    { href: "/category/railway", label: "Railway Jobs" },
    { href: "/category/defence", label: "Defence Jobs" },
    { href: "/category/police", label: "Police Jobs" },
  ],
  importantLinks: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/sitemap", label: "Sitemap" },
  ],
};

const socialLinks = [
  { href: "#", label: "Facebook" },
  { href: "#", label: "Twitter" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "Telegram" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="bg-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Subscribe to Job Alerts
              </h3>
              <p className="text-sm text-muted-foreground">
                Get latest job notifications directly in your inbox
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-64"
              />
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  IndiaJobService
                </h2>
                <p className="text-[10px] text-muted-foreground -mt-1">
                  Sarkari Naukri Portal
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              IndiaJobService.com is your trusted source for government job
              notifications, admit cards, results, and more. We help millions of
              job seekers find their dream government jobs.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@indiajobservice.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Job Categories
            </h3>
            <ul className="space-y-2">
              {footerLinks.jobCategories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Important Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.importantLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={social.label}
              >
                <span className="text-xs font-medium">{social.label.charAt(0)}</span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} IndiaJobService.com. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> IndiaJobService.com is a private job
            portal website. We are not affiliated with any government
            organization. All job information is collected from official
            government websites. Please verify all information from official
            sources before applying.
          </p>
        </div>
      </div>
    </footer>
  );
}
