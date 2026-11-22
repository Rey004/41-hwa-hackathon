"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  PawPrint,
} from "lucide-react";
import { useCart } from "@/lib/cart";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, itemCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "The Experience", href: "/#experience" },
    { label: "What They'll Learn", href: "/#what-they-learn" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0a3824] text-white text-[11px] sm:text-xs font-semibold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-emerald-900/60">
        <span>
          <strong>Every pawstep learns something.</strong> Free Standard Delivery on all PAWPATH mats.
        </span>
        <span className="hidden md:inline text-emerald-300 ml-2">
          • Owner-Guided Positive Reinforcement Aid
        </span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#faf8f3]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#e2ece5]"
            : "bg-[#faf8f3] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-xl bg-[#0a3824] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <PawPrint className="w-4 h-4 text-white" />
            </span>
            <span className="font-heading text-2xl font-black tracking-tight text-[#0a3824] flex items-center">
              PAWPATH
              <span className="w-2 h-2 rounded-full bg-[#0da162] inline-block ml-0.5" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white px-5 py-1.5 rounded-full border border-[#dbe7df] shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-700 hover:text-emerald-950 hover:bg-emerald-50 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Primary CTA */}
            <Link
              href="/product/pawpath"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0a3824] hover:bg-[#062417] text-white text-xs font-heading font-bold shadow-sm transition hover:scale-[1.02]"
            >
              <span>Explore PAWPATH</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-white hover:bg-emerald-50 border border-[#dbe7df] text-[#0a3824] transition shadow-sm"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0da162] text-white text-[11px] font-black flex items-center justify-center shadow">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-5 shadow-lg">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-bold text-gray-800 hover:text-emerald-700 transition"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Link
                  href="/product/pawpath"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-[#0a3824] text-white text-center font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <span>Explore PAWPATH</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
