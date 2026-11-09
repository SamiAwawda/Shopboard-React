import Icon from "../../../components/ui/Icon";
import type { CartProduct } from "../types";
import { useCart } from "../useCart";
import "../cart.css";

interface AddToCartButtonProps {
  product: CartProduct;
}

// The small bag button on a product card: adds one of the product to the cart.
export default function AddToCartButton({ product }: AddToCartButtonProps): React.JSX.Element {
  const { canAdd, add } = useCart();
  return (
    <button
      type="button"
      className="icon-button add-button"
      aria-label={`Add ${product.name} to cart`}
      disabled={!canAdd(product.id)}
      onClick={() => add(product)}
    >
      <Icon name="bag" size={22} />
    </button>
  );
}
