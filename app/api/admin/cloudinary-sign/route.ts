import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { createClient } from "@/lib/supabase/server";

// The browser uploads directly to Cloudinary using this signature —
// the API secret never leaves the server, and only an authenticated
// admin session can request one.
export async function POST(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "CMS not configured." }, { status: 503 });
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { folder = "krishal-portfolio" } = await request.json().catch(() => ({}));
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    timestamp,
    signature,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
