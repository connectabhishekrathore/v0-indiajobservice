"use client";

import { useEffect, useState } from "react";
import { TRENDING_ITEMS } from "@/lib/mock-data";
import { Flame } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function TrendingMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border-b border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-10">
          <div className="flex items-center gap-2 pr-4 border-r border-border shrink-0">
            <Flame className="h-4 w-4 text-destructive animate-pulse" />
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">
              Trending
            </span>
          </div>
          <div
            className="flex-1 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex gap-8 ${isPaused ? "" : "animate-marquee"}`}
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {[...TRENDING_ITEMS, ...TRENDING_ITEMS].map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  href={item.link}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.isNew && (
                    <Badge variant="new" className="text-[10px] px-1.5 py-0">
                      NEW
                    </Badge>
                  )}
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
