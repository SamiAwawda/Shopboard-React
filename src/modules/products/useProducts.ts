// Hooks that read the products for Suspense: while the request runs, the nearest <Suspense>
// shows its fallback; if it fails, the nearest error boundary shows the error.
import { use } from "react";
import { loadProduct, loadProducts } from "./api";
import type { Product } from "./types";

export function useProducts(): Product[] {
  return use(loadProducts());
}

export function useProduct(id: number): Product | null {
  return use(loadProduct(id));
}
