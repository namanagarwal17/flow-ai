const features = [
  {
    title: "Prompt-to-flow builder",
    description:
      "Turn a messy operating process into a clean workflow with triggers, logic, actions, and safeguards.",
    icon: "spark",
    accent: "text-blue-600 bg-blue-50 border-blue-100 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200",
  },
  {
    title: "Connected app actions",
    description:
      "Link CRM, email, support, docs, billing, and chat tools without stitching APIs by hand.",
    icon: "plug",
    accent: "text-teal-700 bg-teal-50 border-teal-100 dark:border-teal-400/30 dark:bg-teal-400/10 dark:text-teal-200",
  },
  {
    title: "Human approval gates",
    description:
      "Pause sensitive steps for review, assign owners, and keep a clean audit trail for every decision.",
    icon: "shield",
    accent: "text-violet-600 bg-violet-50 border-violet-100 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-200",
  },
  {
    title: "Real-time observability",
    description:
      "See success rates, bottlenecks, run history, and exceptions before small issues become expensive.",
    icon: "chart",
    accent: "text-amber-700 bg-amber-50 border-amber-100 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200",
  },
];

function FeatureIcon({ name }: { name: string }) {
  const common = "h-6 w-6";

  if (name === "plug") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path
          d="M9 7V3m6 4V3M7 11h10v2a5 5 0 0 1-10 0v-2Zm5 7v3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
        <path
          d="M12 3 5 6v5.5c0 4.4 2.9 7.5 7 9.5 4.1-2 7-5.1 7-9.5V6l-7-3Zm-3 9 2 2 4-4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
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

  return (
    <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3v3m0 12v3m6.4-15.4-2.1 2.1M7.7 16.3l-2.1 2.1M21 12h-3M6 12H3m15.4 6.4-2.1-2.1M7.7 7.7 5.6 5.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-violet-600">
            Features
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl dark:text-white">
            Everything you need to launch production workflows.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="card-hover group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-teal-500 opacity-0 transition group-hover:opacity-100" />
              <div
                className={`mb-7 grid h-14 w-14 place-items-center rounded-2xl border ${feature.accent} transition group-hover:scale-110`}
              >
                <FeatureIcon name={feature.icon} />
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-slate-400 transition group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-cyan-300">
                Explore feature
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 transition group-hover:translate-x-1"
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
