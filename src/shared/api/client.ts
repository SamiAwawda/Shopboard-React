// The ShopBoard API client: the only file that calls fetch and knows the API address.
export const BASE_URL = "https://shopboard-api.vercel.app";

// Every request is in exactly one of these four states.
export type ApiState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "success"; data: T };

// Loads a path and checks the reply with a type guard. Never throws: failures become an "error" state.
async function load<T>(
  path: string,
  isReply: (value: unknown) => value is T,
  isEmpty: (data: T) => boolean,
): Promise<ApiState<T>> {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) return { status: "error", message: `HTTP ${res.status}` };
    const data: unknown = await res.json();
    if (!isReply(data)) return { status: "error", message: "Unexpected reply from the server" };
    return isEmpty(data) ? { status: "empty" } : { status: "success", data };
  } catch {
    return { status: "error", message: "Network error" };
  }
}

export const api = { load };
