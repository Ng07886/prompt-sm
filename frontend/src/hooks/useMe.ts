import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/api/apiClient";
import { useAuthUser } from "./useAuthUser";

export interface MeResponse {
  id: string;
  lastAnsweredPromptDate?: string | null;
  [key: string]: unknown;
}

export function useMe() {
  const user = useAuthUser();

  return useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: () => apiFetch("/users/me"),
    enabled: !!user,
  });
}
