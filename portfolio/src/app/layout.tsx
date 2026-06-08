import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "B Akshaya — CSE Student & Developer",
  description:
    "CSE student at CIT Chennai | Data Analyst @ Hyundai | Software Intern @ HCLTech | Python · AI/ML · Full Stack.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="bg-[#030308] overflow-x-hidden">{children}</body>
    </html>
  );
}
