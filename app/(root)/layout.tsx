import type { Metadata } from "next";
import "../globals.css";
import { Poppins } from 'next/font/google'
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})
export const metadata: Metadata = {
  title: "Edutech",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased bg-blue-500`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}