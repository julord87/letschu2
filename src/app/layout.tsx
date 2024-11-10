import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";



export const metadata: Metadata = {
  title: {
    template: "%s - Letschu <3",
    default: 'Home - Letschu <3'
  },
  description: "Tienda virtual de arneses y accesiorios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
