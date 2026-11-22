"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ZONES, TrainingZone } from "@/lib/products";
import { ZoneDiagram } from "@/components/zone-diagram";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ZoneShowcaseProps {
  showEyebrow?: boolean;
  ctaHref?: string;
  ctaText?: string;
}

export const ZoneShowcase: React.FC<ZoneShowcaseProps> = ({
  showEyebrow = true,
  ctaHref = "/product/pawpath#zones",
  ctaText = "Explore Every Zone",
}) => {
  const [activeZone, setActiveZone] = useState<TrainingZone>(ZONES[0]);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        {showEyebrow && (
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full inline-block mb-3">
            ONE PRODUCT. MANY POSSIBILITIES.
          </span>
        )}
        <h2 className="font-heading text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
          One mat. Many milestones.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
          Five thoughtfully designed zones. Countless opportunities to practise.
          PAWPATH brings different training activities together in one integrated surface.
        </p>
      </div>

      {/* Zone Selector Buttons / Editorial Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
        {ZONES.map((zone) => {
          const isActive = activeZone.id === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm ${
                isActive
                  ? "bg-[#0a3824] text-white scale-105 ring-2 ring-emerald-500 ring-offset-2"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 border border-gray-200"
              }`}
            >
              <span>{zone.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Interactive Diagram + Editorial Zone Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Diagram */}
        <div className="lg:col-span-7">
          <ZoneDiagram
            activeZoneId={activeZone.id}
            onSelectZone={(zone) => setActiveZone(zone)}
          />
        </div>

        {/* Right: Zone Detail Card */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-[#dce7e0] shadow-md relative space-y-5"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {activeZone.eyebrow}
                </span>
                <h3 className="font-heading text-2xl font-black text-emerald-950 mt-2">
                  {activeZone.name}
                </h3>
                <p className="text-sm font-semibold text-emerald-800 mt-0.5">
                  {activeZone.tagline}
                </p>
              </div>

              {/* Zone Live Render Preview */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-emerald-950/15 bg-emerald-50 shadow-inner">
                <Image
                  src={activeZone.image}
                  alt={activeZone.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {activeZone.description}
              </p>

              {/* Training Insights */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="p-3 rounded-2xl bg-[#f7faf8] border border-[#e2ece5] text-xs">
                  <span className="font-bold text-emerald-900 block mb-0.5">
                    Target Dog Skill
                  </span>
                  <span className="text-gray-700">{activeZone.dogSkill}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#eaf5ed] border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-900 block mb-0.5">
                    Suggested Owner Cue
                  </span>
                  <span className="font-mono font-bold text-emerald-950">
                    {activeZone.ownerCue}
                  </span>
                </div>
              </div>

              {/* CTA link */}
              <div className="pt-2">
                <Link
                  href={ctaHref}
                  className="w-full py-3 px-5 rounded-full bg-[#0a3824] hover:bg-[#062417] text-white font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
