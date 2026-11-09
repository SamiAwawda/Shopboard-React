// Hook that keeps the cart lines in React state and in localStorage.
import { useEffect, useReducer, type ActionDispatch } from "react";
import { cartReducer } from "./logic";
import { loadCart, saveCart } from "./state";
import type { CartAction, CartLine } from "./types";

interface UseCart {
  lines: CartLine[];
  dispatch: ActionDispatch<[action: CartAction]>;
}

// The cart's lines. They load from localStorage once and are saved on every change.
export function useCart(): UseCart {
  const [lines, dispatch] = useReducer(cartReducer, undefined, loadCart);
  useEffect(() => saveCart(lines), [lines]);
  return { lines, dispatch };
}
