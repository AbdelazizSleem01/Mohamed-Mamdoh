"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Award, ExternalLink } from "lucide-react";
import { usePortfolioData } from "./portfolio-data-provider";

export function Certifications() {
  const { data } = usePortfolioData();
  const { certifications } = data;

  return (
    <section id="certifications" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Certifications"
          subtitle="Industry-recognized credentials and professional certifications"
          icon={<Award className="h-5 w-5" />}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-teal-500/30 transition-all"
            >
              {/* Gradient corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-teal-500/10 to-transparent rounded-tr-2xl rounded-bl-[3rem]" />

              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/25">
                  <Award className="h-5 w-5 text-white" />
                </div>

                <h3 className="font-bold text-base mb-1.5 leading-tight">
                  {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>

                {cert.link && cert.link !== "#" && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    View Credential
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
