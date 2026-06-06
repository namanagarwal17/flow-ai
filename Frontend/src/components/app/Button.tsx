import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-950 text-white shadow-lg shadow-slate-900/15 hover:bg-blue-700 hover:shadow-blue-600/20 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-100",
  secondary:
    "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-white",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-black transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white disabled:pointer-events-none disabled:opacity-60 dark:focus:ring-cyan-400 dark:focus:ring-offset-gray-900 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
