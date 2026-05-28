"use client";

import { use } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockJobs } from "@/lib/mock-data";
import {
  Calendar,
  Building2,
  MapPin,
  Users,
  IndianRupee,
  GraduationCap,
  Clock,
  Download,
  Share2,
  Bookmark,
  ExternalLink,
  FileText,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <Card className="max-w-lg mx-auto text-center py-16">
            <CardContent>
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The job you are looking for does not exist or has been removed.
              </p>
              <Link href="/latest-jobs">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const shareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.organization}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/latest-jobs" className="hover:text-primary">
            Latest Jobs
          </Link>
          <span>/</span>
          <span className="text-foreground">{job.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {job.isHot && (
                        <Badge className="bg-red-500 hover:bg-red-600">
                          HOT
                        </Badge>
                      )}
                      {job.isNew && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          NEW
                        </Badge>
                      )}
                      <Badge variant="outline">{job.category}</Badge>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center gap-2 text-lg text-primary font-medium">
                      <Building2 className="h-5 w-5" />
                      {job.organization}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={shareJob}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Vacancies</p>
                      <p className="font-semibold">
                        {job.vacancies.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <IndianRupee className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Salary</p>
                      <p className="font-semibold">{job.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Qualification
                      </p>
                      <p className="font-semibold text-sm">
                        {job.qualification}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-semibold">{job.state || "All India"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-green-500/5 border-green-500/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Application Start
                        </p>
                        <p className="font-semibold">{job.applicationStartDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-red-500/5 border-red-500/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Last Date to Apply
                        </p>
                        <p className="font-semibold">{job.lastDate}</p>
                      </div>
                    </div>
                  </div>
                  {job.examDate && (
                    <div className="flex items-center justify-between p-4 rounded-lg border bg-blue-500/5 border-blue-500/20">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Exam Date
                          </p>
                          <p className="font-semibold">{job.examDate}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Posted On
                        </p>
                        <p className="font-semibold">{job.postedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Fee */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  Application Fee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="p-4 rounded-lg border text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      General / OBC
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {job.applicationFee?.general || "Rs. 500"}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      SC / ST / PH
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {job.applicationFee?.scSt || "Rs. 250"}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Female Candidates
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {job.applicationFee?.female || "Rs. 250"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  * Payment can be made through Debit Card, Credit Card, Net
                  Banking, or UPI
                </p>
              </CardContent>
            </Card>

            {/* Age Limit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Age Limit (as on {job.lastDate})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">
                      Minimum Age
                    </p>
                    <p className="text-xl font-bold">{job.ageLimit?.min || 18} Years</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">
                      Maximum Age
                    </p>
                    <p className="text-xl font-bold">{job.ageLimit?.max || 35} Years</p>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium mb-2">Age Relaxation:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• OBC: 3 years</li>
                    <li>• SC/ST: 5 years</li>
                    <li>• PH: 10 years</li>
                    <li>• Ex-Servicemen: As per government rules</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>{job.description}</p>
                  <h4 className="text-foreground font-semibold mt-4">
                    Eligibility Criteria:
                  </h4>
                  <ul>
                    <li>
                      Educational Qualification: {job.qualification}
                    </li>
                    <li>
                      Age: {job.ageLimit?.min || 18} to {job.ageLimit?.max || 35} years
                    </li>
                    <li>Nationality: Indian Citizen</li>
                    <li>
                      Physical Standards: As per {job.organization} norms
                    </li>
                  </ul>
                  <h4 className="text-foreground font-semibold mt-4">
                    Selection Process:
                  </h4>
                  <ul>
                    <li>Written Examination</li>
                    <li>Physical Efficiency Test (if applicable)</li>
                    <li>Document Verification</li>
                    <li>Medical Examination</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Now Card */}
            <Card className="border-primary/50 sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    Application Deadline
                  </p>
                  <p className="text-2xl font-bold text-destructive">
                    {job.lastDate}
                  </p>
                </div>
                <div className="space-y-3">
                  {job.applyLink && (
                    <Button className="w-full" size="lg" asChild>
                      <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Online
                      </a>
                    </Button>
                  )}
                  {job.notificationPdfUrl && (
                    <Button variant="outline" className="w-full" size="lg">
                      <Download className="h-4 w-4 mr-2" />
                      Download Notification
                    </Button>
                  )}
                  {job.syllabusUrl && (
                    <Button variant="outline" className="w-full" size="lg">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Download Syllabus
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {job.admitCardUrl && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/admit-card">
                      <Award className="h-4 w-4 mr-2 text-yellow-500" />
                      Download Admit Card
                    </Link>
                  </Button>
                )}
                {job.resultUrl && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/result">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Check Result
                    </Link>
                  </Button>
                )}
                {job.answerKeyUrl && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/answer-key">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      View Answer Key
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/syllabus">
                    <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                    Download Syllabus
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Share Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share This Job</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(
                          `${job.title} - ${job.organization}\n${window.location.href}`
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        `https://t.me/share/url?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(job.title)}`,
                        "_blank"
                      )
                    }
                  >
                    Telegram
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          `${job.title} - Apply Now!`
                        )}&url=${encodeURIComponent(window.location.href)}`,
                        "_blank"
                      )
                    }
                  >
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
