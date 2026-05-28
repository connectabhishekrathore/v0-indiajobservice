import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrendingMarquee } from "@/components/layout/trending-marquee";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "IndiaJobService - Government Jobs, Sarkari Naukri, Admit Card, Result",
    template: "%s | IndiaJobService",
  },
  description:
    "IndiaJobService.com is your trusted source for latest government job notifications, Sarkari Naukri, admit cards, results, answer keys, and syllabus. Find Central Govt, State Govt, Bank, Railway, Defence, Police jobs and more.",
  keywords: [
    "government jobs",
    "sarkari naukri",
    "sarkari result",
    "admit card",
    "job result",
    "answer key",
    "syllabus",
    "UPSC",
    "SSC",
    "Railway jobs",
    "Bank jobs",
    "Police jobs",
    "Defence jobs",
    "central government jobs",
    "state government jobs",
  ],
  authors: [{ name: "IndiaJobService" }],
  creator: "IndiaJobService",
  publisher: "IndiaJobService",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://indiajobservice.com",
    siteName: "IndiaJobService",
    title: "IndiaJobService - Government Jobs, Sarkari Naukri, Admit Card, Result",
    description:
      "Your trusted source for latest government job notifications, admit cards, results, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndiaJobService - Government Jobs Portal",
    description:
      "Your trusted source for latest government job notifications, admit cards, results, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="min-h-screen font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <TrendingMarquee />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
