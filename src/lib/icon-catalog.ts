import type { IconType } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";

export type IconOption = {
  value: string;
  label: string;
  icon: IconType;
  category: string;
};

function formatIconName(name: string): string {
  const withoutPrefix = name.replace(/^(Fa|Bi|Fi)/, "");
  return withoutPrefix
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

export const ICON_OPTIONS: IconOption[] = [
  ...Object.entries(FaIcons)
    .filter(([key]) => key !== "default" && key !== "IconType")
    .map(([key, icon]) => ({
      value: `fa-${key}`,
      label: formatIconName(key),
      icon: icon as IconType,
      category: "Font Awesome",
    })),
  ...Object.entries(BiIcons)
    .filter(([key]) => key !== "default" && key !== "IconType")
    .map(([key, icon]) => ({
      value: `bi-${key}`,
      label: formatIconName(key),
      icon: icon as IconType,
      category: "BoxIcons",
    })),
  ...Object.entries(FiIcons)
    .filter(([key]) => key !== "default" && key !== "IconType")
    .map(([key, icon]) => ({
      value: `fi-${key}`,
      label: formatIconName(key),
      icon: icon as IconType,
      category: "Feather",
    })),
];

export const FALLBACK_ICON = FaIcons.FaRegStar as IconType;

export const ICONS_BY_CATEGORY = ICON_OPTIONS.reduce(
  (acc, icon) => {
    if (!acc[icon.category]) acc[icon.category] = [];
    acc[icon.category].push(icon);
    return acc;
  },
  {} as Record<string, IconOption[]>,
);

const ICON_MAP = ICON_OPTIONS.reduce<Record<string, IconType>>((acc, option) => {
  acc[option.value] = option.icon;
  return acc;
}, {});

const LEGACY_ICON_ALIASES: Record<string, string> = {
  House: "fa-FaHome",
  User: "fa-FaUser",
  Wrench: "fa-FaWrench",
  Briefcase: "fa-FaBriefcase",
  GraduationCap: "fa-FaGraduationCap",
  Award: "fa-FaAward",
  Handshake: "fa-FaHandshake",
  Mail: "fa-FaEnvelope",
  Monitor: "fa-FaDesktop",
  Network: "fa-FaNetworkWired",
  Cloud: "fa-FaCloud",
  Headphones: "fa-FaHeadphones",
  Server: "fa-FaServer",
  Cpu: "fa-FaMicrochip",
  MonitorUp: "fa-FaDesktop",
  Shield: "fa-FaShieldAlt",
  Globe: "fa-FaGlobe",
  Code: "fa-FaCode",
  Database: "fa-FaDatabase",
  LaptopCode: "fa-FaLaptopCode",
  ChartLine: "fa-FaChartLine",
  Rocket: "fa-FaRocket",
  Cogs: "fa-FaCogs",
  Tasks: "fa-FaTasks",
  ClipboardCheck: "fa-FaClipboardCheck",
  Lightbulb: "fa-FaLightbulb",
  Users: "fa-FaUsers",
  Phone: "fa-FaPhone",
  Comments: "fa-FaComments",
  Calendar: "fa-FaCalendarAlt",
  Folder: "fa-FaFolderOpen",
  Lock: "fa-FaLock",
  Link: "fa-FaLink",
  Star: "fa-FaRegStar",
  Bolt: "fa-FaBolt",
  Hammer: "fa-FaHammer",
  Search: "fa-FaSearch",
  Pen: "fa-FaPen",
  Fire: "fa-FaFire",
  CheckCircle: "fa-FaCheckCircle",
};

export function resolveIconValue(name?: string): string | undefined {
  if (!name) return undefined;
  if (ICON_MAP[name]) return name;
  if (LEGACY_ICON_ALIASES[name]) return LEGACY_ICON_ALIASES[name];
  return undefined;
}

export function getIconOption(name?: string): IconOption | undefined {
  const resolved = resolveIconValue(name);
  if (!resolved) return undefined;
  return ICON_OPTIONS.find((option) => option.value === resolved);
}

export function getIconComponent(name?: string): IconType {
  const resolved = resolveIconValue(name);
  if (!resolved) return FALLBACK_ICON;
  return ICON_MAP[resolved] ?? FALLBACK_ICON;
}

export function searchIcons(query: string): IconOption[] {
  if (!query) return ICON_OPTIONS;
  const lowerQuery = query.toLowerCase();
  return ICON_OPTIONS.filter(
    (icon) =>
      icon.label.toLowerCase().includes(lowerQuery) ||
      icon.value.toLowerCase().includes(lowerQuery),
  );
}
