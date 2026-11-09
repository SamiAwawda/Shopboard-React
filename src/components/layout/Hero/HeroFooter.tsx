import { Link } from "react-router";
import Icon from "../../ui/Icon";
import { pad2, pageLeaders } from "./logic";
import { SOCIAL_LINKS } from "./data";
import type { HeroProduct } from "./types";

interface HeroFooterProps {
  products: HeroProduct[];
  index: number;
  page: number;
  onSelect: (index: number) => void;
}

// The bottom of the hero: social links, the "01 / 12" counter, page dots and the link to the shop.
export default function HeroFooter({
  products,
  index,
  page,
  onSelect,
}: HeroFooterProps): React.JSX.Element {
  return (
    <div className="hero-footer">
      <div className="socials">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            <Icon name={link.icon} />
          </a>
        ))}
      </div>
      <div className="collection-pager">
        <span className="slide-counter">
          <strong>{pad2(index + 1)}</strong>
          <span>/</span>
          {pad2(products.length)}
        </span>
        <span className="pager-divider" />
        <div className="page-dots" role="group" aria-label="Collection pages">
          {pageLeaders(products).map((leader, dot) => (
            <button
              type="button"
              key={leader.id}
              className={dot === page ? "selected" : ""}
              aria-label={`View collection page ${dot + 1}`}
              aria-pressed={dot === page}
              onClick={() => onSelect(products.indexOf(leader))}
            />
          ))}
        </div>
        <Link className="view-collection" to="/shop">
          View collection <Icon name="arrow" size={13} />
        </Link>
      </div>
    </div>
  );
}
