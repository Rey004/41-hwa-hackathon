"use client";

import React from "react";
import { ZONES, TrainingZone } from "@/lib/products";
import { Target, Home, Clock, Compass, Sparkles } from "lucide-react";

interface ZoneDiagramProps {
  activeZoneId: string;
  onSelectZone: (zone: TrainingZone) => void;
}

export const ZoneDiagram: React.FC<ZoneDiagramProps> = ({
  activeZoneId,
  onSelectZone,
}) => {
  return (
    <div className="relative bg-[#0d452d] rounded-[36px] p-5 sm:p-7 shadow-2xl border-4 border-[#08301f] overflow-hidden select-none">
      {/* Top mat label badge */}
      <div className="absolute top-4 left-6 z-20 flex items-center gap-2 bg-[#082a1b]/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-emerald-500/30 text-[11px] font-bold text-emerald-300 tracking-wide">
        <span>PAWPATH MAT • 90cm × 60cm</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      </div>

      {/* Mat Surface Layout */}
      <div className="relative aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-[#0c5335] via-[#094029] to-[#062c1c] border-2 border-emerald-600/40 p-4 shadow-inner overflow-hidden">
        {/* Subtle background grid pattern representing rubber grip */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* ZONE 1: TARGET (Top Left) */}
        <div
          onClick={() => onSelectZone(ZONES[0])}
          className={`absolute left-[10%] top-[14%] w-[28%] aspect-square rounded-full border-3 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center p-2 text-center ${
            activeZoneId === "target"
              ? "border-emerald-300 bg-emerald-500/35 shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-105"
              : "border-emerald-500/30 bg-emerald-900/40 hover:border-emerald-400"
          }`}
        >
          <div className="w-[75%] h-[75%] rounded-full border-2 border-dashed border-emerald-400/50 flex items-center justify-center">
            <Target className="w-6 h-6 text-emerald-300" />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-emerald-100 mt-1 uppercase tracking-wider">
            Target Zone
          </span>
        </div>

        {/* ZONE 4: PATHWAY (Center Agility Runway) */}
        <div
          onClick={() => onSelectZone(ZONES[3])}
          className={`absolute left-[42%] top-[10%] w-[16%] h-[78%] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 flex flex-col items-center justify-between py-3 ${
            activeZoneId === "pathway"
              ? "border-emerald-300 bg-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-105"
              : "border-emerald-500/30 bg-emerald-900/30 hover:border-emerald-400"
          }`}
        >
          <Compass className="w-5 h-5 text-emerald-300" />
          <div className="flex flex-col items-center gap-1.5 opacity-60">
            <span className="text-emerald-300 text-xs">▲</span>
            <span className="text-emerald-300 text-xs">▲</span>
            <span className="text-emerald-300 text-xs">▲</span>
          </div>
          <span className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest rotate-90 my-auto">
            Pathway
          </span>
          <span className="text-[10px] text-emerald-300">🐾</span>
        </div>

        {/* ZONE 2: PLACE (Right Large Settle Sanctuary) */}
        <div
          onClick={() => onSelectZone(ZONES[1])}
          className={`absolute right-[8%] top-[12%] w-[32%] h-[74%] rounded-3xl border-3 cursor-pointer transition-all duration-300 flex flex-col justify-between p-3 ${
            activeZoneId === "place"
              ? "border-emerald-300 bg-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-105"
              : "border-emerald-500/30 bg-emerald-900/40 hover:border-emerald-400"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">
              Place Zone
            </span>
            <Home className="w-4 h-4 text-emerald-300" />
          </div>
          <div className="text-center my-auto p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
            <span className="text-[10px] sm:text-xs text-emerald-100 font-semibold block">
              Calm Settle Area
            </span>
          </div>
          <span className="text-[9px] text-emerald-300 text-center">
            Perimeter Boundary
          </span>
        </div>

        {/* ZONE 5: REWARD (Bottom Left Reinforcement Dock) */}
        <div
          onClick={() => onSelectZone(ZONES[4])}
          className={`absolute left-[10%] bottom-[12%] w-[28%] h-[24%] rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between px-3 ${
            activeZoneId === "reward"
              ? "border-emerald-300 bg-emerald-500/35 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105"
              : "border-emerald-500/30 bg-emerald-900/30 hover:border-emerald-400"
          }`}
        >
          <div className="text-left">
            <span className="text-[10px] font-bold text-emerald-200 block">
              Reward Zone
            </span>
            <span className="text-[8px] text-emerald-300/80">
              Positive Reinforcement
            </span>
          </div>
          <Sparkles className="w-4 h-4 text-emerald-300" />
        </div>

        {/* ZONE 3: WAIT (Graduated Distance Pause Dots) */}
        <div
          onClick={() => onSelectZone(ZONES[2])}
          className={`absolute left-[38%] bottom-[8%] w-[24%] h-[18%] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 flex items-center justify-around px-2 ${
            activeZoneId === "wait"
              ? "border-emerald-300 bg-emerald-500/35 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105"
              : "border-emerald-500/30 bg-emerald-900/30 hover:border-emerald-400"
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-emerald-300" />
          <div className="flex gap-1 text-[9px] font-mono font-bold text-emerald-200">
            <span>3s</span> • <span>5s</span> • <span>10s</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-emerald-200/80 px-2">
        <span>Permanently Integrated Single Component</span>
        <span className="text-emerald-300 font-semibold">100% Non-Electric</span>
      </div>
    </div>
  );
};
