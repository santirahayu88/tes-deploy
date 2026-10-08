import { AuthProvider } from "@/context/AuthContext";
import { FavoriteProvider } from "@/context/FavoriteContext";
import { createClient } from "@/lib/supabase/server";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`dark ${fontSans.variable}`}>
      <body className="...">
        <AuthProvider user={user ? { id: user.id, email: user.email } : null}>
          <FavoriteProvider>
            {/* Navbar, main, Footer tetap */}
          </FavoriteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
