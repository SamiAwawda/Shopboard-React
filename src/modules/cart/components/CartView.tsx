import { Link } from "react-router";
import { formatPrice } from "../../../shared/money";
import { useCart } from "../useCart";
import CartItemRow from "./CartItemRow";
import EmptyCart from "./EmptyCart";
import "../cart.css";

// The cart page content: the lines, the subtotal and the way to checkout (or the empty message).
export default function CartView(): React.JSX.Element {
  const { lines, summary } = useCart();

  if (lines.length === 0) return <EmptyCart />;

  return (
    <div className="cart-view">
      <ul className="cart-items">
        {lines.map((line) => (
          <CartItemRow key={line.id} line={line} />
        ))}
      </ul>
      <p className="cart-total">
        <span>Subtotal</span>
        <strong>{formatPrice(summary.subtotalCents)}</strong>
      </p>
      <p className="cart-note">Your cart is saved on this device.</p>
      <div className="cart-actions">
        <Link className="solid-button" to="/checkout">
          Go to checkout
        </Link>
        <Link className="text-link" to="/shop">
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
