import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { Certificate, IssueCertificatePayload, VerifyCertificateResponse } from "./types";

type LedgerData = {
  certificates: Certificate[];
};

const DATA_PATH = path.join(process.cwd(), "data", "ledger.json");

async function ensureFileExists() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    const initial: LedgerData = { certificates: [] };
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(initial, null, 2), "utf-8");
  }
}

async function readLedger(): Promise<LedgerData> {
  await ensureFileExists();
  const file = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(file) as LedgerData;
}

async function writeLedger(data: LedgerData) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function createHash(payload: IssueCertificatePayload): string {
  const digest = crypto.createHash("sha256");
  digest.update(JSON.stringify(payload));
  digest.update(Date.now().toString());
  return digest.digest("hex");
}

function buildCertificateId(): string {
  return `CERT-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export class Ledger {
  static instance: Ledger | null = null;

  static getInstance(): Ledger {
    if (!Ledger.instance) {
      Ledger.instance = new Ledger();
    }
    return Ledger.instance;
  }

  async listCertificates() {
    const data = await readLedger();
    return data.certificates;
  }

  async getCertificate(id: string): Promise<Certificate | null> {
    const data = await readLedger();
    return data.certificates.find((cert) => cert.id === id) ?? null;
  }

  async verifyCertificate(id: string): Promise<VerifyCertificateResponse> {
    const certificate = await this.getCertificate(id);
    if (!certificate) {
      return { isValid: false, message: "Certificate not found in ledger." };
    }

    return {
      isValid: true,
      certificate,
      message: `Certificate ${id} is registered on ${certificate.blockchain.network}.`,
    };
  }

  async issueCertificate(payload: IssueCertificatePayload): Promise<Certificate> {
    const data = await readLedger();
    const userDate = payload.issueDate ? new Date(payload.issueDate) : null;
    const issueDate = userDate && !Number.isNaN(userDate.getTime()) ? userDate.toISOString() : new Date().toISOString();
    const hash = createHash(payload);
    const certificate: Certificate = {
      id: buildCertificateId(),
      ownerName: payload.ownerName,
      courseName: payload.courseName,
      issuer: payload.issuer,
      issueDate,
      contentHash: hash,
      blockchain: {
        network: "AuroraSim Testnet",
        transactionHash: `0x${hash.slice(0, 12)}`,
        blockNumber: Math.floor(Date.now() / 1000),
      },
      metadata: {
        description: payload.metadata?.description ?? "No description provided.",
        mediaUrl: payload.metadata?.mediaUrl,
      },
    };

    data.certificates.push(certificate);
    await writeLedger(data);
    return certificate;
  }
}

let cachedLedger: Ledger | null = null;

export function getLedger(): Ledger {
  if (!cachedLedger) {
    cachedLedger = Ledger.getInstance();
  }
  return cachedLedger;
}
