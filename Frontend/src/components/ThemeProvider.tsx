"use client";

import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("flowai-theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }

    document.documentElement.classList.remove("dark");
  }, []);

  return children;
}
