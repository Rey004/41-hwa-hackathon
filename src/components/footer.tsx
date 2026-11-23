"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PawPrint } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <footer className="bg-[#f7f5ee] text-[#123321] pt-12 pb-8 border-t border-[#e2e9de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#e5ebe1]">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <PawPrint className="w-6 h-6 text-[#123321]" />
            <span className="font-heading text-xl font-black tracking-tight text-[#123321]">
              PAWPATH
            </span>
            <span className="hidden sm:inline-block text-xs text-[#123321]/60 font-medium pl-3 border-l border-[#d8e0d4]">
              Every pawstep learns something.
            </span>
          </div>

          {/* Navigation Links (without hash) */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-semibold text-[#123321]/80">
            <Link href="/product/pawpath" className="hover:text-[#123321] transition">
              Product
            </Link>
            <button
              onClick={() => scrollToSection("experience")}
              className="hover:text-[#123321] transition cursor-pointer bg-transparent border-none p-0 text-xs font-semibold text-[#123321]/80"
            >
              The Experience
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-[#123321] transition cursor-pointer bg-transparent border-none p-0 text-xs font-semibold text-[#123321]/80"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#123321] transition cursor-pointer bg-transparent border-none p-0 text-xs font-semibold text-[#123321]/80"
            >
              FAQ
            </button>
          </nav>

          {/* Support & Social Links */}
          <div className="flex items-center gap-6 text-xs font-semibold text-[#123321]/80">
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#123321] transition cursor-pointer bg-transparent border-none p-0 text-xs font-semibold text-[#123321]/80"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#123321] transition cursor-pointer bg-transparent border-none p-0 text-xs font-semibold text-[#123321]/80"
            >
              Shipping
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#123321] transition cursor-pointer bg-transparent border-none p-0 text-xs font-semibold text-[#123321]/80"
            >
              Returns
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-[#d8e0d4] text-[#123321]">
              <Link href="#" aria-label="Instagram" className="hover:text-[#527741] transition">
                <InstagramIcon className="w-4 h-4" />
              </Link>
              <Link href="#" aria-label="YouTube" className="hover:text-[#527741] transition">
                <YoutubeIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#123321]/60">
          <p>© 2026 PAWPATH. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#123321] transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-[#123321] transition">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
