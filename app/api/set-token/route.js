import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ message: "Token berhasil dipasang!" });
  res.cookies.set("token", "12345", { path: "/" });
  return res;
}