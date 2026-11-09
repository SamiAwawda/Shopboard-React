import Icon from "../../ui/Icon";
import { THUMBNAILS_PER_PAGE, pad2, pageCount } from "./logic";
import { SOCIAL_LINKS } from "./data";

interface HeroFooterProps {
  index: number;
  total: number;
  page: number;
  onSelect: (index: number) => void;
}

// The bottom of the hero: social links, the "01 / 12" counter, page dots and the link to the list.
export default function HeroFooter({
  index,
  total,
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
          {pad2(total)}
        </span>
        <span className="pager-divider" />
        <div className="page-dots" role="group" aria-label="Collection pages">
          {Array.from({ length: pageCount(total) }, (_, dot) => (
            <button
              type="button"
              key={dot}
              className={dot === page ? "selected" : ""}
              aria-label={`View collection page ${dot + 1}`}
              aria-pressed={dot === page}
              onClick={() => onSelect(dot * THUMBNAILS_PER_PAGE)}
            />
          ))}
        </div>
        <a className="view-collection" href="#shop">
          View collection <Icon name="arrow" size={13} />
        </a>
      </div>
    </div>
  );
}
