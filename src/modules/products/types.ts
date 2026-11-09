// Types of the products feature: the app's Product (API data merged with the design's look).
export interface Product {
  id: number;
  name: string;
  category: string;
  priceCents: number;
  inStock: boolean;
  originalPriceCents: number | null;
  description: string;
  accent: string;
  imageScale: number;
  heroImage: string;
  cardImage: string;
  thumbnailImage: string;
}

export type SortDirection = "default" | "asc" | "desc";

// What the design adds to a product the API describes: text, old price, colors and photos.
export interface ProductLook {
  originalPriceCents: number | null;
  description: string;
  accent: string;
  imageScale: number;
}
