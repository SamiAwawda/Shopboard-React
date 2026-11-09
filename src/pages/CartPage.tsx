import CartView from "../modules/cart/components/CartView";

// "/cart": the saved cart. It needs no API call, so it works even when the API is down.
export default function CartPage(): React.JSX.Element {
  return (
    <section className="page-section" aria-labelledby="cart-title">
      <h1 id="cart-title" className="page-title">
        Your cart
      </h1>
      <CartView />
    </section>
  );
}
