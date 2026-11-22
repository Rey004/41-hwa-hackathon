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
  description:
    "Premium all-in-one interactive dog training mat. Playtime with a little more purpose.",
  metadataBase: new URL("https://41-hwa-hackathon.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pawpath — Every pawstep learns something.",
    description:
      "Premium all-in-one interactive dog training mat. Playtime with a little more purpose.",
    url: "https://41-hwa-hackathon.vercel.app",
    siteName: "Pawpath",
    type: "website",
    images: [{ url: "/images/products/hero.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawpath — Every pawstep learns something.",
    description:
      "Premium all-in-one interactive dog training mat. Playtime with a little more purpose.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pawpath",
    url: "https://41-hwa-hackathon.vercel.app",
    slogan: "Every pawstep learns something.",
    description:
      "Premium all-in-one interactive dog training mat with five permanently built-in learning zones.",
  };

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-foreground selection:bg-organic-green selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
