import type { Metadata } from "next";
import { Inter, Philosopher } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-philosopher",
});

export const metadata: Metadata = {
  title: "Atlas Store",
  description: "Магазин Atlas Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} ${philosopher.variable}`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
