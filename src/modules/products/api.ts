import { getJson } from "../../shared/api/client";
import type { Product } from "./types";

interface ApiProduct {
  id: number;
  title: string;
  category_name: string;
  price_cents: number;
  in_stock: boolean;
}

function toProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    name: p.title,
    category: p.category_name,
    price: p.price_cents / 100,
    inStock: p.in_stock,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await getJson<{ items: ApiProduct[] }>("/api/products");
  return data.items.map(toProduct);
}
