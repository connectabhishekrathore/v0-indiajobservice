import Link from "next/link";
import {
  Briefcase,
  CreditCard,
  Trophy,
  Key,
  BookOpen,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categories = [
  {
    href: "/latest-jobs",
    icon: Briefcase,
    label: "Latest Jobs",
    labelHindi: "नवीनतम नौकरियां",
    description: "New government job notifications",
    count: 150,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    href: "/admit-card",
    icon: CreditCard,
    label: "Admit Card",
    labelHindi: "एडमिट कार्ड",
    description: "Download exam hall tickets",
    count: 45,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    href: "/result",
    icon: Trophy,
    label: "Result",
    labelHindi: "परिणाम",
    description: "Check exam results",
    count: 38,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    href: "/answer-key",
    icon: Key,
    label: "Answer Key",
    labelHindi: "उत्तर कुंजी",
    description: "Official answer keys",
    count: 22,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    href: "/syllabus",
    icon: BookOpen,
    label: "Syllabus",
    labelHindi: "पाठ्यक्रम",
    description: "Exam syllabus & pattern",
    count: 65,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    href: "/admission",
    icon: GraduationCap,
    label: "Admission",
    labelHindi: "प्रवेश",
    description: "College & university admissions",
    count: 28,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Browse by Category
          </h2>
          <p className="text-muted-foreground">
            Find jobs, admit cards, results and more
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card className="card-hover h-full border-border hover:border-primary/50 group">
                <CardContent className="p-4 md:p-6 text-center">
                  <div
                    className={cn(
                      "mx-auto w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 transition-colors",
                      category.bgColor,
                      "group-hover:bg-primary group-hover:text-primary-foreground"
                    )}
                  >
                    <category.icon
                      className={cn(
                        "h-6 w-6 md:h-7 md:w-7 transition-colors",
                        category.color,
                        "group-hover:text-primary-foreground"
                      )}
                    />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
                    {category.label}
                  </h3>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    {category.labelHindi}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-primary font-medium">
                    <span>{category.count} new</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
