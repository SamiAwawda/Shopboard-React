// Products logic: pure functions to name, search, filter and sort products.
import type { ApiState } from "../../shared/api/client";
import type { Product, SortDirection } from "./types";
import { ALL_CATEGORIES, DEFAULT_SORT, SORT_DIRECTIONS } from "./data";

// "Leather Tote Bag" -> "leather-tote-bag": the name of the product's photo files.
export function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Checks that a select's text is one of the three sort directions.
export function isSortDirection(value: string): value is SortDirection {
  return SORT_DIRECTIONS.some((direction) => direction === value);
}

// Products whose name contains the text, in the chosen category ("All" keeps every category).
export function filterProducts(products: Product[], text: string, category: string): Product[] {
  const query = text.trim().toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) &&
      (category === ALL_CATEGORIES || product.category === category),
  );
}

// Sorts by price, or keeps the original order for the default direction.
export function sortByPrice(products: Product[], direction: SortDirection): Product[] {
  if (direction === DEFAULT_SORT) return products;
  return [...products].sort((a, b) =>
    direction === "asc" ? a.priceCents - b.priceCents : b.priceCents - a.priceCents,
  );
}

// "All" first, then every category once, in the order they first appear.
export function categoryNames(products: Product[]): string[] {
  return [ALL_CATEGORIES, ...new Set(products.map((product) => product.category))];
}

// The text for the loading, error and empty states of the products request.
export function statusMessage(state: ApiState<Product[]>): string {
  switch (state.status) {
    case "loading":
      return "Loading products…";
    case "empty":
      return "There are no products yet.";
    case "error":
      return `Could not load the products. ${state.message}.`;
    case "success":
      return "";
  }
}
