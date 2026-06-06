import Link from "next/link";

export default function Footer() {
  return (
    <footer id="about" className="px-6 pb-10 pt-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-[0_30px_100px_rgba(15,23,42,0.18)] md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.24),transparent_38%),radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.22),transparent_40%)]" />
          <div className="relative">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                About FlowAI
              </p>
              <h2 className="max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
                Build the operating system your team wished it had yesterday.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                FlowAI helps modern teams automate approvals, routing, support,
                sales ops, finance checks, and internal workflows with a clean
                AI-first workspace.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <Link href="#home" className="text-xl font-black text-slate-950 dark:text-white">
            FlowAI
          </Link>
          <p>Copyright {new Date().getFullYear()} FlowAI. All rights reserved.</p>
          <div className="flex gap-5 font-semibold">
            <a href="#features" className="hover:text-slate-950 dark:hover:text-white">
              Features
            </a>
            <a href="#solution" className="hover:text-slate-950 dark:hover:text-white">
              Solution
            </a>
            <a href="#home" className="hover:text-slate-950 dark:hover:text-white">
              Home
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
