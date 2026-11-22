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

const TONE_CLASS: Record<string, string> = {
  green: "bg-organic-green text-white",
  mint: "bg-pale-mint text-forest-green border border-organic-green/25",
  forest: "bg-forest-green text-white",
  coral: "bg-coral text-white",
};

export function ZoneDiagram() {
  const [activeId, setActiveId] = useState(TRAINING_ZONES[0].id);
  const active = TRAINING_ZONES.find((z) => z.id === activeId) ?? TRAINING_ZONES[0];

  const positions = [
    "left-1/2 -translate-x-1/2 -top-2 sm:-top-4",
    "right-0 top-1/2 -translate-y-1/2 sm:right-[-8%]",
    "left-1/2 -translate-x-1/2 -bottom-2 sm:-bottom-4",
    "left-0 top-1/2 -translate-y-1/2 sm:left-[-8%]",
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-[14%] rounded-full border border-dashed border-forest-green/20" />
      <div className="absolute inset-[28%] rounded-full bg-white shadow-xl flex flex-col items-center justify-center text-center px-4">
        <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 mb-1">
          Pawpath
        </span>
        <span className="font-heading font-extrabold text-2xl sm:text-3xl leading-none text-forest-green">
          One Mat
        </span>
        <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-organic-green-dark mt-1">
          Five Zones
        </span>
      </div>

      {TRAINING_ZONES.slice(0, 4).map((zone, index) => {
        const Icon = ICONS[zone.icon as keyof typeof ICONS] ?? Target;
        const isActive = zone.id === active.id;
        return (
          <button
            key={zone.id}
            onClick={() => setActiveId(zone.id)}
            aria-pressed={isActive}
            className={`absolute ${positions[index]} w-24 sm:w-28 h-24 sm:h-28 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
              TONE_CLASS[zone.id === "target" ? "green" : zone.id === "place" ? "mint" : zone.id === "wot" ? "forest" : "coral"]
            } ${isActive ? "scale-110 shadow-2xl ring-4 ring-organic-green/20" : "shadow-lg hover:scale-105"}`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-heading font-bold uppercase tracking-widest">
              {zone.name}
            </span>
          </button>
        );
      })}

      <button
        onClick={() => setActiveId("reward")}
        aria-pressed={active.id === "reward"}
        className={`absolute left-1/2 -translate-x-1/2 top-[54%] w-20 h-20 rounded-full bg-white border-2 border-organic-green text-forest-green flex flex-col items-center justify-center gap-1 shadow-md transition-all duration-300 hover:scale-105 ${
          active.id === "reward" ? "scale-110 ring-4 ring-organic-green/20" : ""
        }`}
      >
        <Heart className="h-4 w-4 text-coral" />
        <span className="text-[9px] font-heading font-bold uppercase tracking-widest">
          Reward
        </span>
      </button>
    </div>
  );
}
