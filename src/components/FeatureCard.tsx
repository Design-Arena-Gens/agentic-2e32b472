import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  accent: "indigo" | "cyan" | "violet";
};

const accentMap: Record<FeatureCardProps["accent"], string> = {
  indigo: "from-indigo-400/25 via-indigo-500/10 to-transparent",
  cyan: "from-cyan-400/25 via-cyan-500/10 to-transparent",
  violet: "from-violet-400/25 via-violet-500/10 to-transparent",
};

export function FeatureCard({ icon, title, description, accent }: FeatureCardProps) {
  return (
    <div
      className={`hover-card glass-surface relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br ${accentMap[accent]} p-8 shadow-xl transition`}
    >
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900/70 ring-1 ring-inset ring-slate-100/10">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-50">{title}</h3>
          <p className="mt-2 text-base text-slate-300/90">{description}</p>
        </div>
      </div>
      <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-gradient-to-tr from-transparent via-sky-400/10 to-sky-500/40 blur-2xl" />
    </div>
  );
}
