import type { Metadata } from "next";
import { SITE_URL } from "@/lib/products";

export const metadata: Metadata = {
  title: "The PAWPATH Interactive Training Mat — One Mat. A Whole Lot to Learn.",
  description:
    "Meet the all-in-one training mat designed to make practising everyday commands and good habits more engaging. Five integrated zones in one thoughtfully designed product.",
  openGraph: {
    title: "The PAWPATH Interactive Training Mat",
    description: "Five integrated training zones. Single-piece construction. Tactile training surfaces. No electricity required.",
    images: ["/images/products/hero.webp"],
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "The PAWPATH Interactive Training Mat",
    image: `${SITE_URL}/images/products/hero.webp`,
    description:
      "All-in-one owner-guided canine training mat with five permanently integrated tactile zones.",
    brand: {
      "@type": "Brand",
      name: "PAWPATH",
    },
    offers: {
      "@type": "Offer",
      price: "3499",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "PAWPATH",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {children}
    </>
  );
}
