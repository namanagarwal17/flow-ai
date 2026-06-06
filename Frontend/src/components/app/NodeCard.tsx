import WorkflowIcon from "./builder/WorkflowIcon";
import type { FlowStep } from "./builder/types";

export default function NodeCard({
  step,
  selected,
  onSelect,
}: {
  step: FlowStep;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(step.id)}
      aria-pressed={selected}
      className={`group relative mx-auto w-full max-w-sm rounded-2xl border p-5 text-left shadow-sm transition duration-200 hover:scale-105 hover:shadow-xl ${
        selected
          ? "border-blue-500 bg-blue-50 shadow-blue-100 ring-4 ring-blue-500/10 dark:border-cyan-300 dark:bg-cyan-400/10 dark:shadow-none dark:ring-cyan-300/10"
          : "border-slate-200 bg-white hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-cyan-400"
      }`}
    >
      <span className="flex items-start gap-4">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-lg transition duration-200 ${
            step.kind === "Trigger"
              ? "bg-gradient-to-br from-blue-600 to-cyan-500 shadow-blue-600/20"
              : "bg-gradient-to-br from-violet-600 to-teal-500 shadow-violet-600/20"
          }`}
        >
          <WorkflowIcon name={step.icon} />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {step.kind}
          </span>
          <span className="mt-1 block text-base font-black text-slate-950 dark:text-white">
            {step.title}
          </span>
          <span className="mt-2 block text-sm leading-6 text-slate-500 dark:text-slate-400">
            {step.description}
          </span>
        </span>
      </span>
    </button>
  );
}
