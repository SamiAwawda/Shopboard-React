import { Link } from "react-router";
import { formatPrice } from "../../../shared/money";
import type { Product } from "../types";
import "../products.css";

interface ProductDetailsProps {
  product: Product;
  // The buy control under the description.
  children: React.ReactNode;
}

// The product page: big photo, name, category, price, description and the buy control.
export default function ProductDetails({
  product,
  children,
}: ProductDetailsProps): React.JSX.Element {
  return (
    <article className="product-details">
      <div className="product-details-image">
        <img src={product.heroImage} alt={product.name} width="520" height="520" />
      </div>
      <div className="product-details-info">
        <Link className="back-link" to="/shop">
          Back to the shop
        </Link>
        <p className="product-details-category">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-details-price">{formatPrice(product.priceCents)}</p>
        <p className="product-details-description">{product.description}</p>
        {children}
      </div>
    </article>
  );
}
