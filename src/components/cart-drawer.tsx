"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/utils";
import { PRODUCT } from "@/lib/products";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    shipping,
    total,
  } = useCart();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#072c1c]/50 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-[#faf8f3] text-[#14241c] shadow-2xl flex flex-col border-l border-[#dbe7df]"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-white border-b border-[#e2eae4] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-emerald-950 flex items-center gap-2">
                      Your Cart
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#0da162] text-white">
                        {itemCount}
                      </span>
                    </h2>
                    <p className="text-xs text-emerald-700 font-semibold">
                      Looking good!
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery Banner */}
              <div className="px-6 py-3 bg-[#0a3824] text-emerald-50 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Free Standard Delivery included</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-300">
                  30-Day Paw Guarantee
                </span>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-3xl">
                      🐾
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-emerald-950">
                        Your cart is waiting for a little something.
                      </h3>
                      <p className="text-xs text-gray-500 max-w-xs mx-auto">
                        Ready to start positive habit training? Add the PAWPATH
                        interactive mat and make every pawstep count!
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0da162] hover:bg-[#0a8650] text-white font-heading font-bold text-xs uppercase tracking-wider shadow transition"
                    >
                      <span>Continue Exploring</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white rounded-2xl border-2 border-[#e2eae4] shadow-sm flex gap-3.5 relative hover:border-emerald-300 transition"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-emerald-950 flex-shrink-0 border border-emerald-800">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-heading text-sm font-bold text-gray-900 leading-snug">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-rose-600 p-1 -mr-1 transition"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {item.subtitle && (
                            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                              {item.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <span className="font-heading font-bold text-sm text-emerald-950">
                              {formatINR(item.price * item.quantity)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatINR(item.originalPrice * item.quantity)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center bg-[#f0f5f2] rounded-full p-1 border border-emerald-100">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-[#e2eae4] space-y-4">
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        {formatINR(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-bold text-[#0da162]">
                        {shipping === 0 ? "FREE" : formatINR(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-emerald-950 pt-2 border-t border-gray-100 font-heading">
                      <span>Total</span>
                      <span>{formatINR(total)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full py-4 px-6 rounded-full bg-[#0da162] hover:bg-[#0a8650] text-white font-heading font-extrabold text-sm text-center flex items-center justify-center gap-2 shadow-lg transition hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      30-Day Money-Back Guarantee
                    </span>
                    <span>•</span>
                    <span>Simulated Test Mode</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
