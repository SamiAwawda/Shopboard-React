import type { ActionDispatch } from "react";
import Icon from "../../../components/ui/Icon";
import Modal from "../../../components/ui/Modal";
import { formatPrice } from "../../../shared/money";
import { MAX_QUANTITY, MIN_QUANTITY, summarize } from "../logic";
import type { CartAction, CartLine } from "../types";
import "../cart.css";

interface CartDialogProps {
  lines: CartLine[];
  dispatch: ActionDispatch<[action: CartAction]>;
  onClose: () => void;
}

// The cart popup: the saved items with quantity and remove buttons, and the total.
export default function CartDialog({
  lines,
  dispatch,
  onClose,
}: CartDialogProps): React.JSX.Element {
  const { quantity, subtotalCents } = summarize(lines);

  return (
    <Modal title={`Your cart${quantity ? ` (${quantity})` : ""}`} onClose={onClose}>
      {lines.length === 0 ? (
        <div className="empty-state">
          <Icon name="bag" size={46} />
          <h3>A little room for something lovely.</h3>
          <p>Find a favorite and make it yours.</p>
          <button type="button" className="solid-button" onClick={onClose}>
            Keep exploring
          </button>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {lines.map((line) => (
              <li key={line.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={line.thumbnailImage} alt="" width="96" height="96" />
                </div>
                <div className="cart-item-info">
                  <h3>{line.name}</h3>
                  <p>{line.category}</p>
                  <div className="quantity-control">
                    <button
                      type="button"
                      aria-label={`Decrease ${line.name} quantity`}
                      disabled={line.quantity <= MIN_QUANTITY}
                      onClick={() =>
                        dispatch({ type: "quantity", id: line.id, quantity: line.quantity - 1 })
                      }
                    >
                      <Icon name="minus" size={14} />
                    </button>
                    <span aria-live="polite">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${line.name} quantity`}
                      disabled={line.quantity >= MAX_QUANTITY}
                      onClick={() =>
                        dispatch({ type: "quantity", id: line.id, quantity: line.quantity + 1 })
                      }
                    >
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                </div>
                <div className="cart-item-end">
                  <strong>{formatPrice(line.priceCents * line.quantity)}</strong>
                  <button
                    type="button"
                    aria-label={`Remove ${line.name}`}
                    onClick={() => dispatch({ type: "remove", id: line.id })}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotalCents)}</strong>
          </p>
          <p className="cart-note">
            Your cart is saved on this device. This shop is a preview: checkout is not available
            yet.
          </p>
          <button type="button" className="solid-button full-width" onClick={onClose}>
            Keep exploring
          </button>
        </>
      )}
    </Modal>
  );
}
