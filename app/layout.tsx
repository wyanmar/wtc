// app/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// Import font Geist
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://domainanda.com"),
  title: {
    default: "LPK WTC BALI",
    template: "%s | LPK WTC BALI",
  },
  description:
    "LPK WTC BALI adalah lembaga pelatihan kerja profesional dengan berbagai program pelatihan dan pengembangan skill kerja modern.",
  keywords: [
    "LPK Bali",
    "Pelatihan kerja Bali",
    "LPK WTC",
    "Kursus kerja",
    "Pelatihan profesional",
    "LPK Indonesia",
  ],
  openGraph: {
    title: "LPK WTC BALI",
    description:
      "Lembaga pelatihan kerja profesional dan pengembangan skill kerja modern.",
    url: "https://domainanda.com",
    siteName: "LPK WTC BALI",
    images: [
      {
        url: "/logo/logo-wtc.webp",
        width: 1200,
        height: 630,
        alt: "LPK WTC BALI",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LPK WTC BALI",
    description:
      "Lembaga pelatihan kerja profesional dan pengembangan skill kerja modern.",
    images: ["/logo/logo-wtc.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={geistSans.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}