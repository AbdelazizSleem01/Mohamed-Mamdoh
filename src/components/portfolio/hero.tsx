"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  Facebook,
  Instagram,
  MapPin,
  Phone,
} from "lucide-react";
import { usePortfolioData } from "./portfolio-data-provider";

export function Hero() {
  const { data } = usePortfolioData();
  const { personalInfo, professionalSummary } = data;
  const socialLinks = [
    { icon: Facebook, href: personalInfo.social.facebook, label: "Facebook" },
    { icon: Instagram, href: personalInfo.social.instagram, label: "Instagram" },
    { icon: Phone, href: `tel:${personalInfo.phone}`, label: "Phone" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-teal-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary/5 border border-border text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for opportunities
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Hi, I&apos;m{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="bg-linear-to-r from-teal-500 via-emerald-500 to-teal-500 bg-size-[200%_200%] bg-clip-text text-transparent"
              >
                {personalInfo.name.split(" ").slice(0, 2).join(" ")}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-4"
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              {professionalSummary.slice(0, 200)}...
            </motion.p>

            {/* Quick info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground mb-8"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-teal-500" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-teal-500" />
                {personalInfo.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-teal-500" />
                {personalInfo.email}
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <a
                href="/Mohamed_Mamdouh_Resume.pdf"
                download
                className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-teal-500 to-emerald-600 text-white font-medium transition-all duration-300 shadow-lg shadow-teal-500/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-500/35"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                Download CV
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-300"
              >
                <Mail className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                Contact Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label === "Phone" ? undefined : "_blank"}
                  rel={social.label === "Phone" ? undefined : "noopener noreferrer"}
                  className="group flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Gradient ring */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-teal-500 to-emerald-600 rotate-6 opacity-20 blur-sm" />
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-teal-500/20 to-emerald-600/20 rotate-3 border border-teal-500/20" />
              {/* Image container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-border bg-card">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs font-medium">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
