import Icon from "../../../components/ui/Icon";
import { formatPrice } from "../../../shared/money";
import { lineTotalCents, MAX_QUANTITY, MIN_QUANTITY } from "../logic";
import type { CartLine } from "../types";
import { useCart } from "../useCart";

interface CartItemRowProps {
  line: CartLine;
}

// One line of the cart page: photo, name, quantity buttons, line total and "Remove".
export default function CartItemRow({ line }: CartItemRowProps): React.JSX.Element {
  const { setQuantity, remove } = useCart();
  return (
    <li className="cart-item">
      <div className="cart-item-image">
        <img src={line.thumbnailImage} alt="" width="96" height="96" />
      </div>
      <div className="cart-item-info">
        <h2>{line.name}</h2>
        <p>{line.category}</p>
        <div className="quantity-control">
          <button
            type="button"
            aria-label={`Decrease ${line.name} quantity`}
            disabled={line.quantity <= MIN_QUANTITY}
            onClick={() => setQuantity(line.id, line.quantity - 1)}
          >
            <Icon name="minus" size={14} />
          </button>
          <span aria-live="polite">{line.quantity}</span>
          <button
            type="button"
            aria-label={`Increase ${line.name} quantity`}
            disabled={line.quantity >= MAX_QUANTITY}
            onClick={() => setQuantity(line.id, line.quantity + 1)}
          >
            <Icon name="plus" size={14} />
          </button>
        </div>
      </div>
      <div className="cart-item-end">
        <strong>{formatPrice(lineTotalCents(line))}</strong>
        <button type="button" aria-label={`Remove ${line.name}`} onClick={() => remove(line.id)}>
          Remove
        </button>
      </div>
    </li>
  );
}
