import { useReducedMotion } from "motion/react";

interface Still {
  reduced: boolean;
  still: (value: number) => number;
}

// For animations: `still(value)` is 0 when the user asked for less motion, otherwise the value.
export function useStill(): Still {
  const reduced = useReducedMotion() ?? false;
  return { reduced, still: (value: number): number => (reduced ? 0 : value) };
}
