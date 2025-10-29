const steps = [
  {
    title: "Issue",
    description:
      "Design credentials, attach metadata, and mint a tamper-proof hash in seconds with the simulated ledger.",
  },
  {
    title: "Anchor",
    description:
      "Register certificate signatures on an immutable ledger shard with transparent block references.",
  },
  {
    title: "Verify",
    description:
      "Students, employers, or partners query any certificate ID to confirm authenticity in real time.",
  },
];

export function HowItWorksTimeline() {
  return (
    <div className="space-y-10">
      {steps.map((step, index) => (
        <div key={step.title} className="timeline-step hover-card glass-surface rounded-3xl border border-slate-700/50 p-6">
          <span className="inline-flex items-center gap-3 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-sky-200/70">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-sm font-semibold text-sky-200">
              0{index + 1}
            </span>
            {step.title}
          </span>
          <p className="mt-4 text-lg text-slate-200">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
