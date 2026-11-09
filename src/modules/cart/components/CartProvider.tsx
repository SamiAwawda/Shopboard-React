import { useEffect, useReducer } from "react";
import { CartContext } from "../context";
import { canAdd, cartReducer, summarize } from "../logic";
import { loadCart, saveCart } from "../state";
import type { CartContextValue } from "../types";

interface CartProviderProps {
  children: React.ReactNode;
}

// Owns the cart: the lines are the only state, everything else is worked out from them.
// The lines load from localStorage once, and every change is saved back.
export default function CartProvider({ children }: CartProviderProps): React.JSX.Element {
  const [lines, dispatch] = useReducer(cartReducer, undefined, loadCart);

  // localStorage is outside React, so keeping it in sync is the job of an effect.
  useEffect(() => saveCart(lines), [lines]);

  // CartProvider renders again only when the lines change, so a new value each render is right.
  const value: CartContextValue = {
    lines,
    summary: summarize(lines),
    canAdd: (id) => canAdd(lines, id),
    add: (product) => dispatch({ type: "add", product }),
    setQuantity: (id, quantity) => dispatch({ type: "quantity", id, quantity }),
    remove: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
  };

  return <CartContext value={value}>{children}</CartContext>;
}
