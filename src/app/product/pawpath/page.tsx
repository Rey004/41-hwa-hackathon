"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PawPrint, Truck, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { PolishedImage } from "@/components/polished-image";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { addToCart, type CartItem } from "@/lib/cart";
import { PRODUCT, TRAINING_ZONES, SPECIFICATIONS, FAQS } from "@/lib/products";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedZone, setSelectedZone] = useState(TRAINING_ZONES[0].id);
  const [added, setAdded] = useState(false);

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
      <section className="relative px-6 pt-20 lg:px-12 lg:pt-24 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Gallery column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative group rounded-[2rem] overflow-hidden border border-gray-100 bg-gray-50/50 aspect-[3/4]">
                <PolishedImage
                  src={PRODUCT.images[0].url}
                  alt={PRODUCT.images[0].alt}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  placeholderColor="#dcfce7"
                  priority
                />
                <button
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 shadow-md hover:bg-white transition-colors"
                  aria-label="Expand image"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {PRODUCT.images.slice(1, 5).map((img) => (
                  <div
                    key={img.id}
                    className="rounded-[1.5rem] overflow-hidden border border-gray-100 bg-gray-50/50 aspect-square cursor-pointer hover:border-forest-green/50 transition-colors group"
                  >
                    <PolishedImage
                      src={img.url}
                      alt={img.alt}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      placeholderColor="#fce7f3"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Buy column */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-organic-green/10 text-organic-green-dark text-[10px] font-heading font-bold uppercase tracking-widest mb-2">
                  In stock
                </span>
                <h1 className="font-heading font-bold text-[3rem] leading-[1.1] text-forest-green mb-4">
                  {PRODUCT.name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {PRODUCT.tagline}
                </p>

                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-heading font-bold text-[2rem] text-forest-green">
                    ${(PRODUCT.price / 100).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${(PRODUCT.compareAtPrice / 100).toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-organic-green-dark bg-organic-green/10 px-2 py-0.5 rounded">
                    Save ${(((PRODUCT.compareAtPrice - PRODUCT.price) / 100)).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  {PRODUCT.dimensions} · {PRODUCT.weight} · {PRODUCT.sku}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <label className="text-sm font-medium text-gray-600">Quantity</label>
                  <div className="flex items-center gap-1 border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        <span>-</span>
                    </button>
                    <span className="w-8 text-center font-medium text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full"
                  disabled={!PRODUCT.inStock}
                >
                  {added ? (
                    <div className="flex items-center gap-2">
                      <CheckAdded />
                      <span>Added to bag</span>
                    </div>
                  ) : (
                    `Add to Bag (${quantity})`
                  )}
                </Button>

                {!PRODUCT.inStock && (
                  <p className="text-sm text-red-500 mt-3">Currently out of stock.</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card padding="sm" className="bg-pale-mint border border-gray-100/50">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-forest-green" />
                    <div>
                      <p className="text-xs text-forest-green-dark font-medium uppercase tracking-widest">
                        Free shipping
                      </p>
                      <p className="text-sm text-gray-800">On orders over $75</p>
                    </div>
                  </div>
                </Card>
                <Card padding="sm" className="bg-pale-mint border border-gray-100/50">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-forest-green" />
                    <div>
                      <p className="text-xs text-forest-green-dark font-medium uppercase tracking-widest">
                        30-day guarantee
                      </p>
                      <p className="text-sm text-gray-800">Risk-free trial</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky purchase bar (mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-100 p-4 z-40">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <span className="font-bold text-lg">${(PRODUCT.price / 100).toFixed(2)}</span>
          <Button size="lg" onClick={handleAddToCart} className="flex-1">
            {added ? "Added" : "Add to Bag"}
          </Button>
        </div>
      </div>

      {/* Zone exploration */}
      <section className="px-6 pb-32 bg-ivory lg:px-12 lg:pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-8 mb-16">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green">
              <PawPrint className="h-8 w-8" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-[2.5rem] leading-[1.1] text-forest-green mb-2">
                Interactive zone exploration
              </h2>
              <p className="text-gray-600">
                Five permanently built-in zones. Each one teaches a different skill.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TRAINING_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`relative group rounded-[2rem] p-6 border transition-all ${
                  selectedZone === zone.id
                    ? "bg-forest-green border-forest-green text-white shadow-xl"
                    : "bg-white border-gray-100 hover:border-forest-green/30 hover:shadow-lg text-gray-800"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  selectedZone === zone.id ? "bg-white text-forest-green" : "bg-gray-50 text-gray-400"
                } group-hover:border-forest-green/50 transition-colors`}
                >
                  {zone.icon === "Target" && <TargetIcon className="h-7 w-7" />}
                  {zone.icon === "LayoutGrid" && <LayoutIcon className="h-7 w-7" />}
                  {zone.icon === "Clock" && <ClockIcon className="h-7 w-7" />}
                  {zone.icon === "ArrowRight" && <ArrowRightIcon2 className="h-7 w-7 text-coral" />}
                  {zone.icon === "Heart" && <HeartIcon className="h-7 w-7 text-organic-green" />}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">
                  {zone.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  selectedZone === zone.id ? "text-white/90" : "text-gray-500"
                }`}>
                  {zone.description}
                </p>
              </button>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-12 p-8 rounded-[2rem] bg-white border border-gray-100"
          >
            <CardTitle className="mb-4">{getZoneById(selectedZone).title}</CardTitle>
            <p className="text-gray-600 leading-relaxed mb-6">
              {getZoneById(selectedZone).description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="w-2 h-2 rounded-full bg-forest-green" />
              <span className="font-medium">Tap above to explore each zone</span>
            </div>
          </motion.div>
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
                  <HeartIcon className="h-7 w-7 text-organic-green" />
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

      {/* Materials */}
      <section className="px-6 pb-32 bg-ivory lg:px-12 lg:pb-40">
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

function getZoneById(id: string) {
  return TRAINING_ZONES.find((z) => z.id === id) || TRAINING_ZONES[0];
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
function LayoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
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
function ArrowRightIcon2({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
    </svg>
  );
}
function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 31c-2 0-4-2-4-6V7c0-4 4-9 7-9s7 5 7 9v18c0 4-2 6-4 6z" />
    </svg>
  );
}
