import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { INDIAN_STATES } from "@/lib/types";
import { MapPin, ArrowRight } from "lucide-react";

// Mock job counts per state (in production, this would come from the database)
const stateJobCounts: Record<string, number> = {
  "All India": 450,
  "Uttar Pradesh": 125,
  "Bihar": 85,
  "Rajasthan": 72,
  "Madhya Pradesh": 68,
  "Maharashtra": 95,
  "Delhi": 42,
  "Gujarat": 38,
  "Karnataka": 55,
  "Tamil Nadu": 48,
  "West Bengal": 52,
  "Haryana": 35,
  "Punjab": 28,
  "Jharkhand": 32,
  "Odisha": 25,
  "Kerala": 22,
};

export function StateWiseJobs() {
  // Sort states by job count
  const sortedStates = [...INDIAN_STATES].sort((a, b) => {
    return (stateJobCounts[b] || 0) - (stateJobCounts[a] || 0);
  });

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl md:text-2xl">
                Jobs by State
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Find government jobs in your state
              </p>
            </div>
            <Link href="/state-wise-jobs">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[320px] pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {sortedStates.map((state) => {
                  const jobCount = stateJobCounts[state] || Math.floor(Math.random() * 20) + 5;
                  return (
                    <Link
                      key={state}
                      href={`/state/${state.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group"
                    >
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {state}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {jobCount}
                        </Badge>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
