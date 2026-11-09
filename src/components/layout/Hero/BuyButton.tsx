import { useEffect, useRef, useState } from "react";
import Icon from "../../ui/Icon";
import { getBuyLabel } from "./logic";
import type { HeroProduct } from "./types";

interface BuyButtonProps {
  product: HeroProduct;
  canAdd: (id: number) => boolean;
  onAdd: (id: number) => void;
}

const ADDED_MESSAGE_MS = 2200;

// The "Buy now" button of the featured product. It says "Added to cart" for a moment after a click.
export default function BuyButton({ product, canAdd, onAdd }: BuyButtonProps): React.JSX.Element {
  const [addedId, setAddedId] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const canBuy = product.inStock && canAdd(product.id);
  const justAdded = addedId === product.id;
  const label = getBuyLabel(product.inStock, canBuy, justAdded);

  // Adds the product to the cart and shows "Added to cart" for a moment.
  function buy(): void {
    if (!canBuy) return;
    onAdd(product.id);
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
