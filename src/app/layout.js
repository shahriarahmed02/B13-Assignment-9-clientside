import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/providers/AuthProvider"; // Import AuthProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyNook - Collaborative Study Platform",
  description: "A platform for group studies and assignments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="studynookTheme">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-base-100 text-base-content`}>
        {/* Wrap everything inside AuthProvider */}
        <AuthProvider>
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto w-full p-4">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}