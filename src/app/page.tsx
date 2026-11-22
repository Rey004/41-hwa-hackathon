"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Layers,
  Heart,
  Droplets,
  Target,
  Home,
  Clock,
  Compass,
} from "lucide-react";
import { ZoneShowcase } from "@/components/zone-showcase";
import { Button } from "@/components/ui/button";
import {
  PRODUCT,
  HOW_IT_WORKS,
  TRAINING_STAGES,
  HOMEPAGE_FAQS,
} from "@/lib/products";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/lib/cart";

export default function HomePage() {
  const { addItem } = useCart();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="flex flex-col gap-6 sm:gap-10 pb-16">
      {/* 2. Hero Section */}
      <section className="pt-4 pb-6 sm:pt-6 sm:pb-8 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden relative">
          {/* Top Big Brand Letters with Dog Photo Overlap (Inspired by reference art direction) */}
          <div className="relative text-center pt-2 pb-6 sm:pb-12">
            <div className="relative inline-block w-full max-w-5xl">
              {/* Sticker 1: Top Left */}
              <div className="absolute -top-3 left-4 sm:left-12 z-30 sticker-badge bg-emerald-100 text-emerald-950 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-heading font-extrabold shadow-sm border border-emerald-300">
                <span>🐾 5 Integrated Zones</span>
              </div>

              {/* Sticker 2: Top Right */}
              <div className="absolute -top-4 right-6 sm:right-16 z-30 sticker-badge-alt bg-teal-100 text-teal-950 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-heading font-extrabold shadow-sm border border-teal-300">
                <span>★ Vet & Trainer Approved</span>
              </div>

              {/* Massive Oversized Brand Letters */}
              <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-black tracking-tighter text-[#0b3824] leading-none select-none">
                pawpath
              </h1>

              {/* Dog Peek-Through Portrait (Exact homage to reference image layout) */}
              <div className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 z-20 w-36 sm:w-52 md:w-60 aspect-square">
                <div className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden ring-4 ring-emerald-500/20 bg-emerald-100">
                  <Image
                    src="/images/products/dog-hero.webp"
                    alt="Dog enjoying training with PAWPATH"
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Split Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 sm:pt-14 items-stretch">
            {/* Left: Bold Organic Green Editorial Box */}
            <div className="lg:col-span-7 bg-[#0b3c27] text-white rounded-[32px] p-6 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden border border-emerald-700/50">
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                  MEET A BETTER KIND OF PLAYTIME
                </div>

                <h2 className="font-heading text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                  Good habits start with a pawstep.
                </h2>

                <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-lg">
                  What if playtime could teach a little more? Meet PAWPATH, the
                  interactive training mat that turns everyday learning into
                  engaging little challenges for your dog.
                </p>
              </div>

              {/* CTAs & Highlights */}
              <div className="pt-8 space-y-5 relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/product/pawpath"
                    className="px-7 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-[#0b3824] font-heading font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
                  >
                    <span>Meet PAWPATH</span>
                    <ArrowRight className="w-4 h-4 text-[#0b3824]" />
                  </Link>

                  <Link
                    href="#how-it-works"
                    className="px-6 py-3.5 rounded-full bg-emerald-900/80 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm border border-emerald-500/40 transition"
                  >
                    See How It Works
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200/90 pt-3 border-t border-emerald-800/60 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Play. Learn. Repeat.
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Designed for everyday training.
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    One integrated training mat.
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Mat Preview with Direct Quick-Add Box */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5">
              <div className="bg-[#f5f8f6] rounded-[32px] p-6 border-2 border-[#dce7e0] shadow-sm flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      The Flagship Mat
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-emerald-950 mt-1">
                      PAWPATH Interactive Mat
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-heading font-black text-2xl text-emerald-900">
                      {formatINR(PRODUCT.price)}
                    </span>
                    <span className="text-xs text-gray-400 block line-through">
                      {formatINR(PRODUCT.originalPrice)}
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-950 my-3 border border-emerald-300/40 shadow-inner group">
                  <Image
                    src="/images/products/hero.webp"
                    alt="PAWPATH Interactive Dog Training Mat"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white">
                    90 × 60 cm • 5 Permanent Zones
                  </div>
                </div>

                <button
                  onClick={() =>
                    addItem({
                      id: "pawpath-mat",
                      name: PRODUCT.name,
                      subtitle: "Forest Green • 5 Integrated Zones",
                      price: PRODUCT.price,
                      originalPrice: PRODUCT.originalPrice,
                      image: "/images/products/hero.webp",
                    })
                  }
                  className="w-full py-3 rounded-full bg-[#0da162] hover:bg-[#0a8650] text-white font-heading font-bold text-xs uppercase tracking-wider transition shadow flex items-center justify-center gap-1.5"
                >
                  <span>Add to Cart</span>
                  <span>— {formatINR(PRODUCT.price)}</span>
                </button>
              </div>

              {/* Social Proof Bar */}
              <div className="bg-[#faf8f3] rounded-[24px] p-4 border-2 border-[#e8ece9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-xs">
                    4.9 ★
                  </div>
                  <div>
                    <p className="font-heading font-bold text-xs text-gray-900">
                      12,000+ Happy Pups Trained
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Trusted by canine behaviorists
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  100% Non-Electric
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand Introduction */}
      <section id="experience" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Corgi / Happy Pup Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-emerald-50 border-3 border-emerald-200 shadow-xl group">
                <Image
                  src="/images/products/dog-lifestyle.webp"
                  alt="Dog ready for a learning session"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 sticker-badge bg-white px-3.5 py-1.5 rounded-full text-xs font-heading font-extrabold text-emerald-950 shadow border border-emerald-200">
                  <span>🐕 Play with Purpose</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  THE PAWPATH PHILOSOPHY
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight leading-[1.15]">
                  Playtime with a little more purpose.
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                  Sit. Stay. Wait. Good habits don&apos;t happen overnight. They start
                  with little lessons, positive reinforcement and plenty of tail wags.
                  PAWPATH makes practising those everyday behaviours more engaging.
                </p>
              </div>

              {/* Supporting Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e2ece5]">
                <div className="p-4 rounded-2xl bg-[#faf8f3] border border-[#dce8e0]">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs mb-2">
                    01
                  </span>
                  <h4 className="font-heading font-bold text-sm text-emerald-950 mb-1">
                    Make learning playful.
                  </h4>
                  <p className="text-xs text-gray-600">
                    Replace chaotic repetition with structured, rewarding games.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf8f3] border border-[#dce8e0]">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs mb-2">
                    02
                  </span>
                  <h4 className="font-heading font-bold text-sm text-emerald-950 mb-1">
                    Build better everyday habits.
                  </h4>
                  <p className="text-xs text-gray-600">
                    Clear physical boundaries give dogs unmistakable cues.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf8f3] border border-[#dce8e0]">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs mb-2">
                    03
                  </span>
                  <h4 className="font-heading font-bold text-sm text-emerald-950 mb-1">
                    Strengthen your bond through training.
                  </h4>
                  <p className="text-xs text-gray-600">
                    A shared language that deepens mutual trust and joy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Showcase (Interactive 5 Zones) */}
      <section className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg overflow-hidden">
          <ZoneShowcase />
        </div>
      </section>

      {/* 5. What They'll Learn */}
      <section id="what-they-learn" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#faf8f3] rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
              CANINE LEARNING CURRICULUM
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
              Small lessons. Better everyday habits.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              From the first sit to learning when to wait, make everyday training a little more exciting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* The Basics */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-emerald-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-emerald-950 mb-2">
                  THE BASICS
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Essential foundation cues for dogs of any age.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Sit", "Down", "Stay", "Come", "Touch", "Paw"].map((cmd) => (
                    <span
                      key={cmd}
                      className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-heading font-bold text-xs"
                    >
                      {cmd}.
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Foundational Pawstep</span>
              </div>
            </div>

            {/* Everyday Manners */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-teal-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-teal-950 mb-2">
                  EVERYDAY MANNERS
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Impulse control and calm default behaviors around the home.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Wait", "Leave it", "Go to your place", "Settle", "Release"].map((cmd) => (
                    <span
                      key={cmd}
                      className="px-3 py-1.5 rounded-full bg-teal-50 text-teal-900 border border-teal-200 font-heading font-bold text-xs"
                    >
                      {cmd}.
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 text-xs text-teal-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Household Harmony</span>
              </div>
            </div>

            {/* Interactive Skills */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-emerald-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-emerald-950 mb-2">
                  INTERACTIVE SKILLS
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Advanced spatial agility and cognitive enrichment.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Follow", "Target", "Return", "Retrieve"].map((cmd) => (
                    <span
                      key={cmd}
                      className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-heading font-bold text-xs"
                    >
                      {cmd}.
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cognitive Agility</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How It Works */}
      <section id="how-it-works" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#0a3824] text-white rounded-[36px] sm:rounded-[48px] p-6 sm:p-10 lg:p-14 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/90 px-3 py-1 rounded-full inline-block mb-3 border border-emerald-500/40">
              SIMPLE CONSISTENCY
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
              Four steps. A whole lot of progress.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-emerald-100/80 leading-relaxed">
              No complicated setup. Just you, your dog and a little consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="bg-[#0e442c] rounded-[28px] p-6 sm:p-7 border border-emerald-600/40 shadow-md flex flex-col justify-between hover:border-emerald-400 transition"
              >
                <div>
                  <span className="font-heading text-3xl font-black text-emerald-300 block mb-4">
                    {step.step} —
                  </span>
                  <h3 className="font-heading font-extrabold text-base text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300/60">
                  <span>Step {step.step}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Growing Together */}
      <section className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
              LIFELONG LEARNING
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
              From first sit to better habits.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Every dog learns at their own pace. PAWPATH gives you a dedicated space
              to practise throughout their learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAINING_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="bg-[#faf8f3] rounded-[32px] p-6 sm:p-8 border-2 border-[#e2eae4] flex flex-col justify-between hover:border-emerald-300 transition"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-100 mb-5 border border-emerald-200">
                    <Image
                      src={stage.image}
                      alt={stage.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white">
                      {stage.badge}
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-emerald-950 mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {stage.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-gray-200/80">
                    {stage.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-emerald-900 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Product Highlights */}
      <section className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
              PREMIUM CRAFTSMANSHIP
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
              Thoughtfully made. Paw-approved.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[28px] bg-[#faf8f3] border-2 border-[#e2eae4] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-extrabold text-sm text-emerald-950 mb-1">
                  ONE INTEGRATED DESIGN
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Five training zones in one cohesive mat.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[28px] bg-[#faf8f3] border-2 border-[#e2eae4] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-extrabold text-sm text-emerald-950 mb-1">
                  TACTILE SURFACES
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Different textures for different activities.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[28px] bg-[#faf8f3] border-2 border-[#e2eae4] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-extrabold text-sm text-emerald-950 mb-1">
                  ANTI-SLIP BASE
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Designed to stay in place during training.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[28px] bg-[#faf8f3] border-2 border-[#e2eae4] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-extrabold text-sm text-emerald-950 mb-1">
                  EASY-CARE DESIGN
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Made with everyday cleaning in mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Brand Storytelling */}
      <section className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#0b3c27] text-white rounded-[36px] sm:rounded-[48px] p-8 sm:p-12 lg:p-14 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/80 px-3.5 py-1 rounded-full inline-block border border-emerald-500/30">
              OUR MISSION
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Better habits aren&apos;t built in a day. They&apos;re built together.
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              We believe learning should be a rewarding experience for both ends of the leash.
              PAWPATH brings play and positive reinforcement together, helping owners make
              everyday training more engaging, one little pawstep at a time.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FAQ Accordion */}
      <section id="faq" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-12 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {HOMEPAGE_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#f7faf8] border-emerald-400"
                      : "bg-white border-[#e6eee9] hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-emerald-950"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        isOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-emerald-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-[#0a3824] text-white rounded-[36px] p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
            Their next big lesson starts here.
          </h2>
          <p className="text-xs sm:text-base text-emerald-100/90 max-w-lg mx-auto leading-relaxed">
            Make everyday training a little more exciting. One pawstep at a time.
          </p>
          <div>
            <Link
              href="/product/pawpath"
              className="px-8 py-4 rounded-full bg-[#0da162] hover:bg-[#0a8650] text-white font-heading font-extrabold text-sm sm:text-base shadow-xl transition hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>Get PAWPATH</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
