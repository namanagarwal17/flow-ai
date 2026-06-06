import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowAI - AI Workflow Automation Platform",
  description:
    "Build, launch, and monitor AI workflow automations from a clean no-code workspace.",
  keywords: [
    "AI automation",
    "workflow automation",
    "no-code",
    "AI platform",
    "FlowAI",
  ],
  openGraph: {
    title: "FlowAI - AI Workflow Automation Platform",
    description: "Automate your work with AI-powered workflows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-slate-950 antialiased transition-colors duration-200 dark:bg-gray-900 dark:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
