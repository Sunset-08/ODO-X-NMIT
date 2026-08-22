import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DayFlow — Every workday, perfectly aligned.",
  description: "DayFlow is a professional HR Management System for managing employees, attendance, leave, and payroll.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-background text-text antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
