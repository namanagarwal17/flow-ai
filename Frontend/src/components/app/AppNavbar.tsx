import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

function FlowLogo() {
  return (
    <Link href="/app" className="flex shrink-0 items-center gap-3" aria-label="FlowAI dashboard">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white shadow-lg shadow-blue-500/20 dark:bg-white dark:text-slate-950">
        <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path d="M6 7.5h6.2a3.8 3.8 0 0 1 0 7.6H9.4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          <path d="M14.3 4.8 19 7.5l-4.7 2.7M9.7 13.8 5 16.5l4.7 2.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </span>
      <span className="hidden text-lg font-black tracking-tight text-slate-950 dark:text-white sm:block lg:hidden">
        FlowAI
      </span>
    </Link>
  );
}

export default function AppNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/85 px-6 py-3 backdrop-blur-xl transition-colors duration-200 dark:border-gray-800 dark:bg-gray-900/85">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <FlowLogo />

        <div className="min-w-0 flex-1">
          <label className="relative block max-w-xl">
            <span className="sr-only">Search</span>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search workflows, runs, apps..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-semibold text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
            />
          </label>
        </div>

        <ThemeToggle compact />

        <button
          type="button"
          aria-label="Notifications"
          className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition duration-200 hover:scale-105 hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-1.5 pr-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-black text-white">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black text-slate-950 dark:text-white">Naman Agarwal</p>
            <p className="text-xs font-semibold text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
