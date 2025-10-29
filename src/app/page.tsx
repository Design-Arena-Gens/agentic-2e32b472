import Link from "next/link";
import { FeatureCard } from "@/components/FeatureCard";
import { FloatingChainIcon } from "@/components/FloatingChainIcon";
import { HowItWorksTimeline } from "@/components/HowItWorksTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { VerificationDemo } from "@/components/VerificationDemo";

const featureItems = [
  {
    title: "Issue",
    description: "Design credentials with metadata fields, anchor hashes, and stream finality updates in real time.",
    accent: "indigo" as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-indigo-300">
        <path
          d="M8.5 5H15.5C16.3284 5 17 5.67157 17 6.5V17.5C17 18.3284 16.3284 19 15.5 19H8.5C7.67157 19 7 18.3284 7 17.5V6.5C7 5.67157 7.67157 5 8.5 5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M9 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Verify",
    description: "Visitors submit certificate IDs to validate authenticity against the simulated blockchain ledger.",
    accent: "cyan" as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-cyan-300">
        <path
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M9.5 12.5L11 14L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Share",
    description: "Securely export verified credentials with QR codes, share links, and audit-friendly metadata logs.",
    accent: "violet" as const,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-violet-300">
        <path d="M15 8L21 4V16L15 20V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8L15 4V16L9 20V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 8L9 4V16L3 20V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden pb-24">
      <div className="grid-overlay" />
      <div className="gradient-orb -left-36 top-12" />
      <div className="gradient-orb -bottom-24 right-10" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pt-10 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/60 px-6 py-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/40 to-cyan-500/30 text-lg font-semibold text-white shadow-lg">
              ⛓️
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-400">ChainScribe</p>
              <p className="text-xs text-slate-500">Trustless credentials engine</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            <Link href="#features" className="transition hover:text-white">Features</Link>
            <Link href="#timeline" className="transition hover:text-white">How it works</Link>
            <Link href="/verify" className="transition hover:text-white">Verify</Link>
            <Link href="/admin" className="transition hover:text-white">Admin</Link>
          </nav>
          <Link
            href="/verify"
            className="group relative hidden overflow-hidden rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100 shadow-lg transition hover:border-cyan-200/50 hover:text-white md:inline-flex"
          >
            <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-700 ease-out group-hover:translate-y-0" />
            <span className="relative">Launch Demo</span>
          </Link>
        </header>

        <main className="relative space-y-28">
          <section className="relative grid items-center gap-12 rounded-[40px] border border-slate-800/60 bg-slate-950/70 px-8 py-16 shadow-2xl sm:px-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-br from-indigo-500/15 via-transparent to-purple-500/25 opacity-70" />
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-sky-200/80">
                Blockchain-native trust
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
                Verify every credential with blockchain-grade certainty.
              </h1>
              <p className="max-w-xl text-lg text-slate-300/85">
                ChainScribe prototypes verifiable credentials with dynamic gradients, shimmering states, and a simulated
                ledger so you can demo blockchain-backed trust flows in minutes.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/verify"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 px-7 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-white shadow-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-100/60"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-700 group-hover:opacity-40" />
                  <span className="relative">Verify a certificate</span>
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700/60 bg-slate-900/60 px-7 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-slate-200 transition hover:border-indigo-300/50 hover:text-white"
                >
                  Issue credentials
                </Link>
              </div>
              <div className="flex flex-col gap-4 text-xs text-slate-400 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200">99%</span>
                  Ledger uptime on simulated AuroraSim testnet.
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-200">1.2s</span>
                  Average verification response time.
                </div>
              </div>
            </div>
            <FloatingChainIcon />
          </section>

          <section id="features" className="space-y-12">
            <SectionHeading
              eyebrow="Feature Modules"
              title="Issue, verify, and share credentials with motion-rich feedback."
              description="Every interaction is wrapped in gradients, hover glows, and smooth transitions to emphasise trust without sacrificing clarity."
            />
            <div className="grid gap-8 md:grid-cols-3">
              {featureItems.map((item) => (
                <FeatureCard key={item.title} title={item.title} description={item.description} accent={item.accent} icon={item.icon} />
              ))}
            </div>
          </section>

          <section id="timeline" className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-10">
              <SectionHeading
                eyebrow="Workflow"
                title="Three steps from raw data to blockchain-verifiable trust."
                description="Each card animates into view on scroll with timeline connectors that glow against the simulated grid backdrop."
                align="left"
              />
              <HowItWorksTimeline />
            </div>
            <VerificationDemo />
          </section>
        </main>

        <footer className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/80 px-6 py-6 text-sm text-slate-500 shadow-xl md:flex-row">
          <p className="text-center md:text-left">© {new Date().getFullYear()} ChainScribe Prototype. Crafted for immersive blockchain demos.</p>
          <div className="flex items-center gap-4">
            <a className="transition hover:text-white" href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="transition hover:text-white" href="https://x.com" target="_blank" rel="noreferrer">
              X
            </a>
            <a className="transition hover:text-white" href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
