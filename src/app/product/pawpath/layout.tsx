import type { Metadata } from "next";
import { PRODUCT } from "@/lib/products";

const BASE_URL = "https://41-hwa-hackathon.vercel.app";

export const metadata: Metadata = {
  title: "Pawpath Training Mat — All-in-One Interactive Dog Training Mat",
  description:
    "One mat. Many milestones. The Pawpath Training Mat has five permanently built-in learning zones — target, place, wot, pathway and reward — to train touch, sit, stay, follow and recall.",
  alternates: { canonical: `${BASE_URL}/product/pawpath` },
  openGraph: {
    title: "Pawpath Training Mat — One mat. Many milestones.",
    description:
      "The all-in-one interactive dog training mat with five permanently built-in learning zones.",
    url: `${BASE_URL}/product/pawpath`,
    type: "website",
    images: [{ url: `${BASE_URL}/images/products/hero.svg` }],
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT.name,
    description: PRODUCT.description,
    sku: PRODUCT.sku,
    brand: { "@type": "Brand", name: "Pawpath" },
    category: "Pet Supplies > Dog Supplies > Training",
    offers: {
      "@type": "Offer",
      price: (PRODUCT.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: PRODUCT.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${BASE_URL}/product/pawpath`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
