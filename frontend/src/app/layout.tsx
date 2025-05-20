import type { Metadata } from "next";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { SearchProvider } from "@/context/SearchContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";

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
      <Toaster position="top-right" />
      <CartProvider>
        <AuthProvider>
          <SearchProvider>
            <Header />
            {children}
            <Footer />
          </SearchProvider>
        </AuthProvider>
      </CartProvider>
      </body>
    </html>
  );
}
