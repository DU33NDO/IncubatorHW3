"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import axios from "axios";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
