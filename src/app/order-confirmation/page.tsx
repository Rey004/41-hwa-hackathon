import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { CopyReference } from "./copy-reference";

export const metadata = {
  title: "Order Confirmation — Pawpath",
  description: "Your Pawpath order has been confirmed.",
};

export default function OrderConfirmationPage({
  searchParams,
}: PageProps<"/order-confirmation">) {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Header />
      <Suspense fallback={<ConfirmationFallback />}>
        <ConfirmationContent searchParams={searchParams} />
      </Suspense>
      <Footer />
    </div>
  );
}

async function ConfirmationContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const reference =
    typeof params.ref === "string" && params.ref ? params.ref : "PAWPATH-DIRECT";

  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-organic-green flex items-center justify-center mx-auto mb-8 shadow-xl">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h1 className="font-heading font-bold text-[3rem] leading-[1.1] text-forest-green mb-6">
          Order confirmed
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you. Your Pawpath Training Mat is on its way.
        </p>
        <Card padding="lg" className="border-gray-100 bg-white inline-block">
          <div className="flex items-center justify-between gap-6">
            <div className="text-left">
              <p className="text-sm text-gray-500">Order reference</p>
              <p className="font-heading font-bold text-lg text-gray-800 tracking-tight">
                {reference}
              </p>
            </div>
            <CopyReference reference={reference} />
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card padding="lg" className="border-gray-100 bg-white text-left">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="h-5 w-5 text-forest-green" />
              <h3 className="font-medium text-gray-800">Shipping</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your order will ship within 1–2 business days. You&apos;ll receive a
              tracking number once it&apos;s on its way.
            </p>
          </Card>
          <Card padding="lg" className="border-gray-100 bg-white text-left">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-5 w-5 text-forest-green" />
              <h3 className="font-medium text-gray-800">30-day guarantee</h3>
            </div>
            <p className="text-sm text-gray-600">
              Not satisfied? Return your mat within 30 days for a full refund.
            </p>
          </Card>
        </div>

        <div className="mt-12">
          <Button asChild className="w-full lg:w-auto">
            <Link href="/">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ConfirmationFallback() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-organic-green/30 flex items-center justify-center mx-auto mb-8 animate-pulse" />
        <div className="h-12 w-80 max-w-full mx-auto rounded-2xl bg-gray-100 mb-6 animate-pulse" />
        <div className="h-6 w-64 max-w-full mx-auto rounded-xl bg-gray-100 animate-pulse" />
      </div>
    </section>
  );
}
