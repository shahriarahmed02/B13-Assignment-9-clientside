import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="en" data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* Navbar component */}
        <Navbar />
        
        {/* Main content of each page */}
        <main className="flex-grow max-w-7xl mx-auto w-full p-4">
          {children}
        </main>
        
        {/* Footer component */}
        <Footer />
      </body>
    </html>
  );
}