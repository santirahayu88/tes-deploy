import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Menanamkan cookie 'token' agar lolos dari Auth Guard middleware
  response.cookies.set("token", "user-token-secret", {
    httpOnly: true,
    path: "/",
  });

  return response;
}
