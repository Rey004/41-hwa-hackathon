import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { Preloader } from "@/components/loader";

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
  metadataBase: new URL("https://pawpathtraining.com"),
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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
    url: "https://pawpathtraining.com",
    logo: "https://pawpathtraining.com/images/products/hero.webp",
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
      <body className="min-h-full flex flex-col bg-[#f7f5ee] text-[#123321]">
        <Preloader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
