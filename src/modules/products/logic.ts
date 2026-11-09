// Products logic: pure functions to name, read, search, filter and sort products.
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

// The product id from the address ("/products/3" -> 3). Anything that is not a whole number above 0 gives null.
export function parseProductId(text: string | undefined): number | null {
  const id = Number(text);
  return Number.isInteger(id) && id > 0 ? id : null;
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
