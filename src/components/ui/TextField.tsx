import { Input } from "./input";
import { Label } from "./label";
import "./text-field.css";

interface TextFieldProps extends React.ComponentProps<"input"> {
  name: string;
  label: string;
  error?: string;
}

// A labelled text input with its error message under it. It wraps the shadcn/ui Label and Input,
// so the form only passes the label, the error and the input's own props (like `register(...)`).
export default function TextField({
  name,
  label,
  error,
  ...inputProps
}: TextFieldProps): React.JSX.Element {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className="text-field">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
