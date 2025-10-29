import { NextRequest, NextResponse } from "next/server";
import { getLedger } from "@/lib/ledger";

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const ledger = getLedger();
  const certificate = await ledger.getCertificate(decodeURIComponent(id));

  if (!certificate) {
    return NextResponse.json({ message: "Certificate not found." }, { status: 404 });
  }

  return NextResponse.json({ certificate });
}
