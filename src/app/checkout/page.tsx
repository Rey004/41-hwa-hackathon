"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Home,
  CreditCard,
  Lock,
  AlertCircle,
  Check,
  ShieldCheck,
  Truck,
  PawPrint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/header";
import {
  clearCart,
  cartTotals,
  getCartServerSnapshot,
  getCartSnapshot,
  subscribeToCart,
} from "@/lib/cart";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validations";
import { PRODUCT } from "@/lib/products";

const SHIPPING_COST = 0;
const TAX_RATE = 0;
const YEAR = new Date().getFullYear();

const FIELD =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-forest-green focus:border-transparent";

export default function CheckoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cartItems = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getCartServerSnapshot
  );
  const { subtotal, itemCount } = cartTotals(cartItems);
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
      country: "United States",
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
      setSubmitError(
        "We could not place your order just now. Please check your details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const busy = isSubmitting || isFormSubmitting;

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Header />

      {cartItems.length === 0 ? (
        <section className="px-6 py-24 lg:px-12 text-center">
          <Card padding="lg" className="mx-auto max-w-lg border-gray-100">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pale-mint">
              <PawPrint className="h-7 w-7 text-forest-green" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-forest-green">
              Your bag is empty
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Add the Pawpath Training Mat to continue to checkout.
            </p>
            <div className="mt-8">
              <Button asChild className="w-full">
                <Link href="/product/pawpath">
                  Shop the Mat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      ) : (
        <section className="px-6 py-12 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <nav className="mb-8 flex items-center gap-2 text-xs text-gray-400">
              <Link
                href="/"
                className="flex items-center gap-1 transition-colors hover:text-forest-green"
              >
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
              <span>/</span>
              <Link
                href="/product/pawpath"
                className="transition-colors hover:text-forest-green"
              >
                Product
              </Link>
              <span>/</span>
              <span className="text-gray-600">Checkout</span>
            </nav>

            <h1 className="mb-12 font-heading font-extrabold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-tight text-forest-green">
              Almost there.
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* Form column */}
              <div className="space-y-6 lg:col-span-7">
                <Card padding="lg" className="rounded-[2rem] border-gray-100 bg-white">
                  <div className="mb-7 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pale-mint font-heading font-bold text-sm text-forest-green">
                      1
                    </span>
                    <h2 className="font-heading font-bold text-xl text-forest-green">
                      Shipping details
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="First name" error={errors.firstName?.message}>
                        <input
                          {...register("firstName")}
                          aria-label="First name"
                          autoComplete="given-name"
                          className={FIELD}
                          placeholder="Ada"
                        />
                      </Field>
                      <Field label="Last name" error={errors.lastName?.message}>
                        <input
                          {...register("lastName")}
                          aria-label="Last name"
                          autoComplete="family-name"
                          className={FIELD}
                          placeholder="Lovelace"
                        />
                      </Field>
                    </div>

                    <Field label="Email address" error={errors.email?.message}>
                      <input
                        {...register("email")}
                        type="email"
                        aria-label="Email address"
                        autoComplete="email"
                        className={FIELD}
                        placeholder="you@example.com"
                      />
                    </Field>

                    <Field label="Phone number" error={errors.phone?.message}>
                      <input
                        {...register("phone")}
                        type="tel"
                        aria-label="Phone number"
                        autoComplete="tel"
                        className={FIELD}
                        placeholder="+1 (555) 000-0000"
                      />
                    </Field>

                    <Field label="Street address" error={errors.address?.message}>
                      <input
                        {...register("address")}
                        aria-label="Street address"
                        autoComplete="street-address"
                        className={FIELD}
                        placeholder="123 Paw Lane"
                      />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-3">
                      <Field label="City" error={errors.city?.message}>
                        <input
                          {...register("city")}
                          aria-label="City"
                          autoComplete="address-level2"
                          className={FIELD}
                          placeholder="Austin"
                        />
                      </Field>
                      <Field label="State" error={errors.state?.message}>
                        <input
                          {...register("state")}
                          aria-label="State or province"
                          autoComplete="address-level1"
                          className={FIELD}
                          placeholder="TX"
                        />
                      </Field>
                      <Field label="Postal code" error={errors.postalCode?.message}>
                        <input
                          {...register("postalCode")}
                          aria-label="Postal code"
                          autoComplete="postal-code"
                          className={FIELD}
                          placeholder="78701"
                        />
                      </Field>
                    </div>

                    <Field label="Country" error={errors.country?.message}>
                      <select
                        {...register("country")}
                        aria-label="Country"
                        autoComplete="country-name"
                        className={`${FIELD} appearance-none`}
                      >
                        {[
                          "United States",
                          "United Kingdom",
                          "Canada",
                          "Australia",
                          "Germany",
                          "France",
                          "Spain",
                          "Netherlands",
                          "Japan",
                          "Singapore",
                        ].map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </Card>

                {/* Test payment */}
                <Card padding="lg" className="rounded-[2rem] border-gray-100 bg-white">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral-soft font-heading font-bold text-sm text-coral">
                      2
                    </span>
                    <h2 className="font-heading font-bold text-xl text-forest-green">
                      Payment
                    </h2>
                  </div>

                  <div className="mb-6 flex items-start gap-3 rounded-2xl border border-coral/25 bg-coral-soft/50 p-4">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-coral" />
                    <div>
                      <p className="text-sm font-heading font-bold text-coral">
                        Test mode — no real payment is processed
                      </p>
                      <p className="mt-0.5 text-xs text-gray-600">
                        This demo checkout simulates a card payment. No card details
                        are collected, stored or sent anywhere.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <Field label="Card number (test)">
                      <div className="relative">
                        <input
                          inputMode="numeric"
                          aria-label="Test card number"
                          defaultValue="4242 4242 4242 4242"
                          className={`${FIELD} pr-12`}
                        />
                        <CreditCard className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                      </div>
                    </Field>
                    <div className="grid grid-cols-2 gap-5">
                      <Field label="Expiry (test)">
                        <input
                          inputMode="numeric"
                          aria-label="Test expiry date"
                          defaultValue="12 / 29"
                          className={FIELD}
                        />
                      </Field>
                      <Field label="CVC (test)">
                        <div className="relative">
                          <input
                            inputMode="numeric"
                            aria-label="Test CVC"
                            defaultValue="123"
                            className={`${FIELD} pr-12`}
                          />
                          <Lock className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                        </div>
                      </Field>
                    </div>
                    <Field label="Name on card (test)">
                      <input
                        aria-label="Name on card (test)"
                        defaultValue="Test Buyer"
                        className={FIELD}
                      />
                    </Field>
                  </div>
                </Card>

                <div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      {...register("terms")}
                      type="checkbox"
                      className="mt-1 h-4 w-4 flex-none rounded border-gray-300 text-forest-green focus:ring-forest-green"
                    />
                    <span className="text-sm leading-relaxed text-gray-600">
                      I accept the Pawpath{" "}
                      <span className="font-medium text-forest-green underline">
                        terms and conditions
                      </span>{" "}
                      and understand this is a test checkout.
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="mt-2 text-sm text-red-500">{errors.terms.message}</p>
                  )}
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    {submitError}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={busy}>
                  {busy ? (
                    <>
                      <svg
                        className="mr-2 h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Placing order…
                    </>
                  ) : (
                    <>
                      Place order · ${(total / 100).toFixed(2)}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-gray-400">
                  By placing this test order you agree to our terms and privacy
                  policy.
                </p>
              </div>

              {/* Summary column */}
              <div className="lg:col-span-5">
                <Card
                  padding="lg"
                  className="sticky top-24 rounded-[2rem] border-gray-100 bg-white"
                >
                  <h2 className="mb-6 font-heading font-bold text-xl text-forest-green">
                    Order summary
                  </h2>

                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex items-center gap-4">
                        <div className="h-14 w-14 flex-none overflow-hidden rounded-xl bg-pale-mint">
                          <Image
                            src={item.image || "/images/products/hero.svg"}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-heading font-bold text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty {item.quantity} · ${(item.price / 100).toFixed(2)}
                          </p>
                        </div>
                        <span className="text-sm font-heading font-bold text-gray-800">
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 space-y-2.5 border-t border-gray-100 pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"})
                      </span>
                      <span>${(subtotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-organic-green-dark">
                        {SHIPPING_COST === 0 ? "Free" : `$${(SHIPPING_COST / 100).toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span>${(tax / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-4 text-lg font-heading font-extrabold text-forest-green">
                      <span>Total</span>
                      <span>${(total / 100).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-7 space-y-3 rounded-2xl bg-pale-mint p-5">
                    {[
                      { icon: Truck, text: "Free shipping, dispatched in 24 hours" },
                      { icon: ShieldCheck, text: "30-day money-back guarantee" },
                      { icon: Check, text: "Support that actually knows dogs" },
                    ].map((row) => (
                      <div key={row.text} className="flex items-center gap-3">
                        <row.icon className="h-4 w-4 flex-none text-forest-green" />
                        <span className="text-xs text-gray-600">{row.text}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 rounded-xl border border-coral/20 bg-coral-soft/40 p-3 text-center text-[11px] leading-relaxed text-gray-600">
                    Test checkout for the {PRODUCT.name}. No real payment is taken.
                  </p>
                </Card>
              </div>
            </form>
          </div>
        </section>
      )}

      <footer className="mt-auto border-t border-gray-100 bg-white">
        <div className="px-6 py-8 lg:px-12">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-400">
              © {YEAR} Pawpath. Every pawstep counts.
            </p>
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-xs text-gray-400 transition-colors hover:text-forest-green"
              >
                Privacy
              </Link>
              <Link
                href="/"
                className="text-xs text-gray-400 transition-colors hover:text-forest-green"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-heading font-bold uppercase tracking-widest text-gray-500">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
