import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/apiClient";
import { useAuthUser } from "./useAuthUser";

interface FriendWithStats {
  id: string;
  username: string;
  displayName: string;
  photoURL: string;
  stats: Record<string, unknown>;
}

export function useFriendsWithStats() {
  const user = useAuthUser();
  return useQuery<FriendWithStats[]>({
    queryKey: ["friends", "stats"],
    queryFn: () => apiFetch("/friends/with-stats"),
    enabled: !!user,
  });
}
