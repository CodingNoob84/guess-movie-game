import React from "react";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/provider/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Guess Movie Name",
  description: "Created by Karthik",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
