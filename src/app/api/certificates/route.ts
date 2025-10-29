import { NextRequest, NextResponse } from "next/server";
import { getLedger } from "@/lib/ledger";

export async function GET() {
  const ledger = getLedger();
  const certificates = await ledger.listCertificates();
  return NextResponse.json({ certificates });
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const ledger = getLedger();
    const certificate = await ledger.issueCertificate(payload);
    return NextResponse.json({ certificate, message: "Certificate issued successfully." }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to issue certificate." }, { status: 500 });
  }
}
