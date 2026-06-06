const solutionPoints = [
  "Describe a process once and let FlowAI draft the steps.",
  "Connect the apps your team already uses.",
  "Monitor every run, handoff, and exception from one dashboard.",
];

const previewSteps = [
  { label: "Trigger", detail: "New customer inquiry", color: "bg-blue-500" },
  { label: "AI Decision", detail: "Classify priority and topic", color: "bg-violet-500" },
  { label: "Action", detail: "Create CRM task", color: "bg-teal-500" },
  { label: "Follow-up", detail: "Send tailored response", color: "bg-amber-500" },
];

export default function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden px-6 py-16">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(255,255,255,0)_42%,rgba(20,184,166,0.10))] dark:bg-[linear-gradient(135deg,rgba(37,99,235,0.14),rgba(17,24,39,0)_42%,rgba(20,184,166,0.12))]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-teal-700">
            The Solution
          </p>
          <h2 className="max-w-xl text-3xl font-black tracking-tight text-slate-950 md:text-4xl dark:text-white">
            AI automation that feels like briefing a teammate.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            FlowAI translates goals into workflows, checks the logic, then runs
            each step with visibility your whole team can trust.
          </p>

          <div className="mt-9 grid gap-4">
            {solutionPoints.map((point) => (
              <div key={point} className="flex items-start gap-4">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m7 12 3 3 7-7"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                <p className="text-base font-semibold leading-7 text-slate-700 dark:text-slate-200">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.24)]">
          <div className="rounded-[1.35rem] bg-white p-4 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-slate-950 dark:text-white">
                  Customer Ops Flow
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Built from one prompt
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                99.4% success
              </span>
            </div>

            <div className="relative grid gap-4">
              {previewSteps.map((step, index) => (
                <div key={step.label} className="relative">
                  {index < previewSteps.length - 1 ? (
                    <span className="absolute left-6 top-14 h-5 w-px bg-slate-200 dark:bg-slate-700" />
                  ) : null}
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-slate-800/80">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${step.color} text-white shadow-lg`}
                    >
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-slate-950 dark:text-white">
                        {step.label}
                      </p>
                      <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                        {step.detail}
                      </p>
                    </div>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Live throughput
                </p>
                <p className="text-xs font-black text-blue-600">+28%</p>
              </div>
              <div className="flex h-20 items-end gap-2">
                {[42, 64, 48, 72, 58, 86, 74, 94, 80, 100].map((height) => (
                  <span
                    key={height}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-300"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
