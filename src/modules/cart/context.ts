// The cart context that every page shares. It is `null` outside <CartProvider>, so useCart can say what is wrong.
import { createContext } from "react";
import type { CartContextValue } from "./types";

export const CartContext = createContext<CartContextValue | null>(null);
