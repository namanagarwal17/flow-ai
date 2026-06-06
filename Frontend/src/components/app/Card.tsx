import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {children}
    </div>
  );
}
