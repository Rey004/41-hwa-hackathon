"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Menu, ShoppingBag, Search, PawPrint } from "lucide-react";
import { CartDrawer } from "@/components/cart-drawer";
import {
  cartTotals,
  getCartServerSnapshot,
  getCartSnapshot,
  subscribeToCart,
} from "@/lib/cart";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/product/pawpath", label: "The Mat" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const items = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getCartServerSnapshot
  );
  const { itemCount } = cartTotals(items);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-gray-100/60">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="Pawpath home"
        >
          <PawPrint className="h-7 w-7 text-forest-green fill-forest-green" />
          <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tighter">
            PAWPATH
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-forest-green transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/product/pawpath"
            className="px-5 py-2 rounded-full bg-forest-green text-white text-sm font-medium hover:bg-organic-green-dark transition-colors"
          >
            Shop the Mat
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/product/pawpath"
            className="text-gray-400 hover:text-forest-green transition-colors"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-gray-400 hover:text-forest-green transition-colors"
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-coral text-white text-[10px] font-heading font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-gray-400 hover:text-gray-600"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-600 hover:text-forest-green transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/product/pawpath"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm font-medium text-forest-green"
          >
            Shop the Mat
          </Link>
        </nav>
      )}

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}
