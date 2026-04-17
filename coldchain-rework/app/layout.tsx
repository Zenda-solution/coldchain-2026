// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/NavBar";

import { Albert_Sans, Instrument_Serif } from "next/font/google";

const albert = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body", // opcional pero limpio
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${albert.variable} ${serif.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}