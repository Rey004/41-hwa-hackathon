"use client";

import React, { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Smooth progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.max(3, Math.floor((100 - prev) * 0.2) + Math.floor(Math.random() * 6));
        return Math.min(100, prev + step);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsDone(true);
        const hideTimer = setTimeout(() => {
          setHidden(true);
        }, 600);
        return () => clearTimeout(hideTimer);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (hidden) return null;

  return (
    <div
      aria-hidden={isDone}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f7f5ee] transition-all duration-700 ease-out select-none ${
        isDone ? "opacity-0 pointer-events-none scale-102" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center max-w-xs text-center px-6">
        {/* Authentic PawPrint Icon without background */}
        <div className="relative mb-5 flex items-center justify-center">
          <PawPrint className="w-12 h-12 text-[#123321] transition-transform duration-300 hover:scale-110 animate-pulse-subtle" />
        </div>

        {/* Brand Name */}
        <h1 className="font-heading text-2xl font-black tracking-tight text-[#123321] mb-1">
          PAWPATH
        </h1>
        <p className="text-[11px] text-[#123321]/60 font-medium tracking-widest uppercase mb-6">
          Every pawstep learns something
        </p>

        {/* Minimal Progress Bar */}
        <div className="w-44 h-1 bg-[#123321]/10 rounded-full overflow-hidden relative mb-2.5">
          <div
            className="h-full bg-[#123321] transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="flex items-center justify-between w-44 text-[11px] font-mono text-[#123321]/50">
          <span>LEARNING</span>
          <span className="font-bold text-[#123321]">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
