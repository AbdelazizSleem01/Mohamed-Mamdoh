"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import {
  Headphones,
  Server,
  Network,
  Cloud,
  Cpu,
  MonitorUp,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Headphones,
  Server,
  Network,
  Cloud,
  Cpu,
  MonitorUp,
};

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Services"
          subtitle="Professional IT services I can provide to help your organization"
          icon={<Server className="h-5 w-5" />}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const IconComp = iconMap[service.icon] || Server;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-teal-500/30 transition-all"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-teal-500 to-emerald-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:bg-teal-500/20 transition-colors">
                  <IconComp className="h-6 w-6" />
                </div>

                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 dark:text-teal-400 hover:gap-2.5 transition-all"
                >
                  Get in touch
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
