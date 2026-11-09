import { useCallback, useState } from "react";
import { MotionConfig } from "motion/react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import StatusPanel from "./components/ui/StatusPanel";
import CartDialog from "./modules/cart/components/CartDialog";
import { canAdd, summarize } from "./modules/cart/logic";
import { useCart } from "./modules/cart/useCart";
import Hero from "./components/layout/Hero/Hero";
import type { Product } from "./modules/products/types";
import ProductList from "./modules/products/components/ProductList";
import { statusMessage } from "./modules/products/logic";
import { useProducts } from "./modules/products/useProducts";

// One shared empty list, so `products` keeps the same identity until the data arrives.
const NO_PRODUCTS: Product[] = [];

const HEADER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
];

// The page: header, hero slider, product list and the cart popup. App passes data between the features.
export default function App(): React.JSX.Element {
  const { state, reload } = useProducts();
  const { lines, dispatch } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const products = state.status === "success" ? state.data : NO_PRODUCTS;

  // Adds the product with this id to the cart (the cart keeps only what it shows).
  // `useCallback` keeps the same function between renders, so memoized cards are not redrawn.
  const addToCart = useCallback(
    (id: number): void => {
      const product = products.find((item) => item.id === id);
      if (!product) return;
      dispatch({
        type: "add",
        product: {
          id: product.id,
          name: product.name,
          category: product.category,
          priceCents: product.priceCents,
          thumbnailImage: product.thumbnailImage,
        },
      });
    },
    [products, dispatch],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="page" id="home">
        <a className="skip-link" href="#main">
          Skip to products
        </a>
        <div className="store-shell">
          <Header
            title="ShopBoard"
            links={HEADER_LINKS}
            cartCount={summarize(lines).quantity}
            onCartClick={() => setCartOpen(true)}
          />
          <main id="main">
            {state.status === "success" ? (
              <>
                <Hero products={products} canAdd={(id) => canAdd(lines, id)} onAdd={addToCart} />
                <ProductList products={products} onAdd={addToCart} />
              </>
            ) : (
              <StatusPanel kind={state.status} message={statusMessage(state)} onRetry={reload} />
            )}
          </main>
        </div>
        <Footer start="The everyday edit" end="Bags. Footwear. Little details." />
        {cartOpen && (
          <CartDialog lines={lines} dispatch={dispatch} onClose={() => setCartOpen(false)} />
        )}
      </div>
    </MotionConfig>
  );
}
