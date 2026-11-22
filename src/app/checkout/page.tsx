"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/header";
import {
  clearCart,
  cartTotals,
  getCartServerSnapshot,
  getCartSnapshot,
  subscribeToCart,
} from "@/lib/cart";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validations";

const SHIPPING_COST = 0;
const TAX_RATE = 0;
const YEAR = new Date().getFullYear();

export default function CheckoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cartItems = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getCartServerSnapshot
  );
  const { subtotal } = cartTotals(cartItems);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + SHIPPING_COST;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      terms: false,
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: cartItems,
          subtotal,
          tax,
          shipping: SHIPPING_COST,
          total,
          currency: "USD",
          testMode: true,
        }),
      });
      if (!res.ok) throw new Error("Failed to place order");
      const order = await res.json();
      clearCart();
      router.push(`/order-confirmation?ref=${order.reference}`);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Header />

      {cartItems.length === 0 ? (
        <section className="px-6 py-24 lg:px-12 text-center">
          <Card padding="lg" className="max-w-lg mx-auto border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle>Your bag is empty</CardTitle>
            <CardDescription>
              Add the Pawpath Training Mat to continue to checkout.
            </CardDescription>
            <div className="mt-8">
              <Button asChild className="w-full">
                <Link href="/product/pawpath">Shop the Mat</Link>
              </Button>
            </div>
          </Card>
        </section>
      ) : (
        <section className="px-6 py-12 lg:px-12 lg:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-xs text-gray-400">
              <Link href="/" className="hover:text-forest-green transition-colors">
                <Home className="h-4 w-4" />
              </Link>
              <span>/</span>
              <Link href="/product/pawpath" className="hover:text-forest-green transition-colors">
                Product
              </Link>
              <span>/</span>
              <span className="text-gray-600">Checkout</span>
            </nav>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-8">
                <Card padding="lg" className="border-gray-100 bg-white">
                  <CardTitle className="mb-1">Shipping details</CardTitle>
                  <CardDescription className="mb-6">
                    We&apos;ll send your Pawpath mat to this address.
                  </CardDescription>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          {...register("firstName")}
                          className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition-all ${
                            errors.firstName ? "border-red-500" : "border-gray-200"
                          }`}
                          placeholder="First name"
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-500">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          {...register("lastName")}
                          className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition-all ${
                            errors.lastName ? "border-red-500" : "border-gray-200"
                          }`}
                          placeholder="Last name"
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-500">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition-all ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <input
                        {...register("phone")}
                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition-all ${
                          errors.phone ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </form>
                </Card>

                <Card padding="lg" className="border-gray-100 bg-white">
                  <CardTitle className="mb-1">Billing address</CardTitle>
                  <CardDescription className="mb-6">
                    Enter your billing address below.
                  </CardDescription>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        {...register("address")}
                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition-all ${
                          errors.address ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="123 Paw Lane"
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500">{errors.address.message}</p>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          {...register("city")}
                          className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition-all ${
                            errors.city ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          {...register("state")}
                          className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition-all ${
                            errors.state ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.state && (
                          <p className="text-sm text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Postal code
                        </label>
                        <input
                          {...register("postalCode")}
                          className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition-all ${
                            errors.postalCode ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.postalCode && (
                          <p className="text-sm text-red-500">{errors.postalCode.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        {...register("country")}
                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-forest-green focus:border-transparent outline-none transition-all ${
                          errors.country ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {errors.country && (
                        <p className="text-sm text-red-500">{errors.country.message}</p>
                      )}
                    </div>
                    <div className="flex items-start gap-3">
                      <input
                        {...register("terms")}
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-200 text-forest-green focus:ring-forest-green"
                      />
                      <label className="text-sm text-gray-600 leading-relaxed">
                        I accept the <span className="text-forest-green font-medium underline">terms and conditions</span>
                      </label>
                      {errors.terms && (
                        <p className="text-sm text-red-500 ml-4">{errors.terms.message}</p>
                      )}
                    </div>
                    {submitError && (
                      <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                        {submitError}
                      </div>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isFormSubmitting || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Placing order...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                    <p className="text-xs text-gray-400 text-center mt-3">
                      This is a test checkout flow. No real payment is processed.
                    </p>
                  </form>
                </Card>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <Card padding="lg" className="border-gray-100 bg-white sticky top-24">
                  <CardTitle className="mb-6">Order summary</CardTitle>
                  <div className="space-y-4 mb-8">
                    {cartItems.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/images/products/hero.svg"}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                          ${(item.price * item.quantity / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-8 border-t border-gray-100 pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span>${(subtotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span>${(SHIPPING_COST / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span>${(tax / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-forest-green pt-2">
                      <span>Total</span>
                      <span>${(total / 100).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-pale-mint p-4 text-sm text-gray-600">
                    <p className="font-medium text-forest-green-dark mb-2">
                      Test mode
                    </p>
                    <p>This checkout flow simulates a payment. No card details are stored.</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-gray-100 bg-white mt-auto">
        <div className="px-6 py-8 lg:px-12">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">
              © {YEAR} Pawpath. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/" className="text-xs text-gray-400 hover:text-forest-green transition-colors">Privacy</Link>
              <Link href="/" className="text-xs text-gray-400 hover:text-forest-green transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
