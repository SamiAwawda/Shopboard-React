// The checkout rules, in one Zod schema. The form's types come from it, so the two never disagree.
// Each field says first what is missing, then what is wrong.
import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Enter your full name.")
    .min(2, "Your name needs at least 2 letters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email.")
    .pipe(z.email("Enter an email like name@example.com.")),
  phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .regex(/^\+?[0-9 ()-]{7,20}$/, "Use 7 to 20 digits, spaces or dashes (a leading + is fine)."),
  address: z
    .string()
    .trim()
    .min(1, "Enter your street and house number.")
    .min(5, "Your address needs at least 5 characters."),
  city: z.string().trim().min(1, "Enter your city.").min(2, "Your city needs at least 2 letters."),
  postalCode: z
    .string()
    .trim()
    .min(1, "Enter your postal code.")
    .regex(/^[A-Za-z0-9 -]{3,10}$/, "Use 3 to 10 letters or digits."),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
