import { useState } from "react";
import EmptyCart from "../modules/cart/components/EmptyCart";
import OrderSummary from "../modules/cart/components/OrderSummary";
import { useCart } from "../modules/cart/useCart";
import CheckoutForm from "../modules/checkout/components/CheckoutForm";
import OrderConfirmation from "../modules/checkout/components/OrderConfirmation";
import type { CheckoutValues } from "../modules/checkout/schema";

// "/checkout": the form and the order summary, then the thank-you message.
export default function CheckoutPage(): React.JSX.Element {
  const { lines, clear } = useCart();
  // Who placed the order, once it is placed. Only this page needs it, so it lives here.
  const [customerName, setCustomerName] = useState<string | null>(null);

  // The shop has no payment yet: placing the order empties the cart and says thank you.
  function placeOrder(values: CheckoutValues): void {
    clear();
    setCustomerName(values.fullName);
  }

  return (
    <section className="page-section" aria-labelledby="checkout-title">
      <h1 id="checkout-title" className="page-title">
        Checkout
      </h1>
      {customerName !== null ? (
        <OrderConfirmation name={customerName} />
      ) : lines.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="checkout-layout">
          <CheckoutForm onSubmit={placeOrder} />
          <OrderSummary />
        </div>
      )}
    </section>
  );
}
