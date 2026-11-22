import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — Complete Your PAWPATH Order",
  description: "Secure checkout for The PAWPATH Interactive Dog Training Mat. Fast delivery across India.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
