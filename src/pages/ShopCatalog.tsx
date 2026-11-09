import StatusPanel from "../components/ui/StatusPanel";
import AddToCartButton from "../modules/cart/components/AddToCartButton";
import ProductList from "../modules/products/components/ProductList";
import { useProducts } from "../modules/products/useProducts";

// The shop page's data part: reads the products (Suspense waits here) and gives each card its add button.
export default function ShopCatalog(): React.JSX.Element {
  const products = useProducts();

  if (products.length === 0) {
    return (
      <StatusPanel>
        <p>There are no products yet. Please come back soon.</p>
      </StatusPanel>
    );
  }

  return (
    <ProductList
      products={products}
      renderAction={(product) => <AddToCartButton product={product} />}
    />
  );
}
