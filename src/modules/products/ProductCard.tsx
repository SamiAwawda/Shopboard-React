import type { Product } from "./types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>${product.price.toFixed(2)}</p>
      {product.inStock ? <button>Add to cart</button> : <p>Sold out</p>}
    </div>
  );
}
