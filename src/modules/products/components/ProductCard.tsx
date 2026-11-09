import { Link } from "react-router";
import { formatPrice } from "../../../shared/money";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  // The add-to-cart control. When the product is out of stock, the card shows "Sold out" instead.
  children: React.ReactNode;
}

// One product in the list: photo, name (a link to its page), category, price and the add control.
export default function ProductCard({ product, children }: ProductCardProps): React.JSX.Element {
  return (
    <article className="product-card">
      <div className="product-card-image">
        <img src={product.cardImage} alt="" width="260" height="260" loading="lazy" />
      </div>
      <h2 className="product-card-name">
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h2>
      <p className="product-card-category">{product.category}</p>
      <div className="product-card-footer">
        <p className="product-card-price">{formatPrice(product.priceCents)}</p>
        {product.inStock ? children : <p className="sold-out">Sold out</p>}
      </div>
    </article>
  );
}
