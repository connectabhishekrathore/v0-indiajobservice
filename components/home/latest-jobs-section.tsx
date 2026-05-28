"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import { MOCK_JOBS } from "@/lib/mock-data";
import { JobCategory } from "@/lib/types";
import { ArrowRight, Briefcase, CreditCard, Trophy, Key } from "lucide-react";

const tabs = [
  { value: "latest-jobs", label: "Latest Jobs", icon: Briefcase },
  { value: "admit-card", label: "Admit Card", icon: CreditCard },
  { value: "result", label: "Results", icon: Trophy },
  { value: "answer-key", label: "Answer Key", icon: Key },
];

export function LatestJobsSection() {
  const getJobsByCategory = (category: JobCategory) => {
    return MOCK_JOBS.filter((job) => job.category === category).slice(0, 6);
  };

  const featuredJobs = MOCK_JOBS.filter((job) => job.isFeatured).slice(0, 2);

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Featured Jobs */}
        {featuredJobs.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Featured Jobs
              </h2>
              <Link href="/latest-jobs?featured=true">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {/* Tabbed Job Listings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Browse Jobs
            </h2>
          </div>

          <Tabs defaultValue="latest-jobs" className="w-full">
            <TabsList className="w-full h-auto flex-wrap justify-start gap-1 bg-transparent p-0 mb-6">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-lg border border-border data-[state=active]:border-primary"
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getJobsByCategory(tab.value as JobCategory).map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                {getJobsByCategory(tab.value as JobCategory).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No jobs found in this category.
                    </p>
                  </div>
                )}
                <div className="text-center mt-8">
                  <Link href={`/${tab.value}`}>
                    <Button variant="outline" size="lg">
                      View All {tab.label}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
