import "./status.css";

interface StatusPanelProps {
  kind: "loading" | "error" | "empty";
  message: string;
  onRetry?: () => void;
}

// A full-width message for the loading, error and empty states (error has a retry button).
export default function StatusPanel({
  kind,
  message,
  onRetry,
}: StatusPanelProps): React.JSX.Element {
  return (
    <div className="status-panel" role={kind === "error" ? "alert" : "status"}>
      <p>{message}</p>
      {kind === "error" && onRetry && (
        <button type="button" className="solid-button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
