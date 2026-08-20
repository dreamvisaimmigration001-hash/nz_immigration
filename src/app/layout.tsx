import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import "./app.css";
import Providers from "@/components/Providers";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Immigration New Zealand :: Immigration New Zealand",
  description: "Process to apply for a visa in New Zealand",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },
};

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
