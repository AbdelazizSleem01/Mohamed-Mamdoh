"use client";

import { personalInfo, navLinks } from "@/lib/data";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import {
  Menu,
  X,
  House,
  User,
  Wrench,
  Briefcase,
  GraduationCap,
  Award,
  Handshake,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const linkIconMap: Record<string, LucideIcon> = {
    Home: House,
    About: User,
    Skills: Wrench,
    Experience: Briefcase,
    Education: GraduationCap,
    Certifications: Award,
    Services: Handshake,
    Contact: Mail,
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className=" mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#hero");
          }}
          className="flex items-center gap-2 font-bold text-lg"
        >
          <img
            src="/LOGO-light.png"
            alt="Logo"
            className="w-12 h-12 rounded-xl object-cover"
          />
          <span className="hidden sm:inline">
            {personalInfo.name.split(" ").slice(0, 2).join(" ")}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="group relative px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg inline-flex items-center gap-1.5 transition-all duration-300 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-teal-500/10"
            >
              {(() => {
                const Icon = linkIconMap[link.label];
                return Icon ? (
                  <Icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                ) : null;
              })()}
              <span>{link.label}</span>
              <span className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-linear-to-r from-teal-500 to-emerald-500 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#contact");
            }}
            className="hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-lg bg-linear-to-r from-teal-500 to-emerald-600 text-white hover:opacity-90 transition-opacity"
          >
            Hire Me
          </a>
          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="group px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg transition-all duration-300 flex items-center gap-2 hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  {(() => {
                    const Icon = linkIconMap[link.label];
                    return Icon ? (
                      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                    ) : null;
                  })()}
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#contact");
                }}
                className="block px-3 py-2.5 text-sm font-medium text-center rounded-lg bg-linear-to-r from-teal-500 to-emerald-600 text-white mt-2"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
