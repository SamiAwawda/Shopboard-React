import { Suspense } from "react";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import ErrorPanel from "./ErrorPanel";
import StatusPanel from "./StatusPanel";

interface DataBoundaryProps {
  loadingMessage: string;
  errorMessage: string;
  // Runs before "Try again" renders the children again (it drops the failed request).
  onRetry: () => void;
  children: React.ReactNode;
}

// Wraps the part of a page that loads data: Suspense shows `loadingMessage` while it waits, and the
// error boundary shows `errorMessage` with "Try again" if it fails. The rest of the page keeps working.
export default function DataBoundary({
  loadingMessage,
  errorMessage,
  onRetry,
  children,
}: DataBoundaryProps): React.JSX.Element {
  return (
    <ErrorBoundary
      onReset={onRetry}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorPanel
          message={errorMessage}
          detail={getErrorMessage(error)}
          onRetry={resetErrorBoundary}
        />
      )}
    >
      <Suspense fallback={<StatusPanel>{loadingMessage}</StatusPanel>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
