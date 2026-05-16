import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/portfolio/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Mohamed Mamdouh | IT Help Desk Specialist & System Administrator",
    template: "%s | Mohamed Mamdouh",
  },
  description:
    "Portfolio of Mohamed Mamdouh Khairy Abdelkawy, IT Help Desk Specialist and System Administrator with expertise in Active Directory, Microsoft 365, network troubleshooting, and enterprise IT support.",
  keywords: [
    "Mohamed Mamdouh",
    "Mohamed Mamdouh Khairy Abdelkawy",
    "IT Help Desk",
    "System Administrator",
    "Active Directory",
    "Microsoft 365",
    "Network Troubleshooting",
    "CCNA",
    "MCSA",
    "IT Support",
    "Cairo University",
  ],
  authors: [{ name: "Mohamed Mamdouh", url: "/" }],
  creator: "Mohamed Mamdouh",
  publisher: "Mohamed Mamdouh",
  applicationName: "Mohamed Mamdouh Portfolio",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/LOGO.png", type: "image/png", sizes: "32x32" },
      { url: "/LOGO.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: ["/LOGO.png"],
    apple: [{ url: "/LOGO-light.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Mohamed Mamdouh | IT Specialist & System Administrator",
    description:
      "IT Help Desk Specialist & System Administrator with expertise in enterprise IT operations and technical support.",
    type: "website",
    url: "/",
    siteName: "Mohamed Mamdouh Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/LOGO.png",
        width: 512,
        height: 512,
        alt: "Mohamed Mamdouh Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Mamdouh | IT Specialist & System Administrator",
    description:
      "Portfolio of Mohamed Mamdouh: IT Help Desk, System Administration, Active Directory, and Microsoft 365 support.",
    images: ["/LOGO.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
