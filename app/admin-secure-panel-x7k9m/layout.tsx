"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if on login page
    if (typeof window !== "undefined") {
      const isLoginPage = window.location.pathname === "/admin-secure-panel-x7k9m";
      const isAuthenticated = localStorage.getItem("admin_authenticated") === "true";
      
      if (!isLoginPage && !isAuthenticated) {
        router.push("/admin-secure-panel-x7k9m");
      }
    }
  }, [router]);

  return <>{children}</>;
}
