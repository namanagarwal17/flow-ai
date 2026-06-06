"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("flowai-theme", theme);
}

function SunIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.1-6.1 1.4-1.4M4.5 19.5l1.4-1.4m12.2 0 1.4 1.4M4.5 4.5l1.4 1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M20.2 15.6A8.5 8.5 0 0 1 8.4 3.8 8.5 8.5 0 1 0 20.2 15.6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return localStorage.getItem("flowai-theme") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => {
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
      className={`group relative grid place-items-center overflow-hidden border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-200 hover:scale-105 hover:border-blue-300 hover:text-blue-700 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-white ${
        compact ? "h-11 w-11 rounded-2xl" : "h-12 w-12 rounded-full"
      }`}
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-blue-500/10 transition duration-200 group-hover:scale-100" />
      <span className="relative">{theme === "dark" ? <SunIcon /> : <MoonIcon />}</span>
    </button>
  );
}
