"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUniversity,
  FaFacebook,
  FaInstagram,
  FaBriefcase,
  FaAward,
  FaWrench,
  FaServer,
  FaHome,
  FaBook,
  FaGlobe,
  FaShieldAlt,
  FaSignOutAlt,
  FaSave,
  FaSync,
  FaPlus,
  FaTrash,
  FaLightbulb,
  FaChevronDown,
  FaEye,
  FaEyeSlash,
  FaSearch,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { UnifiedIconPicker } from "@/components/admin/icon-picker";
import {
  defaultPortfolioContent,
  type PortfolioContent,
} from "@/lib/portfolio-content";

const SearchHighlightContext = createContext("");

function toLines(values: string[]) {
  return values.join("\n");
}

function fromLines(value: string) {
  return value.split("\n").map((line) => line.trim());
}

function compactLines(values: string[]) {
  return values.map((line) => line.trim()).filter(Boolean);
}

function normalizeForSave(content: PortfolioContent): PortfolioContent {
  return {
    ...content,
    aboutHighlights: compactLines(content.aboutHighlights),
    softSkills: compactLines(content.softSkills),
    skillCategories: content.skillCategories.map((category) => ({
      ...category,
      skills: compactLines(category.skills),
    })),
    experiences: content.experiences.map((experience) => ({
      ...experience,
      responsibilities: compactLines(experience.responsibilities),
    })),
  };
}

function showToast(icon: "success" | "error" | "info", title: string) {
  void Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    icon,
    title,
  });
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;
  const pattern = new RegExp(`(${escapeRegex(q)})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, index) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <mark
        key={`${part}-${index}`}
        className="rounded bg-amber-300/70 px-1 text-amber-950 dark:bg-amber-300/40 dark:text-amber-100"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: ComponentType<{ className?: string }>;
}) {
  const searchQuery = useContext(SearchHighlightContext);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const hasMatch =
    !!normalizedQuery &&
    (label.toLowerCase().includes(normalizedQuery) ||
      value.toLowerCase().includes(normalizedQuery));

  return (
    <label className="space-y-1.5 block">
      <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
        {highlightText(label, searchQuery)}
        {hasMatch && normalizedQuery ? (
          <span className="rounded-full border border-amber-400/70 bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            Matched
          </span>
        ) : null}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
          hasMatch
            ? "border-amber-400/80 bg-amber-50/70 focus:ring-amber-400/40 dark:bg-amber-900/15"
            : "border-input focus:ring-teal-500/40"
        }`}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  const searchQuery = useContext(SearchHighlightContext);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const hasMatch =
    !!normalizedQuery &&
    (label.toLowerCase().includes(normalizedQuery) ||
      value.toLowerCase().includes(normalizedQuery));

  return (
    <label className="space-y-1.5 block">
      <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1.5">
        {highlightText(label, searchQuery)}
        {hasMatch && normalizedQuery ? (
          <span className="rounded-full border border-amber-400/70 bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            Matched
          </span>
        ) : null}
      </span>
      <textarea
        className={`w-full rounded-xl border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
          hasMatch
            ? "border-amber-400/80 bg-amber-50/70 focus:ring-amber-400/40 dark:bg-amber-900/15"
            : "border-input focus:ring-teal-500/40"
        }`}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  searchQuery = "",
  titleHasMatch = false,
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  defaultOpen?: boolean;
  searchQuery?: string;
  titleHasMatch?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between"
      >
        <span className="inline-flex items-center gap-2 font-semibold text-sm sm:text-base">
          <span className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-300 flex items-center justify-center">
            <Icon className="h-4 w-4" />
          </span>
          {highlightText(title, searchQuery)}
          {searchQuery.trim() && !titleHasMatch ? (
            <mark className="rounded bg-amber-300/70 px-1.5 py-0.5 text-[10px] font-semibold text-amber-950 dark:bg-amber-300/40 dark:text-amber-100">
              {searchQuery.trim()}
            </mark>
          ) : null}
        </span>
        <FaChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      {open && <div className="px-4 sm:px-5 pb-5 space-y-4">{children}</div>}
    </section>
  );
}

