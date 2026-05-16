"use client";

import { personalInfo } from "@/lib/data";
import { Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const firstName = personalInfo.name.split(" ").slice(0, 2).join(" ");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="rounded-2xl border border-border/70 bg-background/60 backdrop-blur-sm px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col gap-5 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/LOGO.png"
                alt="Logo"
                className="w-9 h-9 rounded-xl object-cover ring-1 ring-border"
              />
              <div className="text-sm">
                <p className="font-semibold text-foreground">{firstName}</p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  IT Help Desk Specialist & System Administrator
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
              <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
              <span className="hidden sm:inline">&middot;</span>
              <span className="inline-flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              </span>
              <span className="hidden sm:inline">&middot;</span>
              <a
                href="https://abdelaziz-sleem.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium text-teal-700 transition-colors hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200"
              >
                 by Abdelaziz Sleem
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
