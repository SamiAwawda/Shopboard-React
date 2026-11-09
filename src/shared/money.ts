// Money helper: prices are whole cents in the code; only this turns them into text like "$89.00".
const priceFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const CENTS_PER_DOLLAR = 100;

// Turns cents into text for display: 8900 -> "$89.00".
export function formatPrice(cents: number): string {
  return priceFormat.format(cents / CENTS_PER_DOLLAR);
}
