import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "IndiaJobService - Find Your Dream Job in India",
  description: "India's premier job portal connecting talented professionals with top employers. Search thousands of jobs across IT, Engineering, Finance, Healthcare and more.",
  keywords: "jobs in India, job search, career, employment, IT jobs, engineering jobs, freshers jobs, experienced jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
