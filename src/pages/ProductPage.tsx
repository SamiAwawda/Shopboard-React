import { useParams } from "react-router";
import NotFound from "../components/layout/NotFound";
import DataBoundary from "../components/ui/DataBoundary";
import { forgetProductRequests } from "../modules/products/api";
import { parseProductId } from "../modules/products/logic";
import ProductSection from "./ProductSection";

// "/products/:id": one product, loaded from the API by its id.
export default function ProductPage(): React.JSX.Element {
  const id = parseProductId(useParams().id);

  if (id === null) {
    return (
      <section className="page-section">
        <NotFound title="Product not found" message="This address does not lead to a product." />
      </section>
    );
  }

  return (
    <section className="page-section">
      {/* key: a new id starts a new boundary, so an error on one product does not stick to the next. */}
      <DataBoundary
        key={id}
        loadingMessage="Loading the product…"
        errorMessage="Could not load this product."
        onRetry={forgetProductRequests}
      >
        <ProductSection id={id} />
      </DataBoundary>
    </section>
  );
}
