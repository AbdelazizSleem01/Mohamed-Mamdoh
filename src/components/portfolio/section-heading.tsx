"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  icon,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <div
        className={`flex items-center gap-3 mb-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {icon && (
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
            {icon}
          </span>
        )}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          className={`text-muted-foreground max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-linear-to-r from-teal-500 to-emerald-500 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
