import { useEffect, useRef, useState } from "react";
import Icon from "../../../components/ui/Icon";
import { getBuyLabel } from "../logic";
import type { CartProduct } from "../types";
import { useCart } from "../useCart";
import "../cart.css";

interface BuyNowButtonProps {
  product: CartProduct;
  inStock: boolean;
}

const ADDED_MESSAGE_MS = 2200;

// The big "Buy now" button (hero and product page). It says "Added to cart" for a moment after a click.
export default function BuyNowButton({ product, inStock }: BuyNowButtonProps): React.JSX.Element {
  const { canAdd, add } = useCart();
  // The id of the product that was just added. In the hero the product changes under the button,
  // so the message must belong to one product, not be a plain true/false.
  const [addedId, setAddedId] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  // Stops the timer if the button goes away before it fires.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const canBuy = inStock && canAdd(product.id);
  const justAdded = addedId === product.id;
  const label = getBuyLabel(inStock, canBuy, justAdded);

  // Adds the product to the cart and shows "Added to cart" for a moment.
  function buy(): void {
    if (!canBuy) return;
    add(product);
    setAddedId(product.id);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAddedId(null), ADDED_MESSAGE_MS);
  }

  return (
    <>
      <button
        type="button"
        className="buy-button"
        onClick={buy}
        disabled={!canBuy}
        aria-label={`${label}: ${product.name}`}
      >
        <span>{label}</span>
        <Icon name={justAdded ? "check" : "arrow"} size={20} />
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {justAdded ? `${product.name} added to your cart.` : ""}
      </p>
    </>
  );
}
