"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  cartTotals,
  getCartServerSnapshot,
  getCartSnapshot,
  removeFromCart,
  subscribeToCart,
  updateQuantity,
  type CartItem,
} from "@/lib/cart";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const router = useRouter();
  const items = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getCartServerSnapshot
  );
  const { subtotal, itemCount } = cartTotals(items);

  const handleQuantity = (productId: string, delta: number) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;
    const nextQty = item.quantity + delta;
    if (nextQty <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, nextQty);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    onOpenChange(false);
    router.push("/checkout");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-heading font-bold text-xl tracking-tight">
            Your Bag
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-200 mb-3" />
              <p className="text-gray-500 text-sm">Your bag is empty.</p>
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="mt-4"
              >
                Keep Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item: CartItem) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 bg-gray-50/50 rounded-xl p-3"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-pale-mint">
                    <Image
                      src={item.image || "/images/products/hero.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${(item.price / 100).toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantity(item.productId, -1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      aria-label={`Remove one ${item.name}`}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantity(item.productId, 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      aria-label={`Add one ${item.name}`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-gray-400 hover:text-red-500 ml-2"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-800">
                    ${(subtotal / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Shipping calculated at checkout</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/30">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              Add the Pawpath Training Mat to get started.
            </p>
          ) : (
            <Button onClick={handleCheckout} className="w-full">
              Proceed to Checkout ({itemCount})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { addToCart };
