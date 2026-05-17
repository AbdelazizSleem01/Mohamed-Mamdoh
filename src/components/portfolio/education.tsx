"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { usePortfolioData } from "./portfolio-data-provider";

export function Education() {
  const { data } = usePortfolioData();
  const { education } = data;

  return (
    <section id="education" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Education"
          subtitle="Academic background and qualifications"
          icon={<GraduationCap className="h-5 w-5" />}
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex gap-6"
            >
              {/* Icon */}
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-teal-500/30 transition-all">
                <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                <p className="text-primary font-medium mb-3">
                  {edu.institution}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {edu.location}
                  </span>
                </div>
                {edu.details && (
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                    {edu.details}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
