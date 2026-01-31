import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NepX Creation | Premium IT & Digital Solutions",
  description:
    "NepX Creation is a full-stack IT & digital solutions company providing custom software development, website design, automation, video production, and digital marketing services.",
  keywords: [
    "IT company",
    "software development",
    "web development",
    "automation",
    "digital marketing",
    "video production",
    "Nepal",
    "NepX Creation",
  ],
  authors: [{ name: "NepX Creation" }],
  openGraph: {
    title: "NepX Creation | Premium IT & Digital Solutions",
    description:
      "Full-stack IT & digital solutions company providing custom software, web development, automation, and digital marketing.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NepX Creation | Premium IT & Digital Solutions",
    description:
      "Full-stack IT & digital solutions company providing custom software, web development, automation, and digital marketing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import SessionProvider from "@/components/providers/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
