import { NextResponse } from "next/server";
import { submitContactInquiry } from "@/lib/cms/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await submitContactInquiry({ name, email, phone, subject, message });

    return NextResponse.json({ success: true, message: "Inquiry received successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
