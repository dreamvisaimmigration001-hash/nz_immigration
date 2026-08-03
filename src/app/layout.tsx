import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import "./app.css";
import "./app.css";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Process to apply :: Immigration New Zealand",
  description: "Process to apply for a visa in New Zealand",
};

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NZ"
      className={`${firaSans.variable} font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#1E222C]" data-pagetype="HomePage" id="app">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
