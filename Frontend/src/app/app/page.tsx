import WorkflowBuilder from "@/components/app/WorkflowBuilder";

const quickStats = [
  { label: "Active workflows", value: "12", accent: "text-blue-600 dark:text-cyan-300" },
  { label: "Runs today", value: "2,847", accent: "text-violet-600 dark:text-violet-300" },
  { label: "Hours saved", value: "36", accent: "text-emerald-600 dark:text-emerald-300" },
];

export default function AppDashboardPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">
            Dashboard
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Build and monitor automations from one command center.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Start with a prompt, review the generated steps, and turn repeated
            work into a reliable AI-powered flow.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:w-[500px]">
          {quickStats.map((stat) => (
            <article
              key={stat.label}
              className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500">
                {stat.label}
              </p>
              <p className={`mt-3 text-2xl font-black ${stat.accent}`}>
                {stat.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <WorkflowBuilder />
    </div>
  );
}
