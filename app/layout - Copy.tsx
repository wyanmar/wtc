import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LPK WTC BALI - Lembaga Pelatihan Kerja Profesional",
    template: "%s | LPK Indonesia",
  },
  description:
    "Website resmi LPK WTC untuk informasi program pelatihan kerja, cabang, jadwal, promosi, dan pendaftaran peserta secara online.",
  keywords: [
    "LPK",
    "Lembaga Pelatihan Kerja",
    "Pelatihan Kerja",
    "Kursus Kerja",
    "LPK Bali",
    "Pelatihan Skill",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
  <Navbar />
  {children}
 <Footer />
<BackToTop />
</body>
    </html>
  );
}
