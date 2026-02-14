// app/api/generate-pdf/route.ts
import { NextResponse } from "next/server";
import { ActaSchema } from "@/app/schema/acta.schema";
import { generateActaPDF } from "@/lib/pdf";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = ActaSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid acta structure",
          issues: parsed.error.issues,
        },
        { status: 422 }
      );
    }

    const notes =
      typeof (body as { notes?: string }).notes === "string"
        ? (body as { notes?: string }).notes
        : undefined;

    const pdfBytes = await generateActaPDF(parsed.data, notes);

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="acta.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
