"use client";

import { motion } from "framer-motion";
import { skillCategories, softSkills } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import {
  Monitor,
  Network,
  Cloud,
  Wrench,
  BadgeCheck,
  Heart,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Network,
  Cloud,
  Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technical proficiencies and professional capabilities"
          icon={<BadgeCheck className="h-5 w-5" />}
        />

        {/* Technical Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, idx) => {
            const IconComp = iconMap[category.icon] || Monitor;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-teal-500/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                    <IconComp className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
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
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Heart className="h-4 w-4 text-primary" />
            </span>
            Soft Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {softSkills.map((skill, idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 hover:bg-teal-500/10 transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-teal-500 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
