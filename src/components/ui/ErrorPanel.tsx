import "./status.css";

interface ErrorPanelProps {
  message: string;
  detail?: string;
  onRetry: () => void;
}

// The error message of a part of the page that failed to load, with a "Try again" button.
export default function ErrorPanel({
  message,
  detail,
  onRetry,
}: ErrorPanelProps): React.JSX.Element {
  return (
    <div className="status-panel" role="alert">
      <p>{message}</p>
      {detail && <p className="status-detail">{detail}</p>}
      <button type="button" className="solid-button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
