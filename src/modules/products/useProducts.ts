// Hook that loads the products from the API.
import { useCallback, useEffect, useState } from "react";
import type { ApiState } from "../../shared/api/client";
import { fetchProducts } from "./api";
import type { Product } from "./types";

interface UseProducts {
  state: ApiState<Product[]>;
  reload: () => void;
}

// Loads the products from the API when the page opens. `reload` tries again (after an error).
export function useProducts(): UseProducts {
  const [state, setState] = useState<ApiState<Product[]>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchProducts().then((result) => {
      if (!cancelled) setState(result);
    });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const reload = useCallback((): void => {
    setState({ status: "loading" });
    setAttempt((count) => count + 1);
  }, []);

  return { state, reload };
}
