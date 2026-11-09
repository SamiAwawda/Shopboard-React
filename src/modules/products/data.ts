// Fixed design data: one look per product, found by the slug of the product's API title.
import type { ProductLook, SortDirection } from "./types";

export const PRODUCT_LOOKS: Record<string, ProductLook> = {
  "leather-tote-bag": {
    originalPriceCents: 16800,
    description:
      "Room for your day. A beautifully textured leather tote with an easy silhouette and warm, understated details.",
    accent: "#a4d3d5",
    imageScale: 1,
  },
  "canvas-backpack": {
    originalPriceCents: 12000,
    description:
      "Take the scenic route. A canvas companion with considered details, ready to go wherever the day takes you.",
    accent: "#b7c9b4",
    imageScale: 1,
  },
  "mini-crossbody-bag": {
    originalPriceCents: 9500,
    description:
      "A little bag, a lovely statement. Your everyday essentials, wrapped in a soft blush and a touch of gold.",
    accent: "#dda4b2",
    imageScale: 1,
  },
  "white-sneakers": {
    originalPriceCents: 14000,
    description:
      "A fresh start for every outfit. Clean lines, soft white leather, and the kind of simplicity you keep coming back to.",
    accent: "#c7d8dc",
    imageScale: 1.12,
  },
  "running-shoes": {
    originalPriceCents: 16000,
    description:
      "Find your own pace. A light, sculpted silhouette in a fresh shade of aqua, made for your everyday rhythm.",
    accent: "#9acfd5",
    imageScale: 1.12,
  },
  "suede-loafers": {
    originalPriceCents: 15500,
    description:
      "The art of taking it easy. Warm sand suede and a timeless shape bring a little polish to your everyday.",
    accent: "#d3c0aa",
    imageScale: 1.1,
  },
  "wool-scarf": {
    originalPriceCents: 6500,
    description:
      "Your softest layer. Beautifully textured wool, gentle fringe, and an understated color that goes with everything.",
    accent: "#cebcbd",
    imageScale: 1,
  },
  "silver-watch": {
    originalPriceCents: 21000,
    description:
      "Make time for the details. A clean dial and a softly brushed silver bracelet give every moment a timeless finish.",
    accent: "#bbd1db",
    imageScale: 0.92,
  },
  sunglasses: {
    originalPriceCents: 9000,
    description:
      "See things differently. Warm tortoiseshell frames and a quietly confident shape, for brighter days ahead.",
    accent: "#d7b3aa",
    imageScale: 1.14,
  },
  "travel-duffel-bag": {
    originalPriceCents: 18000,
    description:
      "A weekend state of mind. Natural canvas meets caramel leather in an effortless companion for your next escape.",
    accent: "#cfbcaa",
    imageScale: 1.1,
  },
  "rain-boots": {
    originalPriceCents: 12500,
    description:
      "A brighter outlook on grey days. A playful shade of rose and a simple, considered shape make rainy days your own.",
    accent: "#d6a8b6",
    imageScale: 0.96,
  },
  "leather-belt": {
    originalPriceCents: 6000,
    description:
      "The finishing touch. Rich cognac leather and a simple silver buckle bring an outfit together, beautifully.",
    accent: "#d1b29f",
    imageScale: 1.05,
  },
};

// Used for a product the API sends that has no look yet.
export const DEFAULT_LOOK: ProductLook = {
  originalPriceCents: null,
  description: "A favorite from the everyday edit.",
  accent: "#c7d8dc",
  imageScale: 1,
};

export const PLACEHOLDER_IMAGE = "/products/placeholder.svg";
export const IMAGE_FOLDER = "/products";
export const ALL_CATEGORIES = "All";
export const DEFAULT_SORT = "default";
export const SORT_DIRECTIONS: SortDirection[] = ["default", "asc", "desc"];
