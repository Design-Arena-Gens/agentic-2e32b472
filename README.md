# ChainScribe Prototype

Immersive, animation-rich prototype for a blockchain-based certificate issuance and verification experience. Built with Next.js 16 (App Router), Tailwind CSS v4, and a lightweight JSON-backed ledger that simulates blockchain anchoring.

## ✨ Experience Highlights
- Futuristic gradient aesthetic with animated hero, hover glows, parallax iconography, and shimmering skeleton states.
- Scroll-triggered sections: feature trio, timeline walkthrough, live verification sandbox, and animated admin dashboard mockup.
- Floating Web3 insignia that reacts to pointer movement while respecting `prefers-reduced-motion`.
- Real-time verification demo with optimistic shimmer feedback and deep-linked results page.
- Admin issuing console that generates deterministic SHA-256 hashes and animated success badges.

## 🗂️ Technical Overview
- **Frontend**: Next.js App Router, React Server Components + client islands, modern Tailwind CSS utilities, custom CSS animations.
- **Backend**: API routes under `/api/certificates` for issue, verify, and fetch-by-id flows.
- **Ledger**: File-based JSON store (`data/ledger.json`) wrapped by a minimal TypeScript data layer to simulate blockchain persistence.
- **Accessibility**: Reduced-motion fallbacks, high-contrast palette, focus-visible states.

## 🚀 Getting Started
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Useful Scripts
- `npm run build` – Production build validation.
- `npm run start` – Start the compiled app.
- `npm run lint` – Lint the codebase with the Next.js shareable config.

## 🔌 API Endpoints
| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/certificates` | Issue a new certificate and persist to ledger |
| `POST` | `/api/certificates/verify` | Verify a certificate ID and return status |
| `GET` | `/api/certificates/:id` | Fetch certificate metadata by identifier |

## 🧪 Prototype Data
Seeded with a demo credential: `CERT-2024-ALPHA`. Use it on the homepage or verification lab to see the full flow.

## 📦 Deploying to Vercel
```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-2e32b472
# verify
curl https://agentic-2e32b472.vercel.app
```

> ℹ️ The ledger is file-backed for prototyping. Swap `src/lib/ledger.ts` with an SDK-backed service (e.g., Sepolia, Polygon PoS, or a hosted Postgres instance) for production-grade persistence.
