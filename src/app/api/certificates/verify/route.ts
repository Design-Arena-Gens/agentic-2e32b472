import { NextRequest, NextResponse } from "next/server";
import { getLedger } from "@/lib/ledger";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "Certificate ID is required." }, { status: 400 });
    }

    const ledger = getLedger();
    const result = await ledger.verifyCertificate(id);
    const status = result.isValid ? 200 : 404;
    return NextResponse.json(result, { status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to verify certificate." }, { status: 500 });
  }
}
