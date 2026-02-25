import { useAuth } from "../contexts/AuthContext";

/**
 * Returns the current Firebase user, or null if not authenticated.
 * Usage: const user = useAuthUser();
 */
export function useAuthUser() {
  const { user } = useAuth();
  return user;
}
