import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import TRPCProvider from "@/providers/TRPCProvider";

import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RAF Student App",
  description: "App made by RAF student for RAF students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TRPCProvider>
        <html lang="en">
          <body className={inter.className}>
            <ThemeProvider enableSystem attribute="class" defaultTheme="system">
              {children}
            </ThemeProvider>
          </body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  );
}
