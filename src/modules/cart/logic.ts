// Cart logic: pure functions (no React, no storage) for the cart's lines and totals.
import type { CartAction, CartLine, CartSummary } from "./types";

export const MAX_QUANTITY = 99;
export const MIN_QUANTITY = 1;

// Applies one action to the lines and returns the new lines.
export function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      const existing = lines.find((line) => line.id === action.product.id);
      if (!existing) return [...lines, { ...action.product, quantity: MIN_QUANTITY }];
      return lines.map((line) =>
        line.id === action.product.id
          ? { ...line, quantity: Math.min(line.quantity + 1, MAX_QUANTITY) }
          : line,
      );
    }
    case "quantity":
      if (!Number.isInteger(action.quantity) || action.quantity < MIN_QUANTITY) return lines;
      return lines.map((line) =>
        line.id === action.id
          ? { ...line, quantity: Math.min(action.quantity, MAX_QUANTITY) }
          : line,
      );
    case "remove":
      return lines.filter((line) => line.id !== action.id);
  }
}

// The number of items and the total price (in cents) of the lines.
export function summarize(lines: CartLine[]): CartSummary {
  return lines.reduce<CartSummary>(
    (total, line) => ({
      quantity: total.quantity + line.quantity,
      subtotalCents: total.subtotalCents + line.priceCents * line.quantity,
    }),
    { quantity: 0, subtotalCents: 0 },
  );
}

// True when one more of this product can still be added.
export function canAdd(lines: CartLine[], id: number): boolean {
  const line = lines.find((item) => item.id === id);
  return !line || line.quantity < MAX_QUANTITY;
}
