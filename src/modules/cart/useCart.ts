// Hook that reads the shared cart. Components change the cart only through the actions it returns.
import { use } from "react";
import { CartContext } from "./context";
import type { CartContextValue } from "./types";

export function useCart(): CartContextValue {
  const cart = use(CartContext);
  if (!cart) throw new Error("useCart must be used inside <CartProvider>.");
  return cart;
}
