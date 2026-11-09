import DataBoundary from "../components/ui/DataBoundary";
import { forgetProductRequests } from "../modules/products/api";
import HomeHero from "./HomeHero";

// "/": the hero slider with the featured products.
export default function HomePage(): React.JSX.Element {
  return (
    <DataBoundary
      loadingMessage="Loading the collection…"
      errorMessage="Could not load the collection."
      onRetry={forgetProductRequests}
    >
      <HomeHero />
    </DataBoundary>
  );
}
