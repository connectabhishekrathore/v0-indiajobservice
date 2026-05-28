import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  IndianRupee,
  ArrowRight,
  ExternalLink,
  Clock,
  Flame,
  Star,
} from "lucide-react";
import { Job } from "@/lib/types";
import { formatDate, daysRemaining, formatSalary, cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact" | "featured";
}

export function JobCard({ job, variant = "default" }: JobCardProps) {
  const daysLeft = daysRemaining(job.importantDates.lastDate);
  const isUrgent = daysLeft <= 7 && daysLeft > 0;
  const isExpired = daysLeft <= 0;

  if (variant === "compact") {
    return (
      <Link href={`/jobs/${job.id}`}>
        <Card className="card-hover border-border hover:border-primary/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {job.isHot && (
                    <Badge variant="hot" className="text-[10px] px-1.5 py-0">
                      <Flame className="h-3 w-3 mr-0.5" />
                      HOT
                    </Badge>
                  )}
                  {job.isFeatured && (
                    <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                      <Star className="h-3 w-3 mr-0.5" />
                      Featured
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {job.organization}
                </p>
              </div>
              <div className="text-right shrink-0">
                {isExpired ? (
                  <Badge variant="destructive" className="text-[10px]">
                    Closed
                  </Badge>
                ) : isUrgent ? (
                  <Badge variant="warning" className="text-[10px]">
                    {daysLeft} days left
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px]">
                    {daysLeft} days
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {job.vacancies.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(job.importantDates.lastDate)}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/jobs/${job.id}`}>
        <Card className="card-hover border-primary/30 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-2">
              {job.isHot && (
                <Badge variant="hot" className="text-[10px] px-1.5">
                  <Flame className="h-3 w-3 mr-0.5" />
                  HOT
                </Badge>
              )}
              <Badge variant="warning" className="text-[10px] px-1.5">
                <Star className="h-3 w-3 mr-0.5" />
                Featured
              </Badge>
              {isUrgent && !isExpired && (
                <Badge variant="destructive" className="text-[10px] px-1.5">
                  <Clock className="h-3 w-3 mr-0.5" />
                  {daysLeft} days left
                </Badge>
              )}
            </div>
            <h3 className="font-bold text-foreground text-lg line-clamp-2">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground">{job.organization}</p>
          </CardHeader>
          <CardContent className="pb-4">
            <ul className="space-y-1">
              {job.highlights.slice(0, 3).map((highlight, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              <span className="flex items-center gap-1 text-foreground">
                <Users className="h-4 w-4 text-primary" />
                {job.vacancies.toLocaleString()} Posts
              </span>
              <span className="flex items-center gap-1 text-foreground">
                <IndianRupee className="h-4 w-4 text-primary" />
                {formatSalary(job.salaryMin, job.salaryMax)}
              </span>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t border-border pt-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-sm">
                <span className="text-muted-foreground">Last Date: </span>
                <span className="font-medium text-foreground">
                  {formatDate(job.importantDates.lastDate)}
                </span>
              </div>
              <Button size="sm">
                View Details
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="card-hover border-border hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {job.isHot && (
                <Badge variant="hot" className="text-[10px] px-1.5">
                  <Flame className="h-3 w-3 mr-0.5" />
                  HOT
                </Badge>
              )}
              {job.isFeatured && (
                <Badge variant="warning" className="text-[10px] px-1.5">
                  Featured
                </Badge>
              )}
              <Badge variant="outline" className="text-[10px] capitalize">
                {job.type.replace("-", " ")}
              </Badge>
            </div>
            {isExpired ? (
              <Badge variant="destructive" className="text-[10px] shrink-0">
                Closed
              </Badge>
            ) : isUrgent ? (
              <Badge variant="warning" className="text-[10px] shrink-0">
                <Clock className="h-3 w-3 mr-0.5" />
                {daysLeft}d left
              </Badge>
            ) : null}
          </div>
          <h3 className="font-semibold text-foreground text-base line-clamp-2 mt-2">
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground">{job.organization}</p>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">
                {job.vacancies.toLocaleString()} Posts
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">
                {formatSalary(job.salaryMin, job.salaryMax)}
              </span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Last Date:{" "}
                <span className={cn("font-medium", isUrgent && "text-destructive")}>
                  {formatDate(job.importantDates.lastDate)}
                </span>
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="outline" size="sm" className="w-full group">
            View Details
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
