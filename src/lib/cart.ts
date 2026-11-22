"use client";

import { useSyncExternalStore } from "react";
import { PRODUCT } from "./products";

export interface CartItem {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const STORAGE_KEY = "pawpath_cart_v2";

let state: CartState = {
  items: [
    {
      id: "pawpath-mat",
      name: PRODUCT.name,
      subtitle: "Forest Green • 5 Integrated Zones",
      price: PRODUCT.price,
      originalPrice: PRODUCT.originalPrice,
      quantity: 1,
      image: "/images/products/hero.webp",
    },
  ],
  isOpen: false,
};

// Initialize from localStorage in browser
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      state.items = JSON.parse(raw);
    }
  } catch {
    // fallback to initial
  }
}

const listeners = new Set<() => void>();

function notify() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }
  listeners.forEach((listener) => listener());
}

export const cartStore = {
  getSnapshot(): CartState {
    return state;
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  openCart() {
    state = { ...state, isOpen: true };
    notify();
  },

  closeCart() {
    state = { ...state, isOpen: false };
    notify();
  },

  addItem(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
    const qty = item.quantity || 1;
    const existing = state.items.find((i) => i.id === item.id);
    let newItems: CartItem[];

    if (existing) {
      newItems = state.items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
      );
    } else {
      newItems = [...state.items, { ...item, quantity: qty }];
    }

    state = { items: newItems, isOpen: true };
    notify();
  },

  removeItem(id: string) {
    state = {
      ...state,
      items: state.items.filter((i) => i.id !== id),
    };
    notify();
  },

  updateQuantity(id: string, delta: number) {
    const newItems = state.items
      .map((i) => {
        if (i.id === id) {
          const newQty = i.quantity + delta;
          return newQty > 0 ? { ...i, quantity: newQty } : null;
        }
        return i;
      })
      .filter(Boolean) as CartItem[];

    state = { ...state, items: newItems };
    notify();
  },

  clearCart() {
    state = { ...state, items: [] };
    notify();
  },
};

export function useCart() {
  const current = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    // Server snapshot
    () => ({ items: [], isOpen: false })
  );

  const itemCount = current.items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = current.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = subtotal >= PRODUCT.freeShippingThreshold || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  return {
    items: current.items,
    isOpen: current.isOpen,
    openCart: cartStore.openCart,
    closeCart: cartStore.closeCart,
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
    itemCount,
    subtotal,
    shipping,
    total,
  };
}
