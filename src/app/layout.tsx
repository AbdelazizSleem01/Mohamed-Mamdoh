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
  title: "Mohamed Mamdouh — IT Help Desk Specialist & System Administrator",
  description:
    "Portfolio of Mohamed Mamdouh Khairy Abdelkawy — IT Help Desk Specialist & System Administrator with expertise in Active Directory, Microsoft 365, network troubleshooting, and enterprise IT support.",
  keywords: [
    "Mohamed Mamdouh",
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
  authors: [{ name: "Mohamed Mamdouh" }],
  openGraph: {
    title: "Mohamed Mamdouh — IT Specialist & System Administrator",
    description:
      "IT Help Desk Specialist & System Administrator with expertise in enterprise IT operations.",
    type: "website",
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
