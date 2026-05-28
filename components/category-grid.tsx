import Link from "next/link";
import {
  Monitor,
  IndianRupee,
  TrendingUp,
  Settings,
  Heart,
  GraduationCap,
  Palette,
  Users,
} from "lucide-react";
import { categories } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="h-6 w-6" />,
  IndianRupee: <IndianRupee className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Settings: <Settings className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
};

export function CategoryGrid() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[hsl(var(--muted-foreground))]">
            Explore thousands of job opportunities across various industries and
            find the perfect role for your skills.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/jobs?category=${category.id}`}
              className="group flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 transition-all hover:border-[hsl(var(--primary))] hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] transition-colors group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))]">
                {iconMap[category.icon]}
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(var(--foreground))]">
                  {category.name}
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {category.count.toLocaleString()} jobs
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
