import Card from "./Card";
import WorkflowIcon from "./builder/WorkflowIcon";
import type { FlowStep } from "./builder/types";

export default function SettingsPanel({ selectedStep }: { selectedStep: FlowStep | null }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Settings
          </p>
          <h2 className="mt-1 text-lg font-black text-slate-950 dark:text-white">
            Node configuration
          </h2>
        </div>
        {selectedStep ? (
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <WorkflowIcon name={selectedStep.icon} />
          </span>
        ) : null}
      </div>

      {selectedStep ? (
        <div className="mt-6 grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Node name</span>
            <input
              value={selectedStep.title}
              readOnly
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition duration-200 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Behavior</span>
            <select
              defaultValue={selectedStep.kind === "Trigger" ? "Run immediately" : "Use default template"}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition duration-200 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-cyan-400"
            >
              <option>{selectedStep.kind === "Trigger" ? "Run immediately" : "Use default template"}</option>
              <option>{selectedStep.kind === "Trigger" ? "Run after approval" : "Require review"}</option>
              <option>{selectedStep.kind === "Trigger" ? "Test mode only" : "Skip on failure"}</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Target</span>
            <input
              placeholder={selectedStep.kind === "Trigger" ? "Inbox, form, or source" : "Recipient, project, or workspace"}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Configuration</span>
            <textarea
              placeholder="Add filters, recipients, field mapping, or handoff notes..."
              className="min-h-32 resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
            />
          </label>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
          Select a node on the canvas to edit its fields and run behavior.
        </div>
      )}
    </Card>
  );
}
