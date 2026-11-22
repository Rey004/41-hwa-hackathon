import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, PawPrint } from "lucide-react";
import { PRODUCT } from "@/lib/products";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#072c1c] text-white pt-16 pb-12 border-t-4 border-[#0a452d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Overview Card */}
        <div className="bg-[#0b3c27] rounded-[32px] p-8 sm:p-10 border-2 border-emerald-600/30 mb-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Owner-Guided Canine Learning
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Better habits aren&apos;t built in a day. They&apos;re built together.
              </h3>
              <p className="text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
                We believe learning should be a rewarding experience for both ends of the leash.
                PAWPATH brings play and positive reinforcement together, helping owners make
                everyday training more engaging, one little pawstep at a time.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/product/pawpath"
                className="px-7 py-3.5 rounded-full bg-[#0da162] hover:bg-[#098850] text-white font-heading font-extrabold text-sm shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                <span>Get PAWPATH</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-12 text-sm">
          {/* Brand Col */}
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow">
                <PawPrint className="w-4 h-4 text-white" />
              </span>
              <span className="font-heading text-2xl font-black text-white tracking-tight">
                PAWPATH
              </span>
            </Link>
            <p className="text-sm text-emerald-200/90 font-medium">
              {PRODUCT.tagline}
            </p>
            <p className="text-xs text-emerald-300/70 leading-relaxed max-w-md">
              A single integrated dog-training mat featuring five permanently vulcanized tactile
              zones. Designed to support owner-guided obedience and everyday manners training.
            </p>
            <div className="pt-1">
              <div className="p-3.5 rounded-2xl bg-[#093522] border border-emerald-800/60 text-[11px] text-emerald-300/80 leading-relaxed">
                <strong className="text-emerald-200 block mb-0.5">Notice:</strong>
                PAWPATH is an owner-guided training aid designed for interactive partnership,
                positive reinforcement, and clear communication — not an autonomous dog trainer.
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 text-emerald-400">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/70">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-white transition">
                  The Experience
                </Link>
              </li>
              <li>
                <Link href="/product/pawpath" className="hover:text-white transition">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 text-emerald-400">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/70">
              <li>
                <Link href="/#faq" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition">
                  Shipping Information
                </Link>
              </li>
              <li>
                <span className="cursor-default">
                  Returns & Refunds
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="cursor-default">
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/60 gap-4">
          <p>© 2026 PAWPATH. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Contact</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Returns</span>
          </div>
          <p className="flex items-center gap-1 text-emerald-200">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> for happy dogs everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};
