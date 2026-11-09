// The ShopBoard API client: the only file that calls fetch and knows the API address.
// To try the loading, error and empty states, put /delay/3000, /fail/500 or /empty after the host.
export const BASE_URL = "https://shopboard-api.vercel.app";

// A reply with an HTTP error status. `status` lets a caller treat 404 as "not found".
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`HTTP ${status}`);
    this.status = status;
  }
}

// Loads a path and checks the reply with a type guard. It throws on a network error, an HTTP
// error or an unexpected reply, so the nearest error boundary shows the problem.
export async function getJson<T>(
  path: string,
  isReply: (value: unknown) => value is T,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`).catch((): never => {
    throw new Error("Network error");
  });
  if (!response.ok) throw new ApiError(response.status);
  const data: unknown = await response.json().catch(() => undefined);
  if (!isReply(data)) throw new Error("Unexpected reply from the server");
  return data;
}
