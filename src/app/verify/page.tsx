"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

import type { Certificate } from "@/lib/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value));
}

type State =
  | { status: "idle" }
  | { status: "loading"; id: string }
  | { status: "error"; message: string; id: string }
  | { status: "success"; certificate: Certificate };

export default function VerifyPage({ searchParams }: { searchParams: { id?: string } }) {
  const [input, setInput] = useState(searchParams.id ?? "");
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    const initialId = searchParams.id?.trim();
    if (!initialId) return;

    setInput(initialId);
    handleVerify(initialId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerify = async (id: string) => {
    if (!id) return;
    setState({ status: "loading", id });
    try {
      const response = await fetch(`/api/certificates/${encodeURIComponent(id)}`);
      if (!response.ok) {
        setState({ status: "error", message: "Certificate not found in ledger.", id });
        return;
      }
      const payload = await response.json();
      setState({ status: "success", certificate: payload.certificate });
    } catch (error) {
      console.error(error);
      setState({ status: "error", message: "Network error. Please retry.", id });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleVerify(input.trim());
  };

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-5xl flex-col gap-14 px-6 pb-24 pt-12 sm:px-8">
      <div className="grid-overlay" />
      <header className="flex flex-col gap-3 text-center">
        <p className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
          Verification Lab
        </p>
        <h1 className="text-4xl font-semibold text-slate-100">Check credential authenticity</h1>
        <p className="text-base text-slate-300/75">
          Submit a certificate identifier to inspect issuer metadata, issuance timestamps, and blockchain anchoring data.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="glass-surface relative flex flex-col gap-4 rounded-3xl border border-slate-800/70 p-6 shadow-2xl sm:flex-row sm:items-center"
      >
        <input
          required
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="CERT-2024-ALPHA"
          className="w-full rounded-2xl border border-slate-700/50 bg-slate-950/60 px-5 py-3 text-sm text-slate-100 shadow-inner outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-300/30"
        />
        <button
          type="submit"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 px-7 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-white shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-100/60"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-700 group-hover:opacity-40" />
          <span className="relative">Verify now</span>
        </button>
      </form>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="glass-surface relative overflow-hidden rounded-3xl border border-slate-800/60 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/20 opacity-70" />
          <div className="relative z-10 space-y-5">
            <h2 className="text-2xl font-semibold text-slate-50">Verification snapshot</h2>
            {state.status === "idle" && <p className="text-sm text-slate-400">Awaiting an ID to inspect the ledger.</p>}
            {state.status === "loading" && <LoadingCard id={state.id} />}
            {state.status === "error" && <ErrorCard message={state.message} id={state.id} />}
            {state.status === "success" && <CertificateCard certificate={state.certificate} />}
          </div>
        </article>
        <aside className="glass-surface relative overflow-hidden rounded-3xl border border-slate-800/60 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/20" />
          <div className="relative z-10 space-y-4 text-sm text-slate-300/80">
            <h3 className="text-lg font-semibold text-slate-100">What happens during verification?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                Query the simulated ledger store for matching certificate metadata.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-violet-300" />
                Compute and compare the stored SHA-256 content hash for data integrity.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                Return issuer, block reference, and status badge with animated confirmation.
              </li>
            </ul>
            <Link href="/admin" className="inline-flex items-center gap-2 text-cyan-200 transition hover:text-white">
              Issue a new credential ↗
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}

function LoadingCard({ id }: { id: string }) {
  return (
    <div className="space-y-4 rounded-2xl border border-cyan-400/40 bg-slate-900/70 p-6">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
        <span className="h-2 w-2 animate-ping rounded-full bg-cyan-200" />
        Querying {id}
      </div>
      <div className="shimmer h-10 rounded-lg" />
      <div className="shimmer h-3 w-36 rounded-lg" />
      <div className="shimmer h-3 w-48 rounded-lg" />
    </div>
  );
}

function ErrorCard({ message, id }: { message: string; id: string }) {
  return (
    <div className="space-y-4 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-6 text-sm text-rose-100">
      <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em]">
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        {id}
      </div>
      <p>{message}</p>
    </div>
  );
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <div className="space-y-6 rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 via-emerald-500/10 to-transparent p-6 shadow-xl">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200">
        Verified on blockchain
      </div>
      <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
        <InfoRow label="Certificate ID" value={certificate.id} />
        <InfoRow label="Owner" value={certificate.ownerName} />
        <InfoRow label="Issuer" value={certificate.issuer} />
        <InfoRow label="Course" value={certificate.courseName} />
        <InfoRow label="Issued" value={formatDate(certificate.issueDate)} />
        <InfoRow label="Network" value={certificate.blockchain.network} />
        <InfoRow label="Block" value={`#${certificate.blockchain.blockNumber}`} />
        <InfoRow label="Tx Hash" value={certificate.blockchain.transactionHash} isHash />
      </div>
      {certificate.metadata?.description && (
        <div className="rounded-2xl border border-emerald-400/40 bg-slate-900/40 p-4 text-sm text-slate-200/80">
          {certificate.metadata.description}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value, isHash }: { label: string; value: string; isHash?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-[0.32em] text-emerald-200/60">{label}</p>
      <p className={`font-medium ${isHash ? "break-all text-emerald-100" : "text-slate-100"}`}>{value}</p>
    </div>
  );
}
