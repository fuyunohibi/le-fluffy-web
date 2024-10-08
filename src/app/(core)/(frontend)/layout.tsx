
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WavyBackground } from "./components/shared/background/wavy-background";
import { Navbar } from "./components/shared/navbar/nav-bar";
import SessionProvider from "./components/auth/SessionProvider";
import PluginManager from "@/app/(plugins)/pluginsManager";
import AdsPlugin from "@/app/(plugins)/ads";
import LocationPlugin from "@/app/(plugins)/location";
import RewardsPlugin from "@/app/(plugins)/rewards";

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
  title: "le FLUFFY*",
  description: "Find your missing pet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pluginManager = PluginManager.getInstance()

  pluginManager.register(new AdsPlugin())
  pluginManager.register(new LocationPlugin());
  pluginManager.register(new RewardsPlugin());

  pluginManager.executeAll()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <SessionProvider>
          <Navbar />
          <WavyBackground>{children}</WavyBackground>
        </SessionProvider>
      </body>
    </html>
  );
}
