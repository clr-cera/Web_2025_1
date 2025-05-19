import type { Metadata } from "next";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { SearchProvider } from "@/context/searchContext";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elements_store",
  description: "Elements store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
      <CartProvider>
        <SearchProvider>
          <Header />
          {children}
        </SearchProvider>
      </CartProvider>
      </body>
    </html>
  );
}
