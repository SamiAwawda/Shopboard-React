import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatPrice } from "../../../shared/money";
import { pageProducts } from "./logic";
import {
  THUMB_ENTER_Y,
  THUMB_EXIT_Y,
  THUMB_INFO_DELAY_SECONDS,
  THUMB_INFO_SECONDS,
  THUMB_SECONDS,
} from "./data";
import type { HeroProduct } from "./types";
import { useStill } from "./useStill";

interface ThumbnailSelectorProps {
  products: HeroProduct[];
  page: number;
  selectedId: number;
  onSelect: (index: number) => void;
}

// The dotted rail and the 3 thumbnails of the current page. The selected one shows its name and price.
export default function ThumbnailSelector({
  products,
  page,
  selectedId,
  onSelect,
}: ThumbnailSelectorProps): React.JSX.Element {
  const { still } = useStill();
  const thumbnailRefs = useRef(new Map<number, HTMLButtonElement>());
  const keepFocus = useRef(false);
  const thumbnails = pageProducts(products, page);

  // After an arrow key moves the selection, focus follows it (the old thumbnail may be gone).
  useEffect(() => {
    if (keepFocus.current) {
      thumbnailRefs.current.get(selectedId)?.focus({ preventScroll: true });
      keepFocus.current = false;
    }
  }, [selectedId]);

  return (
    <div className="product-selector">
      <div className="thumbnail-rail" aria-hidden="true">
        <span className="rail-line" />
        {thumbnails.map((item) => {
          const selected = item.id === selectedId;
          return (
            <span key={item.id} className={`rail-slot${selected ? " selected" : ""}`}>
              <span
                className={`rail-dot${selected ? " selected" : ""}`}
                style={selected ? { backgroundColor: item.accent } : undefined}
              />
            </span>
          );
        })}
      </div>
      <div
        className="thumbnail-list"
        role="group"
        aria-label="Choose a featured product"
        onKeyDownCapture={(event) => {
          keepFocus.current = event.key === "ArrowLeft" || event.key === "ArrowRight";
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {thumbnails.map((item) => {
            const selected = item.id === selectedId;
            return (
              <motion.button
                key={item.id}
                type="button"
                ref={(node: HTMLButtonElement | null) => {
                  if (node) thumbnailRefs.current.set(item.id, node);
                  else thumbnailRefs.current.delete(item.id);
                }}
                layout
                className={`thumbnail${selected ? " selected" : ""}`}
                aria-label={`View ${item.name}`}
                aria-pressed={selected}
                onClick={() => onSelect(products.indexOf(item))}
                initial={{ opacity: 0, y: still(THUMB_ENTER_Y) }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: still(THUMB_EXIT_Y) }}
                transition={{ duration: still(THUMB_SECONDS) }}
              >
                <img src={item.thumbnailImage} alt="" width="85" height="94" draggable="false" />
                {selected && (
                  <motion.span
                    className="thumbnail-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: still(THUMB_INFO_SECONDS),
                      delay: still(THUMB_INFO_DELAY_SECONDS),
                    }}
                  >
                    <span>{item.name}</span>
                    <span className="thumbnail-prices">
                      <strong>{formatPrice(item.priceCents)}</strong>
                    </span>
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
