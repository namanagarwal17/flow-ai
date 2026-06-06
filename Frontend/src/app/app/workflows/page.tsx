const workflows = [
  {
    name: "Welcome new users",
    trigger: "User Signup",
    action: "Send Email",
    status: "Active",
    runs: "1,204",
  },
  {
    name: "Payment alert",
    trigger: "Stripe Payment",
    action: "Post Slack Message",
    status: "Active",
    runs: "842",
  },
  {
    name: "Deal owner routing",
    trigger: "CRM Deal Updated",
    action: "Create CRM Task",
    status: "Review",
    runs: "318",
  },
];

export default function WorkflowsPage() {
  return (
    <section className="grid gap-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">
          Workflows
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Your automation library.
        </h1>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <article
            key={workflow.name}
            className="card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black text-slate-950 dark:text-white">
                    {workflow.name}
                  </h2>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                    {workflow.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {workflow.trigger} to {workflow.action}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/70">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                    Runs
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-950 dark:text-white">
                    {workflow.runs}
                  </p>
                </div>
                <button
                  type="button"
                  className="secondary-button rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:border-blue-300 hover:bg-slate-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:hover:border-blue-500 dark:hover:bg-slate-800"
                >
                  Open
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
