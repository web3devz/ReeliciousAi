import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { RBBTProvider } from "rbbt-client/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ReeliciousAi",
    template: "% | ReeliciousAi",
  },
  description: "Ai powered content creation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Providers>
          <RBBTProvider
            config={{
              url: process.env.RBBT_WS_URL!,
              vhost: process.env.RBBT_VHOST!,
              username: process.env.RBBT_USERNAME!,
              password: process.env.RBBT_PASSWORD!,
            }}
          >
            {children}
          </RBBTProvider>
        </Providers>
      </body>
    </html>
  );
}
