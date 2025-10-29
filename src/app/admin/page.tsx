import Link from "next/link";

import { AdminIssueForm } from "@/components/AdminIssueForm";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 pb-24 pt-12 sm:px-8">
      <div className="grid-overlay" />
      <header className="space-y-4 text-center">
        <p className="inline-flex items-center justify-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-purple-200/80">
          Issuer sandbox
        </p>
        <h1 className="text-4xl font-semibold text-slate-100">Prototype certificate issuance console</h1>
        <p className="text-base text-slate-300/75">
          Draft metadata, upload supporting files, and simulate on-ledger anchoring with animated confirmations tailored
          for demos.
        </p>
      </header>
      <AdminIssueForm />
      <div className="flex items-center justify-between rounded-3xl border border-slate-800/60 bg-slate-950/70 px-6 py-5 text-sm text-slate-400">
        <p>
          All certificates are stored in a local JSON ledger for prototype purposes. Extend this layer with a real
          blockchain integration for production.
        </p>
        <Link href="/" className="text-cyan-200 transition hover:text-white">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
