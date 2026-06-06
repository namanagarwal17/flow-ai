const stats = [
  { label: "Total Workflows", value: "42", change: "+8 this month" },
  { label: "Executions", value: "18.6k", change: "+24% vs last week" },
  { label: "Success Rate", value: "98.7%", change: "+1.2% improvement" },
];

const chartBars = [36, 62, 48, 76, 58, 91, 80, 100, 72, 86, 94, 78];

export default function AnalyticsDashboard() {
  return (
    <section className="grid gap-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">
          Analytics
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Workflow performance at a glance.
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="card-hover rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="mt-4 text-2xl font-black text-slate-950 dark:text-white">{stat.value}</p>
            <p className="mt-3 text-sm font-bold text-emerald-600 dark:text-emerald-300">
              {stat.change}
            </p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Executions</h2>
            <p className="mt-1 text-sm text-slate-500">Last 12 weeks</p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            Weekly
          </span>
        </div>
        <div className="flex h-64 items-end gap-3">
          {chartBars.map((height, index) => (
            <div key={`${height}-${index}`} className="flex flex-1 flex-col items-center gap-3">
              <span
                className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 via-violet-500 to-cyan-300 shadow-lg shadow-blue-950/30 transition hover:scale-y-105"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs font-bold text-slate-600">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
