import { useCallback, useEffect, useState } from "react";
import { formatPrice } from "../../../shared/money";
import HeroCopy from "./HeroCopy";
import HeroFooter from "./HeroFooter";
import ProductStage from "./ProductStage";
import ThumbnailSelector from "./ThumbnailSelector";
import { pageOf, wrapIndex } from "./logic";
import type { HeroProduct, Selection } from "./types";
import "./hero.css";

// Generic, so `renderAction` gets back the page's own product type (with all its fields).
interface HeroProps<T extends HeroProduct> {
  products: T[];
  // The buy control of the featured product. The page decides what it does.
  renderAction: (product: T) => React.ReactNode;
}

interface CarouselProps<T extends HeroProduct> extends HeroProps<T> {
  first: T;
}

// The white lines in the background never change, so the element is built once.
const LINEWORK = (
  <svg
    className="hero-linework"
    viewBox="0 0 1440 800"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden="true"
  >
    <path d="M514-40C640 82 1135 292 1090 514S760 746 620 629 421 210 577 161 1110 165 1480 119" />
    <path d="M208 850C247 692 444 552 681 526S1054 699 1104 856" />
    <path d="M302 836C379 671 680 610 907 482S1070 269 1448 244" />
  </svg>
);

// Shows the carousel once there is at least one product (the first one is the fallback for lookups).
export default function Hero<T extends HeroProduct>({
  products,
  renderAction,
}: HeroProps<T>): React.JSX.Element | null {
  const first = products[0];
  if (!first) return null;
  return <Carousel products={products} first={first} renderAction={renderAction} />;
}

// The hero: owns which product is selected and puts the parts together.
function Carousel<T extends HeroProduct>({
  products,
  first,
  renderAction,
}: CarouselProps<T>): React.JSX.Element {
  const [selection, setSelection] = useState<Selection>({ index: 0, direction: 1 });
  const total = products.length;
  const product = products[selection.index] ?? first;
  const page = pageOf(selection.index);

  const select = useCallback(
    (index: number): void =>
      setSelection((previous) => ({
        index: wrapIndex(index, total),
        direction: index >= previous.index ? 1 : -1,
      })),
    [total],
  );
  const step = useCallback(
    (direction: number): void =>
      setSelection((previous) => ({
        index: wrapIndex(previous.index + direction, total),
        direction,
      })),
    [total],
  );

  // Arrow keys change the product, unless the user is typing.
  useEffect(() => {
    function handleKey(event: KeyboardEvent): void {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (event.altKey || event.ctrlKey || event.metaKey || target.isContentEditable) return;
      if (/INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [step]);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Featured collection">
      <div className="hero-background" aria-hidden="true" />
      {LINEWORK}
      <div className="hero-inner">
        <HeroCopy product={product}>{renderAction(product)}</HeroCopy>
        <ProductStage product={product} direction={selection.direction} onStep={step} />
        <ThumbnailSelector
          products={products}
          page={page}
          selectedId={product.id}
          onSelect={select}
        />
        <HeroFooter products={products} index={selection.index} page={page} onSelect={select} />
        <p className="sr-only" role="status" aria-live="polite">
          {product.name}, {formatPrice(product.priceCents)}, product {selection.index + 1} of{" "}
          {total}.
        </p>
      </div>
    </section>
  );
}
