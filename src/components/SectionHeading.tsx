type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-3xl ${align === "center" ? "text-center" : ""}`}>
      <p className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/80">
        {eyebrow}
      </p>
      <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-slate-300/80">{description}</p>
    </div>
  );
}
