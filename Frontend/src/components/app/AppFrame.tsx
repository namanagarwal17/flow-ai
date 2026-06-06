"use client";

import { usePathname } from "next/navigation";
import AppNavbar from "@/components/app/AppNavbar";
import Sidebar from "@/components/app/Sidebar";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWorkflowEditor = pathname === "/app/create/editor";

  if (isWorkflowEditor) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-950 transition-colors duration-200 dark:bg-slate-950 dark:text-white">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-950 transition-colors duration-200 dark:bg-gray-900 dark:text-white">
      <Sidebar />
      <div className="relative min-h-screen lg:pl-72">
        <AppNavbar />
        <main className="mx-auto w-full max-w-7xl px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
