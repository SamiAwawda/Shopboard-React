// Hero logic: pure index math for the slider and its pages of thumbnails.
import type { HeroProduct } from "./types";

export const THUMBNAILS_PER_PAGE = 3;

// Keeps an index inside the list: after the last item comes the first, before the first comes the last.
export function wrapIndex(index: number, length: number): number {
  return length > 0 ? ((index % length) + length) % length : 0;
}

// The page (group of thumbnails) a product index is on.
export function pageOf(index: number): number {
  return Math.floor(index / THUMBNAILS_PER_PAGE);
}

// The products shown as thumbnails for a page.
export function pageProducts(products: HeroProduct[], page: number): HeroProduct[] {
  return products.slice(page * THUMBNAILS_PER_PAGE, (page + 1) * THUMBNAILS_PER_PAGE);
}

// How many pages of thumbnails the list needs.
export function pageCount(length: number): number {
  return Math.ceil(length / THUMBNAILS_PER_PAGE);
}

// Two digits, like "01": the slide counter.
export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

// The text of the buy button, from the product's state.
export function getBuyLabel(inStock: boolean, canBuy: boolean, justAdded: boolean): string {
  if (!inStock) return "Sold out";
  if (!canBuy) return "Cart limit reached";
  return justAdded ? "Added to cart" : "Buy now";
}
