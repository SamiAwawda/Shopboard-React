// Cart storage: the cart is saved in localStorage. What comes back is `unknown` until a type guard checks it.
import { MAX_QUANTITY, MIN_QUANTITY } from "./logic";
import type { CartLine } from "./types";

// The key has a version: if the saved shape changes, bump it so old data is never misread.
const CART_KEY = "shopboard-cart-v1";

// Checks that an unknown value is one valid cart line.
function isCartLine(value: unknown): value is CartLine {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "category" in value &&
    "priceCents" in value &&
    "thumbnailImage" in value &&
    "quantity" in value &&
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.category === "string" &&
    typeof value.priceCents === "number" &&
    typeof value.thumbnailImage === "string" &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity >= MIN_QUANTITY &&
    value.quantity <= MAX_QUANTITY
  );
}

// Reads the saved cart. Broken or missing data gives an empty cart, never a crash.
export function loadCart(): CartLine[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter(isCartLine) : [];
  } catch {
    return [];
  }
}

// Saves the cart. If storage is blocked, the cart still works until the page closes.
export function saveCart(lines: CartLine[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  } catch {
    // Storage is unavailable (private mode or full): keep the in-memory cart.
  }
}
