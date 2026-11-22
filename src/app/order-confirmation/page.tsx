"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import { CopyReference } from "./copy-reference";

interface OrderData {
  orderId: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    houseBuilding: string;
    streetArea: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  deliveryMethod: string;
  paymentMethod: string;
  estimatedDelivery?: string;
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumberParam = searchParams.get("orderNumber") || searchParams.get("id");

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    function fallbackToMock() {
      // Default fallback demo confirmation
      setOrder({
        orderId: "ord_demo_2026",
        orderNumber: orderNumberParam || "PAW-7K9M2P-IN",
        createdAt: new Date().toISOString(),
        status: "Confirmed",
        customer: {
          fullName: "Rohan Sharma",
          email: "rohan.sharma@example.com",
          phone: "9876543210",
          houseBuilding: "Flat 402, Green Meadows Apts",
          streetArea: "12th Main Road, Indiranagar",
          city: "Bengaluru",
          state: "Karnataka",
          pinCode: "560038",
          country: "India",
        },
        items: [
          {
            id: "pawpath-mat",
            name: "The PAWPATH Interactive Training Mat",
            price: 3499,
            quantity: 1,
            image: "/images/products/hero.webp",
          },
        ],
        subtotal: 3499,
        shipping: 0,
        total: 3499,
        deliveryMethod: "standard",
        paymentMethod: "simulated_upi",
        estimatedDelivery: "5-6 business days",
      });
      setLoading(false);
    }

    // 1. Try to load from sessionStorage (stored right at checkout)
    const cachedOrder = (() => {
      try {
        const cached = sessionStorage.getItem("pawpath_latest_order");
        if (!cached) return null;
        const parsed = JSON.parse(cached);
        if (
          !orderNumberParam ||
          parsed.orderNumber === orderNumberParam ||
          parsed.orderId === orderNumberParam
        ) {
          return parsed as OrderData;
        }
      } catch {
        // ignore
      }
      return null;
    })();

    // 2. Fetch from API if param is available
    const request = cachedOrder
      ? Promise.resolve(cachedOrder)
      : orderNumberParam
        ? fetch(`/api/orders?id=${encodeURIComponent(orderNumberParam)}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) =>
              data && data.success && data.order ? (data.order as OrderData) : null
            )
            .catch(() => null)
        : Promise.resolve(null);

    request.then((resolved) => {
      if (cancelled) return;
      if (resolved) {
        setOrder(resolved);
        setLoading(false);
        return;
      }
      fallbackToMock();
    });

    return () => {
      cancelled = true;
    };
  }, [orderNumberParam]);

  if (loading || !order) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-emerald-700 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-emerald-900">
            Getting things ready...
          </p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#faf8f3] text-emerald-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* 1. Success Section */}
        <div className="bg-white rounded-[36px] p-8 sm:p-12 border border-emerald-900/10 shadow-sm text-center relative overflow-hidden">
          {/* Subtle decorative mint circles */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#eaf5ed] rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#eaf5ed] rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

          {/* Success Icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#eaf5ed] text-emerald-700 border-4 border-emerald-100 shadow-md mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="block text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit mx-auto mb-3">
            ORDER CONFIRMED
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 mb-3 tracking-tight">
            Pawsome choice!
          </h1>
          <p className="text-sm sm:text-base text-emerald-900/70 max-w-lg mx-auto mb-8 leading-relaxed">
            Your PAWPATH order has been placed successfully. A new little learning adventure is on its way.
          </p>

          {/* Unique Order Reference Box with Client Copy Button */}
          <div className="mb-6">
            <CopyReference reference={order.orderNumber} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-900/80 pt-4 border-t border-emerald-950/10 max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>
                Ordered on: <strong>{formattedDate}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>
                Status: <strong className="text-emerald-700 bg-[#eaf5ed] px-2 py-0.5 rounded-full">{order.status}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 2. Order Summary */}
        <section className="bg-white rounded-[36px] p-8 sm:p-10 border border-emerald-900/10 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-950/10 mb-6">
            <h2 className="text-2xl font-bold font-heading text-emerald-950">
              Here&apos;s what you&apos;ve ordered.
            </h2>
            <span className="text-xs font-extrabold text-emerald-800 bg-[#eaf5ed] px-3 py-1 rounded-full">
              {order.items.reduce((acc, i) => acc + i.quantity, 0)} {order.items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Product Items */}
          <div className="space-y-4 mb-8">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#faf8f3] border border-emerald-950/10"
              >
                <div className="w-16 h-16 rounded-xl bg-white border border-emerald-950/10 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                  <Image
                    src={item.image || "/images/products/hero.webp"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-emerald-950 truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-emerald-800/70 mt-0.5">
                    Qty: {item.quantity} × {formatINR(item.price)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-sm text-emerald-950">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address & Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-emerald-950/10">
            {/* Delivery address */}
            <div className="bg-[#faf8f3] rounded-2xl p-5 border border-emerald-950/10">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Delivery Address</span>
              </div>
              <p className="font-bold text-sm text-emerald-950">
                {order.customer.fullName}
              </p>
              <p className="text-xs text-emerald-900/70 mt-1 leading-relaxed">
                {order.customer.houseBuilding}, {order.customer.streetArea}
                <br />
                {order.customer.city}, {order.customer.state} — {order.customer.pinCode}
                <br />
                {order.customer.country}
              </p>
              <p className="text-xs text-emerald-800/80 font-medium mt-2">
                Phone: {order.customer.phone}
              </p>
            </div>

            {/* Total breakdown */}
            <div className="bg-[#faf8f3] rounded-2xl p-5 border border-emerald-950/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Package className="w-4 h-4 text-emerald-700" />
                  <span>Payment Breakdown</span>
                </div>
                <div className="space-y-1.5 text-xs text-emerald-900/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-emerald-950">{formatINR(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-950">
                      {order.shipping === 0 ? "FREE" : formatINR(order.shipping)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-950/10 flex justify-between items-center mt-3">
                <span className="font-extrabold text-sm text-emerald-950">Total Paid</span>
                <span className="font-black text-xl text-emerald-700">
                  {formatINR(order.total)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. What's Next? */}
        <section className="bg-emerald-950 text-[#faf8f3] rounded-[36px] p-8 sm:p-12 text-center relative overflow-hidden shadow-md">
          <div className="max-w-lg mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/80 px-3.5 py-1 rounded-full border border-emerald-700 inline-block">
              JOURNEY BEGINS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              The next pawstep is getting closer.
            </h2>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Keep an eye on your order updates and get ready to make everyday training more exciting.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-sm transition-all shadow-md active:scale-95"
              >
                <span>Back to PAWPATH</span>
              </Link>
              <Link
                href="/product/pawpath"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-emerald-700 text-emerald-200 hover:bg-emerald-900/60 font-bold text-sm transition-all"
              >
                <span>Explore the Experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Footer */}
        <footer className="pt-8 pb-4 text-center space-y-3">
          <p className="font-heading font-extrabold text-base tracking-tight text-emerald-950">
            PAWPATH <span className="font-normal text-emerald-800/70">— Every pawstep learns something.</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-emerald-800/80">
            <Link href="/" className="hover:text-emerald-950 transition-colors">
              Contact
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-emerald-950 transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-emerald-950 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-emerald-950 transition-colors">
              Returns
            </Link>
          </div>
          <p className="text-[11px] text-emerald-800/60">
            &copy; 2026 PAWPATH. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-emerald-700 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-emerald-900">
              Getting things ready...
            </p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
