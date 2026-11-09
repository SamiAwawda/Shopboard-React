import { formatPrice } from "../../../shared/money";
import { lineTotalCents } from "../logic";
import { useCart } from "../useCart";
import "../cart.css";

// The checkout side panel: what is being ordered and the subtotal.
export default function OrderSummary(): React.JSX.Element {
  const { lines, summary } = useCart();
  return (
    <aside className="order-summary" aria-labelledby="order-summary-title">
      <h2 id="order-summary-title">Order summary</h2>
      <ul>
        {lines.map((line) => (
          <li key={line.id}>
            <span>
              {line.name} × {line.quantity}
            </span>
            <span>{formatPrice(lineTotalCents(line))}</span>
          </li>
        ))}
      </ul>
      <p className="cart-total">
        <span>Subtotal</span>
        <strong>{formatPrice(summary.subtotalCents)}</strong>
      </p>
    </aside>
  );
}
