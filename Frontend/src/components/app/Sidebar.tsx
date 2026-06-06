"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", href: "/app", icon: "dashboard" },
  { label: "Workflows", href: "/app/workflows", icon: "workflow" },
  { label: "Create Workflow", href: "/app/create", icon: "plus" },
  { label: "Analytics", href: "/app/analytics", icon: "chart" },
  { label: "Settings", href: "/app/settings", icon: "settings" },
];

function FlowLogo() {
  return (
    <Link href="/app" className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-teal-400 text-white shadow-lg shadow-blue-950/30">
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
      <span>
        <span className="block text-xl font-black tracking-tight text-slate-950 dark:text-white">
          FlowAI
        </span>
        <span className="text-xs font-semibold text-slate-500">
          Automation OS
        </span>
      </span>
    </Link>
  );
}

function MenuIcon({ name }: { name: string }) {
  const common = "h-5 w-5";

  if (name === "workflow") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path
          d="M6 7h4m4 0h4M6 17h4m4 0h4M10 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-4-5h12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "plus") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path
          d="M4 19V5m0 14h16M8 16v-5m4 5V8m4 8v-3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path
          d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.4-2.1a7.9 7.9 0 0 0 0-2.8l2-1.5-2-3.5-2.4 1a8.7 8.7 0 0 0-2.4-1.4L14.3 2h-4.6l-.4 3.2A8.7 8.7 0 0 0 7 6.6l-2.4-1-2 3.5 2 1.5a7.9 7.9 0 0 0 0 2.8l-2 1.5 2 3.5 2.4-1a8.7 8.7 0 0 0 2.4 1.4l.3 3.2h4.6l.4-3.2a8.7 8.7 0 0 0 2.4-1.4l2.4 1 2-3.5-2.1-1.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
      <path
        d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-3H4v3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white p-5 text-slate-950 shadow-xl shadow-slate-200/60 backdrop-blur-xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:shadow-black/30 lg:block">
      <FlowLogo />

      <nav className="mt-10 grid gap-2">
        {menuItems.map((item) => {
          const active =
            item.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group relative flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold transition duration-200 ${
                active
                  ? "border-blue-200 bg-blue-50/80 text-blue-700 shadow-sm dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-100"
                  : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:border-slate-800 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              {active ? (
                <span className="absolute left-2 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-blue-600 dark:bg-cyan-300" />
              ) : null}
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl transition ${
                  active
                    ? "bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-cyan-300"
                    : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-950 dark:bg-white/5 dark:text-slate-400 dark:group-hover:bg-white/10 dark:group-hover:text-white"
                }`}
              >
                <MenuIcon name={item.icon} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-white/[0.04]">
        <p className="text-sm font-black text-slate-950 dark:text-white">Pro workspace</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          12 active flows are saving your team 36 hours this week.
        </p>
      </div>
    </aside>
  );
}
