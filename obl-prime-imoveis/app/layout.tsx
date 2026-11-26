import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Inter, Cardo } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import ContactProvider from "./components/ContactProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Lucía Rodríguez Imóveis",
  description:
    "Propiedades exclusivas altamente rentables en Bombinhas, Santa Catarina, Brasil.",
  openGraph: {
    title: "Lucía Rodríguez Imóveis",
    description:
      "Propiedades exclusivas altamente rentables en Bombinhas, Santa Catarina, Brasil.",
    siteName: "Lucía Rodríguez Imóveis",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucía Rodríguez Imóveis",
    description:
      "Propiedades exclusivas altamente rentables en Bombinhas, Santa Catarina, Brasil.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} ${cardo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ContactProvider>
          {children}
          <Footer />
          <WhatsAppButton />
        </ContactProvider>
      </body>
    </html>
  );
}
