// Line icons used across the page (one small SVG per name).
export type IconName =
  | "arrow"
  | "arrowLeft"
  | "cart"
  | "bag"
  | "search"
  | "plus"
  | "minus"
  | "check"
  | "instagram"
  | "facebook"
  | "send";

interface IconProps {
  name: IconName;
  size?: number;
}

const DEFAULT_SIZE = 24;

const PATHS: Record<IconName, React.ReactNode> = {
  arrow: <path d="m9 5 7 7-7 7" />,
  arrowLeft: <path d="m15 5-7 7 7 7" />,
  cart: (
    <>
      <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 8H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </>
  ),
  bag: (
    <>
      <path d="M5 7h14l1 14H4L5 7Z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12 4 4L19 6" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r=".8" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M14.5 7H13a2 2 0 0 0-2 2v11m-3-9h7" />
    </>
  ),
  send: <path d="m21 3-7 18-4-7-7-4L21 3Zm0 0L10 14" />,
};

// One line icon by name, drawn in the current text color.
export default function Icon({ name, size = DEFAULT_SIZE }: IconProps): React.JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
