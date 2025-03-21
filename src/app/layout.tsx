import type { Metadata } from "next";
import { Geist, Geist_Mono, Pirata_One, Nunito, Black_Ops_One } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pirateFont = Pirata_One({ subsets: ["latin"], weight: "400", variable: "--font-pirate" });
const nunitoFont = Nunito({ subsets: ["latin"], weight: "400", variable: "--font-nunito" });
const blackOpsFont = Black_Ops_One({ subsets: ["latin"], weight: "400", variable: "--font-blackops" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pirateFont.variable} ${nunitoFont.variable} ${blackOpsFont.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
