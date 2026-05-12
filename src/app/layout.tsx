import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../components/layout/header";
import { AudioProvider } from "../components/providers/audio-provider";
import { QueryProvider } from "../components/providers/query-provider";
import { Footer } from "../components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIMILE-LAND",
  description: "We wanna make you smile !!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-gray-lighter)]">
        <QueryProvider>
          <AudioProvider>
            <Header />
            <div className="layout">{children}</div>
          </AudioProvider>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
