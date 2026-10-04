import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // =========================================================
  // 1. LOGGER (Paling Atas)
  // Tanpa 'return', sehingga hanya mencatat log lalu lanjut ke bawah
  // =========================================================
  if (pathname.startsWith("/api")) {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${request.method} ${pathname}`);
  }

  // =========================================================
  // 2. MAINTENANCE MODE
  // Dijalankan sebelum Auth Guard
  // =========================================================
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // =========================================================
  // 3. AUTH GUARD
  // Dijalankan terakhir untuk memproteksi halaman tertentu
  // =========================================================
  /*if (pathname.startsWith("/favorites")) {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }*/
  // =========================================================
  // 3. AUTH GUARD
  // =========================================================
  const protectedRoutes = ["/dashboard"]; // Masukkan rute yang WAJIB login di sini
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Jika semua pemeriksaan lolos
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};