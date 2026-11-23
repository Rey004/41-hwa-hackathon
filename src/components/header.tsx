"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  PawPrint,
} from "lucide-react";
import { useCart } from "@/lib/cart";

interface NavItem {
  number: string;
  label: string;
  href?: string;
  sectionId?: string;
}

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, itemCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks: NavItem[] = [
    { number: "01", label: "Product", href: "/product/pawpath" },
    { number: "02", label: "The Experience", sectionId: "experience" },
    { number: "03", label: "What They'll Learn", sectionId: "learning-journey" },
    { number: "04", label: "How It Works", sectionId: "how-it-works" },
    { number: "05", label: "FAQ", sectionId: "faq" },
  ];

  const handleNavClick = (
    e: React.MouseEvent,
    item: NavItem
  ) => {
    if (item.sectionId) {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (pathname === "/") {
        const el = document.getElementById(item.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push("/");
        setTimeout(() => {
          const el = document.getElementById(item.sectionId!);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 350);
      }
    }
  };

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isTransparent
            ? "bg-transparent py-4 sm:py-5 border-b border-transparent"
            : "bg-[#f7f5ee]/95 backdrop-blur-md shadow-xs py-3 sm:py-3.5 border-b border-[#e2e9de]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <PawPrint className="w-6 h-6 text-[#123321] group-hover:scale-110 transition-transform duration-200" />
            <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-[#123321]">
              PAWPATH
            </span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((item) => {
              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-xs sm:text-[13px] font-semibold text-[#123321]/80 hover:text-[#123321] transition-colors relative py-1 group ${
                      pathname.startsWith("/product") ? "text-[#123321] font-bold" : ""
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#123321] transition-all duration-300 rounded-full ${
                        pathname.startsWith("/product") ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-xs sm:text-[13px] font-semibold text-[#123321]/80 hover:text-[#123321] transition-colors relative py-1 group cursor-pointer bg-transparent border-none"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 h-[2px] bg-[#123321] transition-all duration-300 rounded-full w-0 group-hover:w-full" />
                </button>
              );
            })}
          </nav>

          {/* Right CTA and Cart */}
          <div className="flex items-center gap-3">
            <Link
              href="/product/pawpath"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#123321] hover:bg-[#0b2416] text-white text-xs font-bold transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] btn-shimmer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9ec490]" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className={`relative p-2.5 rounded-full transition-all shadow-xs cursor-pointer ${
                isTransparent
                  ? "bg-white/80 hover:bg-white text-[#123321] border border-[#123321]/15"
                  : "bg-white hover:bg-[#eef3eb] text-[#123321] border border-[#dce4d8]"
              }`}
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#123321] text-white text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-[#123321] hover:bg-[#123321]/10 transition cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-PAGE MOBILE HAMBURGER MENU OVERLAY WITH SMOOTH ANIMATION */}
      <div
        className={`fixed inset-0 z-[120] md:hidden bg-[#f7f5ee] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto transition-all duration-400 ease-out ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Top Bar inside Fullscreen Menu */}
        <div className="flex items-center justify-between pb-6 border-b border-[#e2e9de]">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <PawPrint className="w-6 h-6 text-[#123321]" />
            <span className="font-heading text-xl font-black tracking-tight text-[#123321]">
              PAWPATH
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-white border border-[#dce4d8] flex items-center justify-center text-[#123321] shadow-xs hover:bg-[#eef3eb] hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links with Staggered Entrance Animation */}
        <nav className="my-auto py-8 flex flex-col space-y-2">
          {navLinks.map((item, idx) => {
            const delayStyle = {
              transitionDelay: mobileMenuOpen ? `${idx * 60 + 80}ms` : "0ms",
            };

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={delayStyle}
                  className={`group py-3.5 border-b border-[#e2e9de]/70 flex items-center justify-between transition-all duration-400 ease-out ${
                    mobileMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#678a52] font-bold">
                      {item.number}
                    </span>
                    <span className="font-heading text-2xl sm:text-3xl font-black text-[#123321] group-hover:text-[#527741] transition">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#123321]/40 group-hover:translate-x-1 group-hover:text-[#123321] transition-all" />
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                onClick={(e) => handleNavClick(e, item)}
                style={delayStyle}
                className={`group w-full py-3.5 border-b border-[#e2e9de]/70 flex items-center justify-between text-left cursor-pointer bg-transparent transition-all duration-400 ease-out ${
                  mobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#678a52] font-bold">
                    {item.number}
                  </span>
                  <span className="font-heading text-2xl sm:text-3xl font-black text-[#123321] group-hover:text-[#527741] transition">
                    {item.label}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-[#123321]/40 group-hover:translate-x-1 group-hover:text-[#123321] transition-all" />
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions inside Fullscreen Menu */}
        <div
          style={{
            transitionDelay: mobileMenuOpen ? "420ms" : "0ms",
          }}
          className={`pt-6 border-t border-[#e2e9de] space-y-4 transition-all duration-400 ease-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <Link
            href="/product/pawpath"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 rounded-full bg-[#123321] text-white text-center font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 hover:bg-[#0c2417] transition btn-shimmer"
          >
            <span>Shop The PAWPATH Mat</span>
            <ArrowRight className="w-4 h-4 text-[#9ec490]" />
          </Link>

          <div className="flex items-center justify-between text-xs text-[#123321]/60 pt-2 font-medium">
            <span>Every pawstep learns something.</span>
            <span>© 2026 PAWPATH</span>
          </div>
        </div>
      </div>
    </>
  );
};
