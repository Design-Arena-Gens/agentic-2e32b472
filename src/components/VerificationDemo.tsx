"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type VerificationState =
  | { status: "idle" }
  | { status: "loading"; id: string }
  | { status: "success"; id: string; issuer: string; courseName: string; issueDate: string }
  | { status: "error"; id: string; message: string };

const placeholderIds = ["CERT-2024-ALPHA", "CERT-2024-ZENITH", "CERT-2024-SPECTRUM"];

export function VerificationDemo() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<VerificationState>({ status: "idle" });
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(input.trim());
    }, 450);
    return () => clearTimeout(timeout);
  }, [input]);

  useEffect(() => {
    const id = debounced;
    if (!id) {
      queueMicrotask(() => setState({ status: "idle" }));
      return;
    }

    const controller = new AbortController();
    const verify = async () => {
      queueMicrotask(() => setState({ status: "loading", id }));
      try {
        const response = await fetch("/api/certificates/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const payload = await response.json();
          setState({ status: "error", id, message: payload.message ?? "Not found" });
          return;
        }

        const payload = await response.json();
        const certificate = payload.certificate;
        setState({
          status: "success",
          id,
          issuer: certificate.issuer,
          courseName: certificate.courseName,
          issueDate: certificate.issueDate,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setState({ status: "error", id, message: "Network error. Please retry." });
      }
    };

    verify();
    return () => controller.abort();
  }, [debounced]);

  const [placeholder] = useState(() => {
    return placeholderIds[Math.floor(Math.random() * placeholderIds.length)];
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDebounced(input.trim());
  };

  return (
    <div className="glass-surface relative overflow-hidden rounded-3xl border border-slate-800/70 p-10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/20 opacity-70" />
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-slate-100">Instant Ledger Check</h3>
          <p className="mt-3 text-base text-slate-300/90">
            Paste a certificate ID to simulate on-ledger verification. Results are streamed with shimmer loading and
            dynamic status feedback.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-5 py-3.5 text-base text-slate-100 shadow-inner outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/40"
              placeholder={placeholder}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Certificate ID"
            />
            <button
              type="submit"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-100/60"
            >
              <span className="absolute inset-0 translate-y-full bg-white/25 opacity-80 transition-transform duration-700 ease-out group-hover:translate-y-0" />
              <span className="relative">Verify</span>
            </button>
          </form>
          <p className="mt-2 text-xs text-slate-400">
            Try{" "}
            <button
              type="button"
              className="underline decoration-dotted decoration-cyan-300/70 underline-offset-4 transition hover:text-cyan-200"
              onClick={() => setInput("CERT-2024-ALPHA")}
            >
              CERT-2024-ALPHA
            </button>{" "}
            or mint a new certificate inside the admin sandbox.
          </p>
        </div>
        <div className="w-full max-w-xs space-y-4">
          <VerificationResultCard state={state} />
          <Link
            href={`/verify${state.status === "success" ? `?id=${encodeURIComponent(state.id)}` : ""}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600/50 bg-slate-900/60 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-300/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200/60"
          >
            Open full verification view
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-cyan-300">
              <path
                d="M5 12H19M19 12L12.5 5.5M19 12L12.5 18.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function VerificationResultCard({ state }: { state: VerificationState }) {
  if (state.status === "idle") {
    return (
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5 text-sm text-slate-300/80">
        Enter an ID to preview verification in real time. Ledger status and metadata will appear instantly.
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="space-y-3 rounded-2xl border border-cyan-400/40 bg-slate-900/70 p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-cyan-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-200" />
          Checking {state.id}
        </div>
        <div className="shimmer h-12 rounded-lg" />
        <div className="shimmer h-3 w-2/3 rounded-lg" />
        <div className="shimmer h-3 w-1/2 rounded-lg" />
      </div>
    );
  }

  if (state.status === "success") {
    const issueDate = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(
      new Date(state.issueDate),
    );

    return (
      <div className="relative overflow-hidden rounded-2xl border border-emerald-400/50 bg-gradient-to-br from-emerald-500/15 via-emerald-500/10 to-transparent p-5 shadow-lg">
        <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-emerald-400/30 blur-3xl" />
        <div className="relative z-10 space-y-3 text-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300/80">
            Verified
          </div>
          <div>
            <p className="text-slate-200">Certificate: {state.id}</p>
            <p className="text-slate-300/85">Course: {state.courseName}</p>
            <p className="text-slate-300/70">Issuer: {state.issuer}</p>
            <p className="text-slate-300/70">Issued: {issueDate}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-2xl border border-rose-400/40 bg-gradient-to-br from-rose-500/20 via-rose-500/10 to-transparent p-5 text-sm text-rose-50/80">
      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em]">
        <span className="h-2 w-2 animate-ping rounded-full bg-rose-200" />
        Not found
      </div>
      <p>{state.message}</p>
    </div>
  );
}
