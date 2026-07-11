import type { Metadata } from "next";
import { Poppins, Nunito, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['600', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "KidSpark AI",
  description: "Learn • Play • Grow",
  themeColor: "#8B5CF6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KidSpark AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable} ${inter.variable}`}>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
