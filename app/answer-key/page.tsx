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
  Key,
  ArrowLeft,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Answer Keys 2025 - Official Answer Keys",
  description:
    "Download official answer keys for government exams. Check UPSC, SSC, Railway, Bank exam answer keys with objection tracker.",
};

export default function AnswerKeyPage() {
  const answerKeys = MOCK_JOBS.filter((job) => job.category === "answer-key");

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-purple-500/10 via-background to-background border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Answer Key</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Key className="h-5 w-5 text-purple-500" />
                </div>
                Answer Keys
              </h1>
              <p className="text-muted-foreground mt-2">
                {answerKeys.length} answer keys available
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                <FileCheck className="h-3 w-3 mr-1" />
                Objection Tracker
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
              <Input placeholder="Search answer keys..." className="pl-10" />
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

      {/* Answer Key Listings */}
      <div className="container mx-auto px-4 py-8">
        {answerKeys.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {answerKeys.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Key className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No answer keys found
            </h2>
            <p className="text-muted-foreground mb-4">
              Check back later for new answer key releases
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        )}

        {answerKeys.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Answer Keys
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
