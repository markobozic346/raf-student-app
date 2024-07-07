import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import TRPCProvider from "@/providers/TRPCProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

import Header from "@/components/layout/Header";

import "./globals.css";
import { Toaster } from "sonner";

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
              <main className="w-full lg:max-w-[1250px] md:max-w-[100%] overflow-scroll md:overflow-hidden mx-auto flex min-h-screen flex-col items-center md:py-8 md:px-20 py-4 sm:5">
                <Header />
                <div className="mx-4 md:mx-0">{children}</div>
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
              <Toaster richColors />
            </ThemeProvider>
          </body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  );
}
