import Link from "next/link";

const workflowSteps = [
  { label: "New lead captured", meta: "Webflow form", state: "Ready" },
  { label: "Qualify with AI", meta: "Score intent + fit", state: "Running" },
  { label: "Route to CRM", meta: "HubSpot deal", state: "Next" },
  { label: "Notify owner", meta: "Slack + email", state: "Next" },
];

function StatusIcon({ active }: { active?: boolean }) {
  return (
    <span
      className={`grid h-9 w-9 place-items-center rounded-2xl border ${
        active
          ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-cyan-200"
          : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
      }`}
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="m8 12 2.7 2.7L16.5 9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 py-20 md:py-24"
    >
      <div className="ambient-grid absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.20),transparent_44%),radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,248,251,0))] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.16),transparent_44%),radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.16),transparent_38%),linear-gradient(180deg,rgba(17,24,39,0.96),rgba(17,24,39,0))]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            AI workflows live in minutes
          </div>

          <h1 className="max-w-[680px] text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl dark:text-white">
            Automate work with{" "}
            <span className="gradient-text">AI flows</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            FlowAI turns plain-language instructions into reliable workflows
            that connect your tools, route decisions, and keep every team in
            sync.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/app"
              className="primary-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold text-white"
            >
              Get Started
              <svg
                aria-hidden="true"
                className="h-5 w-5"
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
            <Link
              href="#solution"
              className="secondary-button inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8 5.8v12.4L18 12 8 5.8Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Demo
            </Link>
          </div>
        </div>

        <div className="animate-fade-up delay-200">
          <div className="animate-float-soft relative mx-auto w-full max-w-[560px] rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_32px_100px_rgba(15,23,42,0.18)] backdrop-blur dark:border-slate-700 dark:bg-slate-800/80 dark:shadow-[0_32px_100px_rgba(0,0,0,0.42)]">
            <div className="overflow-hidden rounded-[1.55rem] border border-slate-200 bg-slate-950">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Active
                </span>
              </div>

              <div className="grid gap-4 p-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
                    Prompt
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white">
                    When a qualified lead arrives, enrich it, assign an owner,
                    and send a tailored follow-up.
                  </p>
                </div>

                <div className="relative grid gap-3">
                  {workflowSteps.map((step, index) => (
                    <div
                      key={step.label}
                      className={`relative flex items-center gap-3 rounded-2xl border p-3 ${
                        index === 1
                          ? "border-blue-400/40 bg-blue-400/10"
                          : "border-white/10 bg-white/[0.05]"
                      }`}
                    >
                      <StatusIcon active={index === 1} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-white">
                          {step.label}
                        </p>
                        <p className="text-xs text-slate-400">{step.meta}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          index === 1
                            ? "bg-blue-400 text-slate-950"
                            : "bg-white/10 text-slate-300"
                        }`}
                      >
                        {step.state}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["4.8s", "Built in"],
                    ["1.2k", "Runs/day"],
                    ["98%", "Success"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-center"
                    >
                      <p className="text-xl font-black text-white">{value}</p>
                      <p className="mt-1 text-xs text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-16 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-800 md:block">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">AI Builder</p>
              <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">
                12 steps mapped
              </p>
            </div>
            <div className="absolute -bottom-4 left-8 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Time saved</p>
              <p className="mt-1 text-sm font-black text-emerald-600">
                36 hours/week
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
