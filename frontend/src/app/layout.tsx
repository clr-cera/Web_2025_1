import type { Metadata } from "next";
import "@/styles/globals.css"


export const metadata: Metadata = {
  title: "Elements_Store",
  description: "Web store for elements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> {children} </body>
    </html>
  );
}
