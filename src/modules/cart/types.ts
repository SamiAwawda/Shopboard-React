// Types of the cart feature. The cart keeps its own copy of what it shows (it does not import products):
// a line is what the shopper picked, at the price it had when they picked it.
export interface CartProduct {
  id: number;
  name: string;
  category: string;
  priceCents: number;
  thumbnailImage: string;
}

export interface CartLine extends CartProduct {
  quantity: number;
}

export type CartAction =
  | { type: "add"; product: CartProduct }
  | { type: "quantity"; id: number; quantity: number }
  | { type: "remove"; id: number }
  | { type: "clear" };

export interface CartSummary {
  quantity: number;
  subtotalCents: number;
}

// What CartProvider gives every page: the lines, totals worked out from them, and the only actions that change them.
export interface CartContextValue {
  lines: CartLine[];
  summary: CartSummary;
  canAdd: (id: number) => boolean;
  add: (product: CartProduct) => void;
  setQuantity: (id: number, quantity: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}
