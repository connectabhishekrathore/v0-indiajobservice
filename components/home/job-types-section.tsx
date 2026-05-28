import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JOB_TYPES } from "@/lib/types";
import {
  Building2,
  Landmark,
  TrainFront,
  Shield,
  University,
  ArrowRight,
} from "lucide-react";

const popularOrganizations = [
  {
    name: "UPSC",
    fullName: "Union Public Service Commission",
    icon: Landmark,
    jobs: 12,
    color: "text-blue-500",
  },
  {
    name: "SSC",
    fullName: "Staff Selection Commission",
    icon: Building2,
    jobs: 25,
    color: "text-green-500",
  },
  {
    name: "Railways",
    fullName: "Indian Railways",
    icon: TrainFront,
    jobs: 45,
    color: "text-orange-500",
  },
  {
    name: "Defence",
    fullName: "Ministry of Defence",
    icon: Shield,
    jobs: 38,
    color: "text-red-500",
  },
  {
    name: "Banks",
    fullName: "IBPS & Bank Recruitments",
    icon: University,
    jobs: 18,
    color: "text-purple-500",
  },
];

export function JobTypesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Job Types */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Jobs by Type
              </h2>
              <Link href="/latest-jobs">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {JOB_TYPES.slice(0, 9).map((type) => (
                <Link
                  key={type.value}
                  href={`/category/${type.value}`}
                  className="group"
                >
                  <Card className="border-border hover:border-primary/50 transition-all group-hover:shadow-md">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                        {type.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {type.labelHindi}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Organizations */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Popular Organizations
              </h2>
            </div>
            <div className="space-y-3">
              {popularOrganizations.map((org) => (
                <Link key={org.name} href={`/organization/${org.name.toLowerCase()}`}>
                  <Card className="card-hover border-border hover:border-primary/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <org.icon className={`h-6 w-6 ${org.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">
                            {org.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {org.fullName}
                          </p>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          {org.jobs} Jobs
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
