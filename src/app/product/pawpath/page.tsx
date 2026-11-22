"use client";

import { useState } from "react";
import { ArrowRight, Truck, ShieldCheck, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { PolishedImage } from "@/components/polished-image";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { ZoneShowcase } from "@/components/zone-showcase";
import { addToCart, type CartItem } from "@/lib/cart";
import { PRODUCT, TRAINING_STEPS, SPECIFICATIONS, FAQS } from "@/lib/products";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(PRODUCT.images[0].id);
  const [added, setAdded] = useState(false);

  const selectedImage =
    PRODUCT.images.find((img) => img.id === activeImage) ?? PRODUCT.images[0];

  const handleAddToCart = () => {
    const item: Omit<CartItem, "quantity"> & { quantity?: number } = {
      productId: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      image: PRODUCT.images[0].url,
      quantity,
    };
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Gallery + Buy */}
      <section className="relative px-6 pt-12 lg:px-12 lg:pt-16 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Gallery column */}
            <div className="lg:col-span-6">
              <div className="relative group overflow-hidden rounded-[2.5rem] border-8 border-white shadow-xl bg-pale-mint aspect-square">
                <PolishedImage
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  placeholderColor="#dcfce7"
                  priority
                />
                <span className="absolute top-5 left-5 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-[10px] font-heading font-bold uppercase tracking-[0.18em] text-forest-green shadow-sm">
                  {selectedImage.id.replace("zone-", "")}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {PRODUCT.images.slice(0, 5).map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(img.id)}
                    aria-label={`View ${img.alt}`}
                    aria-pressed={activeImage === img.id}
                    className={`overflow-hidden rounded-2xl border-2 bg-pale-mint transition-all ${
                      activeImage === img.id
                        ? "border-forest-green shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <PolishedImage
                      src={img.url}
                      alt={img.alt}
                      width={200}
                      height={200}
                      className="w-full aspect-square object-cover"
                      placeholderColor="#fce7ec"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Buy column */}
            <div className="lg:col-span-6">
              <div className="lg:sticky lg:top-28 space-y-7">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-organic-green/15 px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.18em] text-organic-green-dark mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-organic-green" />
                    In stock · ships today
                  </span>
                  <h1 className="font-heading font-extrabold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-forest-green mb-4">
                    {PRODUCT.name}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed mb-7">
                    {PRODUCT.tagline} {PRODUCT.description}
                  </p>

                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-heading font-extrabold text-[2.25rem] leading-none text-forest-green">
                      ${(PRODUCT.price / 100).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${(PRODUCT.compareAtPrice / 100).toFixed(2)}
                    </span>
                    <span className="rounded-full bg-coral-soft px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-widest text-coral">
                      Save ${((PRODUCT.compareAtPrice - PRODUCT.price) / 100).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-7">
                    {PRODUCT.dimensions} · {PRODUCT.weight} · {PRODUCT.sku}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-7">
                    <span className="text-sm font-heading font-bold uppercase tracking-widest text-gray-500">
                      Quantity
                    </span>
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        <span className="text-lg leading-none">−</span>
                      </button>
                      <span className="w-10 text-center font-heading font-bold text-gray-800" aria-live="polite">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <span className="text-lg leading-none">+</span>
                      </button>
                    </div>
                    <span className="text-xs text-gray-400">
                      {PRODUCT.inStock ? "Ships in 24 hours" : "Out of stock"}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="w-full"
                    disabled={!PRODUCT.inStock}
                  >
                    {added ? (
                      <span className="flex items-center gap-2">
                        <CheckAdded />
                        Added to bag
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Add to Bag · ${((PRODUCT.price * quantity) / 100).toFixed(2)}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>

                  {!PRODUCT.inStock && (
                    <p className="text-sm text-red-500 mt-3">Currently out of stock.</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Card padding="sm" className="rounded-2xl bg-pale-mint border border-organic-green/15">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-forest-green flex-none" />
                      <div>
                        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-forest-green">
                          Free shipping
                        </p>
                        <p className="text-sm text-gray-700">On orders over $75</p>
                      </div>
                    </div>
                  </Card>
                  <Card padding="sm" className="rounded-2xl bg-pale-mint border border-organic-green/15">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-forest-green flex-none" />
                      <div>
                        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-forest-green">
                          30-day guarantee
                        </p>
                        <p className="text-sm text-gray-700">Risk-free trial</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="rounded-[1.75rem] border border-gray-100 bg-white p-6">
                  <p className="text-[10px] font-heading font-bold uppercase tracking-[0.18em] text-gray-400 mb-4">
                    Why owners love it
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Five zones permanently built into one surface",
                      "Suitable for puppies from 8 weeks to adult dogs",
                      "Non-toxic, washable and genuinely chew-resistant",
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="h-4 w-4 flex-none mt-0.5 text-organic-green" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky purchase bar (mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-100 px-5 py-4 z-40 flex items-center justify-between gap-4">
        <div>
          <p className="font-heading font-extrabold text-lg text-forest-green leading-none">
            ${((PRODUCT.price * quantity) / 100).toFixed(2)}
          </p>
          <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 mt-0.5">
            Qty {quantity}
          </p>
        </div>
        <Button size="lg" onClick={handleAddToCart} className="flex-1 max-w-[60%]">
          {added ? "Added to bag" : "Add to Bag"}
        </Button>
      </div>
      <div className="lg:hidden h-20" />

      {/* Zone exploration */}
      <section id="zones" className="px-6 pb-28 bg-ivory lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
              Interactive exploration
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.04] tracking-tight text-forest-green">
              Explore the five zones
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              Each zone is permanently built into the mat. Select one to see the
              skill it teaches.
            </p>
          </div>
          <ZoneShowcase />
        </div>
      </section>

      {/* Learning benefits */}
      <section className="px-6 pb-32 lg:px-12 lg:pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card padding="lg" className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pale-mint rounded-full blur-3xl -mr-8 -mt-8" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-forest-green/10 flex items-center justify-center mb-6 text-forest-green">
                  <TargetIcon className="h-7 w-7" />
                </div>
                <CardTitle className="mb-3">Precision targeting</CardTitle>
                <CardDescription>
                  Teach your dog to touch specific targets with nose or paw — the
                  foundation of all advanced commands.
                </CardDescription>
              </div>
            </Card>
            <Card padding="lg" className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pale-mint rounded-full blur-3xl -mr-8 -mt-8" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-forest-green/10 flex items-center justify-center mb-6 text-forest-green">
                  <ClockIcon className="h-7 w-7" />
                </div>
                <CardTitle className="mb-3">Patience &amp; stay</CardTitle>
                <CardDescription>
                  Build duration and impulse control with the wot zone, designed
                  for stay and wait commands.
                </CardDescription>
              </div>
            </Card>
            <Card padding="lg" className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pale-mint rounded-full blur-3xl -mr-8 -mt-8" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-forest-green/10 flex items-center justify-center mb-6 text-forest-green">
                  <Heart className="h-7 w-7 text-organic-green" />
                </div>
                <CardTitle className="mb-3">Positive reinforcement</CardTitle>
                <CardDescription>
                  The reward zone marks every success, keeping motivation high and
                  learning joyful.
                </CardDescription>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Training instructions */}
      <section className="px-6 pb-28 bg-ivory lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
              Training instructions
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.04] tracking-tight text-forest-green">
              Your first session, in four moves
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              Five focused minutes is enough. Work through the zones in order, and
              let the reward zone do the talking.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRAINING_STEPS.map((step) => (
              <div
                key={step.step}
                className="group relative rounded-[2rem] border border-gray-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest-green/30 hover:shadow-lg"
              >
                <span className="absolute -top-4 left-7 flex h-12 w-12 items-center justify-center rounded-full bg-organic-green font-heading font-extrabold text-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  {step.step}
                </span>
                <h3 className="mt-8 mb-2 font-heading font-bold text-lg text-gray-800">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-forest-green p-8 text-white">
              <h3 className="font-heading font-bold text-xl mb-4">
                Session rules that work
              </h3>
              <ul className="space-y-3">
                {[
                  "Keep each session under five minutes — short beats long.",
                  "Reward within half a second of the behaviour you want.",
                  "End on a success, always finish in the reward zone.",
                  "One cue per zone, spoken the same way every time.",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-organic-green" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-8">
              <h3 className="mb-4 font-heading font-bold text-xl text-forest-green">
                A week-one plan
              </h3>
              <ul className="space-y-3">
                {[
                  { day: "Day 1–2", task: "Explore the mat, sit on reward zone" },
                  { day: "Day 3–4", task: "Touch target on cue" },
                  { day: "Day 5–6", task: "Place on cue, then wait in wot" },
                  { day: "Day 7", task: "Chain target → place → reward" },
                ].map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-heading font-bold text-sm text-forest-green">
                      {row.day}
                    </span>
                    <span className="text-right text-sm text-gray-500">{row.task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="px-6 pb-32 lg:px-12 lg:pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading font-bold text-[2.5rem] leading-[1.1] text-forest-green mb-6">
                Thoughtful materials
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-forest-green">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Non-toxic TPE surface</p>
                    <p className="text-sm text-gray-500">
                      Safe for paws, noses, and chewing. Free from harmful chemicals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-forest-green">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Natural rubber backing</p>
                    <p className="text-sm text-gray-500">
                      Stays firmly in place on any floor surface during training.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-forest-green">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Water-resistant &amp; washable</p>
                    <p className="text-sm text-gray-500">
                      Wipe clean or hand wash with mild soap. Air dry flat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <PolishedImage
                src="/images/products/lifestyle.svg"
                alt="Material detail"
                width={600}
                height={600}
                className="rounded-[2rem] shadow-2xl border border-gray-100"
                placeholderColor="#fce7f3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="px-6 pb-32 lg:px-12 lg:pb-40">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-[2.5rem] leading-[1.1] text-forest-green text-center mb-16">
            Technical specifications
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {SPECIFICATIONS.map((spec) => (
              <Card key={spec.label} padding="md" className="text-center border border-gray-100 bg-white">
                <p className="text-sm text-gray-500">{spec.label}</p>
                <p className="font-medium text-gray-800 mt-1">{spec.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-32 bg-ivory lg:px-12 lg:pb-40">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-[2.5rem] leading-[1.1] text-forest-green text-center mb-16">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <Card key={faq.q} padding="md" variant="outline" className="border-gray-100/50">
                <CardTitle className="text-base font-medium text-gray-800">{faq.q}</CardTitle>
                <CardDescription className="mt-2">{faq.a}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CheckAdded() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
