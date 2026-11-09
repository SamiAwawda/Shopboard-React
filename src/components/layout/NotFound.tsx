import { Link } from "react-router";
import StatusPanel from "../ui/StatusPanel";

interface NotFoundProps {
  title: string;
  message: string;
}

// The message for an address that leads nowhere (an unknown page or product), with a way back to the shop.
export default function NotFound({ title, message }: NotFoundProps): React.JSX.Element {
  return (
    <StatusPanel>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link className="solid-button" to="/shop">
        Go to the shop
      </Link>
    </StatusPanel>
  );
}
