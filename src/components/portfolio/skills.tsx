"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import {
  BadgeCheck,
  Heart,
} from "lucide-react";
import { usePortfolioData } from "./portfolio-data-provider";
import { getIconComponent } from "@/lib/icon-catalog";

export function Skills() {
  const { data } = usePortfolioData();
  const { skillCategories, softSkills } = data;

  return (
    <section id="skills" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technical proficiencies and professional capabilities"
          icon={<BadgeCheck className="h-5 w-5" />}
        />

        {/* Technical Skills Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, idx) => {
            const IconComp = getIconComponent(category.icon);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-500/10"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -top-20 -right-16 h-44 w-44 rounded-full bg-teal-500/10 blur-3xl" />
                </div>

                <div className="relative mb-5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
                    {category.skills.length} Skills
                  </span>
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 transition-colors group-hover:bg-teal-500/20">
                    <IconComp className="h-5 w-5" />
                  </span>
                </div>

                <h3 className="relative text-base font-semibold mb-4">{category.title}</h3>

                <div className="relative flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border/70 bg-muted/60 text-muted-foreground transition-all duration-300 hover:border-teal-500/40 hover:bg-teal-500/10 hover:text-teal-700 dark:hover:text-teal-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
          </div>

          <h3 className="relative text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <Heart className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </span>
            Soft Skills
          </h3>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {softSkills.map((skill, idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group flex items-center gap-2 px-4 py-3 rounded-xl border border-border/70 bg-muted/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-500/40 hover:bg-teal-500/10"
              >
                <span className="w-2 h-2 rounded-full bg-teal-500 transition-transform duration-300 group-hover:scale-125" />
                <span className="text-sm font-medium text-foreground/90">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
