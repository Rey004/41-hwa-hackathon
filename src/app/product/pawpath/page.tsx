"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ShoppingBag,
  ArrowRight,
  ZoomIn,
  X,
  Plus,
  Minus,
  Check,
  Target,
  Home,
  Clock,
  Compass,
  Sparkles,
} from "lucide-react";
import { ZoneShowcase } from "@/components/zone-showcase";
import {
  PRODUCT,
  ZONES,
  PRODUCT_PAGE_FAQS,
  HOW_IT_WORKS,
  TRAINING_STAGES,
} from "@/lib/products";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/lib/cart";

const GALLERY_IMAGES = [
  {
    src: "/images/products/hero.webp",
    alt: "The PAWPATH Interactive Training Mat Overview",
    label: "Mat Overview",
  },
  {
    src: "/images/products/lifestyle.webp",
    alt: "Dog resting comfortably on the Place Zone",
    label: "In the Living Room",
  },
  {
    src: "/images/products/zone-target.webp",
    alt: "Tactile detail of concentric target ribs",
    label: "Target Zone Detail",
  },
  {
    src: "/images/products/zone-place.webp",
    alt: "Cushioned place perimeter boundary",
    label: "Place Zone Cushioning",
  },
  {
    src: "/images/products/zone-wait.webp",
    alt: "Dog practicing wait command on pause markings",
    label: "Wait Zone Practice",
  },
  {
    src: "/images/products/zone-pathway.webp",
    alt: "Directional chevrons and recall alignment",
    label: "Pathway Zone",
  },
  {
    src: "/images/products/zone-reward.webp",
    alt: "Textured silicone lick well and treat dock",
    label: "Reward Zone",
  },
];

