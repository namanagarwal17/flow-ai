const settings = [
  "Workspace profile",
  "Connected apps",
  "Notification rules",
  "Billing and limits",
];

export default function SettingsPage() {
  return (
    <section className="grid gap-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">
          Settings
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Manage your workspace.
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {settings.map((setting) => (
          <article
            key={setting}
            className="card-hover rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 className="text-lg font-black text-slate-950 dark:text-white">{setting}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Configure defaults, permissions, and automation behavior for this
              FlowAI workspace.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
