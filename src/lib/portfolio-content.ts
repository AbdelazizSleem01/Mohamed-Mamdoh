import {
  personalInfo,
  professionalSummary,
  aboutHighlights,
  skillCategories,
  softSkills,
  experiences,
  education,
  certifications,
  services,
  languages,
  navLinks,
} from "@/lib/data";

export type PortfolioContent = {
  personalInfo: typeof personalInfo;
  professionalSummary: string;
  aboutHighlights: typeof aboutHighlights;
  skillCategories: typeof skillCategories;
  softSkills: typeof softSkills;
  experiences: typeof experiences;
  education: typeof education;
  certifications: typeof certifications;
  services: typeof services;
  languages: typeof languages;
  navLinks: typeof navLinks;
};

export const defaultPortfolioContent: PortfolioContent = {
  personalInfo,
  professionalSummary,
  aboutHighlights,
  skillCategories,
  softSkills,
  experiences,
  education,
  certifications,
  services,
  languages,
  navLinks,
};