export default function ProductDetailPage() {
  const { addItem } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 600;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      setShowStickyBar(scrolled && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: "pawpath-mat",
      name: PRODUCT.name,
      subtitle: "Forest Green • 5 Integrated Zones",
      price: PRODUCT.price,
      originalPrice: PRODUCT.originalPrice,
      quantity,
      image: "/images/products/hero.webp",
    });
  };

  return (
    <div className="pb-20 space-y-10 sm:space-y-14">
      {/* 1. Product Hero */}
      <section className="pt-4 pb-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-xl">
          <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-800 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">
              The PAWPATH Interactive Training Mat
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-[#0d402b] border-2 border-emerald-800 shadow-xl group">
                <Image
                  src={GALLERY_IMAGES[selectedImg].src}
                  alt={GALLERY_IMAGES[selectedImg].alt}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
                  onClick={() => setIsZoomOpen(true)}
                />

                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-white">
                  <span>{GALLERY_IMAGES[selectedImg].label}</span>
                </div>

                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-emerald-950 shadow-md backdrop-blur-sm transition"
                  aria-label="Zoom image"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-3">
                {GALLERY_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-200 bg-emerald-50 ${selectedImg === i
                      ? "border-[#0da162] ring-2 ring-emerald-500/30 scale-105 shadow-sm"
                      : "border-gray-200 hover:border-emerald-300 opacity-80 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Buy Box (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
                  {PRODUCT.eyebrow}
                </span>

                <h1 className="font-heading text-2xl sm:text-4xl font-black text-emerald-950 leading-tight">
                  {PRODUCT.name}
                </h1>

                <p className="font-heading text-lg font-bold text-emerald-800 mt-1">
                  {PRODUCT.headline}
                </p>

                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  {PRODUCT.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="p-4 rounded-2xl bg-[#faf8f3] border-2 border-[#e2eae4] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Special Launch Price
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-heading font-black text-3xl text-emerald-950">
                      {formatINR(PRODUCT.price)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {formatINR(PRODUCT.originalPrice)}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Save {formatINR(PRODUCT.savings)}
                </span>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                  Product Highlights
                </span>
                <ul className="space-y-2 text-xs text-gray-700">
                  {PRODUCT.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#0da162] flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & CTA */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-[#f0f4f1] rounded-full p-1 border border-gray-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-heading font-bold text-sm text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 px-6 rounded-full bg-[#0da162] hover:bg-[#0a8650] text-white font-heading font-extrabold text-sm sm:text-base shadow-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart • {formatINR(PRODUCT.price * quantity)}</span>
                  </button>
                </div>

                <p className="text-center text-xs text-emerald-800 font-semibold italic">
                  A little learning goes a long way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Introduction */}
      <section className="py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
            BUILT WITH PURPOSE
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
            Not just another play mat.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
            Every zone has a purpose. Every interaction is an opportunity to learn.
            PAWPATH gives you and your dog a dedicated space to practise everyday
            behaviours through guided activities and positive reinforcement.
          </p>
        </div>
      </section>

      {/* 3. Explore the Five Zones */}
      <section id="zones" className="py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
              TACTILE LEARNING ARCHITECTURE
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
              Explore the Five Zones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ZONES.map((zone) => (
              <div
                key={zone.id}
                className="bg-[#faf8f3] rounded-[32px] p-6 sm:p-7 border-2 border-[#e2eae4] flex flex-col justify-between hover:border-emerald-400 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      {zone.badgeText}
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-400">
                      {zone.eyebrow}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-xl text-emerald-950 mb-1">
                    {zone.name}
                  </h3>
                  <p className="text-xs font-bold text-emerald-800 mb-3">
                    — {zone.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {zone.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/80 text-xs">
                  <span className="text-gray-500 block text-[11px] font-semibold">Suggested Cue:</span>
                  <span className="font-mono font-bold text-emerald-950">{zone.ownerCue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What They'll Learn */}
      <section className="py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#faf8f3] rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
              SKILLS & BEHAVIOURS
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
              More than play. A little progress every day.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-emerald-200 shadow-sm space-y-3">
              <h3 className="font-heading font-extrabold text-xl text-emerald-950">
                BASIC COMMANDS
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Sit, Down, Stay, Come, Touch and Paw.
              </p>
            </div>

            <div className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-teal-200 shadow-sm space-y-3">
              <h3 className="font-heading font-extrabold text-xl text-teal-950">
                EVERYDAY ETIQUETTE
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Wait, Leave It, Place, Settle and Release.
              </p>
            </div>

            <div className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-emerald-200 shadow-sm space-y-3">
              <h3 className="font-heading font-extrabold text-xl text-emerald-950">
                INTERACTIVE ACTIVITIES
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Follow, Target, Return and Retrieve.
              </p>
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Every dog learns differently. Start simple, reward progress and move forward at their own pace.
          </p>
        </div>
      </section>

      {/* 5. How to Use PAWPATH */}
      <section className="py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#0a3824] text-white rounded-[36px] sm:rounded-[48px] p-6 sm:p-10 lg:p-14 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-900/90 px-3 py-1 rounded-full inline-block mb-3 border border-emerald-500/40">
              SIMPLE GUIDANCE
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
              Simple for you. Engaging for them.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0e442c] rounded-[28px] p-6 border border-emerald-600/40">
              <span className="font-heading text-2xl font-black text-emerald-300 block mb-2">01 —</span>
              <h3 className="font-heading font-bold text-sm text-white mb-1">PICK A BEHAVIOUR</h3>
              <p className="text-xs text-emerald-100/75">Choose one command or habit to practise.</p>
            </div>

            <div className="bg-[#0e442c] rounded-[28px] p-6 border border-emerald-600/40">
              <span className="font-heading text-2xl font-black text-emerald-300 block mb-2">02 —</span>
              <h3 className="font-heading font-bold text-sm text-white mb-1">INTRODUCE THE CUE</h3>
              <p className="text-xs text-emerald-100/75">Use a verbal command or hand signal.</p>
            </div>

            <div className="bg-[#0e442c] rounded-[28px] p-6 border border-emerald-600/40">
              <span className="font-heading text-2xl font-black text-emerald-300 block mb-2">03 —</span>
              <h3 className="font-heading font-bold text-sm text-white mb-1">GUIDE THE ACTION</h3>
              <p className="text-xs text-emerald-100/75">Help your dog interact with the relevant zone.</p>
            </div>

            <div className="bg-[#0e442c] rounded-[28px] p-6 border border-emerald-600/40">
              <span className="font-heading text-2xl font-black text-emerald-300 block mb-2">04 —</span>
              <h3 className="font-heading font-bold text-sm text-white mb-1">REWARD THE PROGRESS</h3>
              <p className="text-xs text-emerald-100/75">Use treats, praise and repetition to reinforce the desired behaviour.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Product Construction */}
      <section className="py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                TACTILE QUALITY
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-emerald-950">
                Made for paws. Designed for everyday training.
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                A thoughtfully integrated surface brings different tactile training
                experiences together without requiring separate toys or complicated equipment.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0da162] flex-shrink-0" />
                  <span>Single integrated construction.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0da162] flex-shrink-0" />
                  <span>Multiple tactile surface patterns.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0da162] flex-shrink-0" />
                  <span>Rounded, paw-friendly edges.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0da162] flex-shrink-0" />
                  <span>Non-slip base.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0da162] flex-shrink-0" />
                  <span>Easy-care surface.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-emerald-100 border-2 border-emerald-300">
                <Image
                  src="/images/products/lifestyle.webp"
                  alt="Dog on PAWPATH mat"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Training Journey */}
      <section className="py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#faf8f3] rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 lg:p-14 shadow-lg text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
            STAGE-BY-STAGE PROGRESS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
            Every dog has a different learning curve.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 text-left">
            <div className="p-6 rounded-3xl bg-white border-2 border-emerald-200">
              <h3 className="font-heading font-extrabold text-base text-emerald-950 mb-1">
                Puppy
              </h3>
              <p className="text-xs text-emerald-800 font-bold mb-2">
                — Start with the basics.
              </p>
              <p className="text-xs text-gray-600">
                Gentle touches, boundary comfort, and learning that training means rewards.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-teal-200">
              <h3 className="font-heading font-extrabold text-base text-teal-950 mb-1">
                Learner
              </h3>
              <p className="text-xs text-teal-800 font-bold mb-2">
                — Practise consistency.
              </p>
              <p className="text-xs text-gray-600">
                Building patience on the wait dots and reliable recall along the pathway.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-emerald-200">
              <h3 className="font-heading font-extrabold text-base text-emerald-950 mb-1">
                Well-Mannered
              </h3>
              <p className="text-xs text-emerald-800 font-bold mb-2">
                — Reinforce everyday behaviours.
              </p>
              <p className="text-xs text-gray-600">
                Calm doorbell settle, polite dinner table boundaries, and lifelong manners.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 italic">
            Progress is personal. Celebrate every little improvement.
          </p>
        </div>
      </section>

      {/* 8. Product Specifications */}
      <section className="py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 shadow-lg">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-emerald-950 mb-6 text-center">
            Product Specifications
          </h2>

          <div className="divide-y divide-gray-100 border-t border-b border-gray-100 text-xs sm:text-sm">
            <div className="py-3 flex justify-between">
              <span className="font-bold text-gray-500">Product</span>
              <span className="font-semibold text-gray-900">Interactive Dog Training Mat</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-bold text-gray-500">Brand</span>
              <span className="font-semibold text-gray-900">PAWPATH</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-bold text-gray-500">Dimensions</span>
              <span className="font-semibold text-gray-900">{PRODUCT.dimensions}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-bold text-gray-500">Construction</span>
              <span className="font-semibold text-gray-900">{PRODUCT.construction}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-bold text-gray-500">Material</span>
              <span className="font-semibold text-gray-900 text-right max-w-xs">{PRODUCT.material}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-bold text-gray-500">Surface</span>
              <span className="font-semibold text-gray-900 text-right max-w-xs">{PRODUCT.surface}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-bold text-gray-500">Base</span>
              <span className="font-semibold text-gray-900 text-right max-w-xs">{PRODUCT.base}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-bold text-gray-500">Cleaning</span>
              <span className="font-semibold text-gray-900 text-right max-w-xs">{PRODUCT.cleaning}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-bold text-gray-500">Power</span>
              <span className="font-semibold text-gray-900 text-right max-w-xs">{PRODUCT.power}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Product FAQ */}
      <section className="py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-[36px] sm:rounded-[48px] border-2 sm:border-3 border-[#dce7e0] p-6 sm:p-10 shadow-lg">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-emerald-950 text-center mb-8">
            Product FAQ
          </h2>
          <div className="space-y-3">
            {PRODUCT_PAGE_FAQS.map((faq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#f7faf8] border border-emerald-100">
                <h3 className="font-heading font-bold text-sm text-emerald-950 mb-1">
                  {faq.question}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final Purchase CTA */}
      <section className="py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-[#0a3824] text-white rounded-[36px] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white">
            Ready for their next little breakthrough?
          </h2>
          <p className="text-xs sm:text-base text-emerald-100/90 max-w-lg mx-auto">
            Bring more purpose to playtime with PAWPATH.
          </p>
          <div>
            <button
              onClick={handleAddToCart}
              className="px-8 py-4 rounded-full bg-[#0da162] hover:bg-[#0a8650] text-white font-heading font-extrabold text-sm sm:text-base shadow-xl transition hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart — {formatINR(PRODUCT.price * quantity)}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-5xl aspect-[4/3] rounded-3xl overflow-hidden bg-black">
            <Image
              src={GALLERY_IMAGES[selectedImg].src}
              alt={GALLERY_IMAGES[selectedImg].alt}
              fill
              className="object-contain"
            />
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Purchase Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0a3824]/95 backdrop-blur-md text-white border-t-2 border-emerald-500/40 py-3 px-4 shadow-2xl transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 border border-emerald-400/40 flex-shrink-0">
                <Image
                  src="/images/products/hero.webp"
                  alt="PAWPATH Mat"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-sm text-white block">
                  {PRODUCT.name}
                </span>
                <span className="text-xs text-emerald-200/80">
                  Free Standard Delivery Included
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-heading font-black text-lg text-white hidden sm:inline">
                {formatINR(PRODUCT.price * quantity)}
              </span>
              <button
                onClick={handleAddToCart}
                className="px-6 py-2.5 rounded-full bg-[#0da162] hover:bg-[#0a8650] text-white font-heading font-bold text-xs sm:text-sm shadow-md transition hover:scale-105"
              >
                Add to Cart ({formatINR(PRODUCT.price * quantity)})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

