import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "India Job Service - Find Jobs & Exam Resources",
  description: "India's leading job portal with comprehensive job listings, exam resources, and secure payment processing.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-background">
      <body className={`${geist.className} ${geistMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
