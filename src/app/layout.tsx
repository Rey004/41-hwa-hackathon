import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pawpath — Every pawstep learns something.",
  description: "Premium all-in-one interactive dog training mat. Playtime with a little more purpose.",
  openGraph: {
    title: "Pawpath — Premium Dog Training Mat",
    description: "Every pawstep learns something.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-foreground selection:bg-organic-green selection:text-white">
        {children}
      </body>
    </html>
  );
}
