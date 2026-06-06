import WorkflowIcon from "./builder/WorkflowIcon";
import type { PaletteItem } from "./builder/types";

export default function SidebarItem({
  item,
  onAdd,
}: {
  item: PaletteItem;
  onAdd: (item: PaletteItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onAdd(item)}
      className="group w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition duration-200 hover:scale-105 hover:border-blue-300 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-cyan-400 dark:hover:bg-slate-800"
    >
      <span className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-950 text-white shadow-sm transition duration-200 group-hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:group-hover:bg-cyan-300">
          <WorkflowIcon name={item.icon} />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            {item.kind}
          </span>
          <span className="mt-1 block text-sm font-black text-slate-950 dark:text-white">
            {item.title}
          </span>
          <span className="mt-2 block text-xs leading-5 text-slate-500 dark:text-slate-400">
            {item.description}
          </span>
        </span>
      </span>
    </button>
  );
}
