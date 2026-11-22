export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const STORAGE_KEY = "pawpath_cart";
const EMPTY: CartItem[] = [];

const listeners = new Set<() => void>();
let snapshot: CartItem[] | null = null;

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed as CartItem[];
  } catch {
    return EMPTY;
  }
}

function writeStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    return;
  }
}

function commit(items: CartItem[]): CartItem[] {
  writeStorage(items);
  snapshot = items;
  listeners.forEach((listener) => listener());
  return items;
}

export function getCartSnapshot(): CartItem[] {
  if (snapshot === null) {
    snapshot = readStorage();
  }
  return snapshot;
}

export function getCartServerSnapshot(): CartItem[] {
  return EMPTY;
}

export function subscribeToCart(listener: () => void): () => void {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      snapshot = null;
      listener();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function loadCart(): CartItem[] {
  return getCartSnapshot();
}

export function saveCart(items: CartItem[]): CartItem[] {
  return commit(items);
}

export function addToCart(
  item: Omit<CartItem, "quantity"> & { quantity?: number }
): CartItem[] {
  const items = getCartSnapshot();
  const existing = items.find((i) => i.productId === item.productId);
  const next: CartItem[] = existing
    ? items.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
          : i
      )
    : [...items, { ...item, quantity: item.quantity ?? 1 }];
  return commit(next);
}

export function updateQuantity(productId: string, quantity: number): CartItem[] {
  const items = getCartSnapshot();
  const next = items
    .map((i) =>
      i.productId === productId ? { ...i, quantity: Math.max(0, quantity) } : i
    )
    .filter((i) => i.quantity > 0);
  return commit(next);
}

export function removeFromCart(productId: string): CartItem[] {
  const items = getCartSnapshot().filter((i) => i.productId !== productId);
  return commit(items);
}

export function clearCart(): void {
  commit(EMPTY);
}

export function cartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  return { subtotal, itemCount };
}
