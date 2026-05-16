// ============================================================
// Portfolio Data — Mohamed Mamdouh
// All information extracted from the official CV.
// ============================================================

export const personalInfo = {
  name: "Mohamed Mamdouh Khairy Abdelkawy",
  title: "IT Help Desk Specialist & System Administrator",
  shortTitle: "IT Specialist & System Admin",
  profileImage: "https://cdn.corenexis.com/files/c/4816192720.png",
  location: "Qalubia, Egypt",
  email: "mohamedmamdouhkhairy2421@gmail.com",
  phone: "01030542651",
  university: "Cairo University — FCAI",
  social: {
    facebook: "https://www.facebook.com/share/1H2X1SJ66u/",
    instagram: "https://www.instagram.com/mohamedmamdouh.4",
  },
};

export const professionalSummary =
  "Detail-oriented IT Help Desk Specialist and System Administrator with 1 year of hands-on experience delivering technical support in Windows and Linux environments. Proficient in Active Directory, Microsoft 365 administration, and network troubleshooting across LAN/WAN infrastructures. Holds industry-recognized certifications including CCNA and MCSA. Adept at diagnosing hardware, software, and connectivity issues while delivering responsive on-site and remote support to end users. Currently pursuing a Bachelor's degree in Computers and Artificial Intelligence from Cairo University, with a strong foundation in enterprise IT operations and a commitment to continuous professional development.";

export const aboutHighlights = [
  "Active Directory & Group Policy management for enterprise environments",
  "Microsoft 365 administration including Exchange, Teams, and SharePoint",
  "LAN/WAN network troubleshooting with hands-on TCP/IP and VLAN experience",
  "Certified in CCNA, MCSA, MS-900, and Linux Essentials",
  "Strong foundation in both Windows and Linux server administration",
  "Committed to continuous learning and professional growth",
];

// ── Skills ──────────────────────────────────────────────────
export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Operating Systems",
    icon: "Monitor",
    skills: ["Windows 10/11", "Windows Server", "Linux (Ubuntu)", "BIOS/UEFI"],
  },
  {
    title: "Networking",
    icon: "Network",
    skills: ["TCP/IP", "DHCP", "DNS", "VLAN", "LAN/WAN", "Subnetting", "VPN Basics"],
  },
  {
    title: "Microsoft & Cloud",
    icon: "Cloud",
    skills: [
      "Active Directory",
      "Group Policy",
      "Microsoft 365",
      "Azure Basics",
      "Exchange Online",
      "SharePoint",
    ],
  },
  {
    title: "Support & Tools",
    icon: "Wrench",
    skills: [
      "Ticketing Systems",
      "Remote Desktop",
      "On-site Support",
      "Hardware Repair",
      "Printer Config",
      "System Monitoring",
    ],
  },
];

export const softSkills = [
  "Clear Communication",
  "Analytical Problem Solving",
  "Team Collaboration",
  "Time Management",
  "Customer-Focused Support",
  "Attention to Detail",
  "Works Well Under Pressure",
];

// ── Experience ──────────────────────────────────────────────
export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    role: "IT Help Desk & System Administrator",
    company: "IT Support Role",
    location: "Cairo, Egypt",
    period: "2024 – Present",
    responsibilities: [
      "Provided first and second-line technical support for hardware, software, and network-related issues, resolving an average of 30+ tickets per week via ticketing system with consistent SLA adherence.",
      "Installed, configured, and maintained Windows 10/11 and Linux workstations for end users, reducing setup time by standardizing deployment procedures.",
      "Administered Active Directory user accounts, groups, and organizational units; applied Group Policy Objects (GPOs) to enforce security baselines and software deployment policies.",
      "Configured and managed Windows Server roles including DHCP, DNS, and File Services, supporting reliable internal network operations.",
      "Delivered Microsoft 365 administration tasks including mailbox provisioning, license assignments, Teams configuration, and SharePoint permissions management.",
      "Troubleshot LAN/WAN connectivity issues by analyzing network topology, configuring switches, and resolving VLAN, DHCP, and DNS misconfigurations.",
      "Performed routine hardware diagnostics and maintenance on desktop systems, laptops, and printers; coordinated vendor support for out-of-warranty equipment.",
      "Delivered remote desktop support using remote access tools, minimizing on-site response time for common software issues and account management requests.",
    ],
  },
  {
    role: "IT Support Intern",
    company: "Technical Internship",
    location: "Cairo, Egypt",
    period: "2023 – 2024",
    responsibilities: [
      "Assisted senior IT staff in deploying and configuring workstations and network devices across office environments.",
      "Supported the helpdesk team in logging, categorizing, and resolving end-user support tickets using an ITSM ticketing platform.",
      "Gained practical experience with TCP/IP networking, subnetting, and basic router and switch configuration in a supervised lab and production environment.",
      "Participated in setting up and troubleshooting Microsoft 365 accounts and cloud-based services for new employees during onboarding.",
    ],
  },
];

// ── Education ───────────────────────────────────────────────
export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}

export const education: Education[] = [
  {
    degree: "Bachelor of Science — Computers and Artificial Intelligence",
    institution: "Cairo University, Faculty of Computers and Artificial Intelligence",
    period: "Expected Graduation: 2025",
    location: "Cairo, Egypt",
  },
];

// ── Certifications ──────────────────────────────────────────
export interface Certification {
  name: string;
  issuer: string;
  link?: string;
}

export const certifications: Certification[] = [
  {
    name: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco Systems",
  },
  {
    name: "Microsoft Certified Solutions Associate (MCSA)",
    issuer: "Microsoft",
  },
  {
    name: "Microsoft 365 Fundamentals (MS-900)",
    issuer: "Microsoft",
  },
  {
    name: "Linux Essentials — Level 1 & 2",
    issuer: "Linux Professional Institute",
  },
  {
    name: "Cloud Computing Fundamentals",
    issuer: "Cloud Basics Track",
  },
];

// ── Services ────────────────────────────────────────────────
export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: "IT Help Desk Support",
    description:
      "Delivering responsive first and second-line technical support for hardware, software, and network issues with proven SLA adherence.",
    icon: "Headphones",
  },
  {
    title: "System Administration",
    description:
      "Managing Windows Server environments, Active Directory, Group Policy, and enterprise infrastructure to ensure reliable operations.",
    icon: "Server",
  },
  {
    title: "Network Troubleshooting",
    description:
      "Diagnosing and resolving LAN/WAN connectivity issues, configuring switches, and managing DHCP, DNS, and VLAN setups.",
    icon: "Network",
  },
  {
    title: "Microsoft 365 Administration",
    description:
      "Provisioning mailboxes, managing licenses, configuring Teams and SharePoint, and supporting cloud-based collaboration tools.",
    icon: "Cloud",
  },
  {
    title: "Hardware Maintenance",
    description:
      "Performing diagnostics, repairs, and preventive maintenance on desktop systems, laptops, printers, and peripherals.",
    icon: "Cpu",
  },
  {
    title: "Remote Desktop Support",
    description:
      "Providing efficient remote assistance for software issues, account management, and end-user training using modern remote access tools.",
    icon: "MonitorUp",
  },
];

// ── Languages ───────────────────────────────────────────────
export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Intermediate" },
];

// ── Nav Links ───────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
