"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  User,
  Bell,
  Briefcase,
  CreditCard,
  Trophy,
  Key,
  BookOpen,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", labelHindi: "होम" },
  {
    href: "/latest-jobs",
    label: "Latest Jobs",
    labelHindi: "नवीनतम नौकरियां",
    icon: Briefcase,
  },
  {
    href: "/admit-card",
    label: "Admit Card",
    labelHindi: "एडमिट कार्ड",
    icon: CreditCard,
  },
  { href: "/result", label: "Result", labelHindi: "परिणाम", icon: Trophy },
  {
    href: "/answer-key",
    label: "Answer Key",
    labelHindi: "उत्तर कुंजी",
    icon: Key,
  },
  {
    href: "/syllabus",
    label: "Syllabus",
    labelHindi: "पाठ्यक्रम",
    icon: BookOpen,
  },
  {
    href: "/admission",
    label: "Admission",
    labelHindi: "प्रवेश",
    icon: GraduationCap,
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar with language and quick links */}
      <div className="hidden border-b border-border bg-muted/50 md:block">
        <div className="container mx-auto flex h-8 items-center justify-between px-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Welcome to IndiaJobService.com</span>
            <span className="hidden lg:inline">|</span>
            <span className="hidden lg:inline">
              Your Trusted Government Job Portal
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button className="text-muted-foreground hover:text-primary transition-colors">
              English
            </button>
            <span className="text-muted-foreground">|</span>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">
                IndiaJobService
              </h1>
              <p className="text-[10px] text-muted-foreground -mt-1">
                Sarkari Naukri Portal
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle>Search Jobs</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search jobs, organizations, keywords..."
                    className="flex-1"
                    autoFocus
                  />
                  <Button>Search</Button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Popular searches:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["SSC CGL", "UPSC", "Railway", "Bank PO", "Police"].map(
                      (term) => (
                        <Button
                          key={term}
                          variant="outline"
                          size="sm"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          {term}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Login button */}
            <Button variant="default" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden border-t border-border overflow-hidden transition-all duration-300",
          isMenuOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon && <item.icon className="h-5 w-5" />}
              <span>{item.label}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {item.labelHindi}
              </span>
            </Link>
          ))}
          <div className="pt-4 border-t border-border mt-4">
            <Button className="w-full">
              <User className="h-4 w-4 mr-2" />
              Login / Register
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
