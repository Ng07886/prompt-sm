import { getAuth } from "firebase/auth";

const API_BASE_URL = "http://localhost:3000";

export async function apiFetch<T = unknown>(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<T> {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not authenticated");
  const token = await user.getIdToken();

  const headers = new Headers(init.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

  const url =
    typeof input === "string" && input.startsWith("/")
      ? `${API_BASE_URL}${input}`
      : input;

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || response.statusText);
  }

  return response.json();
}
