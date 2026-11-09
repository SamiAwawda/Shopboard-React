import NotFound from "../components/layout/NotFound";
import BuyNowButton from "../modules/cart/components/BuyNowButton";
import ProductDetails from "../modules/products/components/ProductDetails";
import { useProduct } from "../modules/products/useProducts";

interface ProductSectionProps {
  id: number;
}

// The product page's data part: reads one product (Suspense waits here) and gives it the buy button.
export default function ProductSection({ id }: ProductSectionProps): React.JSX.Element {
  const product = useProduct(id);

  if (!product) {
    return <NotFound title="Product not found" message="We could not find this product." />;
  }

  return (
    <ProductDetails product={product}>
      <BuyNowButton product={product} inStock={product.inStock} />
    </ProductDetails>
  );
}
