import { useEffect, useState } from "react";
import Header from "./shared/components/Header";
import ProductCard from "./modules/products/ProductCard";
import { fetchProducts } from "./modules/products/api";
import type { Product } from "./modules/products/types";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    fetchProducts()
      .then((items) => {
        setProducts(items.slice(0, 3)); // the assignment asks for 3 cards
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "error") return <p>Something went wrong.</p>;

  return (
    <>
      <Header title="ShopBoard" />
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
