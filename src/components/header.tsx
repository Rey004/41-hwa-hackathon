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
    { label: "Product", href: "/product/pawpath" },
    { label: "The Experience", sectionId: "experience" },
    { label: "What They'll Learn", sectionId: "learning-journey" },
    { label: "How It Works", sectionId: "how-it-works" },
    { label: "FAQ", sectionId: "faq" },
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
        }, 300);
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

          {/* Center Navigation Links */}
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
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#123321] hover:bg-[#0b2416] text-white text-xs font-bold transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
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
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl text-[#123321] hover:bg-[#123321]/10 transition cursor-pointer"
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
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        />

        {/* Slide-in Sidebar Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-[#f7f5ee] shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out border-l border-[#e2e9de] ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            {/* Header in sidebar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#e2e9de]">
              <div className="flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-[#123321]" />
                <span className="font-heading text-lg font-black text-[#123321]">
                  PAWPATH
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-[#123321]/70 hover:text-[#123321] hover:bg-[#eef3eb] transition cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <nav className="flex flex-col gap-2 pt-6">
              {navLinks.map((item) => {
                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-xl text-sm font-bold text-[#123321] hover:bg-[#eef3eb] hover:text-[#527741] transition flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#123321]/30" />
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={(e) => handleNavClick(e, item)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-[#123321] hover:bg-[#eef3eb] hover:text-[#527741] transition flex items-center justify-between cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#123321]/30" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#e2e9de] space-y-3">
            <Link
              href="/product/pawpath"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-[#123321] text-white text-center font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 hover:bg-[#0c2417] transition"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 text-[#9ec490]" />
            </Link>
            <p className="text-[11px] text-center text-[#123321]/50">
              © 2026 PAWPATH. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
