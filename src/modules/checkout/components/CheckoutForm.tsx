import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import TextField from "../../../components/ui/TextField";
import { checkoutSchema, type CheckoutValues } from "../schema";
import "../checkout.css";

interface CheckoutFormProps {
  onSubmit: (values: CheckoutValues) => void;
}

const EMPTY_FORM: CheckoutValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

// The checkout form. react-hook-form keeps the values, the Zod schema checks them.
// A field shows its error after the shopper leaves it, then updates while they type.
// On submit with errors, the first wrong field gets the focus.
export default function CheckoutForm({ onSubmit }: CheckoutFormProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: EMPTY_FORM,
  });

  return (
    // noValidate: the browser's own bubbles would hide the schema's clearer messages.
    <form className="checkout-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Contact</legend>
        <TextField
          label="Full name"
          autoComplete="name"
          required
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Phone"
          type="tel"
          autoComplete="tel"
          required
          error={errors.phone?.message}
          {...register("phone")}
        />
      </fieldset>
      <fieldset>
        <legend>Shipping address</legend>
        <TextField
          label="Street and house number"
          autoComplete="street-address"
          required
          error={errors.address?.message}
          {...register("address")}
        />
        <div className="checkout-row">
          <TextField
            label="City"
            autoComplete="address-level2"
            required
            error={errors.city?.message}
            {...register("city")}
          />
          <TextField
            label="Postal code"
            autoComplete="postal-code"
            required
            error={errors.postalCode?.message}
            {...register("postalCode")}
          />
        </div>
      </fieldset>
      <Button type="submit" size="lg" className="checkout-submit">
        Place order
      </Button>
    </form>
  );
}
