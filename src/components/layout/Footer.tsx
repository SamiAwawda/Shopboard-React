import "./footer.css";

interface FooterProps {
  start: string;
  end: string;
}

// The page footer: one caption at the start of the line and one at the end.
export default function Footer({ start, end }: FooterProps): React.JSX.Element {
  return (
    <footer className="footer">
      <span>{start}</span>
      <span>{end}</span>
    </footer>
  );
}
