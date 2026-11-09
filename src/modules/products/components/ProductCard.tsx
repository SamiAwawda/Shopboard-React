import { memo } from "react";
import Icon from "../../../components/ui/Icon";
import { formatPrice } from "../../../shared/money";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAdd: (id: number) => void;
}

// One product in the list: photo, name, category, price, and the add button (or "Sold out").
// `memo` skips the render when the product and `onAdd` are the same, so typing in the search box does not redraw every card.
function ProductCard({ product, onAdd }: ProductCardProps): React.JSX.Element {
  return (
    <article className="product-card">
      <div className="product-card-image">
        <img src={product.cardImage} alt="" width="260" height="260" loading="lazy" />
      </div>
      <h3 className="product-card-name">{product.name}</h3>
      <p className="product-card-category">{product.category}</p>
      <div className="product-card-footer">
        <p className="product-card-price">
          <strong>{formatPrice(product.priceCents)}</strong>
          {product.originalPriceCents !== null && <s>{formatPrice(product.originalPriceCents)}</s>}
        </p>
        {product.inStock ? (
          <button
            type="button"
            className="icon-button add-button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => onAdd(product.id)}
          >
            <Icon name="bag" size={22} />
          </button>
        ) : (
          <p className="sold-out">Sold out</p>
        )}
      </div>
    </article>
  );
}

export default memo(ProductCard);
