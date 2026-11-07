import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Inter, Plus_Jakarta_Sans, DM_Sans, Cardo } from "next/font/google";
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

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "OBL Prime Imóveis — Bombinhas, SC",
  description:
    "Propiedades exclusivas frente al mar en Bombinhas, Santa Catarina, Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} ${jakarta.variable} ${dmSans.variable} ${cardo.variable} h-full antialiased`}
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
