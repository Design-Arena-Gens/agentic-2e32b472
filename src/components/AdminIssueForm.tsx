"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormState = {
  ownerName: string;
  courseName: string;
  issuer: string;
  issueDate: string;
  description: string;
  mediaUrl: string;
  attachmentName: string;
  attachmentContent: string;
};

const initialState: FormState = {
  ownerName: "",
  courseName: "",
  issuer: "",
  issueDate: "",
  description: "",
  mediaUrl: "",
  attachmentName: "",
  attachmentContent: "",
};

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; certificateId: string; issuer: string; hash: string }
  | { type: "error"; message: string };

export function AdminIssueForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setForm((prev) => ({ ...prev, attachmentName: "", attachmentContent: "" }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        attachmentName: file.name,
        attachmentContent: typeof reader.result === "string" ? reader.result.split(",")[1] ?? "" : "",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerName: form.ownerName,
          courseName: form.courseName,
          issuer: form.issuer || "ChainScribe Sandbox Academy",
          issueDate: form.issueDate || undefined,
          metadata: {
            description: form.description || undefined,
            mediaUrl: form.mediaUrl || undefined,
          },
          attachmentName: form.attachmentName || undefined,
          attachmentContent: form.attachmentContent || undefined,
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        setStatus({ type: "error", message: payload.message ?? "Unable to issue certificate." });
        return;
      }

      const payload = await response.json();
      setStatus({
        type: "success",
        certificateId: payload.certificate.id,
        issuer: payload.certificate.issuer,
        hash: payload.certificate.contentHash,
      });
      setForm(initialState);
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Unexpected error. Please retry." });
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-slate-800/60 bg-slate-950/60 p-8 shadow-2xl backdrop-blur-xl">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-100">Issue Certificate</h2>
        <p className="text-sm text-slate-400">
          Prototype admin console. Upload metadata, generate hashes, and stream success feedback with animated badge.
        </p>
      </header>
      <form className="grid grid-cols-1 gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
        <TextField label="Recipient Name" name="ownerName" value={form.ownerName} onChange={handleChange} required />
        <TextField label="Program / Course" name="courseName" value={form.courseName} onChange={handleChange} required />
        <TextField label="Issuer" name="issuer" value={form.issuer} onChange={handleChange} />
        <TextField label="Issue Date" name="issueDate" type="date" value={form.issueDate} onChange={handleChange} />
        <TextField
          label="Reference Media URL"
          name="mediaUrl"
          value={form.mediaUrl}
          onChange={handleChange}
          placeholder="https://..."
        />
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-200">Certificate Narrative</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-700/50 bg-slate-900/60 px-5 py-3 text-sm text-slate-100 shadow-inner outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-300/30"
            placeholder="Highlight achievements, modules completed, or terms of validity."
          />
        </div>
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-200">Upload Attachment (optional)</label>
          <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/40 p-4">
            <input type="file" onChange={handleAttachment} className="text-sm text-slate-300" />
            {form.attachmentName && (
              <p className="text-xs text-slate-400">{form.attachmentName} encoded to base64 for hashing.</p>
            )}
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.32em] text-white shadow-lg transition focus-visible:ring-2 focus-visible:ring-sky-100/50"
            disabled={status.type === "loading"}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative flex items-center gap-3">
              {status.type === "loading" && <Loader />}
              {status.type === "loading" ? "Minting..." : "Generate Hash"}
            </span>
          </button>
          {status.type === "loading" && <span className="text-xs uppercase tracking-[0.32em] text-slate-400">Simulating block finality…</span>}
        </div>
      </form>
      <StatusBanner status={status} />
    </div>
  );
}

type TextFieldProps = {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

function TextField({ label, name, value, onChange, type = "text", required, placeholder }: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
      {label}
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
        placeholder={placeholder}
        className="rounded-2xl border border-slate-700/50 bg-slate-900/60 px-5 py-3 text-sm text-slate-100 shadow-inner outline-none transition focus:border-purple-400/50 focus:ring-2 focus:ring-purple-300/30"
      />
    </label>
  );
}

function Loader() {
  return (
    <span className="flex h-4 w-4 items-center justify-center">
      <span className="inline-flex h-3 w-3 animate-spin rounded-full border-2 border-transparent border-t-white" />
    </span>
  );
}

function StatusBanner({ status }: { status: Status }) {
  if (status.type === "idle") return null;
  if (status.type === "loading") {
    return (
      <div className="shimmer rounded-2xl border border-slate-700/50 p-5 text-sm text-slate-200">
        Minting certificate and writing block hash…
      </div>
    );
  }

  if (status.type === "error") {
    return (
      <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 p-5 text-sm text-rose-100">
        {status.message}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent p-6 text-sm text-emerald-50 shadow-xl">
      <span className="absolute -left-12 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-emerald-400/30 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-3">
        <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em]">
          <AnimatedCheck /> Certificate issued
        </span>
        <div className="grid gap-1 text-xs md:grid-cols-3">
          <p>
            <span className="text-emerald-200/70">ID</span> · {status.certificateId}
          </p>
          <p>
            <span className="text-emerald-200/70">Issuer</span> · {status.issuer}
          </p>
          <p>
            <span className="text-emerald-200/70">Hash</span> · <span className="break-all">{status.hash.slice(0, 18)}…</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function AnimatedCheck() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" className="text-emerald-300">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset="0"
      >
        <animate attributeName="stroke-dashoffset" values="100;0" dur="0.8s" fill="freeze" />
      </circle>
      <path
        d="M22 32.5L29 39.5L42.5 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate attributeName="stroke-dasharray" values="0 1;1 0" dur="0.5s" begin="0.4s" fill="freeze" />
      </path>
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(45)">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
    </svg>
  );
}
