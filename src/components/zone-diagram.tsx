"use client";

import { useState } from "react";
import { Target, LayoutGrid, Clock, ArrowRight, Heart } from "lucide-react";
import { TRAINING_ZONES } from "@/lib/products";

const ICONS = {
  Target,
  LayoutGrid,
  Clock,
  ArrowRight,
  Heart,
};

const CORNER_POSITIONS = [
  "left-[3%] top-[6%]",
  "right-[3%] top-[6%]",
  "right-[3%] bottom-[6%]",
  "left-[3%] bottom-[6%]",
];

export function ZoneDiagram() {
  const [activeId, setActiveId] = useState("reward");

  const cornerZones = TRAINING_ZONES.filter((z) => z.id !== "reward");
  const reward = TRAINING_ZONES.find((z) => z.id === "reward") ?? TRAINING_ZONES[0];
  const active = TRAINING_ZONES.find((z) => z.id === activeId) ?? reward;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-[8%] rounded-full border border-dashed border-forest-green/20" />
      <div className="absolute inset-[20%] rounded-full bg-white/70" />

      {cornerZones.map((zone, index) => {
        const Icon = ICONS[zone.icon as keyof typeof ICONS] ?? Target;
        const isActive = zone.id === active.id;
        const tone =
          zone.id === "target"
            ? "bg-organic-green text-white"
            : zone.id === "place"
              ? "bg-pale-mint text-forest-green border border-organic-green/25"
              : zone.id === "wot"
                ? "bg-forest-green text-white"
                : "bg-coral text-white";
        return (
          <button
            key={zone.id}
            onClick={() => setActiveId(zone.id)}
            aria-pressed={isActive}
            className={`absolute ${CORNER_POSITIONS[index]} flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-full shadow-lg transition-all duration-300 sm:h-[92px] sm:w-[92px] ${tone} ${
              isActive
                ? "scale-110 shadow-2xl ring-4 ring-organic-green/25"
                : "hover:scale-105"
            }`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-[9px] font-heading font-bold uppercase tracking-widest sm:text-[10px]">
              {zone.name}
            </span>
          </button>
        );
      })}

      <button
        onClick={() => setActiveId("reward")}
        aria-pressed={active.id === "reward"}
        className={`absolute left-1/2 top-1/2 flex h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full bg-forest-green text-white shadow-2xl transition-all duration-300 hover:scale-105 ${
          active.id === "reward" ? "ring-4 ring-organic-green/30" : ""
        }`}
      >
        <Heart className="h-6 w-6 fill-coral text-coral sm:h-8 sm:w-8" />
        <span className="font-heading font-extrabold text-lg leading-none sm:text-2xl">
          Reward
        </span>
        <span className="text-[9px] font-heading font-bold uppercase tracking-[0.18em] text-white/60 sm:text-[10px]">
          Positive reinforcement
        </span>
        <span className="mt-1 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-heading font-bold uppercase tracking-widest sm:text-[10px]">
          One mat · 5 zones
        </span>
      </button>
    </div>
  );
}
