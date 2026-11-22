"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Target, LayoutGrid, Clock, ArrowRight, Heart, MoveRight } from "lucide-react";
import { PolishedImage } from "@/components/polished-image";
import { PRODUCT, TRAINING_ZONES } from "@/lib/products";

const ICONS = {
  Target,
  LayoutGrid,
  Clock,
  ArrowRight,
  Heart,
};

const TONES: Record<string, string> = {
  green: "bg-organic-green",
  mint: "bg-pale-mint",
  forest: "bg-forest-green",
  coral: "bg-coral",
};

export function ZoneShowcase() {
  const [activeId, setActiveId] = useState(TRAINING_ZONES[0].id);
  const active = TRAINING_ZONES.find((z) => z.id === activeId) ?? TRAINING_ZONES[0];
  const Icon = ICONS[active.icon as keyof typeof ICONS] ?? Target;
  const activeImage =
    PRODUCT.images.find((img) => img.id === `zone-${active.id}`) ?? PRODUCT.images[0];

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5">
        <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl aspect-square bg-pale-mint">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <PolishedImage
                src={activeImage.url}
                alt={activeImage.alt}
                width={700}
                height={700}
                className="w-full h-full object-cover"
                placeholderColor="#dcfce7"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 shadow-md">
            <span className={`h-2 w-2 rounded-full ${TONES.green}`} />
            <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-forest-green">
              {active.name} zone
            </span>
          </div>

          <div className="absolute bottom-5 right-5 w-14 h-14 rounded-full bg-forest-green text-white flex items-center justify-center shadow-lg">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col">
        <div className="grid sm:grid-cols-2 gap-3">
          {TRAINING_ZONES.map((zone, index) => {
            const ZoneIcon = ICONS[zone.icon as keyof typeof ICONS] ?? Target;
            const isActive = zone.id === active.id;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveId(zone.id)}
                aria-pressed={isActive}
                className={`group text-left rounded-[1.75rem] p-5 border transition-all duration-300 ${
                  isActive
                    ? "bg-forest-green border-forest-green text-white shadow-lg"
                    : "bg-white border-gray-100 text-gray-800 hover:border-forest-green/40 hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                      isActive ? "bg-white text-forest-green" : "bg-pale-mint text-forest-green"
                    }`}
                  >
                    <ZoneIcon className="h-5 w-5" />
                  </span>
                  <span
                    className={`text-[10px] font-heading font-bold uppercase tracking-widest ${
                      isActive ? "text-white/60" : "text-gray-300"
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg leading-tight mb-1">
                  {zone.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isActive ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {zone.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-heading font-semibold uppercase tracking-widest text-gray-400">
          <span className="inline-flex items-center gap-2">
            <MoveRight className="h-4 w-4 text-organic-green" />
            Five zones, permanently built in
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-coral" />
            90 × 60 cm
          </span>
        </div>
      </div>
    </div>
  );
}
