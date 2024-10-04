import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WavyBackground } from "./components/shared/background/wavy-background";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Le Fluffy",
  description: "Find your missing pet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <WavyBackground>{children}</WavyBackground>
      </body>
    </html>
  );
}
