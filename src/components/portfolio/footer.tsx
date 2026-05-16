"use client";

import { personalInfo } from "@/lib/data";
import { Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} {personalInfo.name.split(" ").slice(0, 2).join(" ")}</span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="hidden sm:inline flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> All rights reserved.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium hover:bg-accent transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
