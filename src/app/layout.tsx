import type { Metadata, Viewport } from "next";
import { Anton, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PageTransition } from "@/components/layout/PageTransition";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = Space_Mono({ variable: "--font-mono", weight: ["400", "700"], subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "DROPROOM® — Not Made To Fit In", template: "%s — DROPROOM®" },
  description: "DROPROOM® is an independent experimental streetwear label. Drop 001 — limited release.",
  openGraph: { title: "DROPROOM®", description: "Not made to fit in.", type: "website" },
};
const THEME_SCRIPT = `try{var t=localStorage.getItem("droproom.theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export const viewport: Viewport = { themeColor: "#0c0f16", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${anton.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <CartProvider>
          <AnnouncementBar />
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
