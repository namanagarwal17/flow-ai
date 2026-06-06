"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

function FlowLogo() {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white shadow-lg shadow-blue-500/20">
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 7.5h6.2a3.8 3.8 0 0 1 0 7.6H9.4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M14.3 4.8 19 7.5l-4.7 2.7M9.7 13.8 5 16.5l4.7 2.7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </span>
      <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
        FlowAI
      </span>
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/85 px-6 backdrop-blur-xl transition-colors duration-200 dark:border-gray-800 dark:bg-gray-900/85">
      <nav
        className={`mx-auto flex h-16 w-full max-w-7xl items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-gray-900/90"
            : "bg-transparent"
        }`}
      >
        <Link href="#home" aria-label="FlowAI home">
          <FlowLogo />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition duration-200 hover:bg-slate-950 hover:text-white dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/app"
            className="primary-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white"
          >
            Get Started
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 transition duration-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white md:hidden"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {menuOpen ? (
        <div className="mx-auto mt-3 w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-1 py-2">
              <ThemeToggle compact />
            </div>
            <Link
              href="/app"
              onClick={() => setMenuOpen(false)}
              className="primary-button mt-2 rounded-full px-5 py-3 text-center text-sm font-bold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
