"use client";

import { motion } from "framer-motion";
import { personalInfo, professionalSummary } from "@/lib/data";
import {
  ArrowDown,
  Download,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  MapPin,
  Phone,
} from "lucide-react";

export function Hero() {
  const socialLinks = [
    { icon: Facebook, href: personalInfo.social.facebook, label: "Facebook" },
    { icon: Instagram, href: personalInfo.social.instagram, label: "Instagram" },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: Github, href: personalInfo.social.github, label: "GitHub" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
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
              <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                {personalInfo.name.split(" ").slice(0, 2).join(" ")}
              </span>
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-teal-500/25"
              >
                <Download className="h-4 w-4" />
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card font-medium hover:bg-accent transition-all"
              >
                <Mail className="h-4 w-4" />
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card hover:bg-accent hover:border-teal-500/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Gradient ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 rotate-6 opacity-20 blur-sm" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/20 to-emerald-600/20 rotate-3 border border-teal-500/20" />
              {/* Image container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-border bg-card">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
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
