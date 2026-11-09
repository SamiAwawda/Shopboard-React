import DataBoundary from "../components/ui/DataBoundary";
import { forgetProductRequests } from "../modules/products/api";
import ShopCatalog from "./ShopCatalog";

// "/shop": every product, with search, category and sort filters.
export default function ShopPage(): React.JSX.Element {
  return (
    <section className="page-section" aria-labelledby="shop-title">
      <h1 id="shop-title" className="page-title">
        The everyday edit
      </h1>
      <DataBoundary
        loadingMessage="Loading products…"
        errorMessage="Could not load the products."
        onRetry={forgetProductRequests}
      >
        <ShopCatalog />
      </DataBoundary>
    </section>
  );
}
