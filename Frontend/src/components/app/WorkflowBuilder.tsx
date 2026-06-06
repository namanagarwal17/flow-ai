"use client";

import { useState } from "react";

const generatedSteps = [
  {
    type: "Trigger",
    title: "User Signup",
    description: "Detect a new user record from your product database.",
    tone: "from-blue-500 to-cyan-400",
  },
  {
    type: "AI",
    title: "Personalize Message",
    description: "Summarize signup context and choose the best welcome angle.",
    tone: "from-violet-500 to-fuchsia-400",
  },
  {
    type: "Action",
    title: "Send Email",
    description: "Deliver a branded welcome email with next-step guidance.",
    tone: "from-teal-500 to-emerald-400",
  },
];

function StepIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M7 12h10m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function WorkflowBuilder() {
  const [prompt, setPrompt] = useState("When user signs up, send email");
  const [generated, setGenerated] = useState(true);

  return (
    <section className="grid gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">
            Workflow Builder
          </p>
          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950 dark:text-white">
            Describe your automation and let FlowAI map the steps.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="sr-only">Describe your automation</span>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe your automation..."
              className="min-h-28 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base font-semibold leading-7 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
            />
          </label>
          <button
            type="button"
            onClick={() => setGenerated(true)}
            className="primary-button h-14 self-end rounded-full px-7 text-sm font-black text-white"
          >
            Generate Workflow
          </button>
        </div>
      </div>

      {generated ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-black text-slate-950 dark:text-white">Generated steps</h3>
            <div className="mt-5 grid gap-4">
              {generatedSteps.map((step) => (
                <article
                  key={step.title}
                  className="card-hover rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <div className="flex gap-4">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${step.tone} text-white shadow-lg`}
                    >
                      <StepIcon />
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                        {step.type}
                      </p>
                      <h4 className="mt-1 text-base font-black text-slate-950 dark:text-white">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-950 dark:text-white">Visual flow</h3>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                Ready to save
              </span>
            </div>

            <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-center">
              {generatedSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex flex-1 flex-col gap-5 md:flex-row md:items-center"
                >
                  <div className="card-hover min-h-36 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/70">
                    <span
                      className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${step.tone} text-white`}
                    >
                      <StepIcon />
                    </span>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                      {step.type}
                    </p>
                    <h4 className="mt-2 text-base font-black text-slate-950 dark:text-white">
                      {step.title}
                    </h4>
                  </div>

                  {index < generatedSteps.length - 1 ? (
                    <div className="flex items-center justify-center md:w-16">
                      <div className="hidden h-px flex-1 bg-gradient-to-r from-blue-400 to-violet-400 md:block" />
                      <svg
                        aria-hidden="true"
                        className="h-7 w-7 rotate-90 text-violet-300 md:rotate-0"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 12h14m-5-5 5 5-5 5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
