import { Link } from "react-router";
import Icon from "../../../components/ui/Icon";
import "../checkout.css";

interface OrderConfirmationProps {
  name: string;
}

// The thank-you message after the order is placed.
export default function OrderConfirmation({ name }: OrderConfirmationProps): React.JSX.Element {
  return (
    <div className="order-confirmation" role="status">
      <Icon name="check" size={46} />
      <h2>Thank you, {name}!</h2>
      <p>Your order is placed. This shop is a preview, so nothing is charged or shipped.</p>
      <Link className="solid-button" to="/shop">
        Keep shopping
      </Link>
    </div>
  );
}
