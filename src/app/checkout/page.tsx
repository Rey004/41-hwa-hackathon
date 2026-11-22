"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Smartphone,
  Banknote,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/utils";
import { PRODUCT } from "@/lib/products";
import { CheckoutSchema, type CheckoutFormData } from "@/lib/validations";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      houseBuilding: "",
      streetArea: "",
      city: "",
      state: "",
      pinCode: "",
      country: "India",
      deliveryMethod: "standard",
      paymentMethod: "simulated_upi",
    },
  });

  const selectedDeliveryMethod = watch("deliveryMethod");
  const selectedPaymentMethod = watch("paymentMethod");

  // Calculate actual shipping
  const shippingCost =
    selectedDeliveryMethod === "express"
      ? 199
      : subtotal >= PRODUCT.freeShippingThreshold
      ? 0
      : 99;

  const total = subtotal + shippingCost;

  // Prefill demo button for testing
  const handlePrefillDemo = () => {
    setValue("fullName", "Rohan Sharma");
    setValue("email", "rohan.sharma@example.com");
    setValue("phone", "9876543210");
    setValue("houseBuilding", "Flat 402, Green Meadows Apts");
    setValue("streetArea", "12th Main, Indiranagar");
    setValue("city", "Bengaluru");
    setValue("state", "Karnataka");
    setValue("pinCode", "560038");
    setValue("country", "India");
    setValue("deliveryMethod", "standard");
    setValue("paymentMethod", "simulated_upi");
    setServerError(null);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      setServerError("Your cart is currently empty.");
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        customer: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          houseBuilding: data.houseBuilding,
          streetArea: data.streetArea,
          city: data.city,
          state: data.state,
          pinCode: data.pinCode,
          country: data.country,
        },
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        deliveryMethod: data.deliveryMethod,
        paymentMethod: data.paymentMethod,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "Something went wrong. Let's try that again.");
      }

      // Store in session storage for immediate confirmation render fallback
      try {
        sessionStorage.setItem("pawpath_latest_order", JSON.stringify(resData.order));
      } catch {
        // ignore
      }

      // Clear cart
      clearCart();

      // Redirect to confirmation page
      router.push(`/order-confirmation?orderNumber=${resData.order.orderNumber}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Let's try that again.";
      setServerError(msg);
      setIsSubmitting(false);
    }
  };

  // If cart is empty
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf8f3] text-emerald-950 py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-[36px] p-8 sm:p-12 border border-emerald-900/10 text-center shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-[#eaf5ed] text-emerald-700 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-emerald-950 mb-3">
            Your cart is currently empty.
          </h1>
          <p className="text-emerald-900/70 mb-8 max-w-md mx-auto">
            Your cart is waiting for a little something. Add the PAWPATH interactive training mat to begin your order.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Exploring</span>
            </Link>
            <Link
              href="/product/pawpath"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-emerald-700 text-emerald-800 hover:bg-emerald-50 font-semibold transition-all"
            >
              Meet PAWPATH
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-emerald-950 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top bar with back link */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-950/10">
          <Link
            href="/product/pawpath"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to PAWPATH</span>
          </Link>
        </div>

        {/* 1. Header */}
        <header className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-[#eaf5ed] px-3.5 py-1 rounded-full border border-emerald-200 inline-block mb-3">
            PAWPATH CHECKOUT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 tracking-tight">
            Almost there. Good things ahead.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-900/70">
            Just a few details and PAWPATH will be on its way.
          </p>
        </header>

        {serverError && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
            <div>
              <p className="font-semibold text-sm">Please check the highlighted fields.</p>
              <p className="text-xs text-rose-700 mt-0.5">{serverError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Form inputs */}
            <div className="lg:col-span-7 space-y-8">
              {/* 2. Contact Information */}
              <section className="bg-white rounded-[32px] p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-xl bg-[#eaf5ed] text-emerald-800 font-bold text-sm flex items-center justify-center">
                    01
                  </span>
                  <div>
                    <h2 className="text-xl font-bold font-heading text-emerald-950">
                      Where can we reach you?
                    </h2>
                    <p className="text-xs text-emerald-800/70">
                      We will send tracking updates and order receipts here.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      {...register("fullName")}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${
                        errors.fullName
                          ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                          : "border-emerald-950/15 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="sarah@example.com"
                        {...register("email")}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${
                          errors.email
                            ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                            : "border-emerald-950/15 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-600 font-medium">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        {...register("phone")}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${
                          errors.phone
                            ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                            : "border-emerald-950/15 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-600 font-medium">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Delivery Information */}
              <section className="bg-white rounded-[32px] p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-xl bg-[#eaf5ed] text-emerald-800 font-bold text-sm flex items-center justify-center">
                    02
                  </span>
                  <div>
                    <h2 className="text-xl font-bold font-heading text-emerald-950">
                      Where should we send it?
                    </h2>
                    <p className="text-xs text-emerald-800/70">
                      Provide your full delivery address for safe door-to-door transit.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                      House / Flat / Building *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 402, Green Meadows Apts"
                      {...register("houseBuilding")}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${
                        errors.houseBuilding
                          ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                          : "border-emerald-950/15 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                      }`}
                    />
                    {errors.houseBuilding && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">
                        {errors.houseBuilding.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                      Street / Area *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 12th Main Road, Indiranagar"
                      {...register("streetArea")}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${
                        errors.streetArea
                          ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                          : "border-emerald-950/15 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                      }`}
                    />
                    {errors.streetArea && (
                      <p className="mt-1 text-xs text-rose-600 font-medium">
                        {errors.streetArea.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        placeholder="Bengaluru"
                        {...register("city")}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${
                          errors.city
                            ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                            : "border-emerald-950/15 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-rose-600 font-medium">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        placeholder="Karnataka"
                        {...register("state")}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${
                          errors.state
                            ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                            : "border-emerald-950/15 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                      />
                      {errors.state && (
                        <p className="mt-1 text-xs text-rose-600 font-medium">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        placeholder="6-digit PIN"
                        maxLength={6}
                        {...register("pinCode")}
                        className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all ${
                          errors.pinCode
                            ? "border-rose-300 bg-rose-50/50 focus:border-rose-500"
                            : "border-emerald-950/15 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                      />
                      {errors.pinCode && (
                        <p className="mt-1 text-xs text-rose-600 font-medium">
                          {errors.pinCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                      Country
                    </label>
                    <input
                      type="text"
                      disabled
                      value="India"
                      className="w-full px-4 py-3 rounded-2xl border border-emerald-950/10 bg-emerald-50/40 text-emerald-900 text-sm font-semibold cursor-not-allowed"
                    />
                  </div>
                </div>
              </section>

              {/* 4. Delivery Method */}
              <section className="bg-white rounded-[32px] p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-xl bg-[#eaf5ed] text-emerald-800 font-bold text-sm flex items-center justify-center">
                    03
                  </span>
                  <div>
                    <h2 className="text-xl font-bold font-heading text-emerald-950">
                      Choose your delivery option.
                    </h2>
                    <p className="text-xs text-emerald-800/70">
                      Reliable doorstep courier service across India.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`relative p-5 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      selectedDeliveryMethod === "standard"
                        ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                        : "border-emerald-950/15 bg-white hover:border-emerald-950/30"
                    }`}
                  >
                    <input
                      type="radio"
                      value="standard"
                      {...register("deliveryMethod")}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-emerald-700" />
                        <span className="font-bold text-sm text-emerald-950">
                          Standard Delivery
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-800 bg-[#eaf5ed] px-2.5 py-0.5 rounded-full">
                        {subtotal >= PRODUCT.freeShippingThreshold ? "FREE" : "₹99"}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900/70 mt-3">
                      Delivery in 4–6 business days via surface logistics.
                    </p>
                  </label>

                  <label
                    className={`relative p-5 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      selectedDeliveryMethod === "express"
                        ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                        : "border-emerald-950/15 bg-white hover:border-emerald-950/30"
                    }`}
                  >
                    <input
                      type="radio"
                      value="express"
                      {...register("deliveryMethod")}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-700" />
                        <span className="font-bold text-sm text-emerald-950">
                          Express Courier
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-800 bg-[#eaf5ed] px-2.5 py-0.5 rounded-full">
                        ₹199
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900/70 mt-3">
                      Priority air dispatch, delivery in 2–3 business days.
                    </p>
                  </label>
                </div>
              </section>

              {/* 5. Payment Information */}
              <section className="bg-white rounded-[32px] p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#eaf5ed] text-emerald-800 font-bold text-sm flex items-center justify-center">
                      04
                    </span>
                    <div>
                      <h2 className="text-xl font-bold font-heading text-emerald-950">
                        How would you like to pay?
                      </h2>
                      <p className="text-xs text-emerald-800/70">
                        Choose your preferred simulated payment mode.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200">
                    Simulated Sandbox
                  </span>
                </div>

                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      selectedPaymentMethod === "simulated_upi"
                        ? "border-emerald-600 bg-emerald-50/50"
                        : "border-emerald-950/15 hover:border-emerald-950/30 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="simulated_upi"
                        {...register("paymentMethod")}
                        className="sr-only"
                      />
                      <div className="w-9 h-9 rounded-xl bg-[#eaf5ed] text-emerald-800 flex items-center justify-center">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-emerald-950 block">
                          Simulated UPI
                        </span>
                        <span className="text-xs text-emerald-800/70">
                          Instant verification via Google Pay, PhonePe, Paytm, BHIM
                        </span>
                      </div>
                    </div>
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        selectedPaymentMethod === "simulated_upi"
                          ? "text-emerald-700 opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </label>

                  {/* Card */}
                  <label
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      selectedPaymentMethod === "simulated_card"
                        ? "border-emerald-600 bg-emerald-50/50"
                        : "border-emerald-950/15 hover:border-emerald-950/30 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="simulated_card"
                        {...register("paymentMethod")}
                        className="sr-only"
                      />
                      <div className="w-9 h-9 rounded-xl bg-[#eaf5ed] text-emerald-800 flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-emerald-950 block">
                          Simulated Credit / Debit Card
                        </span>
                        <span className="text-xs text-emerald-800/70">
                          Visa, Mastercard, RuPay with 256-bit simulated encryption
                        </span>
                      </div>
                    </div>
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        selectedPaymentMethod === "simulated_card"
                          ? "text-emerald-700 opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      selectedPaymentMethod === "simulated_cod"
                        ? "border-emerald-600 bg-emerald-50/50"
                        : "border-emerald-950/15 hover:border-emerald-950/30 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="simulated_cod"
                        {...register("paymentMethod")}
                        className="sr-only"
                      />
                      <div className="w-9 h-9 rounded-xl bg-[#eaf5ed] text-emerald-800 flex items-center justify-center">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-emerald-950 block">
                          Simulated Cash on Delivery
                        </span>
                        <span className="text-xs text-emerald-800/70">
                          Pay cash or UPI upon package doorstep arrival
                        </span>
                      </div>
                    </div>
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        selectedPaymentMethod === "simulated_cod"
                          ? "text-emerald-700 opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </label>
                </div>

                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-900/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>
                    Simulated transaction. No actual monetary charge will occur during this demo checkout.
                  </span>
                </div>
              </section>
            </div>

            {/* Right 5 cols: Sticky Order Summary & Place Order */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              {/* Autofill Demo Details (above Order Summary) */}
              <div className="bg-[#eaf5ed] border border-emerald-200/90 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs">
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">
                    Testing Checkout?
                  </span>
                  <span className="text-[11px] text-emerald-800/80">
                    Instantly fill mock contact &amp; address details.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePrefillDemo}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold text-xs border border-emerald-300 shadow-xs transition-all active:scale-95 cursor-pointer flex-shrink-0"
                >
                  ✨ Autofill Demo Details
                </button>
              </div>

              {/* 6. Order Summary */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-emerald-950/10 mb-6">
                  <h2 className="text-xl font-bold font-heading text-emerald-950">
                    Your PAWPATH order.
                  </h2>
                  <span className="text-xs font-bold bg-[#eaf5ed] text-emerald-800 px-3 py-1 rounded-full">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} {items.reduce((acc, i) => acc + i.quantity, 0) === 1 ? "item" : "items"}
                  </span>
                </div>

                {/* Products list */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 rounded-2xl bg-emerald-50/80 border border-emerald-100 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
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
                        {item.subtitle && (
                          <p className="text-xs text-emerald-800/70 truncate">
                            {item.subtitle}
                          </p>
                        )}
                        <p className="text-xs font-medium text-emerald-900/60 mt-0.5">
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

                {/* Subtotal & delivery calculations */}
                <div className="space-y-2.5 pt-4 border-t border-emerald-950/10 text-sm">
                  <div className="flex justify-between text-emerald-900/80">
                    <span>Subtotal</span>
                    <span className="font-semibold text-emerald-950">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-900/80">
                    <span className="flex items-center gap-1.5">
                      <span>Shipping</span>
                      {selectedDeliveryMethod === "standard" && subtotal >= PRODUCT.freeShippingThreshold && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-[#eaf5ed] px-2 py-0.5 rounded-full">
                          Free
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-emerald-950">
                      {shippingCost === 0 ? "FREE" : formatINR(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-emerald-950 pt-3 border-t border-emerald-950/10">
                    <span>Total</span>
                    <span className="text-2xl text-emerald-700">
                      {formatINR(total)}
                    </span>
                  </div>
                </div>

                {/* 7. Place Order CTA */}
                <div className="mt-8 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Placing your order...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Place My Order • {formatINR(total)}</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-emerald-800/70">
                    Please review your details before confirming your order.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-emerald-950/10 flex items-center justify-center gap-6 text-xs text-emerald-900/60">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    30-Day Guarantee
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    Doorstep Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

