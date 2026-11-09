import { Link, NavLink } from "react-router";
import Icon from "../ui/Icon";
import "./header.css";

interface HeaderLink {
  label: string;
  to: string;
}

interface HeaderProps {
  title: string;
  links: HeaderLink[];
  cartCount: number;
}

// The logo mark never changes, so the element is built once.
const STORE_MARK = (
  <svg width="31" height="34" viewBox="0 0 32 36" aria-hidden="true" fill="currentColor">
    <path d="M6 16h20v17H6z" />
    <path d="M4 4h24l3 10a6 6 0 0 1-8 1 5 5 0 0 1-7 0 5 5 0 0 1-7 0 6 6 0 0 1-8-1z" />
    <path
      d="M12 23h8v10h-8zM10 4l-1 11m13-11 1 11M16 4v11"
      fill="white"
      stroke="white"
      strokeWidth="1.3"
    />
  </svg>
);

// The page header: logo + title, page links (the current one is marked), and the cart link with its badge.
export default function Header({ title, links, cartCount }: HeaderProps): React.JSX.Element {
  return (
    <header className="header">
      <Link className="wordmark" to="/" aria-label={`${title} home`}>
        {STORE_MARK}
        <span>{title}</span>
      </Link>
      <nav className="navigation" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink key={link.to} className="nav-link" to={link.to} end>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <Link className="icon-button cart-button" to="/cart" aria-label={`Cart, ${cartCount} items`}>
        <Icon name="cart" size={28} />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>
    </header>
  );
}
