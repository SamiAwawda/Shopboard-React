import { Link } from "react-router";
import Icon from "../../../components/ui/Icon";
import "../cart.css";

// The message for an empty cart, with a link to the shop.
export default function EmptyCart(): React.JSX.Element {
  return (
    <div className="empty-state">
      <Icon name="bag" size={46} />
      <h2>A little room for something lovely.</h2>
      <p>Find a favorite and make it yours.</p>
      <Link className="solid-button" to="/shop">
        Keep exploring
      </Link>
    </div>
  );
}
