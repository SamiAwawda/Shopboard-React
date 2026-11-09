import "./status.css";

interface StatusPanelProps {
  children: React.ReactNode;
}

// A full-width message: loading, empty or not found. Screen readers announce it when it appears.
export default function StatusPanel({ children }: StatusPanelProps): React.JSX.Element {
  return (
    <div className="status-panel" role="status">
      {children}
    </div>
  );
}