export default function AdminPage() {
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent);
  const [loading, setLoading] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [newAdminUser, setNewAdminUser] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [sectionSearch, setSectionSearch] = useState("");

  const sectionsCount = useMemo(() => 10, []);
  const sectionFilters = useMemo(
    () => [
      { title: "Basic Information", keywords: ["basic", "info", "name", "email", "phone", "facebook", "instagram", "profile"] },
      { title: "Summary & About", keywords: ["summary", "about", "highlights"] },
      { title: "Skill Categories", keywords: ["skills", "category", "expertise"] },
      { title: "Services", keywords: ["services", "service"] },
      { title: "Navigation Links (Header)", keywords: ["nav", "navigation", "header", "links"] },
      { title: "Experience", keywords: ["experience", "role", "company"] },
      { title: "Education", keywords: ["education", "degree", "institution"] },
      { title: "Certifications", keywords: ["certifications", "certificate", "issuer"] },
      { title: "Soft Skills & Languages", keywords: ["soft skills", "languages", "language"] },
      { title: "Admin Credentials", keywords: ["admin", "credentials", "password", "username", "login"] },
    ],
    [],
  );
  const searchQuery = sectionSearch.trim().toLowerCase();
  const sectionSearchIndex = useMemo<Record<string, string>>(
    () => ({
      "Basic Information": [
        content.personalInfo.name,
        content.personalInfo.title,
        content.personalInfo.shortTitle,
        content.personalInfo.location,
        content.personalInfo.email,
        content.personalInfo.phone,
        content.personalInfo.university,
        content.personalInfo.social.facebook,
        content.personalInfo.social.instagram,
        content.personalInfo.profileImage,
      ]
        .join(" ")
        .toLowerCase(),
      "Summary & About": [content.professionalSummary, ...content.aboutHighlights]
        .join(" ")
        .toLowerCase(),
      "Skill Categories": content.skillCategories
        .flatMap((category) => [category.title, category.icon, ...category.skills])
        .join(" ")
        .toLowerCase(),
      Services: content.services
        .flatMap((service) => [service.title, service.description, service.icon])
        .join(" ")
        .toLowerCase(),
      "Navigation Links (Header)": content.navLinks
        .flatMap((link) => [link.label, link.href, (link as { icon?: string }).icon ?? ""])
        .join(" ")
        .toLowerCase(),
      Experience: content.experiences
        .flatMap((experience) => [
          experience.role,
          experience.company,
          experience.location,
          experience.period,
          ...experience.responsibilities,
        ])
        .join(" ")
        .toLowerCase(),
      Education: content.education
        .flatMap((item) => [item.degree, item.institution, item.period, item.location, item.details ?? ""])
        .join(" ")
        .toLowerCase(),
      Certifications: content.certifications
        .flatMap((item) => [item.name, item.issuer, item.link ?? ""])
        .join(" ")
        .toLowerCase(),
      "Soft Skills & Languages": [
        ...content.softSkills,
        ...content.languages.flatMap((lang) => [lang.name, lang.level]),
      ]
        .join(" ")
        .toLowerCase(),
      "Admin Credentials": [newAdminUser].join(" ").toLowerCase(),
    }),
    [content, newAdminUser],
  );
  const isSectionVisible = (title: string) => {
    if (!searchQuery) return true;
    const section = sectionFilters.find((item) => item.title === title);
    if (!section) return false;
    return (
      section.title.toLowerCase().includes(searchQuery) ||
      section.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery)) ||
      (sectionSearchIndex[title] ?? "").includes(searchQuery)
    );
  };
  const visibleSectionsCount = sectionFilters.filter((item) => isSectionVisible(item.title)).length;
  const titleMatchesSearch = (title: string) =>
    !!searchQuery && title.toLowerCase().includes(searchQuery);

  const fetchContent = async () => {
    const res = await fetch("/api/content", { cache: "no-store" });
    const json = (await res.json()) as { content?: PortfolioContent; error?: string };
    return { res, json };
  };

  const loadContent = async () => {
    setLoading(true);
    try {
      const { res, json } = await fetchContent();
      if (res.status === 401) return (window.location.href = "/admin/login");
      if (!res.ok || !json.content) return showToast("error", json.error ?? "Failed to load content");
      setContent(json.content);
      showToast("success", "Data loaded");
    } catch {
      showToast("error", "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    void fetchContent()
      .then(({ res, json }) => {
        if (cancelled) return;
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        if (!res.ok || !json.content) {
          showToast("error", json.error ?? "Failed to load content");
          return;
        }
        setContent(json.content);
      })
      .catch(() => {
        if (!cancelled) showToast("error", "Failed to load content");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const saveContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: normalizeForSave(content) }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (res.status === 401) return (window.location.href = "/admin/login");
      if (!res.ok || !json.ok) return showToast("error", json.error ?? "Failed to save content");
      showToast("success", "Changes saved");
    } catch {
      showToast("error", "Failed to save content");
    } finally {
      setLoading(false);
    }
  };

  const updateAdminCredentials = async () => {
    if (!newAdminUser || !newAdminPass) {
      return showToast("info", "Please enter username and password");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newAdminUser, password: newAdminPass }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (res.status === 401) return (window.location.href = "/admin/login");
      if (!res.ok || !json.ok) return showToast("error", json.error ?? "Failed to update credentials");

      await Swal.fire({
        icon: "success",
        title: "Admin credentials updated",
        text: "You will be redirected to login again.",
        confirmButtonColor: "#0d9488",
      });

      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch {
      showToast("error", "Failed to update credentials");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-teal-500/5 via-background to-background py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-3 z-40 rounded-2xl border border-border bg-card/90 backdrop-blur-md p-5 sm:p-6 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Control Center</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage every piece of content shown on your portfolio website.</p>
              <p className="text-xs text-muted-foreground mt-2">Sections controlled: {sectionsCount}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setTipsOpen((s) => !s)} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent">
                <FaLightbulb className="h-3.5 w-3.5" />
                Quick Tips
              </button>
              <button onClick={loadContent} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent disabled:opacity-60">
                <FaSync className="h-3.5 w-3.5" />
                Load
              </button>
              <button onClick={saveContent} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60">
                <FaSave className="h-3.5 w-3.5" />
                Save
              </button>
              <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                <FaSignOutAlt className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          </div>

          {tipsOpen && (
            <div className="mt-4 rounded-xl border border-teal-500/30 bg-teal-500/10 p-4 text-sm text-teal-900 dark:text-teal-100 space-y-1">
              <p>1. Click <strong>Load</strong> before editing to get latest saved data.</p>
              <p>2. Edit fields section by section, then click <strong>Save</strong>.</p>
              <p>3. In list fields, write one item per line.</p>
              <p>4. Change admin credentials from the last section when needed.</p>
            </div>
          )}
        </motion.div>

        <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
          <label className="space-y-1.5 block">
            <span className="text-xs font-semibold text-muted-foreground">Search In Dashboard</span>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={sectionSearch}
                onChange={(e) => setSectionSearch(e.target.value)}
                placeholder="Search sections: skills, education, contact, admin..."
                className="w-full rounded-xl border border-input bg-background pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Showing {visibleSectionsCount} of {sectionsCount} sections
            </p>
          </label>
        </div>

        <SearchHighlightContext.Provider value={sectionSearch}>
        <div className="space-y-4">
          {isSectionVisible("Basic Information") && <SectionCard title="Basic Information" icon={FaUser} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Basic Information")}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Full Name" icon={FaUser} value={content.personalInfo.name} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, name: v } }))} />
              <Field label="Main Title" icon={FaBriefcase} value={content.personalInfo.title} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, title: v } }))} />
              <Field label="Short Title" icon={FaBriefcase} value={content.personalInfo.shortTitle} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, shortTitle: v } }))} />
              <Field label="Location" icon={FaMapMarkerAlt} value={content.personalInfo.location} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, location: v } }))} />
              <Field label="Email" icon={FaEnvelope} value={content.personalInfo.email} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, email: v } }))} />
              <Field label="Phone" icon={FaPhone} value={content.personalInfo.phone} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, phone: v } }))} />
              <Field label="University" icon={FaUniversity} value={content.personalInfo.university} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, university: v } }))} />
              <Field label="Facebook Link" icon={FaFacebook} value={content.personalInfo.social.facebook} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, social: { ...p.personalInfo.social, facebook: v } } }))} />
              <Field label="Instagram Link" icon={FaInstagram} value={content.personalInfo.social.instagram} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, social: { ...p.personalInfo.social, instagram: v } } }))} />
              <div className="space-y-2 sm:col-span-1 lg:col-span-1">
                <Field label="Profile Image URL" icon={FaGlobe} value={content.personalInfo.profileImage} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, profileImage: v } }))} />
                {content.personalInfo.profileImage ? (
                  <div className="inline-flex rounded-xl border border-border bg-background/70 p-2">
                    <img
                      src={content.personalInfo.profileImage}
                      alt="Profile preview"
                      className="h-28 w-28 rounded-lg object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </SectionCard>}

          {isSectionVisible("Summary & About") && <SectionCard title="Summary & About" icon={FaBook} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Summary & About")}>
            <TextAreaField label="Professional Summary" value={content.professionalSummary} rows={5} onChange={(v) => setContent((p) => ({ ...p, professionalSummary: v }))} />
            <TextAreaField label="About Highlights (one per line)" value={toLines(content.aboutHighlights)} rows={5} onChange={(v) => setContent((p) => ({ ...p, aboutHighlights: fromLines(v) }))} />
          </SectionCard>}

          {isSectionVisible("Skill Categories") && <SectionCard title="Skill Categories" icon={FaWrench} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Skill Categories")}>
            {content.skillCategories.map((cat, i) => (
              <div key={i} className="rounded-xl border border-border p-3 sm:p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Category Title" value={cat.title} onChange={(v) => setContent((p) => ({ ...p, skillCategories: p.skillCategories.map((x, idx) => (idx === i ? { ...x, title: v } : x)) }))} />
                  <UnifiedIconPicker label="Category Icon" value={cat.icon} onChange={(v) => setContent((p) => ({ ...p, skillCategories: p.skillCategories.map((x, idx) => (idx === i ? { ...x, icon: v } : x)) }))} />
                </div>
                <TextAreaField label="Skills (one per line)" value={toLines(cat.skills)} rows={4} onChange={(v) => setContent((p) => ({ ...p, skillCategories: p.skillCategories.map((x, idx) => (idx === i ? { ...x, skills: fromLines(v) } : x)) }))} />
                <button type="button" onClick={() => setContent((p) => ({ ...p, skillCategories: p.skillCategories.filter((_, idx) => idx !== i) }))} className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                  <FaTrash className="h-3 w-3" /> Remove Category
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <button type="button" onClick={() => setContent((p) => ({ ...p, skillCategories: [...p.skillCategories, { title: "", icon: "Monitor", skills: [] }] }))} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-3 py-2 text-xs font-semibold hover:bg-emerald-100 dark:border-emerald-700/60 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/35">
                <FaPlus className="h-3 w-3" /> Add Category
              </button>
            </div>
          </SectionCard>}

          {isSectionVisible("Services") && <SectionCard title="Services" icon={FaServer} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Services")}>
            {content.services.map((service, i) => (
              <div key={i} className="rounded-xl border border-border p-3 sm:p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Service Title" value={service.title} onChange={(v) => setContent((p) => ({ ...p, services: p.services.map((x, idx) => (idx === i ? { ...x, title: v } : x)) }))} />
                  <UnifiedIconPicker label="Service Icon" value={service.icon} onChange={(v) => setContent((p) => ({ ...p, services: p.services.map((x, idx) => (idx === i ? { ...x, icon: v } : x)) }))} />
                </div>
                <TextAreaField label="Service Description" value={service.description} rows={4} onChange={(v) => setContent((p) => ({ ...p, services: p.services.map((x, idx) => (idx === i ? { ...x, description: v } : x)) }))} />
                <button type="button" onClick={() => setContent((p) => ({ ...p, services: p.services.filter((_, idx) => idx !== i) }))} className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                  <FaTrash className="h-3 w-3" /> Remove Service
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <button type="button" onClick={() => setContent((p) => ({ ...p, services: [...p.services, { title: "", description: "", icon: "Server" }] }))} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-3 py-2 text-xs font-semibold hover:bg-emerald-100 dark:border-emerald-700/60 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/35">
                <FaPlus className="h-3 w-3" /> Add Service
              </button>
            </div>
          </SectionCard>}

          {isSectionVisible("Navigation Links (Header)") && <SectionCard title="Navigation Links (Header)" icon={FaHome} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Navigation Links (Header)")}>
            {content.navLinks.map((link, i) => (
              <div key={i} className="rounded-xl border border-border p-3 sm:p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Label" value={link.label} onChange={(v) => setContent((p) => ({ ...p, navLinks: p.navLinks.map((x, idx) => (idx === i ? { ...x, label: v } : x)) }))} />
                  <Field label="Href" value={link.href} onChange={(v) => setContent((p) => ({ ...p, navLinks: p.navLinks.map((x, idx) => (idx === i ? { ...x, href: v } : x)) }))} />
                  <UnifiedIconPicker label="Header Icon" value={(link as { icon?: string }).icon ?? "House"} onChange={(v) => setContent((p) => ({ ...p, navLinks: p.navLinks.map((x, idx) => (idx === i ? { ...x, icon: v } : x)) }))} />
                </div>
                <button type="button" onClick={() => setContent((p) => ({ ...p, navLinks: p.navLinks.filter((_, idx) => idx !== i) }))} className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                  <FaTrash className="h-3 w-3" /> Remove Link
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <button type="button" onClick={() => setContent((p) => ({ ...p, navLinks: [...p.navLinks, { label: "", href: "#", icon: "House" }] }))} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-3 py-2 text-xs font-semibold hover:bg-emerald-100 dark:border-emerald-700/60 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/35">
                <FaPlus className="h-3 w-3" /> Add Nav Link
              </button>
            </div>
          </SectionCard>}

          {isSectionVisible("Experience") && <SectionCard title="Experience" icon={FaBriefcase} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Experience")}>
            {content.experiences.map((exp, i) => (
              <div key={i} className="rounded-xl border border-border p-3 sm:p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Role" value={exp.role} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, role: v } : x)) }))} />
                  <Field label="Company" value={exp.company} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, company: v } : x)) }))} />
                  <Field label="Location" value={exp.location} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, location: v } : x)) }))} />
                  <Field label="Period" value={exp.period} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, period: v } : x)) }))} />
                </div>
                <TextAreaField label="Responsibilities (one per line)" value={toLines(exp.responsibilities)} rows={5} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, responsibilities: fromLines(v) } : x)) }))} />
                <button type="button" onClick={() => setContent((p) => ({ ...p, experiences: p.experiences.filter((_, idx) => idx !== i) }))} className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                  <FaTrash className="h-3 w-3" /> Remove Experience
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <button type="button" onClick={() => setContent((p) => ({ ...p, experiences: [...p.experiences, { role: "", company: "", location: "", period: "", responsibilities: [] }] }))} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-3 py-2 text-xs font-semibold hover:bg-emerald-100 dark:border-emerald-700/60 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/35">
                <FaPlus className="h-3 w-3" /> Add Experience
              </button>
            </div>
          </SectionCard>}

          {isSectionVisible("Education") && <SectionCard title="Education" icon={FaUniversity} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Education")}>
            {content.education.map((edu, i) => (
              <div key={i} className="rounded-xl border border-border p-3 sm:p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Degree" value={edu.degree} onChange={(v) => setContent((p) => ({ ...p, education: p.education.map((x, idx) => (idx === i ? { ...x, degree: v } : x)) }))} />
                  <Field label="Institution" value={edu.institution} onChange={(v) => setContent((p) => ({ ...p, education: p.education.map((x, idx) => (idx === i ? { ...x, institution: v } : x)) }))} />
                  <Field label="Period" value={edu.period} onChange={(v) => setContent((p) => ({ ...p, education: p.education.map((x, idx) => (idx === i ? { ...x, period: v } : x)) }))} />
                  <Field label="Location" value={edu.location} onChange={(v) => setContent((p) => ({ ...p, education: p.education.map((x, idx) => (idx === i ? { ...x, location: v } : x)) }))} />
                </div>
                <button type="button" onClick={() => setContent((p) => ({ ...p, education: p.education.filter((_, idx) => idx !== i) }))} className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                  <FaTrash className="h-3 w-3" /> Remove Education
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <button type="button" onClick={() => setContent((p) => ({ ...p, education: [...p.education, { degree: "", institution: "", period: "", location: "", details: "" }] }))} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-3 py-2 text-xs font-semibold hover:bg-emerald-100 dark:border-emerald-700/60 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/35">
                <FaPlus className="h-3 w-3" /> Add Education
              </button>
            </div>
          </SectionCard>}

          {isSectionVisible("Certifications") && <SectionCard title="Certifications" icon={FaAward} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Certifications")}>
            {content.certifications.map((cert, i) => (
              <div key={i} className="rounded-xl border border-border p-3 sm:p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Certification Name" value={cert.name} onChange={(v) => setContent((p) => ({ ...p, certifications: p.certifications.map((x, idx) => (idx === i ? { ...x, name: v } : x)) }))} />
                  <Field label="Issuer" value={cert.issuer} onChange={(v) => setContent((p) => ({ ...p, certifications: p.certifications.map((x, idx) => (idx === i ? { ...x, issuer: v } : x)) }))} />
                  <Field label="Credential Link" value={cert.link ?? ""} onChange={(v) => setContent((p) => ({ ...p, certifications: p.certifications.map((x, idx) => (idx === i ? { ...x, link: v } : x)) }))} />
                </div>
                <button type="button" onClick={() => setContent((p) => ({ ...p, certifications: p.certifications.filter((_, idx) => idx !== i) }))} className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                  <FaTrash className="h-3 w-3" /> Remove Certification
                </button>
              </div>
            ))}
            <div className="flex justify-end">
              <button type="button" onClick={() => setContent((p) => ({ ...p, certifications: [...p.certifications, { name: "", issuer: "", link: "" }] }))} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-3 py-2 text-xs font-semibold hover:bg-emerald-100 dark:border-emerald-700/60 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/35">
                <FaPlus className="h-3 w-3" /> Add Certification
              </button>
            </div>
          </SectionCard>}

          {isSectionVisible("Soft Skills & Languages") && <SectionCard title="Soft Skills & Languages" icon={FaGlobe} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Soft Skills & Languages")}>
            <TextAreaField label="Soft Skills (one per line)" value={toLines(content.softSkills)} rows={6} onChange={(v) => setContent((p) => ({ ...p, softSkills: fromLines(v) }))} />
            <TextAreaField
              label="Languages (format: Name - Level)"
              value={content.languages.map((l) => `${l.name} - ${l.level}`).join("\n")}
              rows={4}
              onChange={(v) =>
                setContent((p) => ({
                  ...p,
                  languages: fromLines(v).map((line) => {
                    const [name, level] = line.split("-").map((x) => x.trim());
                    return { name: name ?? "", level: level ?? "" };
                  }),
                }))
              }
            />
          </SectionCard>}

          {isSectionVisible("Admin Credentials") && <SectionCard title="Admin Credentials" icon={FaShieldAlt} searchQuery={sectionSearch} titleHasMatch={titleMatchesSearch("Admin Credentials")}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="New Admin Username" value={newAdminUser} onChange={setNewAdminUser} />
              <label className="space-y-1.5 block">
                <span className="text-xs font-semibold text-muted-foreground">New Admin Password</span>
                <div className="relative">
                  <input
                    type={showAdminPass ? "text" : "password"}
                    value={newAdminPass}
                    onChange={(e) => setNewAdminPass(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                    aria-label={showAdminPass ? "Hide password" : "Show password"}
                  >
                    {showAdminPass ? <FaEyeSlash className="h-3.5 w-3.5" /> : <FaEye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </label>
            </div>
            <button
              type="button"
              onClick={updateAdminCredentials}
              disabled={loading || !newAdminUser || !newAdminPass}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent disabled:opacity-60"
            >
              <FaShieldAlt className="h-3.5 w-3.5" /> Update Admin Login
            </button>
          </SectionCard>}
          {visibleSectionsCount === 0 && (
            <div className="rounded-2xl border border-border bg-card/70 p-6 text-center text-sm text-muted-foreground">
              No sections matched your search. Try another keyword.
            </div>
          )}
        </div>
        </SearchHighlightContext.Provider>
      </div>
    </main>
  );
}




