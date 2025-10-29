import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "ChainScribe | Blockchain Certificate Verification",
  description:
    "Prototype dashboard for issuing and verifying blockchain-backed certificates with immersive gradient UI and smooth animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`app-shell antialiased ${poppins.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
