const problems = [
  {
    title: "Manual handoffs",
    description:
      "Tasks move between tabs, teams, and tools with no clear owner or source of truth.",
    color: "text-blue-600 bg-blue-50 border-blue-100 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200",
    icon: "arrows",
  },
  {
    title: "Slow implementation",
    description:
      "Automation ideas wait for engineering time, custom scripts, and fragile setup work.",
    color: "text-violet-600 bg-violet-50 border-violet-100 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-200",
    icon: "code",
  },
  {
    title: "Scattered context",
    description:
      "Decisions live across messages, CRMs, spreadsheets, and dashboards that never agree.",
    color: "text-teal-700 bg-teal-50 border-teal-100 dark:border-teal-400/30 dark:bg-teal-400/10 dark:text-teal-200",
    icon: "layers",
  },
  {
    title: "Hidden failures",
    description:
      "Teams discover broken workflows only after customers, deals, or deadlines are affected.",
    color: "text-rose-600 bg-rose-50 border-rose-100 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-200",
    icon: "alert",
  },
];

function ProblemIcon({ name }: { name: string }) {
  const common = "h-6 w-6";

  if (name === "code") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path
          d="m9 8-4 4 4 4m6-8 4 4-4 4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "layers") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path
          d="m12 4 8 4-8 4-8-4 8-4Zm8 8-8 4-8-4m16 4-8 4-8-4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "alert") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path
          d="M12 8v5m0 4h.01M10.3 4.6 2.8 18a1.8 1.8 0 0 0 1.6 2.7h15.2a1.8 1.8 0 0 0 1.6-2.7L13.7 4.6a2 2 0 0 0-3.4 0Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 7h10m0 0-3-3m3 3-3 3M17 17H7m0 0 3 3m-3-3 3-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="relative px-6 py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-blue-600">
            The Problem
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl dark:text-white">
            Teams still run critical work by hand.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((problem) => (
            <article
              key={problem.title}
              className="card-hover group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div
                className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl border ${problem.color} transition group-hover:scale-110`}
              >
                <ProblemIcon name={problem.icon} />
              </div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                {problem.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
