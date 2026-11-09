import NotFound from "../components/layout/NotFound";

// Any address that matches no other route (404).
export default function NotFoundPage(): React.JSX.Element {
  return (
    <section className="page-section">
      <NotFound
        title="Page not found"
        message="We looked everywhere, but this page does not exist."
      />
    </section>
  );
}
