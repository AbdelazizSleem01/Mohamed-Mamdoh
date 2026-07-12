"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { UnifiedIconPicker } from "@/components/admin/icon-picker";
import {
  defaultPortfolioContent,
  type PortfolioContent,
} from "@/lib/portfolio-content";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";

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

// Escapes special characters for regex matching
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
        {Icon ? <Icon className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" /> : null}
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
        className={`w-full rounded-xl border bg-background/50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
          hasMatch
            ? "border-amber-400/80 bg-amber-50/70 focus:ring-amber-400/40 dark:bg-amber-950/20"
            : "border-border hover:border-muted-foreground/30 focus:border-teal-500 focus:ring-teal-500/20"
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
        className={`w-full rounded-xl border bg-background/50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
          hasMatch
            ? "border-amber-400/80 bg-amber-50/70 focus:ring-amber-400/40 dark:bg-amber-950/20"
            : "border-border hover:border-muted-foreground/30 focus:border-teal-500 focus:ring-teal-500/20"
        }`}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

// Defining tabs list
const TABS = [
  { id: "basic", title: "Basic Information", icon: FaUser, keywords: ["basic", "info", "name", "email", "phone", "facebook", "instagram", "profile"] },
  { id: "about", title: "Summary & About", icon: FaBook, keywords: ["summary", "about", "highlights"] },
  { id: "skills", title: "Skill Categories", icon: FaWrench, keywords: ["skills", "category", "expertise"] },
  { id: "services", title: "Services", icon: FaServer, keywords: ["services", "service"] },
  { id: "navigation", title: "Navigation Links (Header)", icon: FaHome, keywords: ["nav", "navigation", "header", "links"] },
  { id: "experience", title: "Experience", icon: FaBriefcase, keywords: ["experience", "role", "company"] },
  { id: "education", title: "Education", icon: FaUniversity, keywords: ["education", "degree", "institution"] },
  { id: "certifications", title: "Certifications", icon: FaAward, keywords: ["certifications", "certificate", "issuer"] },
  { id: "softskills", title: "Soft Skills & Languages", icon: FaGlobe, keywords: ["soft skills", "languages", "language"] },
  { id: "admin", title: "Admin Credentials", icon: FaShieldAlt, keywords: ["admin", "credentials", "password", "username", "login"] },
] as const;

export default function AdminPage() {
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent);
  const [loading, setLoading] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [newAdminUser, setNewAdminUser] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [sectionSearch, setSectionSearch] = useState("");
  
  // Sidebar states
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionsCount = useMemo(() => TABS.length, []);
  
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

  const searchQuery = sectionSearch.trim().toLowerCase();

  // Find tabs matching search query
  const matchedTabIds = useMemo(() => {
    if (!searchQuery) return [];
    return TABS.filter((tab) => {
      const titleMatch = tab.title.toLowerCase().includes(searchQuery);
      const keywordMatch = tab.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery));
      const contentMatch = (sectionSearchIndex[tab.title] ?? "").includes(searchQuery);
      return titleMatch || keywordMatch || contentMatch;
    }).map((t) => t.id);
  }, [searchQuery, sectionSearchIndex]);

  useEffect(() => {
    if (searchQuery && matchedTabIds.length > 0 && !matchedTabIds.includes(activeTab as any)) {
      setActiveTab(matchedTabIds[0]);
    }
  }, [searchQuery, matchedTabIds, activeTab]);

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

  // Navigation helpers
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);
  const prevTab = activeIndex > 0 ? TABS[activeIndex - 1] : null;
  const nextTab = activeIndex < TABS.length - 1 ? TABS[activeIndex + 1] : null;

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-card">
      {/* Brand Header */}
      <div className="p-6 border-b border-border flex items-center gap-3">
        <img
          src="/LOGO-light.png"
          alt="Logo"
          className="w-10 h-10 rounded-xl object-cover shadow-md shadow-teal-500/10 border border-teal-500/10"
        />
        <div>
          <h2 className="font-bold text-sm leading-tight tracking-wide">Mohamed Mamdouh</h2>
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Admin Dashboard
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin">
        <p className="px-3 text-[10px] font-bold tracking-widest text-muted-foreground/75 uppercase mb-3">Sections</p>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isMatched = searchQuery && matchedTabIds.includes(tab.id);

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group relative ${
                isActive
                  ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-l-[3px] border-teal-500 rounded-l-none pl-4.5"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 transition-colors ${
                  isActive ? "text-teal-600 dark:text-teal-400" : "text-muted-foreground/75 group-hover:text-foreground"
                }`} />
                {tab.title}
              </span>
              
              {isMatched && (
                <span className="rounded-full bg-amber-400/80 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-950 uppercase tracking-tighter">
                  Match
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Info */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            {content.personalInfo.profileImage ? (
              <img
                src={content.personalInfo.profileImage}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border border-teal-500/10 shadow-xs"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
                {content.personalInfo.name ? content.personalInfo.name.charAt(0) : "A"}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[11px] font-bold truncate leading-tight">
                {content.personalInfo.name 
                  ? content.personalInfo.name.split(" ").slice(0, 2).join(" ") 
                  : "Administrator"}
              </p>
              <p className="text-[9px] text-muted-foreground truncate max-w-[130px]">{content.personalInfo.title || "Portfolio Owner"}</p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-background transition-all"
            title="View Live Website"
          >
            <FaExternalLinkAlt className="h-3 w-3" />
          </a>
        </div>

        <button 
          onClick={logout} 
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-600 dark:text-red-400 py-2.5 text-xs font-bold transition-all"
        >
          <FaSignOutAlt className="h-3.5 w-3.5" />
          Logout Control
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background text-foreground overflow-hidden">
      
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-border bg-card shrink-0 h-screen sticky top-0">
        {renderSidebarContent()}
      </aside>

      {/* 2. Mobile Sidebar Overlay Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop wrapper */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            />
            {/* Sidebar drawer body */}
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border flex flex-col z-50 shadow-2xl"
            >
              <div className="absolute right-4 top-4 z-50 lg:hidden">
                <button 
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-all"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>
              {renderSidebarContent()}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Main content area wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header sticky bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-6 border-b border-border bg-card/65 backdrop-blur-md shrink-0">
          
          {/* Mobile menu toggle & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              aria-label="Toggle menu"
            >
              <FaBars className="h-4 w-4" />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 items-center justify-center">
                {(() => {
                  const activeItem = TABS.find((t) => t.id === activeTab);
                  const Icon = activeItem?.icon || FaUser;
                  return <Icon className="h-4 w-4" />;
                })()}
              </span>
              <h1 className="text-base md:text-lg font-bold tracking-tight">
                {TABS.find((t) => t.id === activeTab)?.title || "Dashboard"}
              </h1>
            </div>
          </div>

          {/* Quick Actions & Tips Panel Control */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setTipsOpen((s) => !s)} 
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border border-border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                tipsOpen ? "bg-teal-500/15 border-teal-500/30 text-teal-600 dark:text-teal-400" : "hover:bg-accent"
              }`}
              title="Quick Tips"
            >
              <FaLightbulb className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tips</span>
            </button>

            <button 
              onClick={loadContent} 
              disabled={loading} 
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-border text-xs font-semibold hover:bg-accent flex items-center gap-1.5 transition-all disabled:opacity-50"
              title="Reload Data"
            >
              <FaSync className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Load</span>
            </button>

            <button 
              onClick={saveContent} 
              disabled={loading} 
              className="px-3.5 py-2 rounded-xl bg-linear-to-r from-teal-500 to-emerald-600 text-xs font-bold text-white shadow-md shadow-teal-500/15 hover:shadow-teal-500/25 flex items-center gap-1.5 transition-all disabled:opacity-60"
              title="Save All Changes"
            >
              <FaSave className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </header>

        {/* Scrollable Main content area */}
        <div className="flex-1 overflow-y-auto min-w-0">
          <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            
            {/* Quick Tips Alert */}
            <AnimatePresence>
              {tipsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-4 text-xs md:text-sm text-teal-800 dark:text-teal-300 space-y-1.5 shadow-sm"
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <FaLightbulb className="h-4 w-4" />
                    <span>Control Center Guidance</span>
                  </div>
                  <p>1. Always click <strong>Load</strong> before editing to fetch latest saved information.</p>
                  <p>2. Edit your details category by category. Select tabs using the sidebar.</p>
                  <p>3. In list fields (e.g. highlights or responsibilities), write exactly <strong>one item per line</strong>.</p>
                  <p>4. Remember to click <strong>Save Changes</strong> at the top right to commit your edits permanently.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dashboard Search & Stats Widget Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Search Widget */}
              <div className="md:col-span-2 rounded-2xl border border-border bg-card p-4 flex flex-col justify-center">
                <label className="space-y-1.5 block">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Search settings & values</span>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      value={sectionSearch}
                      onChange={(e) => setSectionSearch(e.target.value)}
                      placeholder="Type keywords to filter sections (e.g. title, university, credentials)..."
                      className="w-full rounded-xl border border-border bg-background/50 pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 hover:border-muted-foreground/30 focus:border-teal-500 transition-all"
                    />
                  </div>
                </label>
              </div>

              {/* Quick Info stats banner */}
              <div className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Form Status</span>
                  <p className="text-xs font-bold text-teal-600 dark:text-teal-400">10 Working Sections</p>
                  <p className="text-[10px] text-muted-foreground">All synced with JSON database</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <FaServer className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Form Section Main Panel */}
            <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
              <SearchHighlightContext.Provider value={sectionSearch}>
                <div className="p-5 md:p-6 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Section Title Header */}
                      <div className="border-b border-border pb-4">
                        <h2 className="text-lg font-bold">
                          {TABS.find((t) => t.id === activeTab)?.title}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                          Configure fields and values for the {TABS.find((t) => t.id === activeTab)?.title.toLowerCase()} section.
                        </p>
                      </div>

                      {/* RENDERING ACTIVE TAB FIELDS */}
                      
                      {/* A. Basic Info */}
                      {activeTab === "basic" && (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          <Field label="Full Name" icon={FaUser} value={content.personalInfo.name} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, name: v } }))} />
                          <Field label="Main Title" icon={FaBriefcase} value={content.personalInfo.title} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, title: v } }))} />
                          <Field label="Short Title" icon={FaBriefcase} value={content.personalInfo.shortTitle} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, shortTitle: v } }))} />
                          <Field label="Location" icon={FaMapMarkerAlt} value={content.personalInfo.location} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, location: v } }))} />
                          <Field label="Email" icon={FaEnvelope} value={content.personalInfo.email} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, email: v } }))} />
                          <Field label="Phone" icon={FaPhone} value={content.personalInfo.phone} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, phone: v } }))} />
                          <Field label="University" icon={FaUniversity} value={content.personalInfo.university} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, university: v } }))} />
                          <Field label="Facebook Link" icon={FaFacebook} value={content.personalInfo.social.facebook} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, social: { ...p.personalInfo.social, facebook: v } } }))} />
                          <Field label="Instagram Link" icon={FaInstagram} value={content.personalInfo.social.instagram} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, social: { ...p.personalInfo.social, instagram: v } } }))} />
                          
                          <div className="space-y-3 sm:col-span-2 lg:col-span-3 border-t border-border pt-4 mt-2">
                            <Field label="Profile Image URL" icon={FaGlobe} value={content.personalInfo.profileImage} onChange={(v) => setContent((p) => ({ ...p, personalInfo: { ...p.personalInfo, profileImage: v } }))} />
                            {content.personalInfo.profileImage && (
                              <div className="inline-flex rounded-xl border border-border bg-muted/40 p-2">
                                <img
                                  src={content.personalInfo.profileImage}
                                  alt="Profile preview"
                                  className="h-24 w-24 rounded-lg object-cover shadow-sm"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).style.display = "none";
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* B. Summary & About */}
                      {activeTab === "about" && (
                        <div className="space-y-4">
                          <TextAreaField label="Professional Summary" value={content.professionalSummary} rows={6} onChange={(v) => setContent((p) => ({ ...p, professionalSummary: v }))} />
                          <TextAreaField label="About Highlights (one per line)" value={toLines(content.aboutHighlights)} rows={6} onChange={(v) => setContent((p) => ({ ...p, aboutHighlights: fromLines(v) }))} />
                        </div>
                      )}

                      {/* C. Skill Categories */}
                      {activeTab === "skills" && (
                        <div className="space-y-6">
                          {content.skillCategories.map((cat, i) => (
                            <div key={i} className="rounded-xl border border-border p-4 bg-muted/20 hover:border-teal-500/30 hover:bg-muted/30 transition-all space-y-4 relative group/item">
                              <div className="absolute right-4 top-4">
                                <button
                                  type="button"
                                  onClick={() => setContent((p) => ({ ...p, skillCategories: p.skillCategories.filter((_, idx) => idx !== i) }))}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all border border-transparent hover:border-red-200"
                                  title="Remove Category"
                                >
                                  <FaTrash className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              
                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Category Title" value={cat.title} onChange={(v) => setContent((p) => ({ ...p, skillCategories: p.skillCategories.map((x, idx) => (idx === i ? { ...x, title: v } : x)) }))} />
                                <UnifiedIconPicker label="Category Icon" value={cat.icon} onChange={(v) => setContent((p) => ({ ...p, skillCategories: p.skillCategories.map((x, idx) => (idx === i ? { ...x, icon: v } : x)) }))} />
                              </div>
                              <TextAreaField label="Skills (one per line)" value={toLines(cat.skills)} rows={4} onChange={(v) => setContent((p) => ({ ...p, skillCategories: p.skillCategories.map((x, idx) => (idx === i ? { ...x, skills: fromLines(v) } : x)) }))} />
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            onClick={() => setContent((p) => ({ ...p, skillCategories: [...p.skillCategories, { title: "", icon: "Monitor", skills: [] }] }))}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-teal-500/40 text-teal-600 dark:text-teal-400 hover:bg-teal-500/5 py-4.5 text-sm font-semibold transition-all cursor-pointer"
                          >
                            <FaPlus className="h-3.5 w-3.5" /> Add New Skill Category
                          </button>
                        </div>
                      )}

                      {/* D. Services */}
                      {activeTab === "services" && (
                        <div className="space-y-6">
                          {content.services.map((service, i) => (
                            <div key={i} className="rounded-xl border border-border p-4 bg-muted/20 hover:border-teal-500/30 hover:bg-muted/30 transition-all space-y-4 relative">
                              <div className="absolute right-4 top-4">
                                <button
                                  type="button"
                                  onClick={() => setContent((p) => ({ ...p, services: p.services.filter((_, idx) => idx !== i) }))}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all border border-transparent hover:border-red-200"
                                  title="Remove Service"
                                >
                                  <FaTrash className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              
                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Service Title" value={service.title} onChange={(v) => setContent((p) => ({ ...p, services: p.services.map((x, idx) => (idx === i ? { ...x, title: v } : x)) }))} />
                                <UnifiedIconPicker label="Service Icon" value={service.icon} onChange={(v) => setContent((p) => ({ ...p, services: p.services.map((x, idx) => (idx === i ? { ...x, icon: v } : x)) }))} />
                              </div>
                              <TextAreaField label="Service Description" value={service.description} rows={4} onChange={(v) => setContent((p) => ({ ...p, services: p.services.map((x, idx) => (idx === i ? { ...x, description: v } : x)) }))} />
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            onClick={() => setContent((p) => ({ ...p, services: [...p.services, { title: "", description: "", icon: "Server" }] }))}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-teal-500/40 text-teal-600 dark:text-teal-400 hover:bg-teal-500/5 py-4.5 text-sm font-semibold transition-all cursor-pointer"
                          >
                            <FaPlus className="h-3.5 w-3.5" /> Add New Service
                          </button>
                        </div>
                      )}

                      {/* E. Navigation Links */}
                      {activeTab === "navigation" && (
                        <div className="space-y-6">
                          {content.navLinks.map((link, i) => (
                            <div key={i} className="rounded-xl border border-border p-4 bg-muted/20 hover:border-teal-500/30 hover:bg-muted/30 transition-all space-y-4 relative">
                              <div className="absolute right-4 top-4">
                                <button
                                  type="button"
                                  onClick={() => setContent((p) => ({ ...p, navLinks: p.navLinks.filter((_, idx) => idx !== i) }))}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all border border-transparent hover:border-red-200"
                                  title="Remove Link"
                                >
                                  <FaTrash className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              
                              <div className="grid gap-4 sm:grid-cols-3">
                                <Field label="Label" value={link.label} onChange={(v) => setContent((p) => ({ ...p, navLinks: p.navLinks.map((x, idx) => (idx === i ? { ...x, label: v } : x)) }))} />
                                <Field label="Href" value={link.href} onChange={(v) => setContent((p) => ({ ...p, navLinks: p.navLinks.map((x, idx) => (idx === i ? { ...x, href: v } : x)) }))} />
                                <UnifiedIconPicker label="Header Icon" value={(link as { icon?: string }).icon ?? "House"} onChange={(v) => setContent((p) => ({ ...p, navLinks: p.navLinks.map((x, idx) => (idx === i ? { ...x, icon: v } : x)) }))} />
                              </div>
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            onClick={() => setContent((p) => ({ ...p, navLinks: [...p.navLinks, { label: "", href: "#", icon: "House" }] }))}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-teal-500/40 text-teal-600 dark:text-teal-400 hover:bg-teal-500/5 py-4.5 text-sm font-semibold transition-all cursor-pointer"
                          >
                            <FaPlus className="h-3.5 w-3.5" /> Add New Nav Link
                          </button>
                        </div>
                      )}

                      {/* F. Experience */}
                      {activeTab === "experience" && (
                        <div className="space-y-6">
                          {content.experiences.map((exp, i) => (
                            <div key={i} className="rounded-xl border border-border p-4 bg-muted/20 hover:border-teal-500/30 hover:bg-muted/30 transition-all space-y-4 relative">
                              <div className="absolute right-4 top-4">
                                <button
                                  type="button"
                                  onClick={() => setContent((p) => ({ ...p, experiences: p.experiences.filter((_, idx) => idx !== i) }))}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all border border-transparent hover:border-red-200"
                                  title="Remove Experience"
                                >
                                  <FaTrash className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              
                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Role" value={exp.role} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, role: v } : x)) }))} />
                                <Field label="Company" value={exp.company} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, company: v } : x)) }))} />
                                <Field label="Location" value={exp.location} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, location: v } : x)) }))} />
                                <Field label="Period" value={exp.period} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, period: v } : x)) }))} />
                              </div>
                              <TextAreaField label="Responsibilities (one per line)" value={toLines(exp.responsibilities)} rows={5} onChange={(v) => setContent((p) => ({ ...p, experiences: p.experiences.map((x, idx) => (idx === i ? { ...x, responsibilities: fromLines(v) } : x)) }))} />
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            onClick={() => setContent((p) => ({ ...p, experiences: [...p.experiences, { role: "", company: "", location: "", period: "", responsibilities: [] }] }))}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-teal-500/40 text-teal-600 dark:text-teal-400 hover:bg-teal-500/5 py-4.5 text-sm font-semibold transition-all cursor-pointer"
                          >
                            <FaPlus className="h-3.5 w-3.5" /> Add New Experience
                          </button>
                        </div>
                      )}

                      {/* G. Education */}
                      {activeTab === "education" && (
                        <div className="space-y-6">
                          {content.education.map((edu, i) => (
                            <div key={i} className="rounded-xl border border-border p-4 bg-muted/20 hover:border-teal-500/30 hover:bg-muted/30 transition-all space-y-4 relative">
                              <div className="absolute right-4 top-4">
                                <button
                                  type="button"
                                  onClick={() => setContent((p) => ({ ...p, education: p.education.filter((_, idx) => idx !== i) }))}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all border border-transparent hover:border-red-200"
                                  title="Remove Education"
                                >
                                  <FaTrash className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              
                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Degree" value={edu.degree} onChange={(v) => setContent((p) => ({ ...p, education: p.education.map((x, idx) => (idx === i ? { ...x, degree: v } : x)) }))} />
                                <Field label="Institution" value={edu.institution} onChange={(v) => setContent((p) => ({ ...p, education: p.education.map((x, idx) => (idx === i ? { ...x, institution: v } : x)) }))} />
                                <Field label="Period" value={edu.period} onChange={(v) => setContent((p) => ({ ...p, education: p.education.map((x, idx) => (idx === i ? { ...x, period: v } : x)) }))} />
                                <Field label="Location" value={edu.location} onChange={(v) => setContent((p) => ({ ...p, education: p.education.map((x, idx) => (idx === i ? { ...x, location: v } : x)) }))} />
                              </div>
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            onClick={() => setContent((p) => ({ ...p, education: [...p.education, { degree: "", institution: "", period: "", location: "", details: "" }] }))}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-teal-500/40 text-teal-600 dark:text-teal-400 hover:bg-teal-500/5 py-4.5 text-sm font-semibold transition-all cursor-pointer"
                          >
                            <FaPlus className="h-3.5 w-3.5" /> Add New Education
                          </button>
                        </div>
                      )}

                      {/* H. Certifications */}
                      {activeTab === "certifications" && (
                        <div className="space-y-6">
                          {content.certifications.map((cert, i) => (
                            <div key={i} className="rounded-xl border border-border p-4 bg-muted/20 hover:border-teal-500/30 hover:bg-muted/30 transition-all space-y-4 relative">
                              <div className="absolute right-4 top-4">
                                <button
                                  type="button"
                                  onClick={() => setContent((p) => ({ ...p, certifications: p.certifications.filter((_, idx) => idx !== i) }))}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all border border-transparent hover:border-red-200"
                                  title="Remove Certification"
                                >
                                  <FaTrash className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              
                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Certification Name" value={cert.name} onChange={(v) => setContent((p) => ({ ...p, certifications: p.certifications.map((x, idx) => (idx === i ? { ...x, name: v } : x)) }))} />
                                <Field label="Issuer" value={cert.issuer} onChange={(v) => setContent((p) => ({ ...p, certifications: p.certifications.map((x, idx) => (idx === i ? { ...x, issuer: v } : x)) }))} />
                                <div className="sm:col-span-2">
                                  <Field label="Credential Link" value={cert.link ?? ""} onChange={(v) => setContent((p) => ({ ...p, certifications: p.certifications.map((x, idx) => (idx === i ? { ...x, link: v } : x)) }))} />
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            onClick={() => setContent((p) => ({ ...p, certifications: [...p.certifications, { name: "", issuer: "", link: "" }] }))}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-teal-500/40 text-teal-600 dark:text-teal-400 hover:bg-teal-500/5 py-4.5 text-sm font-semibold transition-all cursor-pointer"
                          >
                            <FaPlus className="h-3.5 w-3.5" /> Add New Certification
                          </button>
                        </div>
                      )}

                      {/* I. Soft Skills & Languages */}
                      {activeTab === "softskills" && (
                        <div className="space-y-4">
                          <TextAreaField label="Soft Skills (one per line)" value={toLines(content.softSkills)} rows={6} onChange={(v) => setContent((p) => ({ ...p, softSkills: fromLines(v) }))} />
                          <TextAreaField
                            label="Languages (format: Name - Level)"
                            value={content.languages.map((l) => `${l.name} - ${l.level}`).join("\n")}
                            rows={6}
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
                        </div>
                      )}

                      {/* J. Admin Credentials */}
                      {activeTab === "admin" && (
                        <div className="space-y-6">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="New Admin Username" value={newAdminUser} onChange={setNewAdminUser} />
                            
                            <label className="space-y-1.5 block">
                              <span className="text-xs font-semibold text-muted-foreground">New Admin Password</span>
                              <div className="relative">
                                <input
                                  type={showAdminPass ? "text" : "password"}
                                  value={newAdminPass}
                                  onChange={(e) => setNewAdminPass(e.target.value)}
                                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 hover:border-muted-foreground/30 focus:border-teal-500 transition-all"
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
                            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700 px-4 py-2.5 text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-teal-500/10 cursor-pointer"
                          >
                            <FaShieldAlt className="h-3.5 w-3.5" /> Update Admin Credentials
                          </button>
                        </div>
                      )}

                      {/* Pagination Controls at Bottom */}
                      <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
                        {prevTab ? (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab(prevTab.id);
                              document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/50 hover:bg-accent px-4 py-2.5 text-xs font-bold transition-all cursor-pointer hover:border-muted-foreground/30"
                          >
                            <FaChevronLeft className="h-3 w-3" />
                            <span>{prevTab.title}</span>
                          </button>
                        ) : (
                          <div />
                        )}
                        
                        {nextTab ? (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab(nextTab.id);
                              document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700 px-4 py-2.5 text-xs font-bold transition-all shadow-md shadow-teal-500/10 cursor-pointer"
                          >
                            <span>{nextTab.title}</span>
                            <FaChevronRight className="h-3 w-3" />
                          </button>
                        ) : (
                          <div />
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </SearchHighlightContext.Provider>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}
