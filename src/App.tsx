import { lazy } from "react";
import { MotionConfig } from "motion/react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import CartProvider from "./modules/cart/components/CartProvider";
import RootLayout from "./pages/RootLayout";

// Each page is its own file that is downloaded only when the page first opens.
const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Every page renders inside RootLayout (header, footer and the cart count).
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "products/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

// The app: the cart that every page shares, around the router.
export default function App(): React.JSX.Element {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </MotionConfig>
  );
}
