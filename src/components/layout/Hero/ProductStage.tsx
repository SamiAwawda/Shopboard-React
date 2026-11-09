import { useRef } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Icon from "../../ui/Icon";
import { STAGE_ENTER_Y, STAGE_EXIT_Y } from "./data";
import type { HeroProduct } from "./types";
import { useStill } from "./useStill";

interface ProductStageProps {
  product: HeroProduct;
  direction: number;
  onStep: (direction: number) => void;
}

interface TouchPoint {
  x: number;
  y: number;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SLIDE_SECONDS = 0.65;
const SWIPE_DISTANCE = 45;
const SLIDE_OFFSET = 140;
const SLIDE_ROTATE = 7;
const SLIDE_SCALE_IN = 0.88;
const SLIDE_SCALE_OUT = 0.9;
const EXIT_OFFSET_RATIO = 0.85;

// The big product with the previous and next arrows. It slides in and out, and a swipe changes it too.
export default function ProductStage({
  product,
  direction,
  onStep,
}: ProductStageProps): React.JSX.Element {
  const { reduced, still } = useStill();
  const touchStart = useRef<TouchPoint | null>(null);

  const moveOffset = still(SLIDE_OFFSET);
  const variants: Variants = {
    enter: (way: number) => ({
      opacity: 0,
      x: way * moveOffset,
      y: still(STAGE_ENTER_Y),
      rotate: still(way * SLIDE_ROTATE),
      scale: reduced ? 1 : SLIDE_SCALE_IN,
    }),
    center: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
    exit: (way: number) => ({
      opacity: 0,
      x: -way * moveOffset * EXIT_OFFSET_RATIO,
      y: still(STAGE_EXIT_Y),
      rotate: still(-way * SLIDE_ROTATE),
      scale: reduced ? 1 : SLIDE_SCALE_OUT,
    }),
  };

  return (
    <div className="product-display" role="group" aria-label={product.name}>
      <button
        type="button"
        className="previous-product"
        aria-label="Previous product"
        onClick={() => onStep(-1)}
      >
        <Icon name="arrowLeft" size={25} />
      </button>
      <div
        className="product-stage"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          const touch = event.changedTouches[0];
          touchStart.current = null;
          if (!start || !touch) return;
          const dx = touch.clientX - start.x;
          const dy = touch.clientY - start.y;
          if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
            onStep(dx < 0 ? 1 : -1);
          }
        }}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
      >
        <div className="product-shadow" aria-hidden="true" />
        <AnimatePresence custom={direction} initial={false} mode="sync">
          <motion.div
            className="featured-product"
            key={product.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: still(SLIDE_SECONDS), ease: EASE }}
          >
            <img
              src={product.heroImage}
              alt={product.name}
              width="520"
              height="520"
              draggable="false"
              fetchPriority="high"
              style={{ width: `calc(var(--product-fill) * ${product.imageScale})` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        type="button"
        className="next-product"
        aria-label="Next product"
        onClick={() => onStep(1)}
      >
        <span aria-hidden="true" className="large-chevron" />
        <span aria-hidden="true" className="large-chevron" />
      </button>
    </div>
  );
}
