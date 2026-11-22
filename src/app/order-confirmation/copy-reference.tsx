"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyReference({ reference }: { reference: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="inline-flex items-center gap-3 bg-emerald-950/5 border border-emerald-900/15 rounded-2xl px-5 py-3 shadow-inner">
      <div className="text-left">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800/70 block">
          Order Reference
        </span>
        <span className="font-mono text-lg font-extrabold tracking-wide text-emerald-950">
          {reference}
        </span>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy order reference to clipboard"
        className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 active:scale-95 transition-all shadow-sm cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-200" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
