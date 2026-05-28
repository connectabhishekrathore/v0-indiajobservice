"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Briefcase } from "lucide-react";
import { INDIAN_STATES, JOB_TYPES } from "@/lib/types";
import { SITE_STATS } from "@/lib/mock-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {SITE_STATS.dailyUpdates}+ New Jobs Added Today
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Find Your Dream{" "}
            <span className="gradient-text">Government Job</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Your trusted source for latest Sarkari Naukri notifications, admit
            cards, results, and answer keys. Join {(SITE_STATS.activeUsers / 1000).toFixed(0)}K+ job seekers.
          </p>

          {/* Search Box */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-lg max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, organizations..."
                  className="pl-10 h-12"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="lg" className="h-12 px-8">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {(SITE_STATS.totalJobs / 1000).toFixed(0)}K+
              </p>
              <p className="text-sm text-muted-foreground">Total Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {(SITE_STATS.activeUsers / 1000).toFixed(0)}K+
              </p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {SITE_STATS.dailyUpdates}+
              </p>
              <p className="text-sm text-muted-foreground">Daily Updates</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {(SITE_STATS.successStories / 1000).toFixed(0)}K+
              </p>
              <p className="text-sm text-muted-foreground">Success Stories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
