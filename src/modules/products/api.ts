// Products API: the path, the check of the reply, and API names -> the app's Product (one mapper).
import { api, type ApiState } from "../../shared/api/client";
import { DEFAULT_LOOK, IMAGE_FOLDER, PLACEHOLDER_IMAGE, PRODUCT_LOOKS } from "./data";
import { slugify } from "./logic";
import type { Product } from "./types";

const PRODUCTS_PATH = "/api/products";

interface ApiProduct {
  id: number;
  title: string;
  category_name: string;
  price_cents: number;
  in_stock: boolean;
}

interface ProductsReply {
  items: ApiProduct[];
}

// Checks that an unknown value is one product in the shape the API sends.
function isApiProduct(value: unknown): value is ApiProduct {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "category_name" in value &&
    "price_cents" in value &&
    "in_stock" in value &&
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.category_name === "string" &&
    typeof value.price_cents === "number" &&
    typeof value.in_stock === "boolean"
  );
}

// Checks that an unknown value is the API reply: an object with a list of products.
function isProductsReply(value: unknown): value is ProductsReply {
  return (
    typeof value === "object" &&
    value !== null &&
    "items" in value &&
    Array.isArray(value.items) &&
    value.items.every(isApiProduct)
  );
}

// Merges one API product with the design's look. The old price shows only when it is higher.
function toProduct(item: ApiProduct): Product {
  const slug = slugify(item.title);
  const knownLook = PRODUCT_LOOKS[slug];
  const look = knownLook ?? DEFAULT_LOOK;
  // The photos exist only for products the design knows.
  const photo = (size: "hero" | "card" | "thumb"): string =>
    knownLook ? `${IMAGE_FOLDER}/${slug}-${size}.webp` : PLACEHOLDER_IMAGE;
  const hasSale = look.originalPriceCents !== null && look.originalPriceCents > item.price_cents;
  return {
    id: item.id,
    name: item.title,
    category: item.category_name,
    priceCents: item.price_cents,
    inStock: item.in_stock,
    originalPriceCents: hasSale ? look.originalPriceCents : null,
    description: look.description,
    accent: look.accent,
    imageScale: look.imageScale,
    heroImage: photo("hero"),
    cardImage: photo("card"),
    thumbnailImage: photo("thumb"),
  };
}

// Loads the products. Never throws: the result is one of the four ApiState values.
export async function fetchProducts(): Promise<ApiState<Product[]>> {
  const state = await api.load(PRODUCTS_PATH, isProductsReply, (reply) => reply.items.length === 0);
  return state.status === "success"
    ? { status: "success", data: state.data.items.map(toProduct) }
    : state;
}
