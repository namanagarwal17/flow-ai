"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import WorkflowIcon from "./builder/WorkflowIcon";

const steps = ["Choose Trigger", "Add Actions", "Run Workflow"];

export default function CreateWorkflowEntry() {
  const router = useRouter();

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-2 py-10">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white">
          Create Workflow
        </h1>

        <Button onClick={() => router.push("/app/create/editor")} className="mt-7 h-12 px-6">
          <WorkflowIcon name="spark" />
          Create Workflow
        </Button>

        <div className="mx-auto mt-8 flex max-w-3xl flex-row flex-nowrap justify-center gap-3 overflow-x-auto px-1 pb-1">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex min-w-[180px] items-center gap-3 rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                {index + 1}
              </span>
              <p className="text-sm font-black text-slate-900 dark:text-white">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
