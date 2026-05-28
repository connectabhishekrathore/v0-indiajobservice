import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobCard } from "@/components/jobs/job-card";
import { MOCK_JOBS } from "@/lib/mock-data";
import { INDIAN_STATES, JOB_TYPES } from "@/lib/types";
import {
  Search,
  SlidersHorizontal,
  CreditCard,
  ArrowLeft,
  Download,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admit Cards 2025 - Download Hall Tickets",
  description:
    "Download admit cards and hall tickets for government exams. Get UPSC, SSC, Railway, Bank, Defence exam admit cards with direct download links.",
};

export default function AdmitCardPage() {
  const admitCards = MOCK_JOBS.filter((job) => job.category === "admit-card");

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-green-500/10 via-background to-background border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Admit Card</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-green-500" />
                </div>
                Admit Cards / Hall Tickets
              </h1>
              <p className="text-muted-foreground mt-2">
                {admitCards.length} admit cards available for download
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Direct Downloads
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="border-b border-border bg-card/50 sticky top-[104px] z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search admit cards..."
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem
                      key={state}
                      value={state.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Exam Type" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Admit Card Listings */}
      <div className="container mx-auto px-4 py-8">
        {admitCards.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {admitCards.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <CreditCard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No admit cards found
            </h2>
            <p className="text-muted-foreground mb-4">
              Check back later for new admit card releases
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        )}

        {admitCards.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Admit Cards
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
