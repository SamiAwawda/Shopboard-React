// Products API: the paths, the checks of the reply, API names -> the app's Product (one mapper),
// and the request cache that Suspense reads with `use()`.
import { ApiError, getJson } from "../../shared/api/client";
import { DEFAULT_LOOK, IMAGE_FOLDER, PLACEHOLDER_IMAGE, PRODUCT_LOOKS } from "./data";
import { slugify } from "./logic";
import type { Product } from "./types";

const PRODUCTS_PATH = "/api/products";
const NOT_FOUND = 404;

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

// Merges one API product with the design's look.
function toProduct(item: ApiProduct): Product {
  const slug = slugify(item.title);
  const knownLook = PRODUCT_LOOKS[slug];
  const look = knownLook ?? DEFAULT_LOOK;
  // The photos exist only for products the design knows.
  const photo = (size: "hero" | "card" | "thumb"): string =>
    knownLook ? `${IMAGE_FOLDER}/${slug}-${size}.webp` : PLACEHOLDER_IMAGE;
  return {
    id: item.id,
    name: item.title,
    category: item.category_name,
    priceCents: item.price_cents,
    inStock: item.in_stock,
    description: look.description,
    accent: look.accent,
    imageScale: look.imageScale,
    heroImage: photo("hero"),
    cardImage: photo("card"),
    thumbnailImage: photo("thumb"),
  };
}

// `use()` needs the same promise on every render, so each request is made once and kept here.
let productsRequest: Promise<Product[]> | null = null;
const productRequests = new Map<number, Promise<Product | null>>();

// All products. The promise rejects on any error, and the error boundary shows it.
export function loadProducts(): Promise<Product[]> {
  productsRequest ??= getJson(PRODUCTS_PATH, isProductsReply).then((reply) =>
    reply.items.map(toProduct),
  );
  return productsRequest;
}

// One product by its id. `null` when the API has no product with this id.
export function loadProduct(id: number): Promise<Product | null> {
  const saved = productRequests.get(id);
  if (saved) return saved;
  const request = getJson(`${PRODUCTS_PATH}/${id}`, isApiProduct).then(
    toProduct,
    (error: unknown) => {
      if (error instanceof ApiError && error.status === NOT_FOUND) return null;
      throw error;
    },
  );
  productRequests.set(id, request);
  return request;
}

// Drops the saved requests, so "Try again" asks the API again.
export function forgetProductRequests(): void {
  productsRequest = null;
  productRequests.clear();
}
