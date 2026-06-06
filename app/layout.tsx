import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin-ext"],
  variable: "--font-display",
  display: "swap"
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Maternal Moments | AI Destekli Hamile Portreleri",
  description:
    "Fotoğrafçı gözüyle seçilen, AI destekli ve baskıya hazır profesyonel hamile portreleri.",
  openGraph: {
    title: "Maternal Moments",
    description:
      "Evde çekilen fotoğraflardan fotoğrafçı dokunuşlu hamile portreleri.",
    type: "website",
    images: ["/assets/after-window-clean.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${plexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
