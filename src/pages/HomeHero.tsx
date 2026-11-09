import Hero from "../components/layout/Hero/Hero";
import StatusPanel from "../components/ui/StatusPanel";
import BuyNowButton from "../modules/cart/components/BuyNowButton";
import { useProducts } from "../modules/products/useProducts";

// The home page's data part: reads the products (Suspense waits here) and gives the hero its buy button.
export default function HomeHero(): React.JSX.Element {
  const products = useProducts();

  if (products.length === 0) {
    return (
      <StatusPanel>
        <h1>The collection is on its way</h1>
        <p>There are no products yet. Please come back soon.</p>
      </StatusPanel>
    );
  }

  return (
    <Hero
      products={products}
      renderAction={(product) => <BuyNowButton product={product} inStock={product.inStock} />}
    />
  );
}
