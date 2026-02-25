import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/apiClient";
import { useAuthUser } from "./useAuthUser";

interface Friend {
  id: string;
  username: string;
  displayName: string;
  photoURL: string;
}

export function useFriendsList() {
  const user = useAuthUser();
  return useQuery<Friend[]>({
    queryKey: ["friends"],
    queryFn: () => apiFetch("/friends/list"),
    enabled: !!user,
  });
}
