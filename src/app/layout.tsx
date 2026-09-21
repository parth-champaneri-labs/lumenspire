import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./digital.css";

const manrope = localFont({
  src: "../fonts/manrope-latin.woff2",
  weight: "200 800",
  variable: "--font-manrope",
});

const sans = localFont({ src: "../fonts/dm-sans-latin.woff2", weight: "100 1000", variable: "--font-sans", display: "swap" });
const editorial = localFont({ src: [{ path: "../fonts/instrument-serif.woff2", weight: "400", style: "normal" }, { path: "../fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" }], variable: "--font-editorial", display: "swap" });

export const metadata: Metadata = {
  icons: { icon: "/brand/lumenspire-icon.png", shortcut: "/brand/lumenspire-icon.png" },
  title: "LumenSpire | Modern Software & Digital Solutions",
  description: "LumenSpire designs and develops modern websites, custom software, and intelligent business solutions that help companies simplify operations and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${sans.variable} ${editorial.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

