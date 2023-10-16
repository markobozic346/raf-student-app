import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import TRPCProvider from "@/providers/TRPCProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

import Header from "@/components/layout/Header";
import { ModeToggle } from "@/components/ui/mode-toggle";

import "./globals.css";

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
              <main className="w-full max-w-[1250px] mx-auto flex min-h-screen flex-col items-center py-8 px-20">
                <Header />
                {children}
                <footer className="w-full flex justify-center items-center mt-10">
                  <p className="text-center">
                    Made by RAF{" "}
                    <a
                      target="_blank"
                      className="underline"
                      href="https://github.com/markobozic346"
                    >
                      student
                    </a>{" "}
                    for RAF students.
                  </p>
                </footer>
              </main>
              <ModeToggle />
            </ThemeProvider>
          </body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  );
}
