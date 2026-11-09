import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import StatusPanel from "../components/ui/StatusPanel";
import { useCart } from "../modules/cart/useCart";

const HEADER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
];

// The frame every page shares: header (with the cart count), the page itself, and the footer.
export default function RootLayout(): React.JSX.Element {
  const { summary } = useCart();

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="store-shell">
        <Header title="ShopBoard" links={HEADER_LINKS} cartCount={summary.quantity} />
        <main id="main">
          {/* A page's code is downloaded the first time it opens; until then this message shows. */}
          <Suspense fallback={<StatusPanel>Loading the page…</StatusPanel>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <Footer start="The everyday edit" end="Bags. Footwear. Little details." />
      <ScrollRestoration />
    </div>
  );
}
