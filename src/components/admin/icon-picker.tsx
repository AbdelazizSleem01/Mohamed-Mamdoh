"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FaChevronDown, FaSearch, FaTimes } from "react-icons/fa";
import {
  ICON_OPTIONS,
  getIconComponent,
  getIconOption,
  resolveIconValue,
} from "@/lib/icon-catalog";

export function UnifiedIconPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(150);

  const resolvedValue = resolveIconValue(value);
  const ActiveIcon = getIconComponent(value);
  const activeOption = getIconOption(value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ICON_OPTIONS;
    return ICON_OPTIONS.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        option.value.toLowerCase().includes(q),
    );
  }, [query]);
  const visibleIcons = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  return (
    <div className="space-y-1.5">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm flex items-center justify-between hover:border-teal-500/40 hover:bg-teal-500/5 transition-colors"
      >
        <span className="inline-flex items-center gap-2">
          <ActiveIcon className="h-4 w-4" />
          {activeOption?.label ?? "Choose icon"}
        </span>
        <FaChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-[1px] p-4 flex items-center justify-center">
            <div className="w-full max-w-3xl rounded-2xl border border-border bg-card shadow-2xl">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-sm">Choose Icon</h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-accent"
                  aria-label="Close icon picker"
                >
                  <FaTimes className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setVisibleCount(150);
                    }}
                    placeholder="Search icons..."
                    className="w-full rounded-xl border border-input bg-background pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                </div>

                <div className="text-xs text-muted-foreground">
                  Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} icons
                </div>
                <div className="max-h-[56vh] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {visibleIcons.map((option) => {
                    const Icon = option.icon;
                    const isActive = resolvedValue === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          onChange(option.value);
                          setOpen(false);
                        }}
                        className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs transition-all ${
                          isActive
                            ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300"
                            : "border-border hover:border-teal-500/40 hover:bg-teal-500/5"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
                {visibleCount < filtered.length && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + 150)}
                    className="w-full rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-accent"
                  >
                    Load more icons
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
