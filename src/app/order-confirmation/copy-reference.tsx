"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyReference({ reference }: { reference: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-widest text-forest-green border border-forest-green/20 rounded-full px-3 py-1.5 hover:bg-forest-green/5 transition-colors"
      aria-label="Copy order reference"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> Copy
        </>
      )}
    </button>
  );
}
