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
  title: "Maternal Moments | Yenidoğan Çekimine Özel AI Hamile Portreleri",
  description:
    "Yenidoğan çekimi görüşmelerine ek, fotoğrafçı gözüyle yönlendirilen ve seçilen AI destekli hamile portreleri.",
  openGraph: {
    title: "Maternal Moments",
    description:
      "Yenidoğan çekimine özel fotoğrafçı kürasyonlu AI hamile portreleri.",
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
