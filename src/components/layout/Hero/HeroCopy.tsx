import { AnimatePresence, motion } from "motion/react";
import { COPY_ENTER_Y, COPY_EXIT_Y, COPY_FADE_SECONDS } from "./data";
import type { HeroProduct } from "./types";
import { useStill } from "./useStill";

interface HeroCopyProps {
  product: HeroProduct;
  // The buy control under the description.
  children: React.ReactNode;
}

// The left side of the hero: title, the product's description (fades on change) and the buy control.
export default function HeroCopy({ product, children }: HeroCopyProps): React.JSX.Element {
  const { still } = useStill();

  return (
    <div className="hero-copy">
      <p className="eyebrow">Outfit of the day</p>
      <h1>
        <span>All your</span>
        <strong>styles are here</strong>
      </h1>
      <div className="description-slot">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={product.id}
            className="hero-description"
            initial={{ opacity: 0, y: still(COPY_ENTER_Y) }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: still(COPY_EXIT_Y) }}
            transition={{ duration: still(COPY_FADE_SECONDS) }}
          >
            {product.description}
          </motion.p>
        </AnimatePresence>
      </div>
      {children}
    </div>
  );
}
