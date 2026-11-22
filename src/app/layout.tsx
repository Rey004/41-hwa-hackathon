import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { SITE_URL } from "@/lib/products";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PAWPATH — Every Pawstep Learns Something",
  description:
    "Meet PAWPATH, the interactive all-in-one dog-training mat featuring five integrated zones that turn everyday learning into engaging little challenges for your dog.",
  keywords: [
    "PAWPATH",
    "dog training mat",
    "interactive dog training mat",
    "puppy training mat",
    "dog place mat",
    "target zone dog",
    "positive reinforcement dog training",
  ],
  authors: [{ name: "PAWPATH" }],
  openGraph: {
    title: "PAWPATH — Good habits start with a pawstep",
    description:
      "What if playtime could teach a little more? Meet PAWPATH, the interactive training mat with five integrated zones.",
    images: ["/images/products/hero.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PAWPATH",
    url: SITE_URL,
    logo: `${SITE_URL}/images/products/hero.webp`,
    description:
      "PAWPATH creates innovative interactive dog-training mats with five permanently integrated zones.",
    sameAs: [],
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf8f3] text-[#14241c]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
