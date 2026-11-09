// Types of the cart feature. The cart keeps its own copy of what it shows (it does not import products).
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
  | { type: "remove"; id: number };

export interface CartSummary {
  quantity: number;
  subtotalCents: number;
}
